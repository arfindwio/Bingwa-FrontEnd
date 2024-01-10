import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  EnrollCourseId: [],
  enrollments: null,
  loading: false,
};

const postEnrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    setEnrollByCourseId: (state, action) => {
      state.enrollCourseId = action.payload;
    },
    setCourseEnroll: (state, action) => {
      state.course = action.payload;
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
  setEnrollments,
  setCourseEnroll,
  setEnrollByCourseId,
  startLoading,
  endLoading,
} = postEnrollmentSlice.actions;

export default postEnrollmentSlice.reducer;
