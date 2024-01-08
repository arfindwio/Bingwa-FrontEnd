import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPutNotif = async () => {
  return await http.put(API_ENDPOINT.UPDATE_NOTIFICATIONS);
};
