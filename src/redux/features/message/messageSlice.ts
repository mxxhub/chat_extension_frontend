import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../../config/config.json";

const server = config.server || "localhost:4000";

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      console.log("deleting message", action.payload);
      const exist = state.messages.find(
        (message) => message._id === action.payload
      );
      if (!exist) return;
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      const index = state.messages.findIndex(
        (message) => message._id === action.payload._id
      );
      if (index !== -1) {
        state.messages[index].content = action.payload.content;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMessages,
  setLoading,
  setError,
  deleteMessage,
  updateMessage,
} = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
