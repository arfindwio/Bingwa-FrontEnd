import { reduxGetCoursesMe } from "../../../services/courses/getAllCourses";
import {
  endLoading,
  setMe,
  startLoading,
} from "../../reducer/courses/courseSlice";

export const getCoursesMeAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetCoursesMe(courseId);
    dispatch(setMe(result.data.data.course));
    return result;
  } catch (err) {
    console.error("reduxDetailLesson", err);
  } finally {
    dispatch(endLoading());
  }
};
