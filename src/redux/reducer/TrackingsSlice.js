import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackings: null,
};

const getTrackingsSlice = createSlice({
  name: "trackings",
  initialState,
  reducers: {
    setTrackings: (state, action) => {
      state.trackings = action.payload;
    },
  },
});

export const { setTrackings } = getTrackingsSlice.actions;

export default getTrackingsSlice.reducer;
