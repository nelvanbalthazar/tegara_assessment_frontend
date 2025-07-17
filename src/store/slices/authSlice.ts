import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
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
  otpPendingEmail: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
  otpPendingEmail: null,
};


// STEP 1 -Send email password and email otp
export const initiateLogin = createAsyncThunk<
  { email: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/initiateLogin', async (credentials, { rejectWithValue }) => {
  try {
    await api.post('/api/auth/login', credentials); // trigger OTP generation & email
    return { email: credentials.email };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


// STEP 2 - Verifikasi OTP → Get token
export const verifyOtp = createAsyncThunk<
  { token: string; user: User },
  { email: string; otp: string },
  { rejectValue: string }
>('auth/verifyOtp', async ({ email, otp }, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/auth/verify-otp', { email, otp });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    return { token, user };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'OTP verification failed');
  }
});


// Create new user (Admin only)
export const createUser = createAsyncThunk<
  { message: string },
  { email: string; password: string; role: string },
  { rejectValue: string }
>('auth/createUser', async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.post<{ message: string }>('/api/auth/register', userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'User creation failed');
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
      state.otpPendingEmail = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {

    // STEP 1: initiate login
    builder
      .addCase(initiateLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPendingEmail = action.payload.email;
      })
      .addCase(initiateLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });

  
    // STEP 2: verify otp
    builder
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.otpPendingEmail = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.error = action.payload || 'OTP verification failed';
      });

    
    // Create user
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
export const selectOtpPendingEmail = (state: RootState) => state.auth.otpPendingEmail;
