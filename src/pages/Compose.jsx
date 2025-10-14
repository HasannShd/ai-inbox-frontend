import React, { useState } from 'react';
import '../App.css';
import TicketForm from '../components/TicketForm.jsx';
import { aiExtract, createTicket } from '../services/api.js';

const Compose = () => {
  // state
  const [raw, setRaw] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  // actions
  const analyze = async () => {
    setErr('');
    if (!raw.trim()) return;
    setLoading(true);
    try {
      const data = await aiExtract(raw);
      data.message_raw = raw;           // ensure we keep the original paste
      setTicket(data);
    } catch (e) {
      setErr(e.message || 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  const save = async (t) => {
    setErr(''); setSaving(true);
    try {
      await createTicket(t);
      alert('Saved ✅');
    } catch (e) {
      setErr(e.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // render
  return (
    <div className="compose">
      <div className="container">
        <h1>Compose</h1>
        <p className="muted">Paste a raw message → Analyze → Edit → Save</p>

        <label>Raw message</label>
        <textarea
          className="compose-input"
          rows={6}
          placeholder="Paste email/WhatsApp/chat transcript…"
          value={raw}
          onChange={e => setRaw(e.target.value)}
        />

        <div className="compose-actions">
          <button className="btn" onClick={analyze} disabled={loading || !raw.trim()}>
            {loading ? 'Analyzing…' : 'Analyze'}
          </button>
        </div>

        {err && <div className="error">{err}</div>}

        {ticket && (
          <>
            <h2>Extracted Ticket</h2>
            <TicketForm value={ticket} onChange={setTicket} onSubmit={save} submitting={saving} />
          </>
        )}
      </div>
    </div>
  );
};

export default Compose;
