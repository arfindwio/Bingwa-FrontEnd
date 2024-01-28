import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllPayments = async () => {
  return await http.get(API_ENDPOINT.PAYMENTS);
};

export const reduxGetAllPaymentsByQuery = async (fullQuery) => {
  return await http.get(`${API_ENDPOINT.PAYMENTS}${fullQuery}`);
};

export const reduxPostPaymentMidtrans = async (courseId) => {
  return await http.post(`${API_ENDPOINT.PAYMENTST}/midtrans/${courseId}`);
};
