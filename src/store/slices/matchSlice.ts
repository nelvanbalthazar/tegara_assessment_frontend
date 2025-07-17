import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import type { RootState } from '../index';

export interface MatchScore {
  candidateId: number;
  jobId: number;
  score: number;
  candidateName: string;
  company: string;
  jobTitle: string;
}

interface MatchState {
  scores: MatchScore[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchState = {
  scores: [],
  loading: false,
  error: null,
};

export const fetchMatchScores = createAsyncThunk<MatchScore[]>(
  'match/fetchScores',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/match/score', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as MatchScore[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch scores');
    }
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMatchScores.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchScores.fulfilled, (state, action) => {
        state.loading = false;
        state.scores = action.payload;
      })
      .addCase(fetchMatchScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default matchSlice.reducer;

// Selectors
export const selectScores = (state: RootState) => state.match.scores;
export const selectScoresLoading = (state: RootState) => state.match.loading;
export const selectScoresError = (state: RootState) => state.match.error;
