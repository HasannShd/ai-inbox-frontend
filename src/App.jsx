// App.jsx
import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Compose from './pages/Compose.jsx';
import Tickets from './pages/Tickets.jsx';
import './App.css';

const App = () => {
  return (
    <>
      <nav className="nav">
        <Link className="brand" to="/">AI Inbox</Link>
        <div className="spacer" />
        <NavLink to="/compose">Compose</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Compose />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="*" element={<div className="container"><h2>404</h2></div>} />
      </Routes>
    </>
  );
};

export default App;
