import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  historyPayments: [],
  postPayment: null,
  postPaymentMidtrans: null,
  loading: false,
};

const PaymentsSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setPostPayment: (state, action) => {
      state.postPayment = action.payload;
    },
    setPostPaymentMidtrans: (state, action) => {
      state.paymentMidtrans = action.payload;
    },
    setHistoryPayments: (state, action) => {
      state.historyPayments = action.payload;
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
  setHistoryPayments,
  setPostPayment,
  setPostPaymentMidtrans,
  startLoading,
  endLoading,
} = PaymentsSlice.actions;

export default PaymentsSlice.reducer;
