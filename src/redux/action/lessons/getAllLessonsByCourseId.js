import { reduxGetAllLessonsByCourseId } from "../../../services/lessons/Lessons";
import {
  setLessonsByCourseId,
  startLoading,
  endLoading,
} from "../../reducer/lessons/LessonsSlice";

export const getAllLessonsByCourseIdAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllLessonsByCourseId(courseId);
    dispatch(setLessonsByCourseId(result.data.data));
    return result;
  } catch (err) {
    console.error("reduxGetAllLessonsByCourseId", err);
  } finally {
    dispatch(endLoading());
  }
};
