import React, { useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMatchScores, selectScores, selectScoresLoading, selectScoresError } from '../store/slices/matchSlice';
import Spinner from '../components/Shared/Spinner';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const scores = useAppSelector(selectScores);
  const loading = useAppSelector(selectScoresLoading);
  const error = useAppSelector(selectScoresError);

  useEffect(() => {
    dispatch(fetchMatchScores());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="dashboard-page">
        <h2>Candidate Match Scores</h2>

        {loading && <Spinner />}
        {error && <p className="error">{error}</p>}

        {!loading && scores.length === 0 && <p>No match scores found.</p>}

        {!loading && scores.length > 0 && (
          <table className="match-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job Title</th>
                <td>Company</td>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((match, index) => (
                <tr key={index}>
                  <td>{match.candidateName}</td>
                  <td>{match.jobTitle}</td>
                  <td>{match.company}</td>
                  <td>{match.score}</td> 
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
