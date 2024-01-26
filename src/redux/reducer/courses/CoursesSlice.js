import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  detail: [],
  enroll: [],
  searchedCourses: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "dataCourses",
  initialState,
  reducers: {
    getAllCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const { id, updatedData } = action.payload;

      // Ensure that state.courses is an array
      state.courses = Array.isArray(state.courses) ? state.courses : [];

      // Find the index of the course
      const index = state.courses.findIndex((item) => item.id === id);

      // If the course is found, update it
      if (index !== -1) {
        // Create a new array with the updated course
        const updatedCourses = [...state.courses];
        updatedCourses[index] = { ...state.courses[index], ...updatedData };

        // Update the state
        state.courses = updatedCourses;
      }
    },
    deleteCourse: (state, action) => {
      const idToDelete = action.payload;
      state.courses = state.courses.filter((item) => item.id !== idToDelete);
    },
    setDetailCourse: (state, action) => {
      state.detail = action.payload;
    },
    setEnroll: (state, action) => {
      state.enroll = action.payload;
    },
    setSearchedCourses: (state, action) => {
      state.searchedCourses = action.payload;
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
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setDetailCourse,
  setEnroll,
  setSearchedCourses,
  startLoading,
  endLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
