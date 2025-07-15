import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createUser } from '../store/slices/authSlice';
import Spinner from '../components/Shared/Spinner';
import './CreateUserPage.css';

const CreateUserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);
  const error = useAppSelector(state => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('recruiter');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const result = await dispatch(createUser({ email, password, role }));

    if (createUser.fulfilled.match(result)) {
      setEmail('');
      setPassword('');
      setRole('recruiter');
      setSuccess(true);
    }
  };

  return (
    <MainLayout>
      <div className="create-user-page">
        <h1>Create New User</h1>

        <form onSubmit={handleSubmit} className="create-user-form">
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <label>
            Role
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>

          {loading && <Spinner />}
          {success && <p className="success-msg">✅ User created successfully!</p>}
          {error && <p className="error-msg">❌ {error}</p>}
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateUserPage;
