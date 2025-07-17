// src/pages/VerifyOtpPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { verifyOtp, selectAuthLoading, selectAuthError } from '../store/slices/authSlice';
import Spinner from '../components/Shared/Spinner';
import './LoginPage.css';


const VerifyOtpPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const email = useAppSelector(state => state.auth.otpPendingEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
        console.error('Email is required');
        return;
    }
    dispatch(verifyOtp({ email, otp }))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch(() => {});
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Enter OTP</h2>
          <label>OTP Code</label>
          <input
            type="text"
            required
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          {loading && <Spinner />}
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
