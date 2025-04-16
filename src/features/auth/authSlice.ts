// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   user: { id: string; email: string } | null;
//   token: string | null;
//   authenticated: boolean | false;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   authenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<{ id: string; email: string }>) {
//       state.user = action.payload;
//     },
//     setToken(state, action: PayloadAction<string>) {
//       state.token = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, setToken, logout } = authSlice.actions;
// export default authSlice.reducer;
