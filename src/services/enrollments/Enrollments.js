import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllEnrollments = async () => {
  return await http.get(API_ENDPOINT.ENROLLMENTS);
};

export const reduxGetEnrollmentByCourseId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.ENROLLMENTS}/${courseId}`);
};

export const reduxPostEnrollment = async (courseId) => {
  return await http.post(`${API_ENDPOINT.ENROLLMENTS}/${courseId}`);
};

export const reduxPutEnrollment = async (courseId) => {
  return await http.put(`${API_ENDPOINT.ENROLLMENTS}/${courseId}`);
};
