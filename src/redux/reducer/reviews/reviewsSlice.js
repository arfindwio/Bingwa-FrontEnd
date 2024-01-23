import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  review: null,
};

const reviewsSlice = createSlice({
  name: "RegisterAuth",
  initialState,
  reducers: {
    setReviewCourse: (state, action) => {
      state.review = action.payload;
    },
  },
});

export const { setReviewCourse } = reviewsSlice.actions;

export default reviewsSlice.reducer;
