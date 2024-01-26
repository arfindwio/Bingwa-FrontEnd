import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
};

const getAllCategoriesSlice = createSlice({
  name: "dataCategories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.categories.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedData,
        };
      }
    },
    deleteCategory: (state, action) => {
      const idToDelete = action.payload;
      state.categories = state.categories.filter(
        (item) => item.id !== idToDelete,
      );
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
  addCategory,
  setCategories,
  updateCategory,
  deleteCategory,
  startLoading,
  endLoading,
} = getAllCategoriesSlice.actions;

export default getAllCategoriesSlice.reducer;
