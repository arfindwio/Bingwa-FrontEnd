import {
  reduxGetAllCourses,
  reduxGetAllCoursesByQuery,
} from "../../../services/courses/getAllCourses";
import { getAllCourses } from "../../reducer/courses/courseSlice";

export const getAllCoursesAction =
  (search, queryParams) => async (dispatch) => {
    try {
      let getAllInput = "";

      if (search && queryParams) {
        getAllInput = `?${queryParams}&${search}`;
      } else if (queryParams) {
        getAllInput = `?${queryParams}`;
      } else if (search) {
        getAllInput = `?${search}`;
      }

      const response = await (getAllInput
        ? reduxGetAllCoursesByQuery(getAllInput)
        : reduxGetAllCourses());

      dispatch(getAllCourses(response.data.data.courses));

      return response;
    } catch (err) {
      console.error("getAllCoursesAction", err);
      throw err; // Propagate the error further if needed
    }
  };
