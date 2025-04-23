import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUnauthenticated: (state) => {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setAuthenticated,
  setUser,
  setUnauthenticated,
  setLoading,
  setError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
