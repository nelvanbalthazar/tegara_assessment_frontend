import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import api from '../../api';

// --- CV type ---
export interface CV {
  id: string;
  fileName: string;
  candidateId: string;
  uploadedAt: string;
  originalFileUrl?: string; // optional if you want to support download
  extractedText?: string;
  status?: 'processing' | 'completed' | 'error';
}

// --- Slice state ---
interface CVState {
  cvs: CV[];
  loading: boolean;
  error: string | null;
}

const initialState: CVState = {
  cvs: [],
  loading: false,
  error: null,
};

// --- Fetch uploaded CVs ---
export const fetchCVs = createAsyncThunk<CV[]>(
  'cv/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/cv');
      return res.data as CV[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch CVs');
    }
  }
);

// --- Upload a new CV ---
export const uploadCV = createAsyncThunk<CV, FormData>(
  'cv/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/cv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data as CV;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to upload CV');
    }
  }
);

// --- Delete a CV ---
export const deleteCV = createAsyncThunk<string, string>(
  'cv/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/cv/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete CV');
    }
  }
);

// --- Slice ---
const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCVs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCVs.fulfilled, (state, action: PayloadAction<CV[]>) => {
        state.loading = false;
        state.cvs = action.payload;
      })
      .addCase(fetchCVs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(uploadCV.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCV.fulfilled, (state, action: PayloadAction<CV>) => {
        state.loading = false;
        state.cvs.push(action.payload);
      })
      .addCase(uploadCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteCV.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCV.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.cvs = state.cvs.filter(cv => cv.id !== action.payload);
      })
      .addCase(deleteCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// --- Selectors ---
export const selectCVs = (state: RootState) => state.cv.cvs;
export const selectCVsLoading = (state: RootState) => state.cv.loading;
export const selectCVsError = (state: RootState) => state.cv.error;

export default cvSlice.reducer;
