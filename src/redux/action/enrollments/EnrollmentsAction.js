import { reduxPostEnrollments } from "../../../services/enrollments/CreateEnrollments";
import { setEnrollments } from "../../reducer/enrollments/EnrollmentsSlice";

export const postEnrollmentsAction = (courseId) => async (dispatch) => {
  await reduxPostEnrollments(courseId)
    .then((result) => {
      dispatch(setEnrollments(result.data.data.enrollments));
      return result;
    })
    .catch((err) => {
      console.error("reduxEnrollments", err);
    });
};
