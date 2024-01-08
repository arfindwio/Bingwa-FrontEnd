import { reduxGetAllPayments } from "../../../../services/admin/payments/getAllPayments";
import {
  endLoading,
  setPayment,
  startLoading,
} from "../../../reducer/admin/payments/paymentSlice";

export const getAllPaymentsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPayments();
    dispatch(setPayment(result.data.data.payments));
    return result;
  } catch (e) {
    console.error("getAllPaymentsAction", e);
  } finally {
    dispatch(endLoading());
  }
};
