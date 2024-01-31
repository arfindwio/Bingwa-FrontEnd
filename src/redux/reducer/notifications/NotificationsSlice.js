import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  status: null,
};

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setNotifications, setStatus, startLoading, endLoading } =
  NotificationsSlice.actions;

export default NotificationsSlice.reducer;
