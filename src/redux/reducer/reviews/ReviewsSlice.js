import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
};

const ReviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addReview, startLoading, endLoading } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;
