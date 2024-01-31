import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackings: [],
  trackingsCourseId: [],
  loading: false,
};

const TrackingsSlice = createSlice({
  name: "trackings",
  initialState,
  reducers: {
    setTrackings: (state, action) => {
      state.trackings = action.payload;
    },
    setTrackingsByCourseId: (state, action) => {
      state.trackingsCourseId = action.payload;
    },
    updateTracking: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.trackings.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.trackings[index] = {
          ...state.trackings[index],
          ...updatedData,
        };
      }
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
  updateTracking,
  startLoading,
  endLoading,
} = TrackingsSlice.actions;

export default TrackingsSlice.reducer;
