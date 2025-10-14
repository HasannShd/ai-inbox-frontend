import React, { useEffect, useState } from 'react';
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

        {err && <div className="error">{err}</div>}
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
                <TicketRow key={t.id} t={t}
                  onView={setEditing}
                  onEdit={setEditing}
                  onDelete={onDeleteRow}
                />
              ))}
              {items.length === 0 && <tr><td colSpan="7" className="muted">No tickets found.</td></tr>}
            </tbody>
          </table>
        )}

        {editing && (
          <div className="modal">
            <div className="modal-card">
              <div className="row end">
                <button className="btn ghost tiny" onClick={() => setEditing(null)}>Close</button>
              </div>
              <h3>Edit ticket</h3>
              <TicketForm value={editing} onChange={setEditing} onSubmit={onSaveEdit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
