import { createSlice } from "@reduxjs/toolkit";
import { CookieStorage, CookiesKeys } from "../../../../utils/cookie";

const initialState = {
  token: CookieStorage.get(CookiesKeys.AuthToken) || null,
  isLoggedIn: false,
  user: null,
  userProfile: null,
};

const adminLoginSlice = createSlice({
  name: "loginAdminAuth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setIsLoggedIn, setUser } = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
