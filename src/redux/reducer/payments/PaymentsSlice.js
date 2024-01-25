import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  postPayment: null,
  paymentMidtrans: null,
  history: [],
  loading: false,
};

const postPaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payments = action.payload;
    },
    setPostPayment: (state, action) => {
      state.postPayment = action.payload;
    },
    setPaymentMidtrans: (state, action) => {
      state.paymentMidtrans = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
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
  setPayment,
  setPaymentMidtrans,
  setHistory,
  startLoading,
  endLoading,
} = postPaymentSlice.actions;

export default postPaymentSlice.reducer;
