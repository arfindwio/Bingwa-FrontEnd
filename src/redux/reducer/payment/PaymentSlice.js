import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: null,
  paymentMidtrans: null,
  history: [],
};

const postPaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setPaymentMidtrans: (state, action) => {
      state.paymentMidtrans = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setPayment, setPaymentMidtrans, setHistory } =
  postPaymentSlice.actions;

export default postPaymentSlice.reducer;
