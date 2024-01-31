import {
  reduxGetTrackingsByCourseId,
  reduxPutTracking,
} from "../../../services/trackings/Tracking";

import {
  setTrackingsByCourseId,
  updateTracking,
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
    console.error("reduxGetTrackingsByCourseId", err);
  } finally {
    dispatch(endLoading());
  }
};

export const putTrackingAction = (lessonId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutTracking(lessonId);
    dispatch(updateTracking(result.data.data.tracking));
    return true;
  } catch (err) {
    console.error("reduxPutTracking", err);
  } finally {
    dispatch(endLoading());
  }
};
