// src/redux/features/auth/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  twitter?: {
    username?: string;
    id?: string;
  };
  wallet?: {
    address?: string;
  };
  userId?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

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
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUnauthenticated: (state) => {
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

export const { setAuthenticated, setUnauthenticated, setLoading, setError } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
