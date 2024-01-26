import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllChapters = async () => {
  return await http.get(API_ENDPOINT.CHAPTERS);
};

export const reduxPostChapter = async (input) => {
  return await http.post(`${API_ENDPOINT.CHAPTERS}`, input);
};

export const reduxPutChapter = async (input, chapterId) => {
  return await http.put(`${API_ENDPOINT.CHAPTERS}/${chapterId}`, input);
};

export const reduxDeleteChapter = async (chapterId) => {
  return await http.delete(`${API_ENDPOINT.CHAPTERS}/${chapterId}`);
};
