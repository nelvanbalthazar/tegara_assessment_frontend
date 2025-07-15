import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CandidatePage from './pages/CandidatePage';
import UploadPage from './pages/UploadPage';
import JobPage from './pages/JobPage';
import CreateUserPage from './pages/CreateUserPage';
import './styles/App.css';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/jobs" element={<JobPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/users/create" element={<CreateUserPage />} />

        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default App;
