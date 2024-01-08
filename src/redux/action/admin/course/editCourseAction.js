import { reduxPutCourse } from "../../../../services/courses/putCourse";
import { updateCourse } from "../../../reducer/courses/courseSlice";

export const editCourseAction = (input, courseId) => async (dispatch) => {
  return reduxPutCourse(input, courseId)
    .then((result) => {
      dispatch(updateCourse(result.data.data.editedCourse));
      return true;
    })
    .catch((err) => {
      console.error("editCourseAction Error:", err);
    });
};
