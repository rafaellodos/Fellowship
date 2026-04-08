import React, { useState } from 'react';
import { AGENTS } from '../lib/agents';

export default function AgentModal({ agentKey, onClose, onActivate }) {
  const agent = AGENTS[agentKey];
  const [copied, setCopied] = useState(false);

  if (!agent) return null;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(agent.prompt)
      .then(() => {
        setCopied(true);
        onActivate(agentKey);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        // Fallback: select text manually
        onActivate(agentKey);
      });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="agent-modal">
        {/* Header */}
        <div className="agent-modal-header">
          <div
            className="agent-modal-dot"
            style={{
              background: agent.color,
              boxShadow: `0 0 14px ${agent.color}66`,
            }}
          />
          <div>
            <div
              className="agent-modal-name"
              style={{ color: agent.color }}
            >
              {agent.name}
            </div>
            <div className="agent-modal-role">{agent.role}</div>
          </div>
        </div>

        {/* Description */}
        <p className="agent-modal-desc">{agent.desc}</p>

        {/* Prompt block */}
        <div className="agent-modal-prompt-label">
          System prompt — paste into Claude.ai to engage this agent
        </div>
        <div className="agent-modal-prompt">{agent.prompt}</div>

        {/* Actions */}
        <div className="agent-modal-actions">
          <button
            className="agent-modal-btn agent-modal-btn--primary"
            style={{
              color: agent.color,
              borderColor: agent.color + '55',
              background: agent.color + '12',
            }}
            onClick={handleCopy}
          >
            {copied ? 'Copied to clipboard' : 'Copy prompt + engage'}
          </button>
          <button
            className="agent-modal-btn agent-modal-btn--ghost"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
