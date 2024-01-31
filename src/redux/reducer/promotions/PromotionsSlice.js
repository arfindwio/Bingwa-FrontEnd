import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: [],
  loading: false,
};

const PromotionsSlice = createSlice({
  name: "Promotions",
  initialState,
  reducers: {
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
    addPromotion: (state, action) => {
      state.promotions.push(action.payload);
    },
    updatePromotion: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.promotions.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.promotions[index] = {
          ...state.promotions[index],
          ...updatedData,
        };
      }
    },
    deletePromotion: (state, action) => {
      const idToDelete = action.payload;
      state.promotions = state.promotions.filter(
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
  setPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
  startLoading,
  endLoading,
} = PromotionsSlice.actions;

export default PromotionsSlice.reducer;
