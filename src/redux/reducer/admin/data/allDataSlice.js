import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countUser: 0,
  allCourse: 0,
  coursePremium: 0,
};

const allDataSlice = createSlice({
  name: "allAdminData",
  initialState,
  reducers: {
    setCountUser: (state, action) => {
      state.countUser = action.payload;
    },
    setAllCourse: (state, action) => {
      state.allCourse = action.payload;
    },
    setCoursePremium: (state, action) => {
      state.coursePremium = action.payload;
    },
  },
});

export const { setCountUser, setAllCourse, setCoursePremium } =
  allDataSlice.actions;

export default allDataSlice.reducer;
