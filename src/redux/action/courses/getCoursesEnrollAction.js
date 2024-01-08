import { reduxGetDetailCoursesMe } from "../../../services/courses/getAllCourses";
import {
  endLoading,
  setEnroll,
  startLoading,
} from "../../reducer/courses/courseSlice";

export const getCoursesEnrollAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetDetailCoursesMe(courseId);
    dispatch(setEnroll(result.data.data));
    return result;
  } catch (err) {
    console.error("reduxDetailCourseMe", err);
  } finally {
    dispatch(endLoading());
  }
};
