import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllPayments,
  reduxGetAllPaymentsByQuery,
  reduxGetHistoryPayment,
  reduxPostPayment,
  reduxPostPaymentMidtrans,
} from "../../../services/payments/Payments";

import {
  setPayments,
  setHistoryPayments,
  setPostPayment,
  setPostPaymentMidtrans,
  startLoading,
  endLoading,
} from "../../reducer/payments/PaymentsSlice";

export const getAllPaymentsAction = (fullQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let getAllInput = `?${fullQuery}`;

    const result = await (fullQuery
      ? reduxGetAllPaymentsByQuery(getAllInput)
      : reduxGetAllPayments());
    dispatch(setPayments(result.data.data));
    return true;
  } catch (err) {
    console.error("getAllPaymentsAction", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getHistoryPaymentAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetHistoryPayment();
    dispatch(setHistoryPayments(result.data.data.payments));
    return true;
  } catch (err) {
    console.error("getHistoryPaymentAction", err);
    return false;
  } finally {
    dispatch(endLoading());
  }
};

export const postPaymentAction = (input, courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostPayment(input, courseId);
    dispatch(setPostPayment(result.data.data));
    return true;
  } catch (err) {
    console.error("error postPaymentAction", err);
    return false;
  } finally {
    dispatch(endLoading());
  }
};

export const postPaymentMidtransAction =
  (input, courseId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxPostPaymentMidtrans(input, courseId);
      dispatch(setPostPaymentMidtrans(result.data.data));
      return true;
    } catch (err) {
      console.error("postPaymentMidtransAction", err);
      if (err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    } finally {
      dispatch(endLoading());
    }
  };
