import {
  reduxPostRegisterUser,
  reduxPostLoginUser,
  reduxPutOtpUser,
  reduxPutResendOtpUser,
  reduxPostForgetPassword,
  reduxPutUpdatePassword,
  reduxPutChangePassword,
  reduxGetAllUsers,
  reduxGetUserByAuth,
} from "../../../services/users/Users";
import {
  setRegister,
  setVerifyOtp,
  setResendOtp,
  setForgetPassword,
  setUpdatePassword,
  setChangePassword,
  setUsers,
  setUserAuthenticate,
  startLoading,
  endLoading,
} from "../../reducer/users/UsersSlice";
import { showErrorToast } from "../../../helper/ToastHelper";
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";

export const postRegisterUserAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostRegisterUser(input);
    dispatch(setRegister(result.data.data.newUser));
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postLoginUserAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostLoginUser(input);
    CookieStorage.set(CookiesKeys.AuthToken, result.data.data.token);
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};

export const logoutUserAction = () => (dispatch) => {
  CookieStorage.remove(CookiesKeys.AuthToken);
  window.location.href = "/";
};

export const putVerifyOtpAction = (email) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutOtpUser(email);
    dispatch(setVerifyOtp(result.data.data));
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putResendOtp = (email) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutResendOtpUser(email);
    dispatch(setResendOtp(result.data.data));
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

export const putChangePasswordUser = (input, token) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutChangePassword(input, token);
    dispatch(setChangePassword(result.data.data));
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

export const postForgetPassAction = (email) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostForgetPassword(email);
    dispatch(setForgetPassword(result.data.data));
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

export const putUpdatePassword = (input, token) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutUpdatePassword(input, token);
    dispatch(setUpdatePassword(result.data.data));
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

export const getUserAuthenticateAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetUserByAuth();
    dispatch(setUserAuthenticate(result.data.data.user));
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

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllUsers();
    dispatch(setUsers(result.data.data.users));
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
