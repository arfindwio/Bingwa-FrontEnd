import { reduxGetAllCourses } from "../../../services/courses/getAllCourses";
import { getAllCourses } from "../../reducer/courses/courseSlice";

export const getAllCoursesAction = () => async (dispatch) => {
  await reduxGetAllCourses()
    .then((result) => {
      dispatch(getAllCourses(result.data.data.courses));
      return true;
    })
    .catch((err) => {
      console.error("getAllCoursesAction", err);
    });
};
