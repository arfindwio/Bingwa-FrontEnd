import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapters: [],
  loading: false,
};

const ChaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    addChapter: (state, action) => {
      state.chapters.push(action.payload);
    },
    updateChapter: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.chapters.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.chapters[index] = {
          ...state.chapters[index],
          ...updatedData,
        };
      }
    },
    deleteChapter: (state, action) => {
      const idToDelete = action.payload;
      state.chapters = state.chapters.filter((item) => item.id !== idToDelete);
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
  addChapter,
  setChapters,
  updateChapter,
  deleteChapter,
  startLoading,
  endLoading,
} = ChaptersSlice.actions;

export default ChaptersSlice.reducer;
