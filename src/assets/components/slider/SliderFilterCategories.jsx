import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";

// CSS
import "react-alice-carousel/lib/alice-carousel.css";
import "./SliderFilterCategories.css";

// Redux Actions
import { getAllCategoriesAction } from "../../../redux/action/categories/getAllCategoriesAction";

export const SliderFilterCategories = ({
  selectedCategory,
  handleCategoryFilter,
}) => {
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

  const allCategory = { id: "all", categoryName: "All" };
  const categoriesWithAll = storeCategories
    ? [allCategory, ...storeCategories]
    : [];

  const items =
    categoriesWithAll &&
    categoriesWithAll?.map((value) => (
      <div
        key={value.id}
        className={`custom-carousel-item cursor-pointer rounded-xl px-5 py-1 text-base font-semibold transition-all ${
          selectedCategory === value.categoryName
            ? "bg-primary text-white"
            : "bg-secondary hover:bg-primary hover:text-white"
        }`}
        onClick={() => handleCategoryFilter(value.categoryName)}
      >
        {value.categoryName}
      </div>
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
          items: 4.7,
        },
      }}
    />
  );
};
