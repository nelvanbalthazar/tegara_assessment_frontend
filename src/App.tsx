import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CandidatePage from './pages/CandidatePage';
import UploadPage from './pages/UploadPage';
import JobPage from './pages/JobPage';
import CreateUserPage from './pages/CreateUserPage';
import UserListPage from './pages/UserListPage';
import CreateJobPage from './pages/CreateJobPage';
import CreateCandidatePage from './pages/CreateCandidatePage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import './styles/App.css';

import { useAppSelector } from './store/hooks';
import { selectAuthToken } from './store/slices/authSlice';

const App: React.FC = () => {
  const token = useAppSelector(selectAuthToken);
  const isAuthenticated = !!token;

  return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={ 
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <VerifyOtpPage />} 
      />

      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/candidates/create" element={<CreateCandidatePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default App;
