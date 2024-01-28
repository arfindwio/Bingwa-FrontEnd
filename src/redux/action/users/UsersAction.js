import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetUserByAuth,
  reduxGetAllUsers,
} from "../../../services/user/auth/Users";
import {
  setUsers,
  setUserAuthenticate,
  startLoading,
  endLoading,
} from "../../reducer/auth/usersSlice";

export const getUserAuthenticateAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetUserByAuth();
    dispatch(setUserAuthenticate(result.data.data.user));
    return true;
  } catch (err) {
    console.error("getUserAuthenticateAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllUsers();
    dispatch(setUsers(result.data.data.users));
    return true;
  } catch (err) {
    console.error("getUserAuthenticateAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};
