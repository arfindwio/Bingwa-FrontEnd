import { reduxPutEnrollments } from "../../../services/enrollments/CreateEnrollments";
import { setEnrollmentPreparation } from "../../reducer/enrollments/EnrollmentsSlice";

export const enrollmentPreparationAction = (courseId) => async (dispatch) => {
  await reduxPutEnrollments(courseId)
    .then((result) => {
      dispatch(setEnrollmentPreparation(result.data.data.updatedEnrollment));
      return result;
    })
    .catch((err) => {
      console.error("reduxEnrollments", err);
    });
};
