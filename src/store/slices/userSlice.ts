import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Role {
  name: string;
}

interface User {
  id: number;
  email: string;
  role: Role;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// GET all users
export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetch',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as User[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// PUT update user role
export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ userId, role }: { userId: number; role: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/users/${userId}/role`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      thunkAPI.dispatch(fetchUsers()); // refresh list
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update role');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

export const selectUsers = (state: any) => state.users.users;
export const selectUsersLoading = (state: any) => state.users.loading;
export const selectUsersError = (state: any) => state.users.error;
