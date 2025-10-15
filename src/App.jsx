import { BrowserRouter, NavLink, Routes, Route, Navigate } from "react-router-dom";
import Compose from "./pages/Compose.jsx";
import Tickets from "./pages/Tickets.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">AI Inbox</div>
          <nav className="nav">
            <NavLink to="/compose" className={({ isActive }) => (isActive ? "active" : "")}>
              Compose
            </NavLink>
            <NavLink to="/tickets" className={({ isActive }) => (isActive ? "active" : "")}>
              Tickets
            </NavLink>
          </nav>
        </header>

        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Navigate to="/compose" replace />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/tickets" element={<Tickets />} />
            {/* 404 */}
            <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
