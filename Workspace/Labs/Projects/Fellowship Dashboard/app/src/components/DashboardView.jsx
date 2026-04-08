import React, { useState, useEffect } from 'react';
import { StorageAPI } from '../lib/storage';
import { AGENT_LIST, STATUS_COLORS } from '../lib/agents';
import { COPY } from '../lib/copy';

export default function DashboardView() {
  const [projects, setProjects] = useState({});
  const [pulse, setPulse] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [showEvolution, setShowEvolution] = useState(false);
  const c = COPY.dashboard;

  const loadData = () => {
    const p = StorageAPI.get('projects') || {};
    const pu = StorageAPI.get('pulse');
    const ev = StorageAPI.get('evolution') || [];
    setProjects(p);
    setPulse(pu);
    setEvolution(ev);
  };

  useEffect(() => {
    loadData();
  }, []);

  const projectList = Object.values(projects);
  const storageSize = StorageAPI.getSize();
  const storagePct = Math.min((storageSize / (4 * 1024 * 1024)) * 100, 100);

  const isRecentlyActive = (dateStr) => {
    try {
      const d = new Date(dateStr);
      const now = new Date();
      const diff = now - d;
      return diff < 7 * 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      className="view-enter"
      id="panel-dashboard"
      role="tabpanel"
      aria-labelledby="tab-dashboard"
    >
      <div className="section-header" style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {c.projectsTitle}
          </h1>
          <div className="storage-indicator">
            <span>{c.storageLabel}:</span>
            <div className="storage-bar">
              <div
                className="storage-bar-fill"
                style={{ width: `${storagePct}%` }}
              />
            </div>
            <span>{formatBytes(storageSize)}</span>
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" id="dashboard-refresh-btn" onClick={loadData}>
          {c.refreshBtn}
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Main — projects */}
        <div className="dashboard-main">
          {projectList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◇</div>
              <p>{c.emptyState}</p>
            </div>
          ) : (
            <div className="project-grid">
              {projectList.map((project) => (
                <div
                  key={project.name}
                  className="card project-card"
                  id={`project-${project.name}`}
                >
                  <div className="project-card-header">
                    <span className="project-card-name">{project.name}</span>
                    <span
                      className="badge badge-status"
                      style={{
                        background:
                          STATUS_COLORS[project.status] || STATUS_COLORS.PLANNING,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="project-card-summary">
                    {project.summary ||
                      project.brief?.what?.substring(0, 100) ||
                      'No summary available.'}
                  </p>
                  <div className="project-card-meta">
                    {project.type?.map((t) => (
                      <span
                        key={t}
                        className="badge"
                        style={{
                          background: 'var(--gold-glow)',
                          color: 'var(--gold)',
                          border: '1px solid var(--border-medium)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-card-meta">
                    {project.agents_assigned?.map((agent) => {
                      const agentData = AGENT_LIST.find(
                        (a) => a.name === agent
                      );
                      return (
                        <span
                          key={agent}
                          className="badge badge-agent"
                          style={{
                            background: agentData?.color || 'var(--text-muted)',
                          }}
                        >
                          {agent}
                        </span>
                      );
                    })}
                  </div>
                  <div className="project-card-date">
                    Updated: {formatDate(project.last_updated || project.created)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pulse */}
          <div>
            <div className="section-header">
              <span className="section-title">{c.pulseTitle}</span>
            </div>
            <div className="card">
              {pulse ? (
                <div className="pulse-content">{pulse.content || pulse.summary || JSON.stringify(pulse)}</div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {c.pulseEmpty}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar — agents + evolution */}
        <div className="dashboard-sidebar">
          <div>
            <div className="section-header">
              <span className="section-title">{c.agentsTitle}</span>
            </div>
            <div className="card" style={{ padding: 'var(--space-sm) 0' }}>
              <div className="agent-list">
                {AGENT_LIST.map((agent) => (
                  <div key={agent.name} className="agent-row">
                    <div
                      className={`agent-dot${
                        isRecentlyActive(agent.lastDeployed) ? ' active' : ''
                      }`}
                      style={{
                        background: isRecentlyActive(agent.lastDeployed)
                          ? agent.color
                          : 'var(--text-muted)',
                        color: agent.color,
                      }}
                    />
                    <span className="agent-name">{agent.name}</span>
                    <span className="agent-role">{agent.role}</span>
                    <span className="agent-version">
                      {c.version}
                      {agent.version}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="section-header">
              <span className="section-title">{c.evolutionTitle}</span>
              {evolution.length > 0 && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowEvolution(!showEvolution)}
                >
                  {showEvolution ? 'Hide' : 'Show'}
                </button>
              )}
            </div>
            {showEvolution && evolution.length > 0 ? (
              <div className="card">
                <div className="evolution-list">
                  {evolution
                    .slice()
                    .reverse()
                    .map((entry, i) => (
                      <div key={i} className="evolution-entry">
                        <div className="evolution-date">
                          {formatDate(entry.date)}
                        </div>
                        <div>{entry.description || entry}</div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="card">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {evolution.length === 0
                    ? c.noEvolution
                    : `${evolution.length} entries recorded.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
