import React, { useState } from 'react';
import { COPY } from '../lib/copy';

export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const c = COPY.onboarding;

  const screens = [
    {
      title: c.screen1Title,
      body: c.screen1Body,
      actions: (
        <button className="btn btn-primary" onClick={() => setStep(1)}>
          {c.continueBtn}
        </button>
      ),
    },
    {
      title: c.screen2Title,
      body: c.screen2Body,
      actions: (
        <>
          <button
            className="btn btn-secondary"
            onClick={() => setStep(2)}
          >
            {c.skipBtn}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setStep(2)}
          >
            {c.continueBtn}
          </button>
        </>
      ),
      extra: (
        <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
          <input
            id="onboarding-api-key"
            type="password"
            className="form-input"
            placeholder={c.screen2Placeholder}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            autoComplete="off"
          />
        </div>
      ),
    },
    {
      title: c.screen3Title,
      body: c.screen3Body,
      actions: (
        <button
          className="btn btn-primary"
          onClick={() => onComplete(apiKey)}
        >
          {c.beginBtn}
        </button>
      ),
    },
  ];

  const current = screens[step];

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Welcome to the Fellowship">
      <div className="modal-content">
        <div className="modal-step-indicator">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`modal-step-dot${
                i === step ? ' active' : i < step ? ' completed' : ''
              }`}
            />
          ))}
        </div>
        <h2 className="modal-title">{current.title}</h2>
        <div className="modal-body">{current.body}</div>
        {current.extra}
        <div className="modal-actions">{current.actions}</div>
      </div>
    </div>
  );
}
