import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllLessonsByCourseId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.LESSONS}/${courseId}`);
};

export const reduxGetAllLessons = async () => {
  return await http.get(`${API_ENDPOINT.LESSONS}`);
};

export const reduxPostLesson = async (input) => {
  return await http.post(`${API_ENDPOINT.LESSONS}`, input);
};

export const reduxPutLesson = async (input, lessonId) => {
  return await http.put(`${API_ENDPOINT.LESSONS}/${lessonId}`, input);
};

export const reduxDeleteLesson = async (lessonId) => {
  return await http.delete(`${API_ENDPOINT.LESSONS}/${lessonId}`);
};
