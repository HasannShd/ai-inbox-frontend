import React, { useEffect, useState } from 'react';
import '../App.css'

const EMPTY = {
  status: 'open',
  contact: { name: '', email: '', phone: '' },
  channel: 'unknown',
  language: 'en',
  intent: '',
  priority: 'low',
  entities: [],
  message_raw: '',
  reply_suggestion: ''
};

const TicketForm = ({ value = EMPTY, onChange, onSubmit, submitting }) => {
  // normalize a value to always include required sub-objects
  const normalize = (v) => ({
    ...EMPTY,
    ...(v || {}),
    contact: { ...EMPTY.contact, ...((v && v.contact) || {}) },
    entities: (v && Array.isArray(v.entities) ? v.entities : []),
  });

  // state
  const [form, setForm] = useState(normalize(value));

  // sync external value
  useEffect(() => setForm(normalize(value)), [value]);

  // helpers
  const setField = (path, v) => {
    const next = structuredClone(form);
    if (path.startsWith('contact.')) {
      // ensure contact object exists
      next.contact = next.contact || { ...EMPTY.contact };
      next.contact[path.split('.')[1]] = v;
    } else {
      next[path] = v;
    }
    setForm(next);
    onChange?.(next);
  };

  const addEntity = () => {
    const next = { ...form, entities: [...(form.entities || []), { type: '', value: '' }] };
    setForm(next); onChange?.(next);
  };

  const editEntity = (i, key, v) => {
    const ents = (form.entities || []).map((e, idx) => (idx === i ? { ...e, [key]: v } : e));
    const next = { ...form, entities: ents };
    setForm(next); onChange?.(next);
  };

  const removeEntity = (i) => {
    const ents = (form.entities || []).filter((_, idx) => idx !== i);
    const next = { ...form, entities: ents };
    setForm(next); onChange?.(next);
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="tf-grid">
        <div className="tf-field">
          <label>Contact name</label>
          <input value={form.contact?.name || ''} onChange={e => setField('contact.name', e.target.value)} />
        </div>
        <div className="tf-field">
          <label>Email</label>
          <input type="email" value={form.contact?.email || ''} onChange={e => setField('contact.email', e.target.value)} />
        </div>
        <div className="tf-field">
          <label>Phone</label>
          <input value={form.contact?.phone || ''} onChange={e => setField('contact.phone', e.target.value)} />
        </div>
        <div className="tf-field">
          <label>Channel</label>
          <select value={form.channel} onChange={e => setField('channel', e.target.value)}>
            <option>email</option><option>whatsapp</option><option>sms</option><option>chat</option><option>unknown</option>
          </select>
        </div>
        <div className="tf-field">
          <label>Language</label>
          <input value={form.language} onChange={e => setField('language', e.target.value)} />
        </div>
        <div className="tf-field">
          <label>Intent</label>
          <input value={form.intent} onChange={e => setField('intent', e.target.value)} />
        </div>
        <div className="tf-field">
          <label>Priority</label>
          <select value={form.priority} onChange={e => setField('priority', e.target.value)}>
            <option>low</option><option>medium</option><option>high</option>
          </select>
        </div>
      </div>

      <div className="tf-entities">
        <div className="tf-row">
          <h4>Entities</h4>
          <button type="button" className="btn ghost" onClick={addEntity}>+ Add</button>
        </div>
        {(form.entities?.length || 0) === 0 && <div className="muted">No entities yet.</div>}
        {form.entities?.map((e, i) => (
          <div key={i} className="tf-grid">
            <input placeholder="type (e.g. date)" value={e.type} onChange={ev => editEntity(i, 'type', ev.target.value)} />
            <div className="tf-row">
              <input placeholder="value" value={e.value} onChange={ev => editEntity(i, 'value', ev.target.value)} />
              <button type="button" className="btn danger" onClick={() => removeEntity(i)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="tf-field">
        <label>Original message (read-only)</label>
        <textarea rows={5} readOnly value={form.message_raw || ''} />
      </div>

      <div className="tf-field">
        <label>Reply draft</label>
        <textarea rows={5} value={form.reply_suggestion || ''} onChange={e => setField('reply_suggestion', e.target.value)} />
      </div>

      <div className="tf-row end">
        <button className="btn" disabled={!!submitting}>{submitting ? 'Saving…' : 'Save Ticket'}</button>
      </div>
    </form>
  );
};

export default TicketForm;
