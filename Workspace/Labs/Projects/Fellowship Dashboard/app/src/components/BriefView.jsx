import React, { useState, useEffect, useRef } from 'react';
import { StorageAPI } from '../lib/storage';
import { PROJECT_TYPES } from '../lib/agents';
import { COPY } from '../lib/copy';

const REQUIRED = COPY.brief.requiredFields;
const DRAFT_KEY = 'settings:draft_brief';

function generateProjectName(what) {
  if (!what) return '';
  return what
    .split(/\s+/)
    .slice(0, 5)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
}

export default function BriefView({ onNavigate }) {
  const [form, setForm] = useState({
    what: '',
    why: '',
    context: '',
    constraints: '',
    success: '',
    types: [],
  });
  const [projectName, setProjectName] = useState('');
  const [nameEdited, setNameEdited] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [draftVisible, setDraftVisible] = useState(false);
  const draftTimer = useRef(null);
  const autoSaveTimer = useRef(null);
  const c = COPY.brief;

  // Load draft on mount
  useEffect(() => {
    const draft = StorageAPI.get(DRAFT_KEY);
    if (draft) {
      setForm(draft.form || form);
      setProjectName(draft.projectName || '');
      setNameEdited(draft.nameEdited || false);
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    autoSaveTimer.current = setInterval(() => {
      const hasContent = Object.values(form).some(
        (v) => (typeof v === 'string' && v.trim()) || (Array.isArray(v) && v.length > 0)
      );
      if (hasContent) {
        StorageAPI.set(DRAFT_KEY, { form, projectName, nameEdited });
        setDraftVisible(true);
        setTimeout(() => setDraftVisible(false), 2000);
      }
    }, 30000);

    return () => clearInterval(autoSaveTimer.current);
  }, [form, projectName, nameEdited]);

  // Auto-generate project name
  useEffect(() => {
    if (!nameEdited) {
      setProjectName(generateProjectName(form.what));
    }
  }, [form.what, nameEdited]);

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeToggle = (type) => {
    setForm((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const missingFields = REQUIRED.filter((f) => !form[f]?.trim());
  const isValid = missingFields.length === 0;

  const handleSubmit = () => {
    if (!isValid) return;

    const name = projectName || generateProjectName(form.what) || 'untitled-project';

    const projectRecord = {
      name,
      created: new Date().toISOString(),
      status: 'PLANNING',
      type: form.types,
      brief: {
        what: form.what,
        why: form.why,
        context: form.context,
        constraints: form.constraints,
        success_criteria: form.success,
        type_signals: form.types,
      },
      agents_assigned: ['Gandalf'],
      last_updated: new Date().toISOString(),
      summary: form.what.substring(0, 100),
      log: [`${new Date().toISOString()} — Brief submitted.`],
    };

    // Save to projects
    const existing = StorageAPI.get('projects') || {};
    existing[name] = projectRecord;
    StorageAPI.set('projects', existing);

    // Clear draft
    StorageAPI.remove(DRAFT_KEY);

    setSubmittedName(name);
    setSubmitted(true);
  };

  const handleClear = () => {
    if (window.confirm(c.clearConfirm)) {
      setForm({
        what: '',
        why: '',
        context: '',
        constraints: '',
        success: '',
        types: [],
      });
      setProjectName('');
      setNameEdited(false);
      StorageAPI.remove(DRAFT_KEY);
    }
  };

  if (submitted) {
    return (
      <div
        className="submission-success view-enter"
        id="panel-brief"
        role="tabpanel"
        aria-labelledby="tab-brief"
      >
        <h3>{c.submittedTitle}</h3>
        <p>{c.submittedBody}</p>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('chat')}
          >
            {c.openChatBtn}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('dashboard')}
          >
            {c.viewDashboardBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="brief-container view-enter"
      id="panel-brief"
      role="tabpanel"
      aria-labelledby="tab-brief"
    >
      <div className="brief-header">
        <h2>{c.title}</h2>
        <p>{c.subtitle}</p>
      </div>

      {/* Validation bar */}
      <div
        className={`validation-bar ${isValid ? 'ready' : 'incomplete'}`}
      >
        {isValid ? (
          <>✓ Brief ready for submission.</>
        ) : (
          <>
            {c.validationIncomplete} Missing:{' '}
            {missingFields.map((f) => c.fieldLabels[f]).join(', ')}.
          </>
        )}
      </div>

      {/* Project name */}
      <div className="form-group">
        <label className="form-label" htmlFor="brief-project-name">
          {c.projectNameLabel}
        </label>
        <input
          id="brief-project-name"
          type="text"
          className="form-input"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
            setNameEdited(true);
          }}
          placeholder="auto-generated"
        />
        {!nameEdited && (
          <div className="form-hint">{c.projectNameAuto}</div>
        )}
      </div>

      {/* Form fields */}
      {['what', 'why', 'context', 'constraints', 'success'].map((field) => (
        <div className="form-group" key={field}>
          <label
            className={`form-label${
              REQUIRED.includes(field) ? ' required' : ''
            }`}
            htmlFor={`brief-${field}`}
          >
            {c.fieldLabels[field]}
          </label>
          <textarea
            id={`brief-${field}`}
            className={`form-textarea${
              REQUIRED.includes(field) && !form[field]?.trim()
                ? ' invalid'
                : ''
            }`}
            value={form[field]}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            placeholder={c.fieldPlaceholders[field]}
            rows={field === 'what' ? 3 : 4}
          />
        </div>
      ))}

      {/* Type signals */}
      <div className="form-group">
        <label className="form-label">{c.fieldLabels.types}</label>
        <div className="checkbox-group">
          {PROJECT_TYPES.map((type) => (
            <label
              key={type}
              className={`checkbox-pill${
                form.types.includes(type) ? ' checked' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={form.types.includes(type)}
                onChange={() => handleTypeToggle(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="brief-actions">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!isValid}
          id="brief-submit-btn"
        >
          {c.submitBtn}
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleClear}>
          {c.clearBtn}
        </button>
        <span
          className={`draft-indicator${draftVisible ? ' visible' : ''}`}
        >
          {c.draftSaved}
        </span>
      </div>
    </div>
  );
}
