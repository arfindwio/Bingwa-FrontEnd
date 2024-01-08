import { showErrorToast } from "../../../../helper/ToastHelper";
import { reduxLoginAdmin } from "../../../../services/admin/auth/LoginAdmin";
import { CookieStorage, CookiesKeys } from "../../../../utils/cookie";
import {
  setIsLoggedIn,
  setToken,
  setUser,
} from "../../../reducer/admin/auth/adminLoginSlice";

export const loginAdminAction = (input) => async (dispatch) => {
  return reduxLoginAdmin(input)
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
