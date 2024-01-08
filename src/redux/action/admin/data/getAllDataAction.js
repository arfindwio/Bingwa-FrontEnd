import { reduxGetAllAdminData } from "../../../../services/admin/data/getAllData";
import {
  setAllCourse,
  setCountUser,
  setCoursePremium,
} from "../../../reducer/admin/data/allDataSlice";

export const getAllDataAction = () => (dispatch) => {
  return reduxGetAllAdminData()
    .then((result) => {
      dispatch(setAllCourse(result.data.data.allCourse));
      dispatch(setCountUser(result.data.data.countUser));
      dispatch(setCoursePremium(result.data.data.coursePremium));
      return true;
    })
    .catch((err) => {
      console.error("reduxGetUser", err);
    });
};
