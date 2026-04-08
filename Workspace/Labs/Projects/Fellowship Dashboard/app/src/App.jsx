import { useState, useEffect, useCallback } from 'react';
import ThreadGraph from './components/ThreadGraph';
import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import { ThreadStore } from './lib/threads';
import { useMemory } from './lib/memory';

export default function App() {
  const [threads, setThreads]               = useState(() => ThreadStore.getAll());
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [workspaceFilter, setWorkspaceFilter] = useState(null);
  const [linkMode, setLinkMode]             = useState(false);
  const { memoryCount, addMemory }          = useMemory();

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;

  // Reload threads from storage (after creates/updates from children)
  const refresh = useCallback(() => setThreads(ThreadStore.getAll()), []);

  useEffect(() => {
    addMemory('session', `Session started · ${new Date().toLocaleString()}`);
  }, []);

  const handleSelectThread = useCallback((id) => {
    setActiveThreadId((prev) => (prev === id ? null : id));
  }, []);

  const handleThreadCreated = useCallback((thread) => {
    refresh();
    setActiveThreadId(thread.id);
  }, [refresh]);

  const handleLinkThreads = useCallback((idA, idB) => {
    ThreadStore.link(idA, idB);
    refresh();
    addMemory('link', `Linked threads`);
  }, [refresh, addMemory]);

  const handleMoveThread = useCallback((id, position) => {
    ThreadStore.savePosition(id, position);
    // No refresh needed — position is cosmetic
  }, []);

  const handleDeleteThread = useCallback((id) => {
    ThreadStore.delete(id);
    if (activeThreadId === id) setActiveThreadId(null);
    refresh();
  }, [activeThreadId, refresh]);

  return (
    <div className="command-center">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="cc-header">
        <span className="cc-header-title">Fellowship of the Raf</span>
        <div className="cc-header-controls">
          <button
            className={`cc-link-toggle ${linkMode ? 'cc-link-toggle--active' : ''}`}
            onClick={() => setLinkMode((v) => !v)}
            title="Toggle link mode — drag between nodes to connect threads"
          >
            {linkMode ? 'linking ●' : 'link mode'}
          </button>
          <span className="cc-header-meta">
            {threads.length} thread{threads.length !== 1 ? 's' : ''}
            <span className="cc-header-sep">·</span>
            {memoryCount} memory {memoryCount === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </header>

      {/* ── Three-panel main ────────────────────────────────── */}
      <div className="cc-main">

        {/* Left — workspaces + thread list */}
        <LeftPanel
          threads={threads}
          activeThreadId={activeThreadId}
          workspaceFilter={workspaceFilter}
          onWorkspaceFilter={setWorkspaceFilter}
          onSelectThread={handleSelectThread}
          onDeleteThread={handleDeleteThread}
        />

        {/* Centre — thread graph */}
        <div className="cc-center">
          <ThreadGraph
            threads={threads}
            activeThreadId={activeThreadId}
            linkMode={linkMode}
            onSelectThread={handleSelectThread}
            onLinkThreads={handleLinkThreads}
            onMoveThread={handleMoveThread}
          />

          {linkMode && (
            <div className="cc-link-hint">
              drag from one node to another to link threads
            </div>
          )}

          <div className="cc-memory-indicator">
            <span className="cc-memory-dot" />
            fellowship:memory · {memoryCount} {memoryCount === 1 ? 'entry' : 'entries'}
          </div>
        </div>

        {/* Right — chat */}
        <ChatPanel
          thread={activeThread}
          onThreadCreated={handleThreadCreated}
          onClose={() => setActiveThreadId(null)}
        />

      </div>
    </div>
  );
}
