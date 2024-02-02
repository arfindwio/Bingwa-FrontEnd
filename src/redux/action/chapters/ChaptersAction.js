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
  try {
    dispatch(startLoading());

    let getAllInput = `?${fullQuery}`;

    const result = await (fullQuery
      ? reduxGetAllChaptersByQuery(getAllInput)
      : reduxGetAllChapters());

    dispatch(setChapters(result.data.data));
    return true;
  } catch (err) {
    console.error("getAllChaptersAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postChapterAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPostChapter(input);
    return true;
  } catch (err) {
    console.error("postChapterAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putChapterAction = (input, chapterId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPutChapter(input, chapterId);
    return true;
  } catch (err) {
    console.error("putChapterAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const deleteChapterAction = (chapterId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxDeleteChapter(chapterId);
    return true;
  } catch (err) {
    console.error("deleteChapterAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};
