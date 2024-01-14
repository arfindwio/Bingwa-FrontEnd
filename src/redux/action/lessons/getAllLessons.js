import { reduxGetAllLessons } from "../../../services/lessons/getAllLessons";
import { setLessons } from "../../reducer/lessons/LessonsSlice";

export const getAllLessonsAction = () => (dispatch) => {
  reduxGetAllLessons()
    .then((result) => {
      dispatch(setLessons(result.data.data));
      return result;
    })
    .catch((err) => {
      console.error("reduxGetAllLessons", err);
    });
};
