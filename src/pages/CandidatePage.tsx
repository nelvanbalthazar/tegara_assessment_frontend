import React, { useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCandidates,
  selectCandidates,
  selectCandidatesLoading,
  selectCandidatesError,
} from '../store/slices/candidateSlice';
import Spinner from '../components/Shared/Spinner';
import './CandidatePage.css';

const CandidatesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const candidates = useAppSelector(selectCandidates);
  const loading = useAppSelector(selectCandidatesLoading);
  const error = useAppSelector(selectCandidatesError);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="candidates-page">
        <h1>Candidates</h1>

        {loading && <Spinner />}
        {error && <p className="error"> Error: {error}</p>}

        {!loading && !error && candidates.length === 0 && (
          <p>No candidates found.</p>
        )}

        <div className="candidate-list">
          {candidates.map(candidate => (
            <div key={candidate.id} className="candidate-card">
              <h3>{candidate.name}</h3>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Phone:</strong> {candidate.phone}</p>
              <p><strong>Experience:</strong> {candidate.experience || 'N/A'}</p>
              <p><strong>Skills:</strong> {candidate.skills?.join(', ') || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CandidatesPage;
