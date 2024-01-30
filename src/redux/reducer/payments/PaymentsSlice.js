import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  postPayment: null,
  paymentMidtrans: null,
  history: [],
  loading: false,
};

const paymentsSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action) => {
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
  setPayments,
  setPostPayment,
  setPaymentMidtrans,
  setHistory,
  startLoading,
  endLoading,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
