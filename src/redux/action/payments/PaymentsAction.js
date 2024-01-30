import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxPostPayment,
  reduxPostPaymentMidtrans,
} from "../../../services/payments/Payments";

import {
  setPostPayment,
  setPaymentMidtrans,
  startLoading,
  endLoading,
} from "../../reducer/payments/PaymentsSlice";

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
      console.log(result);
      dispatch(setPaymentMidtrans(result.data.data));

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
