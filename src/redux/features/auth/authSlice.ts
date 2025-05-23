import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: true,
  user: null,
  loading: false,
  error: null,
  token: null,
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
    setChannels: (state, action: PayloadAction<Channel>) => {
      if (state.user) {
        const exist = state.user.channels.find(
          (channel) => channel.tokenAdd == action.payload.tokenAdd
        );
        if (exist) return;
        state.user.channels = [...state.user.channels, action.payload];
      }
    },
    removeChannel: (state, action: PayloadAction<string>) => {
      if (state.user) {
        const exist = state.user.channels.find(
          (channel) => channel.tokenAdd == action.payload
        );
        if (!exist) return;
        state.user.channels = state.user.channels.filter(
          (channel) => channel.tokenAdd !== action.payload
        );
      }
    },
    setUnauthenticated: (state) => {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  setAuthenticated,
  setUser,
  setUnauthenticated,
  setChannels,
  removeChannel,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
