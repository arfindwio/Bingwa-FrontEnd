import { reduxGetDetailCoursesId } from "../../../services/courses/getAllCourses";
import {
  endLoading,
  setDetailCourse,
  startLoading,
} from "../../reducer/courses/courseSlice";

export const getDetailCoursesAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetDetailCoursesId(courseId);
    dispatch(setDetailCourse(result.data.data.course));
    return result;
  } catch (err) {
    console.error("reduxDetailCourse", err);
  } finally {
    dispatch(endLoading());
  }
};
