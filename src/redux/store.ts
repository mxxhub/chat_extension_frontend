import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { messageReducer } from "./features/message/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
