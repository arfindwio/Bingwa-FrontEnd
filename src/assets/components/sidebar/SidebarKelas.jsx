import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { filterCoursesAction } from "../../../redux/action/courses/filterCourseAction";

export const SidebarKelas = () => {
  const dispatch = useDispatch();

  // Redux Store
  const storeCategories = useSelector(
    (state) => state.dataCategories.categories,
  );

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleCategoryFilter = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    setSelectedCategories((prevCategories) => {
      const updatedCategories = isSelected
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value);

      dispatch(filterCoursesAction(updatedCategories, selectedLevels));

      return updatedCategories;
    });
  };

  const handleLevelFilter = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    setSelectedLevels((prevLevels) => {
      const updatedLevels = isSelected
        ? [...prevLevels, value]
        : prevLevels.filter((level) => level !== value);

      dispatch(filterCoursesAction(selectedCategories, updatedLevels));

      return updatedLevels;
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    dispatch(filterCoursesAction([], []));
  };

  return (
    <>
      <div className="flex w-full flex-col rounded-2xl bg-white p-0 md:p-4 lg:p-4">
        {/* Kategori */}
        <div className="flex px-4 py-3 text-xl font-bold">Kategori</div>
        <div className="flex flex-col space-y-4 pb-3 font-medium">
          {storeCategories?.map((value) => (
            <label key={value.id} className="flex items-center px-6">
              <input
                type="checkbox"
                value={value.categoryName}
                className="mr-2 h-[20px] w-[20px] cursor-pointer"
                checked={selectedCategories.includes(value.categoryName)}
                onChange={handleCategoryFilter}
              />
              {value.categoryName}
            </label>
          ))}
        </div>

        {/* Level Kesulitan */}
        <div className="flex px-4 py-3 text-xl font-bold">Level Kesulitan</div>
        <div className="flex flex-col space-y-4 pb-3 font-medium">
          <label className="flex items-center px-6">
            <input
              type="checkbox"
              value={"Beginner Level"}
              checked={selectedLevels.includes("Beginner Level")}
              onChange={handleLevelFilter}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Beginner Level
          </label>
          <label className="flex items-center px-6">
            <input
              type="checkbox"
              value={"Intermediate Level"}
              checked={selectedLevels.includes("Intermediate Level")}
              onChange={handleLevelFilter}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Intermediate Level
          </label>
          <label className="flex items-center px-6">
            <input
              type="checkbox"
              value={"Advanced Level"}
              checked={selectedLevels.includes("Advanced Level")}
              onChange={handleLevelFilter}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Advanced Level
          </label>
        </div>

        {/* Hapus Filter */}
        <div className="flex justify-center py-10">
          <button className="font-semibold text-red-600" onClick={clearFilters}>
            Hapus Filter
          </button>
        </div>
      </div>
    </>
  );
};
