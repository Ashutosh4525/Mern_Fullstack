import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  changeCurrentPassword as changeCurrentPasswordRequest,
  getCurrentAdmin,
  loginAdmin as loginAdminRequest,
  logoutAdmin as logoutAdminRequest,
  updateCurrentAdmin as updateCurrentAdminRequest,
} from './auth';

export const fetchCurrentAdmin = createAsyncThunk(
  'auth/fetchCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentAdmin();
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      }

      return rejectWithValue(error.response?.data?.message || 'Unable to restore admin session');
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      return await loginAdminRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  'auth/logoutAdmin',
  async (_, { rejectWithValue }) => {
    try {
      await logoutAdminRequest();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const updateCurrentAdmin = createAsyncThunk(
  'auth/updateCurrentAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      return await updateCurrentAdminRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Unable to update profile');
    }
  }
);

export const changeCurrentAdminPassword = createAsyncThunk(
  'auth/changeCurrentAdminPassword',
  async (payload, { rejectWithValue }) => {
    try {
      return await changeCurrentPasswordRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Unable to change password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    hydrated: false,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.hydrated = true;
      })
      .addCase(fetchCurrentAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.error = action.payload || null;
        state.hydrated = true;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.hydrated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.error = action.payload || null;
        state.hydrated = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
        state.hydrated = true;
      })
      .addCase(updateCurrentAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCurrentAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateCurrentAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || null;
      })
      .addCase(changeCurrentAdminPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changeCurrentAdminPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(changeCurrentAdminPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
