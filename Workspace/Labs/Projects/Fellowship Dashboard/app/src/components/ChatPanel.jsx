/**
 * ChatPanel — thread-aware chat interface.
 *
 * Two modes:
 *  1. No thread selected → "new thread" input. First message creates the thread.
 *  2. Thread selected → full conversation with history and streaming.
 *
 * Context loading: when a thread has linked threads, their last N messages
 * are prepended as context in the system prompt.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { AGENTS } from '../lib/agents';
import { WORKSPACES, WORKSPACE_COLORS } from '../lib/workspaces';
import { ChatStore, streamChat } from '../lib/chat';
import { ThreadStore } from '../lib/threads';
import { useMemory } from '../lib/memory';

const GANDALF = AGENTS.gandalf;
const MAX_CHARS = 2000;

// Build a context-enriched system prompt for a thread
function buildSystemPrompt(thread) {
  let prompt = GANDALF.prompt;

  if (thread) {
    prompt += `\n\nActive thread: "${thread.title}"`;
    if (thread.workspace) prompt += ` (${thread.workspace})`;
    prompt += '.';

    // Pull brief context from linked threads
    if (thread.linkedTo?.length > 0) {
      const linked = thread.linkedTo
        .map((id) => {
          const t = ThreadStore.get(id);
          if (!t) return null;
          const hist = ChatStore.getHistory(id);
          const recent = hist.slice(-4).map((m) => `${m.role}: ${m.content}`).join('\n');
          return recent ? `Thread "${t.title}":\n${recent}` : null;
        })
        .filter(Boolean);

      if (linked.length > 0) {
        prompt += `\n\nLinked thread context (for continuity — do not summarise unless asked):\n\n${linked.join('\n\n---\n\n')}`;
      }
    }
  }

  return prompt;
}

export default function ChatPanel({
  thread,          // thread object | null
  onThreadCreated, // (thread) => void
  onClose,         // () => void  — only shown when thread is open
}) {
  const { addMemory } = useMemory();

  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [workspace, setWorkspace] = useState(null); // for new thread
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [error, setError]       = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft]     = useState('');

  const bottomRef   = useRef(null);
  const textareaRef = useRef(null);

  // Load history when thread changes
  useEffect(() => {
    if (thread) {
      setMessages(ChatStore.getHistory(thread.id));
      setError(null);
      setStreamText('');
      setStreaming(false);
    } else {
      setMessages([]);
    }
  }, [thread?.id]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  // Focus input
  useEffect(() => {
    setTimeout(() => textareaRef.current?.focus(), 50);
  }, [thread?.id]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');
    setError(null);

    let activeThread = thread;

    // No thread → create one from first message
    if (!activeThread) {
      activeThread = ThreadStore.create({ firstMessage: text, workspace });
      onThreadCreated(activeThread);
      addMemory('thread', `New thread: ${activeThread.title}`);
    }

    ThreadStore.touch(activeThread.id);

    const userMsg = ChatStore.addMessage(activeThread.id, 'user', text);
    setMessages((prev) => [...prev, userMsg]);

    const history = ChatStore.getHistory(activeThread.id)
      .slice(-20)
      .map(({ role, content }) => ({ role, content }));

    setStreaming(true);
    setStreamText('');

    let full = '';
    await streamChat({
      systemPrompt: buildSystemPrompt(activeThread),
      messages: history,
      onChunk: (chunk) => { full += chunk; setStreamText(full); },
      onDone: () => {
        if (full) {
          const agentMsg = ChatStore.addMessage(activeThread.id, 'assistant', full);
          setMessages((prev) => [...prev, agentMsg]);
          addMemory('chat', `Thread: ${activeThread.title}`);
        }
        setStreamText('');
        setStreaming(false);
      },
      onError: (msg) => { setError(msg); setStreamText(''); setStreaming(false); },
    });
  }, [input, streaming, thread, workspace, onThreadCreated, addMemory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleRename = () => {
    if (titleDraft.trim() && thread) {
      ThreadStore.rename(thread.id, titleDraft.trim());
      // Parent will re-render via thread list refresh
    }
    setEditingTitle(false);
  };

  const charsLeft  = MAX_CHARS - input.length;
  const isOver     = charsLeft < 0;
  const color      = thread
    ? (thread.color || WORKSPACE_COLORS[thread.workspace] || '#C9A84C')
    : '#C9A84C';

  return (
    <div className="chat-panel">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="chat-panel-header" style={{ borderColor: color + '30' }}>
        {thread ? (
          <div className="chat-panel-agent" style={{ flex: 1, minWidth: 0 }}>
            <div className="chat-panel-dot" style={{ background: color, boxShadow: `0 0 8px ${color}66`, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              {editingTitle ? (
                <input
                  className="chat-title-input"
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setEditingTitle(false); }}
                  autoFocus
                  style={{ color }}
                />
              ) : (
                <div
                  className="chat-panel-name"
                  style={{ color, cursor: 'pointer' }}
                  onClick={() => { setTitleDraft(thread.title); setEditingTitle(true); }}
                  title="Click to rename"
                >
                  {thread.title}
                </div>
              )}
              <div className="chat-panel-role">
                {thread.workspace || 'No workspace'}
                {thread.linkedTo?.length > 0 && ` · ${thread.linkedTo.length} linked`}
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-panel-agent">
            <div className="chat-panel-dot" style={{ background: '#C9A84C', boxShadow: '0 0 6px #C9A84C44' }} />
            <div>
              <div className="chat-panel-name" style={{ color: '#C9A84C' }}>New thread</div>
              <div className="chat-panel-role">Start a conversation</div>
            </div>
          </div>
        )}
        <div className="chat-panel-actions">
          {thread && messages.length > 0 && (
            <button className="chat-panel-btn-ghost" onClick={() => { ChatStore.clearHistory(thread.id); setMessages([]); }}>
              Clear
            </button>
          )}
          {thread && <button className="chat-panel-btn-ghost" onClick={onClose}>✕</button>}
        </div>
      </div>

      {/* ── New thread: workspace selector ───────────────────── */}
      {!thread && (
        <div className="chat-ws-selector">
          <span className="chat-ws-label">Workspace</span>
          <div className="chat-ws-pills">
            <button
              className={`chat-ws-pill ${!workspace ? 'chat-ws-pill--active' : ''}`}
              onClick={() => setWorkspace(null)}
            >
              None
            </button>
            {Object.keys(WORKSPACES).map((name) => (
              <button
                key={name}
                className={`chat-ws-pill ${workspace === name ? 'chat-ws-pill--active' : ''}`}
                style={workspace === name ? { borderColor: WORKSPACE_COLORS[name], color: WORKSPACE_COLORS[name] } : {}}
                onClick={() => setWorkspace(workspace === name ? null : name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Messages ─────────────────────────────────────────── */}
      <div className="chat-panel-messages">

        {/* Empty state */}
        {!thread && messages.length === 0 && (
          <div className="chat-panel-empty">
            <div className="chat-panel-empty-name" style={{ color: '#C9A84C' }}>Gandalf</div>
            <p className="chat-panel-empty-desc">
              Send a message to begin. A thread will be created from your first words.
              If this overlaps with something you are already working on, link it after.
            </p>
          </div>
        )}

        {thread && messages.length === 0 && !streaming && (
          <div className="chat-panel-empty">
            <div className="chat-panel-empty-name" style={{ color }}>
              {thread.title}
            </div>
            <p className="chat-panel-empty-desc">
              Thread started. Continue the conversation.
              {thread.linkedTo?.length > 0 && ` Context from ${thread.linkedTo.length} linked thread${thread.linkedTo.length > 1 ? 's' : ''} is loaded.`}
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg chat-msg--${msg.role === 'user' ? 'user' : 'agent'}`}>
            <div
              className="chat-msg-avatar"
              style={msg.role !== 'user' ? { background: color + '22', color } : {}}
            >
              {msg.role === 'user' ? 'R' : 'G'}
            </div>
            <div className="chat-msg-body">
              {msg.role === 'assistant' ? (
                <div className="chat-msg-markdown">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="chat-msg-text">{msg.content}</div>
              )}
              <div className="chat-msg-ts">
                {new Date(msg.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Streaming */}
        {streaming && (
          <div className="chat-msg chat-msg--agent">
            <div className="chat-msg-avatar" style={{ background: color + '22', color }}>G</div>
            <div className="chat-msg-body">
              {streamText ? (
                <div className="chat-msg-markdown chat-msg-markdown--streaming">
                  <ReactMarkdown>{streamText}</ReactMarkdown>
                  <span className="chat-cursor" style={{ color }}>▋</span>
                </div>
              ) : (
                <div className="chat-thinking">
                  <span style={{ color: color + '80' }}>Gandalf is thinking</span>
                  <span className="chat-thinking-dots"><span /><span /><span /></span>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="chat-error">
            <span className="chat-error-label">Error</span>
            {error}
            {error.includes('ANTHROPIC_API_KEY') && (
              <div className="chat-error-hint">
                Create <code>.env</code> in the app directory with <code>ANTHROPIC_API_KEY=sk-ant-...</code> then restart.
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ────────────────────────────────────────────── */}
      <div className="chat-panel-input-area">
        <div className="chat-panel-input-wrap">
          <textarea
            ref={textareaRef}
            className="chat-panel-textarea"
            placeholder={thread ? `Continue "${thread.title}"…` : 'Start a conversation…'}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS + 50))}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={streaming}
            style={{ borderColor: input.length > 0 ? color + '44' : undefined }}
          />
          <div className="chat-panel-input-meta">
            <span className="chat-panel-char-count" style={{ color: isOver ? 'var(--error)' : undefined }}>
              {charsLeft}
            </span>
            <button
              className="chat-panel-send"
              onClick={handleSend}
              disabled={!input.trim() || streaming || isOver}
              style={{ background: color + '22', borderColor: color + '44', color, opacity: !input.trim() || streaming || isOver ? 0.3 : 1 }}
            >
              {streaming ? '…' : '↑'}
            </button>
          </div>
        </div>
        <p className="chat-panel-hint">Shift+Enter for new line</p>
      </div>
    </div>
  );
}
