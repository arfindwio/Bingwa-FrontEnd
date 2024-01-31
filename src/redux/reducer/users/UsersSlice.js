import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register: [],
  verifyOtp: [],
  resendOtp: [],
  forgetPassword: [],
  changePassword: [],
  updatePassword: null,
  users: [],
  userAuthenticate: null,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setRegister: (state, action) => {
      state.register = action.payload;
    },
    setVerifyOtp: (state, action) => {
      state.verifyOtp = action.payload;
    },
    setResendOtp: (state, action) => {
      state.resendOtp = action.payload;
    },
    setForgetPassword: (state, action) => {
      state.forgetPassword = action.payload;
    },
    setUpdatePassword: (state, action) => {
      state.updatePassword = action.payload;
    },
    setChangePassword: (state, action) => {
      state.changePassword = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserAuthenticate: (state, action) => {
      state.userAuthenticate = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },

    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setRegister,
  setVerifyOtp,
  setResendOtp,
  setChangePassword,
  setForgetPassword,
  setUpdatePassword,
  setUsers,
  setUserAuthenticate,
  startLoading,
  endLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
