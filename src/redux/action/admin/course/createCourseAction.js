import { showErrorToast } from "../../../../helper/ToastHelper";
import { reduxCreateCourse } from "../../../../services/admin/course/CreateCourse";
import { addCourse } from "../../../reducer/courses/courseSlice";

export const createCourseAction = (input) => async (dispatch) => {
  return reduxCreateCourse(input)
    .then((result) => {
      dispatch(addCourse(result.data.data.newCourse));
      return true;
    })
    .catch((err) => {
      console.error("reduxCreateCourse", err);
      if (err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    });
};
