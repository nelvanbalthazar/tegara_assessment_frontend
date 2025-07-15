import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/slices/authSlice';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const user = useAppSelector(selectUser);

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

        {user?.role === 'admin' && (
          <NavLink to="/users/create" className="sidebar-link">
            ➕ Create User
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
