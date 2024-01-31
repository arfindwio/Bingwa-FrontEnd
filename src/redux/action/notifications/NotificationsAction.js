import {
  reduxGetAllNotifications,
  reduxPutNotification,
} from "../../../services/notifications/Notifications";
import {
  setNotifications,
  setStatus,
  startLoading,
  endLoading,
} from "../../reducer/notifications/NotificationsSlice";

export const getAllNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllNotifications();
    dispatch(setNotifications(result.data.data.notifications));
    return true;
  } catch (err) {
    console.error("getAllNotificationsAction", err);
  } finally {
    dispatch(endLoading());
  }
};

export const putNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPutNotification();
    dispatch(setStatus(result.data.data.notifications));
    return true;
  } catch (err) {
    console.error("putNotificationsAction", err);
  } finally {
    dispatch(endLoading());
  }
};
