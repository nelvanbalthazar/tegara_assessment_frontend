import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  uploadCV,
  selectCVsLoading,
  selectCVsError,
} from '../store/slices/cvSlice';
import { fetchCandidates, selectCandidates } from '../store/slices/candidateSlice';
import Spinner from '../components/Shared/Spinner';
import './UploadPage.css';

const UploadPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCVsLoading);
  const error = useAppSelector(selectCVsError);
  const candidates = useAppSelector(selectCandidates);

  const [file, setFile] = useState<File | null>(null);
  const [candidateId, setCandidateId] = useState<number | ''>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !candidateId) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('candidateId', String(candidateId));

    setSuccess(false);
    const result = await dispatch(uploadCV(formData));

    if (uploadCV.fulfilled.match(result)) {
      setSuccess(true);
      setFile(null);
      setCandidateId('');
    }
  };

  return (
    <MainLayout>
      <div className="upload-page">
        <h1>Upload CV</h1>

        <form onSubmit={handleSubmit} className="upload-form">
          <label>Select Candidate:</label>
          <select
            value={candidateId}
            onChange={e => setCandidateId(Number(e.target.value))}
            required
          >
            <option value="">-- Choose --</option>
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name || c.email}
              </option>
            ))}
          </select>

          <label>Choose CV file:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />

          <button type="submit" disabled={!file || !candidateId || loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {loading && <Spinner />}
        {success && <p className="success">CV uploaded successfully!</p>}
        {error && <p className="error"> {error}</p>}
      </div>
    </MainLayout>
  );
};

export default UploadPage;
