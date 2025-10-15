import React from "react";

export default function TicketRow({ t, onView, onEdit, onDelete }) {
  return (
    <tr>
      <td>{t.createdAt || t.created_at || "-"}</td>
      <td>{t.intent || "-"}</td>
      <td>{t.priority || "-"}</td>
      <td>{t.language || t.lang || "-"}</td>
      <td>{t.status || "-"}</td>
      <td>{t.contact?.name || t.name || "-"}</td>
      <td>
        <div className="actions">
          <button className="btn" onClick={() => onEdit?.(t)}>Edit</button>
          <button className="btn danger" onClick={() => onDelete?.(t)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}
