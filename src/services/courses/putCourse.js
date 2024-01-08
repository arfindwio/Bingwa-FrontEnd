import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPutCourse = async (input, courseId) => {
  return await http.put(`${API_ENDPOINT.UPDATE_COURSE}/${courseId}`, input);
};
