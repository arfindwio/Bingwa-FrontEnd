import {
  reduxGetAllCourses,
  reduxGetAllCoursesByQuery,
} from "../../../services/courses/getAllCourses";
import { getAllCourses } from "../../reducer/courses/courseSlice";

export const getAllCoursesAction = (fullQuery) => async (dispatch) => {
  try {
    let getAllInput = `?${fullQuery}`;

    const response = await (getAllInput
      ? reduxGetAllCoursesByQuery(getAllInput)
      : reduxGetAllCourses());

    dispatch(getAllCourses(response.data.data));

    return response;
  } catch (err) {
    console.error("getAllCoursesAction", err);
    throw err;
  }
};
