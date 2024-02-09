import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllCategories,
  reduxGetAllCategoriesByQuery,
  reduxPostCategory,
  reduxPutCategory,
  reduxDeleteCategory,
} from "../../../services/categories/Categories";

import {
  setCategories,
  startLoading,
  endLoading,
} from "../../reducer/categories/CategoriesSlice";

export const getAllCategoriesAction = (fullQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());

    let getAllInput = `?${fullQuery}`;

    const result = fullQuery
      ? await reduxGetAllCategoriesByQuery(getAllInput)
      : await reduxGetAllCategories();

    dispatch(setCategories(result.data.data));

    return true;
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      showErrorToast(error.response.data.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    return false;
  } finally {
    dispatch(endLoading());
  }
};

export const postCategoryAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCategory(input);
    return true;
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      showErrorToast(error.response.data.message);
    } else {
      console.error("unexpected Error", error);
    }
    return false;
  } finally {
    dispatch(endLoading());
  }
};

export const putCategoryAction = (input, categoryId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutCategory(input, categoryId);
    return true;
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      showErrorToast(error.response.data.message);
    } else {
      console.error("unexpected Error", error);
    }
    return false;
  } finally {
    dispatch(endLoading());
  }
};

export const deleteCategoryAction = (categoryId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteCategory(categoryId);
    return true;
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      showErrorToast(error.response.data.message);
    } else {
      console.error("unexpected Error", error);
    }
    return false;
  } finally {
    dispatch(endLoading());
  }
};
