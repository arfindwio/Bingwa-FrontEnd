// Service Login User
import { API_ENDPOINT } from "../../../utils/api-endpoint";
import http from "../../../utils/http";

export const reduxGetUserByAuth = async () => {
  return await http.get(`${API_ENDPOINT.USERS}/authenticate`);
};

export const reduxGetAllUsers = async () => {
  return await http.get(`${API_ENDPOINT.USERS}`);
};
