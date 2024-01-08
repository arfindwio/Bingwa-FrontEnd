// services/user/auth/UpdateProfile
import http from "../../../utils/http";
import { API_ENDPOINT } from "../../../utils/api-endpoint";

export const reduxUpdateProfile = async (input) => {
  return http.put(API_ENDPOINT.UPDATE_PROFILE, input);
};
