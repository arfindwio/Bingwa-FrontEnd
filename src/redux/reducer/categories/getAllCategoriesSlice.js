import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

const getAllCategoriesSlice = createSlice({
  name: "dataCategories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = getAllCategoriesSlice.actions;

export default getAllCategoriesSlice.reducer;
