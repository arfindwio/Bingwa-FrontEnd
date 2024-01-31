import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetTrackingsByCourseId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.TRACKINGS}/${courseId}`);
};

export const reduxPutTracking = async (lessonId) => {
  return await http.put(`${API_ENDPOINT.UPDATE_TRACKINGS}/${lessonId}`);
};
