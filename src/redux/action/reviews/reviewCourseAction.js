import { setReviewCourse } from "../../reducer/reviews/reviewsSlice";
import { reduxReviewCourse } from "../../../services/reviews/reviewCourse";
import { showErrorToast } from "../../../helper/ToastHelper";

export const reviewCourseAction = (courseId, input) => async (dispatch) => {
  return reduxReviewCourse(courseId, input)
    .then((result) => {
      console.log(result);
      dispatch(setReviewCourse(result.data.data));
      return true;
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status >= 400 && err.response.status <= 500) {
          showErrorToast(err.response.data.message);
        } else {
          console.error("unexpected Error", err);
        }
      }
    });
};
