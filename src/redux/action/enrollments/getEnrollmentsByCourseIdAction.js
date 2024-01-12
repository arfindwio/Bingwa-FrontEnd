import { reduxGetEnrollmentById } from "../../../services/enrollments/getAllEnrollments";
import {
  setEnrollByCourseId,
  startLoading,
  endLoading,
} from "../../reducer/enrollments/EnrollmentsSlice";

export const getEnrollmentsByCourseIdAction =
  (courseId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxGetEnrollmentById(courseId);
      dispatch(setEnrollByCourseId(result.data.data));
      return result;
    } catch (err) {
      // console.error("reduxGetEnrollmentById", err);
    } finally {
      dispatch(endLoading());
    }
  };
