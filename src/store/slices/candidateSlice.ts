import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import api from '../../api';

// Candidate type
export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  skills?: string;
  experience?: string;
  education?: string;
}

// State interface
interface CandidateState {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  candidates: [],
  loading: false,
  error: null,
};

// Fetch all candidates
export const fetchCandidates = createAsyncThunk<Candidate[]>(
  'candidates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/candidates',  {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Candidate[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch candidates');
    }
  }
);

// Add new candidate
export const addCandidate = createAsyncThunk<Candidate, Partial<Candidate>>(
  'candidates/add',
  async (candidate, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log(candidate);
      const res = await api.post('/api/candidates', candidate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Candidate;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add candidate');
    }
  }
);

// Delete candidate
export const deleteCandidate = createAsyncThunk<string, string>(
  'candidates/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/api/candidates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete candidate');
    }
  }
);

// Slice
const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCandidates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Candidate[]>) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCandidate.fulfilled, (state, action: PayloadAction<Candidate>) => {
        state.candidates.push(action.payload);
      })

      .addCase(deleteCandidate.fulfilled, (state, action: PayloadAction<string>) => {
        state.candidates = state.candidates.filter(c => c.id !== action.payload);
      });
  },
});

// Selector
export const selectCandidates = (state: RootState) => state.candidates.candidates;
export const selectCandidatesLoading = (state: RootState) => state.candidates.loading;
export const selectCandidatesError = (state: RootState) => state.candidates.error;


export default candidateSlice.reducer;
