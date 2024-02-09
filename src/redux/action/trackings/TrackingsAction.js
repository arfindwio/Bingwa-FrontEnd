import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetTrackingsByCourseId,
  reduxPutTracking,
} from "../../../services/trackings/Tracking";

import {
  setTrackingsByCourseId,
  startLoading,
  endLoading,
} from "../../reducer/trackings/TrackingsSlice";

export const getTrackingsByCourseId = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetTrackingsByCourseId(courseId);
    dispatch(setTrackingsByCourseId(result.data.data));
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

export const putTrackingAction = (lessonId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutTracking(lessonId);
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
