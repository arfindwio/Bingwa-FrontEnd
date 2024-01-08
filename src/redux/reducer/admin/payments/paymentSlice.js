import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: null,
  loading: false,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payments = action.payload;
    },

    startLoading: (state) => {
      state.loading = true;
    },

    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setPayment, startLoading, endLoading } = paymentSlice.actions;

export default paymentSlice.reducer;
