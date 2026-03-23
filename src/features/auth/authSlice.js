import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth.api";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token")|| false,
  error: null,
  isLoading: false,
  token: localStorage.getItem("token")|| null,
  user: JSON.parse(localStorage.getItem("user"))||null,
  role: localStorage.getItem("role") ||null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginUser(credentials);
      //console.log("Response from loginthunk : ", res);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers:{
    logout :(state)=>{
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("role")

      state.error=null;
      state.isAuthenticated= false;
      state.isLoading = false;
      state.user=null;
      state.token=null;
      state.role=null;
    }
  },
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
        state.user = action.payload.user;
        state.role = action.payload.user.role;

        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("role", action.payload.user.role)
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
