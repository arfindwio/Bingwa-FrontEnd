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
  dispatch(startLoading());

  return await reduxGetAllEnrollments()
    .then((result) => {
      dispatch(setEnrollments(result.data.data.enrollments));
      return true; // Indicate success
    })
    .catch((err) => {
      console.error("getAllEnrollmentsAction", err);
      return false;
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const getEnrollmentByCourseIdAction = (courseId) => async (dispatch) => {
  dispatch(startLoading());

  return await reduxGetEnrollmentByCourseId(courseId)
    .then((result) => {
      dispatch(setEnrollByCourseId(result.data.data));
      return true;
    })
    .catch((err) => {
      console.error("getEnrollmentsByCourseIdAction", err);
      return false;
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const postEnrollmentAction = (courseId) => async (dispatch) => {
  dispatch(startLoading());

  await reduxPostEnrollment(courseId)
    .then((result) => {
      dispatch(addEnrollment(result.data.data.enrollments));
      return true;
    })
    .catch((err) => {
      console.error("enrollmentsAction", err);
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const putEnrollmentPreparationAction =
  (courseId) => async (dispatch) => {
    dispatch(startLoading());

    await reduxPutEnrollment(courseId)
      .then((result) => {
        dispatch(setEnrollmentPreparation(result.data.data.updatedEnrollment));
        return true;
      })
      .catch((err) => {
        console.error("enrollmentsAction", err);
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };
