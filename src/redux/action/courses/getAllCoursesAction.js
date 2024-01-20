import {
  reduxGetAllCourses,
  reduxGetAllCoursesByQuery,
} from "../../../services/courses/getAllCourses";
import {
  getAllCourses,
  startLoading,
  endLoading,
} from "../../reducer/courses/courseSlice";

export const getAllCoursesAction = (fullQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let getAllInput = `?${fullQuery}`;

    const response = await (getAllInput
      ? reduxGetAllCoursesByQuery(getAllInput)
      : reduxGetAllCourses());

    dispatch(getAllCourses(response.data.data));

    return response;
  } catch (err) {
    console.error("getAllCoursesAction", err);
    throw err;
  } finally {
    dispatch(endLoading());
  }
};
