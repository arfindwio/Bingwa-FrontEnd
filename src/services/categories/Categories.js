// Service Login User

import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllCategories = async () => {
  return await http.get(API_ENDPOINT.GET_ALL_CATEGORIES);
};

export const reduxPostCategory = async (input) => {
  return await http.post(`${API_ENDPOINT.CATEGORIES}`, input);
};

export const reduxPutCategory = async (input, categoryId) => {
  return await http.put(`${API_ENDPOINT.CATEGORIES}/${categoryId}`, input);
};

export const reduxDeleteCategory = async (categoryId) => {
  return await http.delete(`${API_ENDPOINT.CATEGORIES}/${categoryId}`);
};
