import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";

// Components
import { CardCategorySkeleton } from "../../components/skeleton/CardCategorySkeleton";

// CSS
import "react-alice-carousel/lib/alice-carousel.css";

// Component
import { CardCategory } from "../cards/CardCategory";

// Redux Action
import { getAllCategoriesAction } from "../../../redux/action/categories/CategoriesAction";

export const SliderCardCategories = () => {
  const dispatch = useDispatch();

  const storeCategories = useSelector(
    (state) => state.categories.categories.categories,
  );

  const isLoading = useSelector((state) => state.courses.loading);

  const getCategories = () => {
    dispatch(getAllCategoriesAction());
  };

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  const items =
    storeCategories &&
    storeCategories?.map((value) => (
      <CardCategory
        key={value.id}
        category={value.categoryName}
        thumbnail={value.categoryImg}
      />
    ));

  if (isLoading) {
    return (
      <div className="flex gap-4">
        {storeCategories &&
          storeCategories.map((value) => (
            <div key={value.id}>
              <CardCategorySkeleton />
            </div>
          ))}
      </div>
    );
  }

  return (
    <AliceCarousel
      mouseTracking
      disableButtonsControls
      disableDotsControls
      items={items}
      responsive={{
        0: {
          items: 1,
          itemsFit: "contain",
        },
        330: {
          items: 1.2,
          itemsFit: "contain",
        },
        430: {
          items: 1.5,
          itemsFit: "contain",
        },
        500: {
          items: 2,
          itemsFit: "contain",
        },
        560: {
          items: 2.4,
          itemsFit: "contain",
        },
        768: {
          items: 2.7,
          itemsFit: "contain",
        },
        870: {
          items: 3,
          itemsFit: "contain",
        },
        1100: {
          items: 3.7,
          itemsFit: "contain",
        },
        1200: {
          items: 4,
          itemsFit: "contain",
        },
        1400: {
          items: 5,
          itemsFit: "contain",
        },
        1500: {
          items: 5.5,
          itemsFit: "contain",
        },
      }}
    />
  );
};
