import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">CV Portal</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          📊 Dashboard
        </NavLink>
        <NavLink to="/candidates" className="sidebar-link">
          👥 Candidates
        </NavLink>
        <NavLink to="/jobs" className="sidebar-link">
          💼 Jobs
        </NavLink>
        <NavLink to="/upload" className="sidebar-link">
          📤 Upload CV
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
