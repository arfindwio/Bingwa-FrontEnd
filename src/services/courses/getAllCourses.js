import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

// Get All Course
export const reduxGetAllCoursesByQuery = async (getAllInput) => {
  return await http.get(`${API_ENDPOINT.GET_ALL_COURSES}${getAllInput}`);
};

export const reduxGetAllCourses = async () => {
  return await http.get(`${API_ENDPOINT.GET_ALL_COURSES}`);
};

// Course Detail Belum Login di Homepage
export const reduxGetDetailCoursesId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.GET_COURSE}/${courseId}`);
};

// Course Detail Sudah Enroll di Detail Courses
export const reduxGetDetailCoursesMe = async (courseId) => {
  return await http.get(`${API_ENDPOINT.GET_COURSE}/${courseId}/me`);
};
