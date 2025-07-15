import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import api from '../../api';

// Job type
export interface Job {
  id: string;
  title: string;
  description?: string;
  location?: string;
  experienceLevel?: string;
  skillsRequired?: string[];
  createdAt?: string;
}

// State interface
interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

// Fetch all jobs
export const fetchJobs = createAsyncThunk<Job[]>(
  'jobs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/jobs');
      return res.data as Job[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

// Add a job
export const addJob = createAsyncThunk<Job, Partial<Job>>(
  'jobs/add',
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/jobs', jobData);
      return res.data as Job;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add job');
    }
  }
);

// Update a job
export const updateJob = createAsyncThunk<Job, { id: string; updates: Partial<Job> }>(
  'jobs/update',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/jobs/${id}`, updates);
      return res.data as Job;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update job');
    }
  }
);

// Delete a job
export const deleteJob = createAsyncThunk<string, string>(
  'jobs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/jobs/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete job');
    }
  }
);

// Slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJobs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobs.push(action.payload);
      })

      .addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.jobs = state.jobs.filter(j => j.id !== action.payload);
      });
  },
});

// Selector
export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectJobsLoading = (state: RootState) => state.jobs.loading;
export const selectJobsError = (state: RootState) => state.jobs.error;


export default jobSlice.reducer;
