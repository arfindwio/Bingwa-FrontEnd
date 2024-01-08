import { reduxGetAllEnrollments } from "../../../services/enrollments/getAllEnrollments";
import { setCourseEnroll } from "../../reducer/enrollments/EnrollmentsSlice";

export const getAllEnrollmentsAction = () => (dispatch) => {
  reduxGetAllEnrollments()
    .then((result) => {
      dispatch(setCourseEnroll(result.data.data.enrollments));
      return result.data.data.enrollments.course;
    })
    .catch((err) => {
      console.error("reduxAllEnrollments", err);
    });
};
