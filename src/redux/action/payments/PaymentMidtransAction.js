import { reduxPostPaymentMidtrans } from "../../../services/payment/CreatePaymentMidtrans";
import { setPaymentMidtrans } from "../../reducer/payment/PaymentSlice";

export const postPaymentMidtransAction = (courseId) => async (dispatch) => {
  await reduxPostPaymentMidtrans(courseId)
    .then((result) => {
      dispatch(setPaymentMidtrans(result.data.data.payments));
      return result;
    })
    .catch((err) => {
      console.error("reduxPayment", err);
    });
};
