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

    const result = fullQuery
      ? await reduxGetAllChaptersByQuery(getAllInput)
      : await reduxGetAllChapters();

    dispatch(setChapters(result.data.data));

    return true;
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postChapterAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await reduxPostChapter(input);

    return true; // Signal success
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putChapterAction = (input, chapterId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await reduxPutChapter(input, chapterId);

    return true; // Signal success
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const deleteChapterAction = (chapterId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await reduxDeleteChapter(chapterId);

    return true; // Signal success
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};
