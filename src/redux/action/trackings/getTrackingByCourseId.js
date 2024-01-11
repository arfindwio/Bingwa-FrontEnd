import { reduxGetTrackingsByCourseId } from "../../../services/trackings/getAllTrackings";
import {
  endLoading,
  setTrackingsByCourseId,
  startLoading,
} from "../../reducer/trackings/TrackingsSlice";

export const getTrackingByCourseId = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetTrackingsByCourseId(courseId);
    dispatch(setTrackingsByCourseId(result.data.data));
    return result;
  } catch (err) {
    console.error("reduxGetTrackingsByCourseId", err);
  } finally {
    dispatch(endLoading());
  }
};
