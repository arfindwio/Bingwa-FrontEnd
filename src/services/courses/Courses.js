// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllCoursesByQuery = async (fullQuery) => {
  return await http.get(`${API_ENDPOINT.GET_ALL_COURSES}${fullQuery}`);
};

export const reduxGetAllCourses = async () => {
  return await http.get(`${API_ENDPOINT.GET_ALL_COURSES}`);
};

export const reduxGetDetailCoursesId = async (courseId) => {
  return await http.get(`${API_ENDPOINT.GET_COURSE}/${courseId}`);
};

export const reduxPostCourse = async (input) => {
  return await http.post(API_ENDPOINT.CREATE_COURSE, input);
};

export const reduxPutCourse = async (input, courseId) => {
  return await http.put(`${API_ENDPOINT.UPDATE_COURSE}/${courseId}`, input);
};

export const reduxDeleteCourse = async (courseId) => {
  return await http.delete(`${API_ENDPOINT.DELETE_COURSE}/${courseId}`);
};
