import { showErrorToast } from "../../../helper/ToastHelper";
import { reduxUpdateProfile } from "../../../services/userProfiles/UserProfiles";
import {
  setUserProfile,
  updateUserProfile,
  startLoading,
  endLoading,
} from "../../reducer/userProfiles/UserProfilesSlice";

export const putUpdateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxUpdateProfile(formData);
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
