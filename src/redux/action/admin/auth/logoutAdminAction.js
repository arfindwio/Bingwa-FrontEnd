import { CookieStorage, CookiesKeys } from "../../../../utils/cookie";
import {
  setIsLoggedIn,
  setToken,
} from "../../../reducer/admin/auth/adminLoginSlice";

export const logoutAdminAction = () => (dispatch) => {
  CookieStorage.remove(CookiesKeys.AuthToken);
  dispatch(setToken(null));
  dispatch(setIsLoggedIn(false));
  window.location.href = "/admin/login";
};
