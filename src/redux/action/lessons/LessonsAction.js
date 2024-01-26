import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllLessons,
  reduxPostLesson,
  reduxPutLesson,
  reduxDeleteLesson,
} from "../../../services/lessons/Lessons";

import {
  setLessons,
  startLoading,
  endLoading,
} from "../../reducer/lessons/LessonsSlice";

export const getAllLessonsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllLessons();
    dispatch(setLessons(result.data.data));

    return true;
  } catch (err) {
    console.error("getAllLessonsAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postLessonAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPostLesson(input);
    return true;
  } catch (err) {
    console.error("postLessonAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putLessonAction = (input, lessonId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPutLesson(input, lessonId);
    return true;
  } catch (err) {
    console.error("putLessonAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const deleteLessonAction = (lessonId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxDeleteLesson(lessonId);
    return true;
  } catch (err) {
    console.error("deleteLessonAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};
