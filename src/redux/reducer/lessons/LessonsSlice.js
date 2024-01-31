import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessons: [],
  lessonsCourseId: [],
  loading: false,
};

const LessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
    setLessonsByCourseId: (state, action) => {
      state.lessonsCourseId = action.payload;
    },
    addLesson: (state, action) => {
      state.lessons.push(action.payload);
    },
    updateLesson: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.lessons.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.lessons[index] = {
          ...state.lessons[index],
          ...updatedData,
        };
      }
    },
    deleteLesson: (state, action) => {
      const idToDelete = action.payload;
      state.lessons = state.lessons.filter((item) => item.id !== idToDelete);
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
  setLessons,
  setLessonsByCourseId,
  addLesson,
  updateLesson,
  deleteLesson,
  startLoading,
  endLoading,
} = LessonsSlice.actions;

export default LessonsSlice.reducer;
