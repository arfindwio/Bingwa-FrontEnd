import { reduxGetUser } from "../../../services/user/auth/GetUser";
import {
  setUserAuthenticate,
  startLoading,
  endLoading,
} from "../../reducer/auth/usersSlice";

export const getUserAuthenticate = () => (dispatch) => {
  return reduxGetUser()
    .then((result) => {
      dispatch(startLoading());
      dispatch(setUserAuthenticate(result.data.data.user));
      dispatch(endLoading());
      return result.data.data.user;
    })
    .catch((err) => {
      console.error("reduxGetUser", err);
    });
};
