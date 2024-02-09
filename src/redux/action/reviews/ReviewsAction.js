import { showErrorToast } from "../../../helper/ToastHelper";
import { reduxPostReview } from "../../../services/reviews/Reviews";
import {
  addReview,
  startLoading,
  endLoading,
} from "../../reducer/reviews/ReviewsSlice";

export const postReviewCourseAction = (courseId, input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostReview(courseId, input);
    dispatch(addReview(result.data.data));
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
