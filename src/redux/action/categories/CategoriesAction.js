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

    const result = await (fullQuery
      ? reduxGetAllCategoriesByQuery(getAllInput)
      : reduxGetAllCategories());

    dispatch(setCategories(result.data.data));
    return true;
  } catch (err) {
    console.error("getAllCategoriesAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postCategoryAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPostCategory(input);
    return true;
  } catch (err) {
    console.error("postCategoryAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putCategoryAction = (input, categoryId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPutCategory(input, categoryId);
    return true;
  } catch (err) {
    console.error("putCategoryAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const deleteCategoryAction = (categoryId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxDeleteCategory(categoryId);
    return true;
  } catch (err) {
    console.error("deleteCategoryAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};
