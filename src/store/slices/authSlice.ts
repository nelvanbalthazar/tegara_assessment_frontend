import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index'; // Adjust path if needed
import api from '../../api';
import {
  setAuthToken,
  clearAuthToken,
  getAuthToken,
} from '../../utils/auth';

// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Recruiter' | 'Viewer';
}

// Auth state interface
interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial state using auth.ts helper
const initialState: AuthState = {
  token: getAuthToken(),
  user: null,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk<
  { token: string },                                // Return type
  { email: string; password: string },              // Arg type
  { rejectValue: string }                           // Rejection type
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', credentials);
      const data = res.data as { token?: string };

      if (typeof data.token === 'string') {
        return { token: data.token };
      } else {
        return rejectWithValue('Unexpected response structure');
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Invalid email or password'
      );
    }
  }
);

// Fetch logged-in user's profile
export const fetchMe = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/users/me');
    return res.data as User;
  } catch (err: any) {
    return rejectWithValue('Failed to fetch user info');
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      clearAuthToken(); // ✅ Remove token on logout
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        state.token = action.payload.token;
        setAuthToken(action.payload.token); // ✅ Store token
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER
      .addCase(fetchMe.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export logout action
export const { logout } = authSlice.actions;

// Export selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

// Export reducer
export default authSlice.reducer;
