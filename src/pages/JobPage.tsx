import React, { useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchJobs,
  selectJobs,
  selectJobsLoading,
  selectJobsError,
} from '../store/slices/jobSlice';
import Spinner from '../components/Shared/Spinner'; // ✅ Import Spinner
import './JobPage.css';

const JobPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectJobs);
  const loading = useAppSelector(selectJobsLoading);
  const error = useAppSelector(selectJobsError);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="job-page">
        <h1>Job Openings</h1>

        {loading && <Spinner />} {/* Show spinner while loading */}

        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && (
          <div className="job-list">
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description || 'No description provided.'}</p>
                {job.location && <p><strong>Location:</strong> {job.location}</p>}
                {job.experienceLevel && (
                  <p><strong>Level:</strong> {job.experienceLevel}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default JobPage;
