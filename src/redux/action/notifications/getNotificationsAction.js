import { reduxGetNotif } from "../../../services/notifications/GetNotifications";
import { setNotifications } from "../../reducer/notifications/getNotificationsSlice";

export const getNotificationsAction = () => (dispatch) => {
  reduxGetNotif()
    .then((result) => {
      dispatch(setNotifications(result.data.data.notifications));
      return result;
    })
    .catch((err) => {
      console.error("reduxGetNotifications", err);
    });
};
