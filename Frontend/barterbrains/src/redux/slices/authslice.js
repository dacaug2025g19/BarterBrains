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
      state.user = {
        uid: action.payload.uid,
        uname: action.payload.uname,
        email: action.payload.email,
        phone: action.payload.phone,
        role: action.payload.role,
        bdate: action.payload.bdate,
        adhar_id: action.payload.adhar_id,
      };
      state.token = action.payload.token;
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
