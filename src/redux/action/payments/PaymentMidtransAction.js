import { showErrorToast } from "../../../helper/ToastHelper";

import { reduxPostPaymentMidtrans } from "../../../services/payments/Payments";
import {
  setPaymentMidtrans,
  startLoading,
  endLoading,
} from "../../reducer/payments/PaymentSlice";

export const postPaymentMidtransAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await reduxPostPaymentMidtrans(courseId);
    dispatch(setPaymentMidtrans(response.data.data));

    return true;
  } catch (err) {
    console.error("getAllPromotionssAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};
