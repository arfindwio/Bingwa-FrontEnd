import { showErrorToast } from "../../../helper/ToastHelper";

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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
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
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};
