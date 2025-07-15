import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  uploadCV,
  selectCVsLoading,
  selectCVsError,
} from '../store/slices/cvSlice';
import Spinner from '../components/Shared/Spinner';
import './UploadPage.css';

const UploadPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCVsLoading);
  const error = useAppSelector(selectCVsError);

  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('cv', file);

    setSuccess(false);
    const result = await dispatch(uploadCV(formData));

    if (uploadCV.fulfilled.match(result)) {
      setSuccess(true);
      setFile(null); // Clear the input
    }
  };

  return (
    <MainLayout>
      <div className="upload-page">
        <h1>Upload CV</h1>

        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />

          <button type="submit" disabled={!file || loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {loading && <Spinner />}
        {success && <p className="success">CV uploaded successfully!</p>}
        {error && <p className="error"> Error: {error}</p>}
      </div>
    </MainLayout>
  );
};

export default UploadPage;
