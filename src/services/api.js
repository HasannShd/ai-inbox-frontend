// src/services/api.js
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function authHeaders(extra = {}) {
  const token = localStorage.getItem('token');
  return token
    ? { 'Authorization': `Bearer ${token}`, ...extra }
    : { ...extra };
}

/* ---------- AI ---------- */
export const aiExtract = async (message) => {
  try {
    const res = await fetch(`${BASE}/api/ai/extract`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error in aiExtract:', err);
    throw err;
  }
};

/* ---------- TICKETS ---------- */
export const listTickets = async (params = {}) => {
  try {
    // drop empty params so the URL is clean
    const entries = Object.entries(params).filter(([, v]) => v !== '' && v != null);
    const qs = new URLSearchParams(Object.fromEntries(entries)).toString();

    const res = await fetch(`${BASE}/api/tickets${qs ? `?${qs}` : ''}`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json(); // { items, count }
  } catch (err) {
    console.error('Error in listTickets:', err);
    throw err;
  }
};

export const getTicket = async (ticketId) => {
  try {
    const res = await fetch(`${BASE}/api/tickets/${ticketId}`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error in getTicket:', err);
    throw err;
  }
};

export const createTicket = async (payload) => {
  try {
    const res = await fetch(`${BASE}/api/tickets`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error in createTicket:', err);
    throw err;
  }
};

export const updateTicket = async (ticketId, patch) => {
  try {
    const res = await fetch(`${BASE}/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(patch)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error in updateTicket:', err);
    throw err;
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    const res = await fetch(`${BASE}/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json(); // { ok: true }
  } catch (err) {
    console.error('Error in deleteTicket:', err);
    throw err;
  }
};
