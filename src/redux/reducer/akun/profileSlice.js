import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "",
  city: "",
};

const profileSlice = createSlice({
  name: "profil",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setCountry, setCity } = profileSlice.actions;

export default profileSlice.reducer;
