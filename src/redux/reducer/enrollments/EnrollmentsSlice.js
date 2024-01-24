import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  enrollCourseId: [],
  enrollments: null,
  enrollmentPreparation: null,
  loading: false,
};

const enrollmentSlice = createSlice({
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
    setEnrollmentPreparation: (state, action) => {
      state.enrollmentPreparation = action.payload;
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
  setEnrollmentPreparation,
  startLoading,
  endLoading,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
