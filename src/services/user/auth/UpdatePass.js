// services/user/auth/UpdatePass.js
import http from "../../../utils/http";
import { API_ENDPOINT } from "../../../utils/api-endpoint";

export const reduxUpdatePass = async (input, token) => {
  return await http.put(
    `${API_ENDPOINT.UPDATE_PASS}?token=${token ? token : ""}`,
    input,
  );
};
