// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  initiateLogin,
  selectAuthError,
  selectAuthLoading,
  selectOtpPendingEmail,
} from '../store/slices/authSlice';
import Spinner from '../components/Shared/Spinner';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const otpEmail = useAppSelector(selectOtpPendingEmail);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(initiateLogin({ email, password }))
      .unwrap()
      .then(() => navigate('/verify-otp'))
      .catch(() => {});
  };

  if (otpEmail) {
    return <Navigate to="/verify-otp" replace />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {loading && <Spinner />}
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
