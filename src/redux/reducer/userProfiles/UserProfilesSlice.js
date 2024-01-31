import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfiles: [],
  loading: false,
};

const UserProfilesSlice = createSlice({
  name: "userProfiles",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.userProfiles.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.userProfiles[index] = {
          ...state.userProfiles[index],
          ...updatedData,
        };
      }
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { updateUserProfile, startLoading, endLoading } =
  UserProfilesSlice.actions;

export default UserProfilesSlice.reducer;
