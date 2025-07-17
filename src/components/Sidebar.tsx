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

        {user?.role === 'RECRUITER' && (
          <NavLink to="/candidates" className="sidebar-link">
            👥 Candidates
          </NavLink>
        )}
        {user?.role === 'RECRUITER' && (
          <NavLink to="/candidates/create" className="sidebar-link">
          ➕ Add Candidate
          </NavLink>
        )}


        {user?.role === 'ADMIN' && (
          <NavLink to="/jobs" className="sidebar-link">
            💼 Jobs
          </NavLink>
        )}

        {user?.role === 'ADMIN' && (
          <NavLink to="/jobs/create" className="sidebar-link">
            📝Create Job
          </NavLink>
        )}

        {user?.role === 'RECRUITER' && (
          <NavLink to="/upload" className="sidebar-link">
            📤 Upload CV
          </NavLink>
        )}

        {user?.role === 'ADMIN' && (
          <NavLink to="/users/create" className="sidebar-link">
            ➕ Create User
          </NavLink>
          
        )}

        {user?.role === 'ADMIN' && (
          <NavLink to="/users" className="sidebar-link">
            🧑‍💻 User List
          </NavLink>
         
        )}
       </nav>
    </aside>
  );
};

export default Sidebar;
