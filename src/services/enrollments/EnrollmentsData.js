import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

import {
  startLoading,
  endLoading,
} from "../../redux/reducer/enrollments/EnrollmentsSlice";

export const getAllEnrollments = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await http.get(API_ENDPOINT.ENROLLMENTS);

    return response.data.data.enrollments;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getEnrollmentByCourseId = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await http.get(`${API_ENDPOINT.ENROLLMENTS}/${courseId}`);

    return response.data.data;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postEnrollment = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await http.post(`${API_ENDPOINT.ENROLLMENTS}/${courseId}`);

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEnrollmentPreparationCheck = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await http.put(`${API_ENDPOINT.ENROLLMENTS}/${courseId}`);

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(endLoading());
  }
};
