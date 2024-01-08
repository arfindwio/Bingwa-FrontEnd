import { CookiesKeys, CookieStorage } from "../../../utils/cookie";
import { reduxLoginUser } from "../../../services/user/auth/LoginUser";
import {
  setIsLoggedIn,
  setToken,
  setUser,
} from "../../reducer/auth/loginSlice";
import { showErrorToast } from "../../../helper/ToastHelper";

export const loginUserAction = (input) => async (dispatch) => {
  return reduxLoginUser(input)
    .then((result) => {
      CookieStorage.set(CookiesKeys.AuthToken, result.data.data.token);
      dispatch(setToken(result.data.data.token));
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(result.data.data.user));
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
