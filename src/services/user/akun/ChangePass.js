import { API_ENDPOINT } from "../../../utils/api-endpoint";
import http from "../../../utils/http";

export const reduxChangePass = (input, token) => {
    return http.put(API_ENDPOINT.CHANGE_PASS, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
