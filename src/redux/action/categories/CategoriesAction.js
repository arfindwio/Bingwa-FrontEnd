import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllCategories,
  reduxPostCategory,
  reduxPutCategory,
  reduxDeleteCategory,
} from "../../../services/categories/Categories";

import {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  startLoading,
  endLoading,
} from "../../reducer/categories/getAllCategoriesSlice";

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCategories();
    dispatch(setCategories(result.data.data.categories));
    return true;
  } catch (err) {
    console.error("reduxGetUser", err);
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
    console.error("postCourseAction", err);
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
    console.error("postCourseAction", err);
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
    console.error("postCourseAction", err);
    if (err.response.status === 404) {
      showErrorToast(err.response.data.message);
    }
  } finally {
    dispatch(endLoading());
  }
};
