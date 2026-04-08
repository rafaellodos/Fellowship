import React from 'react';
import { WORKSPACES, STATUS_DISPLAY } from '../lib/workspaces';
import { AGENTS } from '../lib/agents';

const PROJECT_STATUS_COLORS = {
  ACTIVE: '#C9A84C',
  PLANNING: '#5DADE2',
  COMPLETE: '#2ECC71',
  HELD: '#E74C3C',
};

export default function WorkspacesPanel({ selected, onSelect }) {
  return (
    <div className="cc-panel cc-panel-left">
      <div className="cc-panel-header">Workspaces</div>

      <div className="cc-panel-body">
        {Object.entries(WORKSPACES).map(([name, ws]) => {
          const statusMeta = STATUS_DISPLAY[ws.statusType];
          const isOpen = selected === name;

          return (
            <div key={name} className={`ws-item ${isOpen ? 'ws-item--open' : ''}`}>
              <button
                className="ws-item-trigger"
                onClick={() => onSelect(name, ws)}
                aria-expanded={isOpen}
              >
                <span className="ws-item-name">{name}</span>
                <span
                  className="ws-item-status"
                  style={{ color: statusMeta.color }}
                >
                  {statusMeta.label}
                </span>
              </button>

              {isOpen && (
                <div className="ws-detail">
                  <div className="ws-detail-row">
                    <span className="ws-detail-label">Focus</span>
                    <span className="ws-detail-text">{ws.focus}</span>
                  </div>

                  <div className="ws-detail-row">
                    <span className="ws-detail-label">Context</span>
                    <span className="ws-detail-text ws-detail-text--muted">
                      {ws.context}
                    </span>
                  </div>

                  {ws.projects.length > 0 && (
                    <div className="ws-detail-row">
                      <span className="ws-detail-label">Projects</span>
                      <div className="ws-projects">
                        {ws.projects.map((p) => (
                          <div key={p.name} className="ws-project">
                            <span
                              className="ws-project-status-dot"
                              style={{
                                background:
                                  PROJECT_STATUS_COLORS[p.status] ||
                                  '#C9A84C',
                              }}
                            />
                            <span className="ws-project-name">{p.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="ws-detail-row">
                    <span className="ws-detail-label">Agents</span>
                    <div className="ws-agents">
                      {ws.agents.map((key) => {
                        const agent = AGENTS[key];
                        if (!agent) return null;
                        return (
                          <span
                            key={key}
                            className="ws-agent-pill"
                            style={{
                              color: agent.color,
                              borderColor: agent.color + '35',
                              background: agent.color + '12',
                            }}
                          >
                            {agent.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
