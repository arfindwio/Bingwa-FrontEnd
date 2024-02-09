import { showErrorToast } from "../../../helper/ToastHelper";

import {
  reduxGetAllPromotions,
  reduxGetAllPromotionsByQuery,
  reduxPostPromotion,
  reduxPutPromotions,
  reduxDeletePromotion,
} from "../../../services/promotions/Promotions";

import {
  setPromotions,
  startLoading,
  endLoading,
} from "../../reducer/promotions/PromotionsSlice";

export const getAllPromotionsAction = (fullQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let getAllInput = `?${fullQuery}`;

    const result = await (fullQuery
      ? reduxGetAllPromotionsByQuery(getAllInput)
      : reduxGetAllPromotions());
    dispatch(setPromotions(result.data.data));

    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postPromotionAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPostPromotion(input);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putPromotionAction = (input, PromotionsId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxPutPromotions(input, PromotionsId);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const deletePromotionAction = (PromotionsId) => (dispatch) => {
  try {
    dispatch(startLoading());
    reduxDeletePromotion(PromotionsId);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};
