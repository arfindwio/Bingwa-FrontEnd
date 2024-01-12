import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllLessonsByCourseId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.LESSONS}/${courseId}`);
};
