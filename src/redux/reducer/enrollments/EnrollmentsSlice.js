import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  enrollments: null,
};

const postEnrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    setCourseEnroll: (state, action) => {
      state.course = action.payload;
    },
  },
});

export const { setEnrollments, setCourseEnroll } = postEnrollmentSlice.actions;

export default postEnrollmentSlice.reducer;
