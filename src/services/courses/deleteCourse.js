import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxDeleteCourse = async (courseId) => {
  return await http.delete(`${API_ENDPOINT.DELETE_COURSE}/${courseId}`);
};
