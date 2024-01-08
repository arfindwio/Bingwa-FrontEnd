import { reduxSearchCourses } from "../../../services/courses/searchCourses";
import {
  endLoading,
  setSearchedCourses,
  startLoading,
} from "../../reducer/courses/courseSlice";

export const searchCourseAction = (searchInput) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxSearchCourses(searchInput);
    dispatch(setSearchedCourses(result.data.data.courses));
    return result;
  } catch (err) {
    console.error("searchCourseAction", err);
  } finally {
    dispatch(endLoading());
  }
};
