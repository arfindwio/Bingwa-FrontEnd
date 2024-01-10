import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllEnrollments = async () => {
  return await http.get(API_ENDPOINT.GET_ALL_ENROLLMENTS);
};

export const reduxGetEnrollmentById = async (courseId) => {
  return await http.get(`${API_ENDPOINT.GET_ENROLMENT}/${courseId}`);
};
