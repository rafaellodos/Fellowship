import { useState } from 'react';
import { WORKSPACES, WORKSPACE_COLORS } from '../lib/workspaces';

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function LeftPanel({
  threads,
  activeThreadId,
  workspaceFilter,
  onWorkspaceFilter,
  onSelectThread,
  onDeleteThread,
}) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = workspaceFilter
    ? threads.filter((t) => t.workspace === workspaceFilter)
    : threads;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.lastActive) - new Date(a.lastActive)
  );

  const handleDelete = (id) => {
    if (confirmDelete === id) {
      onDeleteThread(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  return (
    <div className="cc-panel cc-panel-left">

      {/* ── Workspaces ─────────────────────────────────────── */}
      <div className="cc-panel-header">Workspaces</div>
      <div className="lp-workspaces">
        {Object.keys(WORKSPACES).map((name) => {
          const color   = WORKSPACE_COLORS[name];
          const active  = workspaceFilter === name;
          const count   = threads.filter((t) => t.workspace === name).length;
          return (
            <button
              key={name}
              className={`lp-ws-item ${active ? 'lp-ws-item--active' : ''}`}
              style={{ '--ws-color': color }}
              onClick={() => onWorkspaceFilter(active ? null : name)}
            >
              <span className="lp-ws-dot" style={{ background: color }} />
              <span className="lp-ws-name">{name}</span>
              {count > 0 && (
                <span className="lp-ws-count" style={{ color: color + '88' }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Threads ────────────────────────────────────────── */}
      <div className="cc-panel-header lp-threads-header">
        Threads
        {workspaceFilter && (
          <button
            className="lp-filter-clear"
            onClick={() => onWorkspaceFilter(null)}
          >
            clear filter
          </button>
        )}
      </div>

      <div className="cc-panel-body">
        {sorted.length === 0 && (
          <div className="lp-empty">
            {workspaceFilter
              ? `No threads in ${workspaceFilter}`
              : 'No threads yet. Start a conversation.'}
          </div>
        )}

        {sorted.map((thread) => {
          const isActive = thread.id === activeThreadId;
          const color    = thread.color || WORKSPACE_COLORS[thread.workspace] || '#C9A84C';
          const linked   = thread.linkedTo?.length ?? 0;

          return (
            <div
              key={thread.id}
              className={`lp-thread ${isActive ? 'lp-thread--active' : ''}`}
              style={{ borderLeftColor: isActive ? color : 'transparent' }}
              onClick={() => onSelectThread(thread.id)}
            >
              <div className="lp-thread-top">
                <span
                  className="lp-thread-dot"
                  style={{
                    background: color,
                    boxShadow: isActive ? `0 0 6px ${color}` : 'none',
                  }}
                />
                <span className="lp-thread-title">{thread.title}</span>
                <button
                  className="lp-thread-delete"
                  onClick={(e) => { e.stopPropagation(); handleDelete(thread.id); }}
                  title={confirmDelete === thread.id ? 'Click again to confirm' : 'Delete thread'}
                >
                  {confirmDelete === thread.id ? '!' : '×'}
                </button>
              </div>

              <div className="lp-thread-meta">
                {thread.workspace && (
                  <span
                    className="lp-thread-ws"
                    style={{ color: color + '77' }}
                  >
                    {thread.workspace}
                  </span>
                )}
                {linked > 0 && (
                  <span className="lp-thread-links">
                    {linked} link{linked !== 1 ? 's' : ''}
                  </span>
                )}
                <span className="lp-thread-age">{timeAgo(thread.lastActive)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
