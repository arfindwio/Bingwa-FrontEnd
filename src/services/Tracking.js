import { API_ENDPOINT } from "../utils/api-endpoint";
import http from "../utils/http";

export const reduxPutTrackings = async (lessonId) => {
  try {
    const response = await http.put(
      `${API_ENDPOINT.UPDATE_TRACKINGS}/${lessonId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating trackings:", error);
    throw error;
  }
};
