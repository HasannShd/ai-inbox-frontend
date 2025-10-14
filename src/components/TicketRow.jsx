import React from 'react';
import '../App.css';

const TicketRow = ({ t, onView, onEdit, onDelete }) => {
  return (
    <tr className="ticket-row">
      <td>{new Date(t.createdAt).toLocaleString()}</td>
      <td>{t.intent || '—'}</td>
      <td><span className={`pill ${t.priority}`}>{t.priority}</span></td>
      <td>{t.language}</td>
      <td>{t.status}</td>
      <td>{t.contact?.email || t.contact?.phone || '—'}</td>
      <td className="row gap">
        <button className="btn tiny" onClick={() => onView(t)}>View</button>
        <button className="btn ghost tiny" onClick={() => onEdit(t)}>Edit</button>
        <button className="btn danger tiny" onClick={() => onDelete(t)}>Delete</button>
      </td>
    </tr>
  );
};

export default TicketRow;
