import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userAuthenticate: null,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserAuthenticate: (state, action) => {
      state.userAuthenticate = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },

    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setUsers, setUserAuthenticate, startLoading, endLoading } =
  usersSlice.actions;

export default usersSlice.reducer;
