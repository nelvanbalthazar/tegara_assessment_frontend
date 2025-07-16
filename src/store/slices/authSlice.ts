import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index'; // Adjust path if needed
import api from '../../api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk<
  { token: string; user?: User },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<{ token: string; user?: User }>('/api/auth/login', credentials);
    const { token, user } = response.data;
    if (typeof token === 'string') {
      localStorage.setItem('token', token);
      return { token, user };
    } else {
      return rejectWithValue('Invalid login response');
    }
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Create user thunk
export const createUser = createAsyncThunk<
  { message: string },
  { email: string; password: string; role: string },
  { rejectValue: string }
>('auth/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<{ message: string }>('/api/auth/register', userData);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || 'Failed to create user'
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    // login
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); 
        state.user = action.payload.user ?? null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.error = action.payload || 'Login failed';
      });

    // create user
    builder
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'User creation failed';
      });
  },
});

// Actions
export const { logout } = authSlice.actions;

// Reducer
export default authSlice.reducer;

// Selectors
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
