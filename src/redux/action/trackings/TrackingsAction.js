import { reduxPutTrackings } from "../../../services/trackings/Tracking";
import {
  setTrackings,
  startLoading,
  endLoading,
} from "../../reducer/trackings/TrackingsSlice";

export const putTrackingsAction = (lessonId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutTrackings(lessonId);
    dispatch(setTrackings(result.data.data.tracking));
    return result;
  } catch (err) {
    console.error("reduxPutTrackings", err);
  } finally {
    dispatch(endLoading());
  }
};
