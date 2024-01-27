import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllPromotions = async () => {
  return await http.get(`${API_ENDPOINT.PROMOTIONS}`);
};

export const reduxGetAllPromotionsByQuery = async (fullQuery) => {
  return await http.get(`${API_ENDPOINT.PROMOTIONS}${fullQuery}`);
};

export const reduxPostPromotion = async (input) => {
  return await http.post(`${API_ENDPOINT.PROMOTIONS}`, input);
};

export const reduxPutPromotions = async (input, promotionId) => {
  return await http.put(`${API_ENDPOINT.PROMOTIONS}/${promotionId}`, input);
};

export const reduxDeletePromotion = async (promotionId) => {
  return await http.delete(`${API_ENDPOINT.PROMOTIONS}/${promotionId}`);
};
