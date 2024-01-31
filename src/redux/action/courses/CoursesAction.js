import {
  reduxGetDetailCoursesId,
  reduxGetAllCourses,
  reduxGetAllCoursesByQuery,
  reduxPostCourse,
  reduxPutCourse,
  reduxDeleteCourse,
} from "../../../services/courses/Courses";

import {
  setCourses,
  setDetailCourse,
  startLoading,
  endLoading,
} from "../../reducer/courses/CoursesSlice";

export const getAllCoursesAction = (fullQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let getAllInput = `?${fullQuery}`;

    const response = await (fullQuery
      ? reduxGetAllCoursesByQuery(getAllInput)
      : reduxGetAllCourses());

    dispatch(setCourses(response.data.data));

    return true;
  } catch (err) {
    console.error("getAllCoursesAction", err);
    throw err;
  } finally {
    dispatch(endLoading());
  }
};

export const getDetailCoursesAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetDetailCoursesId(courseId);
    dispatch(setDetailCourse(result.data.data.course));
    return true;
  } catch (err) {
    console.error("reduxDetailCourse", err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCourseAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCourse(input);
    return true;
  } catch (err) {
    console.error("postCourseAction", err);
  } finally {
    dispatch(endLoading());
  }
};

export const putCourseAction = (input, courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutCourse(input, courseId);
    return true;
  } catch (err) {
    console.error("putCourseAction", err);
  } finally {
    dispatch(endLoading());
  }
};

export const deleteCourseAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteCourse(courseId);
    return true;
  } catch (err) {
    console.error("deleteCourseAction", err);
  } finally {
    dispatch(endLoading());
  }
};
