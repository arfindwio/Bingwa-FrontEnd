import { CookiesKeys, CookieStorage } from "../../../utils/cookie";
import {
  setIsLoggedIn,
  setToken,
  setUser,
  setUserProfile,
} from "../../reducer/auth/loginSlice";

export const logoutUserAction = () => (dispatch) => {
  CookieStorage.remove(CookiesKeys.AuthToken);
  dispatch(setToken(null));
  dispatch(setIsLoggedIn(false));
  dispatch(setUser(null));
  dispatch(setUserProfile(null));
  window.location.href = "/";
};
