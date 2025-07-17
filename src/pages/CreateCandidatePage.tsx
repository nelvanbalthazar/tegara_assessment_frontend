import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addCandidate,
  selectCandidatesLoading,
  selectCandidatesError,
} from '../store/slices/candidateSlice';
import Spinner from '../components/Shared/Spinner';
import './CreateCandidatePage.css';

const CreateCandidatePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCandidatesLoading);
  const error = useAppSelector(selectCandidatesError);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    education: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(addCandidate(formData));
  };

  // Clear form after successful submission
  useEffect(() => {
    if (!loading && submitted && !error) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        skills: '',
        experience: '',
        education: '',
      });
      setSubmitted(false);
    }
  }, [loading, error, submitted]);

  return (
    <MainLayout>
      <div className="create-candidate-page">
        <h2>Create New Candidate</h2>

        <form className="candidate-form" onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Candidate'}
          </button>
        </form>

        {loading && <Spinner />}
        {error && <p className="error">❗ {error}</p>}
      
      </div>
    </MainLayout>
  );
};

export default CreateCandidatePage;
