import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";

// CSS
import "react-alice-carousel/lib/alice-carousel.css";

// Redux Actions
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";

export const SliderFilterCategories = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const storeCategories = useSelector(
    (state) => state.categories.categories.categories,
  );

  useEffect(() => {
    if (selectedCategory === "all") {
      dispatch(getAllCoursesAction());
    } else {
      const formatQuery = `c=${selectedCategory}`;
      dispatch(getAllCoursesAction(formatQuery));
    }
  }, [dispatch, selectedCategory]);

  // Membuat elemen untuk kategori "All" secara statis di luar pemetaan map
  const allCategoryElement = (
    <div
      key="all"
      className={`mx-2 flex h-auto cursor-pointer items-center justify-center rounded-xl px-5 py-1 text-base font-semibold transition-all ${
        selectedCategory === "all"
          ? "bg-primary text-white"
          : "bg-secondary hover:bg-primary hover:text-white"
      }`}
      onClick={() => setSelectedCategory("all")}
    >
      All
    </div>
  );

  // Menggabungkan elemen "All" dengan elemen-elemen kategori yang dihasilkan dari pemetaan map
  const items = [
    allCategoryElement,
    ...(storeCategories?.map((value) => (
      <div
        key={value.id}
        className={`mx-2 flex h-auto cursor-pointer items-center justify-center rounded-xl px-5 py-1 text-base font-semibold transition-all ${
          selectedCategory === value.categoryName
            ? "bg-primary text-white"
            : "bg-secondary hover:bg-primary hover:text-white"
        }`}
        onClick={() => setSelectedCategory(value.categoryName)}
      >
        {value.categoryName}
      </div>
    )) || []),
  ];

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
