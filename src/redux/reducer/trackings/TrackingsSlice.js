import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackings: null,
  trackingsCourseId: [],
  loading: false,
};

const getTrackingsSlice = createSlice({
  name: "trackings",
  initialState,
  reducers: {
    setTrackings: (state, action) => {
      state.trackings = action.payload;
    },
    setTrackingsByCourseId: (state, action) => {
      state.trackingsCourseId = action.payload;
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
  setTrackings,
  setTrackingsByCourseId,
  startLoading,
  endLoading,
} = getTrackingsSlice.actions;

export default getTrackingsSlice.reducer;
