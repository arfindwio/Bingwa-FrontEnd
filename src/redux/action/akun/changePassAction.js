import { showErrorToast } from "../../../helper/ToastHelper";
import { reduxChangePass } from "../../../services/user/akun/ChangePass";
import { setChange } from "../../reducer/akun/ChangePassSlice";

export const changePass = (input, token) => (dispatch) => {
  reduxChangePass(input, token)
    .then((result) => {
      dispatch(setChange(result.data.data));
      return result;
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status >= 400 && err.response.status <= 500) {
          showErrorToast(err.response.data.message);
        } else {
          console.error("unexpected Error", err);
        }
      }
    });
};
