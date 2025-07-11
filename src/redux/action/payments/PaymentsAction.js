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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
    return false;
  } finally {
    dispatch(endLoading());
  }
};

export const postPaymentAction = (input, courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostPayment(input, courseId);
    // dispatch(setPostPayment(result.data.data));
    return result.data.data;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
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

      return result.data.data;
    } catch (err) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    } finally {
      dispatch(endLoading());
    }
  };
