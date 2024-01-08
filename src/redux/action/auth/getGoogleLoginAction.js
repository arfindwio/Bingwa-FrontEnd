import { reduxGetUser } from "../../../services/user/auth/GetUser";
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";
import {
  endLoading,
  setIsLoggedIn,
  setToken,
  setUser,
  startLoading,
} from "../../reducer/auth/loginSlice";

export const getGoogleLoginAction = (tokenFromGoogle) => async (dispatch) => {
  try {
    dispatch(startLoading());
    if (tokenFromGoogle) {
      CookieStorage.set(CookiesKeys.AuthToken, tokenFromGoogle);
    }

    const result = await reduxGetUser();

    // Mengecualikan properti userProfile dari respons API
    const {
      data: {
        data: {
          user: { userProfile, ...filteredUserData },
        },
      },
    } = result;

    dispatch(setToken(tokenFromGoogle));
    dispatch(setIsLoggedIn(true));
    dispatch(setUser(filteredUserData));

    return true;
  } catch (error) {
    console.error("getGoogleLoginAction", error);
  } finally {
    dispatch(endLoading());
  }
};
