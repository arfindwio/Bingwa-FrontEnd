import { reduxGetHistoryPayment } from "../../../services/payments/HistoryPayment";
import { setHistory } from "../../reducer/payments/PaymentsSlice";

export const getHistoryAction = () => (dispatch) => {
  reduxGetHistoryPayment()
    .then((result) => {
      dispatch(setHistory(result.data.data.payments));
      return true;
    })
    .catch((err) => {
      console.error("reduxGetHistory", err);
    });
};
