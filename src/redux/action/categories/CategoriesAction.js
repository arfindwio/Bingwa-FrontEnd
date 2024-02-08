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
  dispatch(startLoading());

  let getAllInput = `?${fullQuery}`;

  return (
    fullQuery
      ? reduxGetAllCategoriesByQuery(getAllInput)
      : reduxGetAllCategories()
  )
    .then((result) => {
      dispatch(setCategories(result.data.data));
      return true;
    })
    .catch((err) => {
      console.error("getAllCategoriesAction", err);
      if (err.response && err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const postCategoryAction = (input) => async (dispatch) => {
  dispatch(startLoading());

  return reduxPostCategory(input)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error("postCategoryAction", err);
      if (err.response && err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const putCategoryAction = (input, categoryId) => async (dispatch) => {
  dispatch(startLoading());

  return reduxPutCategory(input, categoryId)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error("putCategoryAction", err);
      if (err.response && err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};

export const deleteCategoryAction = (categoryId) => async (dispatch) => {
  dispatch(startLoading());

  return reduxDeleteCategory(categoryId)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error("deleteCategoryAction", err);
      if (err.response && err.response.status === 404) {
        showErrorToast(err.response.data.message);
      }
    })
    .finally(() => {
      dispatch(endLoading());
    });
};
