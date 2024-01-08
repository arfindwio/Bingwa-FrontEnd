// Service Login User

import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllCategories = async () => {
  return await http.get(API_ENDPOINT.GET_ALL_CATEGORIES);
};
