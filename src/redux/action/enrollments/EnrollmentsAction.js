import {
  reduxGetAllEnrollments,
  reduxGetEnrollmentById,
  reduxPostEnrollments,
  reduxPutEnrollments,
} from "../../../services/enrollments/Enrollments";

import {
  setEnrollments,
  setEnrollByCourseId,
  addEnrollment,
  setEnrollmentPreparation,
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
    console.error("enrollmentsAction", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getEnrollmentsByCourseIdAction =
  (courseId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxGetEnrollmentById(courseId);
      dispatch(setEnrollByCourseId(result.data.data));
      return true;
    } catch (err) {
      console.error("reduxGetEnrollmentById", err);
    } finally {
      dispatch(endLoading());
    }
  };

export const postEnrollmentsAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostEnrollments(courseId);
    dispatch(addEnrollment(result.data.data.enrollments));
    return true;
  } catch (err) {
    console.error("enrollmentsAction", err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEnrollmentPreparationAction =
  (courseId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxPutEnrollments(courseId);
      dispatch(setEnrollmentPreparation(result.data.data.updatedEnrollment));
      return true;
    } catch (err) {
      console.error("enrollmentsAction", err);
    } finally {
      dispatch(endLoading());
    }
  };
