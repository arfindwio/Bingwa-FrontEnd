import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessonsCourseId: [],
  lessons: [],
  loading: false,
};

const LessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessonsByCourseId: (state, action) => {
      state.lessonsCourseId = action.payload;
    },
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },

    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setLessonsByCourseId, setLessons, startLoading, endLoading } =
  LessonsSlice.actions;

export default LessonsSlice.reducer;
