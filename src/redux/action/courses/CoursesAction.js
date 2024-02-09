import { showErrorToast } from "../../../helper/ToastHelper";

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

    const result = await (fullQuery
      ? reduxGetAllCoursesByQuery(getAllInput)
      : reduxGetAllCourses());

    dispatch(setCourses(result.data.data));

    return result;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const getDetailCoursesAction = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetDetailCoursesId(courseId);
    dispatch(setDetailCourse(result.data.data.course));
    return result;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};
