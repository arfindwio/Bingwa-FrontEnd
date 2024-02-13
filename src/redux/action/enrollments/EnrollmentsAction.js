import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllEnrollments,
  reduxGetEnrollmentByCourseId,
  reduxPostEnrollment,
  reduxPutEnrollment,
} from "../../../services/enrollments/Enrollments";

import {
  setEnrollments,
  setEnrollByCourseId,
  setEnrollmentPreparation,
  addEnrollment,
  startLoading,
  endLoading,
} from "../../reducer/enrollments/EnrollmentsSlice";

export const getAllEnrollmentsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllEnrollments();
    dispatch(setEnrollments(result.data.data.enrollments));

    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const getEnrollmentByCourseIdAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetEnrollmentByCourseId(courseId);
    dispatch(setEnrollByCourseId(result.data.data));

    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postEnrollmentAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostEnrollment(courseId);

    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putEnrollmentPreparationAction =
  (courseId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxPutEnrollment(courseId);
      dispatch(setEnrollmentPreparation(result.data.data.updatedEnrollment));

      return true;
    } catch (err) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    } finally {
      dispatch(endLoading());
    }
  };
