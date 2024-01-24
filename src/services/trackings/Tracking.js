import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPutTrackings = async (lessonId) => {
  try {
    return await http.put(`${API_ENDPOINT.UPDATE_TRACKINGS}/${lessonId}`);
  } catch (error) {
    console.error("Error updating trackings:", error);
    throw error;
  }
};
