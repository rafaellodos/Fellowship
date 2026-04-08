import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { StorageAPI } from '../lib/storage';
import { COPY } from '../lib/copy';

const MAX_CHARS = 2000;

export default function ChatView({ apiKey }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Load chat history from storage on mount
  useEffect(() => {
    const saved = StorageAPI.get('chat');
    if (saved && Array.isArray(saved) && saved.length > 0) {
      setMessages(saved);
    }
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Persist chat to storage
  useEffect(() => {
    if (messages.length > 0) {
      // Keep last 100 messages
      const toSave = messages.slice(-100);
      StorageAPI.set('chat', toSave);
    }
  }, [messages]);

  const getRandomLoadingMsg = () => {
    const msgs = COPY.chat.loadingMessages;
    return msgs[Math.floor(Math.random() * msgs.length)];
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = {
      role: 'rafael',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setError(null);

    if (!apiKey) {
      // No API key — simulate a Gandalf response
      const simulatedResponse = {
        role: 'gandalf',
        content:
          'The chat surface requires an API key to function. You provided none during onboarding — no matter. You can set one by clearing your data and re-entering the fellowship.\n\nIn the meantime, the dashboard and brief surfaces are fully operational.',
        timestamp: new Date().toISOString(),
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, simulatedResponse]);
      }, 800);
      return;
    }

    setLoading(true);
    setLoadingMsg(getRandomLoadingMsg());

    try {
      // Build conversation for the API
      const conversationHistory = newMessages.slice(-20).map((m) => ({
        role: m.role === 'gandalf' ? 'assistant' : 'user',
        content: m.content,
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system:
            'You are Gandalf, the orchestrator of the Fellowship of the Raf — a multi-agent AI operating system built for Rafael Lodos. You speak with authority, directness, and occasional dry humour. You do not hedge. You do not apologise unnecessarily. You synthesise the perspectives of the fellowship agents (Rick, Harvey, Chinaski, Archer, Mr. Robot, Socrates, Morty, Meeseeks, Merry, Pippin) and present unified answers. When you do not know something, say so plainly. You are not a chatbot. You are the face of an intelligence.',
          messages: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const assistantContent =
        data.content?.[0]?.text || 'The response was empty. Unusual. Try again.';

      const gandalfMessage = {
        role: 'gandalf',
        content: assistantContent,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, gandalfMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (iso) => {
    try {
      return new Date(iso).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const charCount = input.length;
  const charWarning = charCount > MAX_CHARS * 0.85;

  return (
    <div
      className="chat-container view-enter"
      id="panel-chat"
      role="tabpanel"
      aria-labelledby="tab-chat"
    >
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-message gandalf">
            <div className="chat-avatar gandalf">G</div>
            <div>
              <div className="chat-bubble">
                <ReactMarkdown>{COPY.chat.greeting}</ReactMarkdown>
              </div>
              <div className="chat-timestamp">Now</div>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            <div className={`chat-avatar ${msg.role}`}>
              {msg.role === 'gandalf' ? 'G' : 'R'}
            </div>
            <div>
              <div className="chat-bubble">
                {msg.role === 'gandalf' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))
                )}
              </div>
              <div className="chat-timestamp">{formatTime(msg.timestamp)}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message gandalf">
            <div className="chat-avatar gandalf">G</div>
            <div>
              <div className="chat-bubble">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="loading-text">{loadingMsg}</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="chat-message gandalf">
            <div className="chat-avatar gandalf">G</div>
            <div>
              <div className="chat-bubble">
                <p>{COPY.chat.errorMessage}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--error)', marginTop: '8px' }}>
                  {error}
                </p>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '8px' }}
                onClick={() => {
                  setError(null);
                  sendMessage();
                }}
              >
                {COPY.chat.retryBtn}
              </button>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div style={{ flex: 1 }}>
          <textarea
            ref={textareaRef}
            id="chat-input"
            value={input}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={COPY.chat.inputPlaceholder}
            rows={1}
            disabled={loading}
          />
          <div className={`chat-char-count${charWarning ? ' warning' : ''}`}>
            {charCount > 0 ? `${charCount} / ${MAX_CHARS}` : ''}
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          id="chat-send-btn"
        >
          Send
        </button>
      </div>
    </div>
  );
}
