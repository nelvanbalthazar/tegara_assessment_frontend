import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CandidatePage from './pages/CandidatePage';
import UploadPage from './pages/UploadPage';
import JobPage from './pages/JobPage';
import CreateUserPage from './pages/CreateUserPage';
import './styles/App.css';

import { useAppSelector } from './store/hooks';
import { selectAuthToken } from './store/slices/authSlice';

const App: React.FC = () => {
  const token = useAppSelector(selectAuthToken);
  const isAuthenticated = !!token;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default App;
