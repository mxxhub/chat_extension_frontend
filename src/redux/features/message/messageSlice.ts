import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../../config/config.json";

const server = config.server || "localhost:4000";

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async (data: { id: string; editor: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/messages/deleteMessage`, {
        id: data.id,
        editor: data.editor,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMessages, setLoading, setError } = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
