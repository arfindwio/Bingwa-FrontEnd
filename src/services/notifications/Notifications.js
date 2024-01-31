import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllNotifications = async () => {
  return await http.get(API_ENDPOINT.GET_ALL_NOTIFICATIONS);
};

export const reduxPutNotification = async () => {
  return await http.put(API_ENDPOINT.UPDATE_NOTIFICATIONS);
};
