import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  detail: [],
  me: [],
  enroll: [],
  searchedCourses: [],
  filteredCourses: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "dataCourses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },

    getAllCourses: (state, action) => {
      state.courses = action.payload;
    },

    updateCourse: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.courses.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...updatedData };
      }
    },

    deleteCourse: (state, action) => {
      const idToDelete = action.payload;
      state.courses = state.courses.filter((item) => item.id !== idToDelete);
      state.detail = null;
    },

    setDetailCourse: (state, action) => {
      state.detail = action.payload;
    },

    setMe: (state, action) => {
      state.me = action.payload;
    },

    setEnroll: (state, action) => {
      state.enroll = action.payload;
    },

    setSearchedCourses: (state, action) => {
      state.searchedCourses = action.payload;
    },

    setFilteredCourses: (state, action) => {
      const { selectedCategories, selectedLevels } = action.payload;

      // Pengecekan untuk memastikan tidak undefined
      if (selectedCategories === undefined || selectedLevels === undefined) {
        // Handle jika salah satu atau keduanya undefined
        return;
      }

      state.filteredCourses = state.courses.filter((course) => {
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(course.category.categoryName);

        const levelMatch =
          selectedLevels.length === 0 || selectedLevels.includes(course.level);

        return categoryMatch && levelMatch;
      });
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
  addCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  setDetailCourse,
  setMe,
  setEnroll,
  setSearchedCourses,
  setFilteredCourses,
  startLoading,
  endLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
