import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { email, token, userId } = action.payload;
      state.user = { email, token, userId };
      localStorage.setItem("user", JSON.stringify(state.user));
      // console.log(state.user);
    },
    logOut: (state, action) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    SignUp: (state, action) => {
      const { email, token } = action.payload;
      state.user = { email, token };
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log(state.user);
    },
  },
});

export const { logIn, SignUp, logOut } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const authReducer = authSlice.reducer;
