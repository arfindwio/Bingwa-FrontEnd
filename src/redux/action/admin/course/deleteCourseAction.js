import { reduxDeleteCourse } from "../../../../services/courses/deleteCourse";
import { deleteCourse } from "../../../reducer/courses/courseSlice";

export const deleteCourseAction = (courseId) => async (dispatch) => {
  return reduxDeleteCourse(courseId)
    .then((result) => {
      dispatch(deleteCourse(result.data.data.deletedCourse.id));
      return true;
    })
    .catch((err) => {
      console.error("deleteCourseAction Error:", err);
    });
};
