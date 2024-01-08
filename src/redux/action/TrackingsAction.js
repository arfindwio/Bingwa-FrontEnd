import { reduxPutTrackings } from "../../services/Tracking";
import { setTrackings } from "../reducer/TrackingsSlice";

export const putTrackingsAction = () => (dispatch) => {
  reduxPutTrackings()
    .then((result) => {
      dispatch(setTrackings(result.data.data.tracking));
      return true;
    })
    .catch((err) => {
      console.error("reduxPutTrackings", err);
    });
};
