import { showErrorToast } from "../../../../helper/ToastHelper";
import { reduxGetUserByAuth } from "../../../../services/user/auth/Users";
import { reduxUpdateProfile } from "../../../../services/user/auth/UpdateProfile";
import { setUserProfile } from "../../../reducer/auth/loginSlice";

export const getUserProfileAction = () => (dispatch) => {
  return reduxGetUserByAuth()
    .then((result) => {
      dispatch(setUserProfile(result.data.data.user));
      return result.data.data.user;
    })
    .catch((err) => {
      console.error("reduxGetUserByAuth", err);
    });
};

export const putUpdateProfile = (formData) => async (dispatch) => {
  return reduxUpdateProfile(formData)
    .then((result) => {
      dispatch(setUserProfile(result.data.data.newUserProfile));
      return true;
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status >= 400 && err.response.status <= 500) {
          showErrorToast(err.response.data.message);
        } else {
          console.error("unexpected Error", err);
        }
      }
    });
};
