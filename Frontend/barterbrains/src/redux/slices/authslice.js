import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   // stores user info like name, email, role, etc.
  token: null,  // stores JWT token
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;   
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
