import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPostPayment = async (input, courseId) => {
  return await http.post(`${API_ENDPOINT.CREATE_PAYMENT}/${courseId}`, input);
};