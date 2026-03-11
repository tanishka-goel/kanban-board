import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth.api";

const initialState = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
  token: null,
  username: null,
  role: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginUser(credentials);
      console.log("Response from loginthunk : ", res);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.username = action.payload.user.username;
        state.role = action.payload.user.role;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
