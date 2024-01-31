import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  detailCourse: [],
  enroll: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setDetailCourse: (state, action) => {
      state.detailCourse = action.payload;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const { id, updatedData } = action.payload;

      state.courses = Array.isArray(state.courses) ? state.courses : [];
      const index = state.courses.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedCourses = [...state.courses];
        updatedCourses[index] = { ...state.courses[index], ...updatedData };
        state.courses = updatedCourses;
      }
    },
    deleteCourse: (state, action) => {
      const idToDelete = action.payload;
      state.courses = state.courses.filter((item) => item.id !== idToDelete);
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
  setCourses,
  setDetailCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  startLoading,
  endLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
