import { AGENT_LIST } from '../lib/agents';

export default function AgentsPanel({ activeAgents, onChat, onDisengage }) {
  return (
    <div className="cc-panel cc-panel-right">
      <div className="cc-panel-header">The Fellowship</div>

      <div className="cc-panel-body">
        <div className="agent-grid">
          {AGENT_LIST.map(({ key, name, role, color, version }) => {
            const engaged = activeAgents.has(key);
            const isGandalf = key === 'gandalf';

            return (
              <div
                key={key}
                className={`agent-card ${engaged ? 'agent-card--engaged' : ''}`}
                style={{
                  '--agent-color': color,
                  borderColor: engaged ? color + '55' : color + '1a',
                  background: engaged ? color + '0d' : 'transparent',
                }}
              >
                {/* Status dot + version */}
                <div className="agent-card-dot-row">
                  <div
                    className={`agent-card-dot ${engaged ? 'agent-card-dot--pulse' : ''}`}
                    style={{
                      background: color,
                      boxShadow: engaged ? `0 0 8px ${color}88` : 'none',
                    }}
                  />
                  <span className="agent-card-version" style={{ color: color + '66' }}>
                    v{version}
                  </span>
                </div>

                {/* Name + role */}
                <div
                  className="agent-card-name"
                  style={{ color: engaged ? color : 'rgba(234,234,234,0.75)' }}
                >
                  {name}
                </div>
                <div className="agent-card-role">{role}</div>

                {/* Buttons */}
                <div className="agent-card-btns">
                  <button
                    className="agent-card-btn agent-card-btn--chat"
                    style={{
                      color: color,
                      borderColor: color + '44',
                      background: color + '10',
                    }}
                    onClick={() => onChat(key)}
                  >
                    Chat
                  </button>

                  {!isGandalf && (
                    <button
                      className="agent-card-btn agent-card-btn--toggle"
                      style={{
                        color: engaged ? color : 'rgba(234,234,234,0.25)',
                        borderColor: engaged
                          ? color + '44'
                          : 'rgba(234,234,234,0.08)',
                      }}
                      onClick={() =>
                        engaged ? onDisengage(key) : onChat(key)
                      }
                    >
                      {engaged ? '●' : '○'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
