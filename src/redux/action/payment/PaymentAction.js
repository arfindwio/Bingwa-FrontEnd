import { reduxPostPayment } from "../../../services/payment/CreatePayment";
import { setPayment } from "../../reducer/payment/PaymentSlice";

export const postPaymentAction = (input, courseId) => async (dispatch) => {
  try {
    const result = await reduxPostPayment(input, courseId);
    dispatch(setPayment(result.data.data.newPayment));
    return true;
  } catch (err) {
    console.error("error postPaymentAction", err);
    return false;
  }
};
