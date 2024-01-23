// Service Register User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxReviewCourse = async (courseId, input) => {
  return await http.post(`${API_ENDPOINT.REVIEWS}/${courseId}`, input);
};
