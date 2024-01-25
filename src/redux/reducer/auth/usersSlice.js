import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthenticate: null,
  loading: false,
};

const usersSlice = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
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

export const { setUserAuthenticate, startLoading, endLoading } =
  usersSlice.actions;

export default usersSlice.reducer;
