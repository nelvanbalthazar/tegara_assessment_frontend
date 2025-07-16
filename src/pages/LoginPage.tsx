import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  login,
  selectAuthToken,
  selectAuthError,
  selectAuthLoading,
} from '../store/slices/authSlice';
import Spinner from '../components/Shared/Spinner';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const token = useAppSelector(selectAuthToken);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

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
