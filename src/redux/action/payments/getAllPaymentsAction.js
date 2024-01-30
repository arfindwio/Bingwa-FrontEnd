import {
  reduxGetAllPayments,
  reduxGetAllPaymentsByQuery,
} from "../../../services/payments/Payments";
import {
  setPayments,
  endLoading,
  startLoading,
} from "../../reducer/payments/PaymentsSlice";

export const getAllPaymentsAction = (fullQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let getAllInput = `?${fullQuery}`;

    const result = await (fullQuery
      ? reduxGetAllPaymentsByQuery(getAllInput)
      : reduxGetAllPayments());
    dispatch(setPayments(result.data.data.payments));
    return result;
  } catch (err) {
    console.error("getAllPaymentsAction", err);
  } finally {
    dispatch(endLoading());
  }
};
