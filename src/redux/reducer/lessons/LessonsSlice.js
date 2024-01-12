import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessonsCourseId: [],
  loading: false,
};

const LessonsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setLessonsByCourseId: (state, action) => {
      state.lessonsCourseId = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },

    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setLessonsByCourseId, startLoading, endLoading } =
  LessonsSlice.actions;

export default LessonsSlice.reducer;
