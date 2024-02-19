import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: null,
  enrollCourseId: [],
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
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload);
    },
    updateEnrollment: (state, action) => {
      const { id, updatedData } = action.payload;

      state.enrollments = Array.isArray(state.enrollments)
        ? state.enrollments
        : [];
      const index = state.enrollments.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedenrollments = [...state.enrollments];
        updatedenrollments[index] = {
          ...state.enrollments[index],
          ...updatedData,
        };
        state.enrollments = updatedenrollments;
      }
    },
    deleteEnrollment: (state, action) => {
      const idToDelete = action.payload;
      state.enrollments = state.enrollments.filter(
        (item) => item.id !== idToDelete,
      );
    },
    setEnrollmentPreparation: (state, action) => {
      state.enrollmentPreparation = action.payload;
    },
    resetEnrollment: () => initialState,
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
  setEnrollByCourseId,
  addEnrollment,
  updateEnrollment,
  deleteEnrollment,
  setEnrollmentPreparation,
  resetEnrollment,
  startLoading,
  endLoading,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
