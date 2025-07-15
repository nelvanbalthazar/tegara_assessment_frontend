import React from 'react';
import MainLayout from '../components/MainLayout';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/slices/authSlice';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <MainLayout>
      <div className="dashboard-content">
        <h1>Welcome, {user?.name || 'User'} 👋</h1>
        <p>Your role: <strong>{user?.role || 'Unknown'}</strong></p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Candidates</h3>
            <p>View uploaded profiles and data</p>
          </div>

          <div className="dashboard-card">
            <h3>Jobs</h3>
            <p>Manage open job positions</p>
          </div>

          <div className="dashboard-card">
            <h3>Upload CVs</h3>
            <p>Start screening candidates</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
