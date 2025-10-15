import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { listTickets, updateTicket, deleteTicket } from '../services/api.js';
import TicketRow from '../components/TicketRow.jsx';
import TicketForm from '../components/TicketForm.jsx';

const Tickets = () => {
  // state
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [editing, setEditing] = useState(null);

  // a11y focus management
  const lastFocusRef = useRef(null);   // element that opened the modal
  const closeBtnRef  = useRef(null);   // Close button inside the modal

  // load
  const load = async () => {
    setErr(''); setLoading(true);
    try {
      const { items } = await listTickets({ q, status, priority, language });
      setItems(items);
    } catch (e) {
      setErr(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* initial */ }, []);

  // handlers
  const onSearch = (e) => { e.preventDefault(); load(); };

  const onSaveEdit = async (t) => {
    try {
      await updateTicket(t.id, t);
      setEditing(null);
      load();
      alert('Updated ✅');
    } catch (e) {
      alert(e.message || 'Update failed');
    }
  };

  const onDeleteRow = async (t) => {
    if (!confirm('Delete ticket?')) return;
    try {
      await deleteTicket(t.id);
      load();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  // open/close with focus management
  const openEdit = (t) => {
    // remember which control opened the modal (usually the Edit button)
    lastFocusRef.current = document.activeElement;
    setEditing(t);
  };

  const closeEdit = () => {
    setEditing(null);
    // return focus to the opener
    // timeout ensures DOM has updated
    setTimeout(() => lastFocusRef.current?.focus?.(), 0);
  };

  // Close on ESC when modal is open
  useEffect(() => {
    if (!editing) return; // only listen when open
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeEdit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editing]);

  // Focus the Close button when modal opens
  useEffect(() => {
    if (editing) {
      closeBtnRef.current?.focus?.();
    }
  }, [editing]);

  // render
  return (
    <div className="tickets">
      <div className="container">
        <h1>Tickets</h1>

        <form className="filters" onSubmit={onSearch}>
          <input placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All status</option>
            <option>open</option><option>closed</option>
          </select>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">All priority</option>
            <option>low</option><option>medium</option><option>high</option>
          </select>
          <input placeholder="Language (e.g. en, ar)" value={language} onChange={e => setLanguage(e.target.value)} />
          <button className="btn" type="submit">Apply</button>
        </form>

        {err && <div className="error" role="alert">{err}</div>}
        {loading && <div className="muted">Loading…</div>}

        {!loading && (
          <table className="table">
            <thead>
              <tr>
                <th>Created</th><th>Intent</th><th>Priority</th><th>Lang</th><th>Status</th><th>Contact</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(t => (
                <TicketRow
                  key={t.id}
                  t={t}
                  onView={openEdit}     // you can keep onView unused or wire a View modal later
                  onEdit={openEdit}     // use the open handler so we capture focus
                  onDelete={onDeleteRow}
                />
              ))}
              {items.length === 0 && <tr><td colSpan="7" className="muted">No tickets found.</td></tr>}
            </tbody>
          </table>
        )}

        {editing && (
          <div className="modal" role="dialog" aria-modal="true" aria-label="Edit ticket">
            <div className="modal-card" tabIndex={-1}>
              <div className="row end">
                <button ref={closeBtnRef} className="btn ghost tiny" onClick={closeEdit}>Close</button>
              </div>
              <h3>Edit ticket</h3>
              <TicketForm value={editing} onChange={setEditing} onSubmit={onSaveEdit} showStatus />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
