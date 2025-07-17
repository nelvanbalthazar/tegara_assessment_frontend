import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addJob, selectJobsLoading, selectJobsError } from '../store/slices/jobSlice';
import { useNavigate } from 'react-router-dom';
import './CreateJobPage.css';
import MainLayout from '../components/MainLayout';

const CreateJobPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectJobsLoading);
  const error = useAppSelector(selectJobsError);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(addJob({
      title,
      company,
      location,
      description,
    }));

    navigate('/jobs');
  };

  return (
    <MainLayout>
    <div className="create-job-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit} className="create-job-form">
        <label>
          Title
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
        </label>

        <label>
          Company
          <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
        </label>

        <label>
          Location
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
        </label>

        <label>
          Description
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Job'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </MainLayout>
  );
};

export default CreateJobPage;
