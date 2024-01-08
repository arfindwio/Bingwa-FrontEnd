import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

// Get All Course 
export const reduxGetAllCourses = async () => {
  return await http.get(`${API_ENDPOINT.GET_ALL_COURSES}?limit=50`);
};

// Course Detail Belum Login di Homepage
export const reduxGetDetailCoursesId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.GET_COURSE}/${courseId}`);
};

// Course Detail Sudah Enroll di Detail Courses
export const reduxGetDetailCoursesMe = async (courseId) => {
  return await http.get(`${API_ENDPOINT.GET_COURSE}/${courseId}/me`);
};

// Course Sudah Enroll di Kelas-saya
export const reduxGetCoursesMe = async () => {
  return await http.get(`${API_ENDPOINT.GET_COURSE_ME}?limit=50`);
};
