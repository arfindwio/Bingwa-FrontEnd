import { reduxGetAllPayments } from "../../../services/payments/Payments";
import {
  setPayment,
  endLoading,
  startLoading,
} from "../../reducer/payments/PaymentsSlice";

export const getAllPaymentsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPayments();
    dispatch(setPayment(result.data.data.payments));
    return result;
  } catch (err) {
    console.error("getAllPaymentsAction", err);
  } finally {
    dispatch(endLoading());
  }
};
