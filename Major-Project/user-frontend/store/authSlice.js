import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginUser as loginUserRequest,
  logoutUser as logoutUserRequest,
  registerUser as registerUserRequest,
  sendOtpForPasswordChange as sendOtpForPasswordChangeRequest,
  verifyOtpChangePassword as verifyOtpChangePasswordRequest,
  updateUser as updateUserRequest,
  changeCurrentPassword as changeCurrentPasswordRequest
} from "@/services/authService";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentUser();
    } catch (error) {
      if (error.response?.status === 401) {
        // User not authenticated, don't treat as error
        return null;
      }
      return rejectWithValue(error.response?.data?.message || "Unable to restore session");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      await loginUserRequest(payload);
      return await getCurrentUser();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await registerUserRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserRequest();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const sendOtpForPasswordChange = createAsyncThunk(
  "auth/sendOtpForPasswordChange",
  async (_, { rejectWithValue }) => {
    try {
      return await sendOtpForPasswordChangeRequest();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const verifyOtpChangePassword = createAsyncThunk(
  "auth/verifyOtpChangePassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyOtpChangePasswordRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await updateUserRequest(payload);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const changeCurrentPassword = createAsyncThunk(
  "auth/changeCurrentPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await changeCurrentPasswordRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    registerStatus: "idle",
    error: null,
    hydrated: false
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload?.data ?? null;
        state.hydrated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.hydrated = true;
        state.error = action.payload || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload?.data ?? null;
        state.hydrated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.hydrated = true;
        state.error = action.payload || null;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.error = action.payload || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.hydrated = true;
      })
      .addCase(sendOtpForPasswordChange.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendOtpForPasswordChange.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(sendOtpForPasswordChange.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(verifyOtpChangePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtpChangePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifyOtpChangePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(changeCurrentPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changeCurrentPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changeCurrentPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
