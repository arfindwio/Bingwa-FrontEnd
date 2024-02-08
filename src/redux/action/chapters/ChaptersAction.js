import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllChapters,
  reduxGetAllChaptersByQuery,
  reduxPostChapter,
  reduxPutChapter,
  reduxDeleteChapter,
} from "../../../services/chapters/Chapters";

import {
  setChapters,
  startLoading,
  endLoading,
} from "../../reducer/chapters/ChaptersSlice";

export const getAllChaptersAction = (fullQuery) => async (dispatch) => {
  dispatch(startLoading());

  let getAllInput = `?${fullQuery}`;

  return (
    fullQuery ? reduxGetAllChaptersByQuery(getAllInput) : reduxGetAllChapters()
  )
    .then((result) => {
      dispatch(setChapters(result.data.data));
      return true;
    })
    .catch((err) => {
      console.error("getAllChaptersAction", err);
      if (err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const postChapterAction = (input) => async (dispatch) => {
  dispatch(startLoading());

  return reduxPostChapter(input)
    .then(() => {
      return true; // Signal success
    })
    .catch((err) => {
      console.error("postChapterAction", err);
      if (err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const putChapterAction = (input, chapterId) => async (dispatch) => {
  dispatch(startLoading());

  return reduxPutChapter(input, chapterId)
    .then(() => {
      return true; // Signal success
    })
    .catch((err) => {
      console.error("putChapterAction", err);
      if (err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const deleteChapterAction = (chapterId) => async (dispatch) => {
  dispatch(startLoading());

  return reduxDeleteChapter(chapterId)
    .then(() => {
      return true; // Signal success
    })
    .catch((err) => {
      console.error("deleteChapterAction", err);
      if (err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};
