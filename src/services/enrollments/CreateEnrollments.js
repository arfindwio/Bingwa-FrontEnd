import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPostEnrollments = async (courseId) => {
  return await http.post(`${API_ENDPOINT.CREATE_ENROLLMENT}/${courseId}`);
};