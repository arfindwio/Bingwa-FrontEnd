import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";

// CSS
import "react-alice-carousel/lib/alice-carousel.css";
import "./SliderCardCategories.css";

// Component
import { CardKategory } from "../cards/CardKategory";

// Redux Action
import { getAllCategoriesAction } from "../../../redux/action/categories/getAllCategoriesAction";

export const SliderCardCategories = () => {
  const dispatch = useDispatch();

  const storeCategories = useSelector(
    (state) => state.dataCategories.categories,
  );

  const getCategories = () => {
    dispatch(getAllCategoriesAction());
  };

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  const items =
    storeCategories &&
    storeCategories?.map((value) => (
      <CardKategory
        key={value.id}
        category={value.categoryName}
        thumbnail={value.categoryImg}
      />
    ));

  return (
    <AliceCarousel
      mouseTracking
      disableButtonsControls
      disableDotsControls
      items={items}
      responsive={{
        0: {
          items: 1.5,
        },
        768: {
          items: 2.7,
        },
        1024: {
          items: 5.3,
        },
      }}
    />
  );
};
