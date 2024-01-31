// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllUsers = async () => {
  return await http.get(`${API_ENDPOINT.USERS}`);
};

export const reduxGetUserByAuth = async () => {
  return await http.get(`${API_ENDPOINT.USERS}/authenticate`);
};

export const reduxPostRegisterUser = async (input) => {
  return await http.post(API_ENDPOINT.USER_REGISTER, input);
};

export const reduxPostLoginUser = async (input) => {
  return await http.post(API_ENDPOINT.USER_LOGIN, input);
};

export const reduxPutOtpUser = async (input) => {
  return await http.put(API_ENDPOINT.VERIFY_OTP, input);
};

export const reduxPutResendOtpUser = async (input) => {
  return await http.put(API_ENDPOINT.RESEND_OTP, input);
};

export const reduxPostForgetPassword = async (email) => {
  return await http.post(API_ENDPOINT.FORGET_PASS, email);
};

export const reduxPutUpdatePassword = async (input, token) => {
  return await http.put(
    `${API_ENDPOINT.UPDATE_PASS}?token=${token ? token : ""}`,
    input,
  );
};

export const reduxPutChangePassword = (input, token) => {
  return http.put(API_ENDPOINT.CHANGE_PASS, input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
