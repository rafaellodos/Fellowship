import React from 'react';
import { COPY } from '../lib/copy';

export default function NavBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'chat', label: COPY.tabs.chat },
    { id: 'dashboard', label: COPY.tabs.dashboard },
    { id: 'brief', label: COPY.tabs.brief },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-title">{COPY.appTitle}</span>
          <span className="navbar-subtitle">{COPY.appSubtitle}</span>
        </div>
        <div className="navbar-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`navbar-tab${activeTab === tab.id ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
