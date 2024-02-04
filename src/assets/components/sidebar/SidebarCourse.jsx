import React from "react";
import { useSelector } from "react-redux";

// Redux Action

export const SidebarCourse = ({
  filters,
  selectedCategories,
  selectedLevels,
  handleFilterChange,
  clearAllFilters,
}) => {
  // Redux Store
  const storeCategories = useSelector(
    (state) => state.categories.categories.categories,
  );

  return (
    <>
      <div className="flex w-full flex-col rounded-2xl bg-white p-0 md:p-4 lg:p-4">
        {/* Filter */}
        <div className="flex px-4 py-3 text-xl font-bold">Filter</div>
        <div className="flex flex-col space-y-4 pb-3 font-medium">
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"newest"}
              checked={filters.newest}
              onChange={() => handleFilterChange("filter", "newest")}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Latest
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"populer"}
              checked={filters.populer}
              onChange={() => handleFilterChange("filter", "populer")}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Most Populer
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"promo"}
              checked={filters.promo}
              onChange={() => handleFilterChange("filter", "promo")}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Promo
          </label>
        </div>

        {/* Kategori */}
        <div className="flex px-4 py-3 text-xl font-bold">Category</div>
        <div className="flex flex-col space-y-4 pb-3 font-medium">
          {storeCategories?.map((value) => (
            <label
              key={value.id}
              className="flex cursor-pointer items-center px-6"
            >
              <input
                type="checkbox"
                value={value.categoryName}
                checked={selectedCategories.includes(value.categoryName)}
                onChange={() =>
                  handleFilterChange("category", value.categoryName)
                }
                className="mr-2 h-[20px] w-[20px] cursor-pointer"
              />
              {value.categoryName}
            </label>
          ))}
        </div>

        {/* Difficulty Level */}
        <div className="flex px-4 py-3 text-xl font-bold">Difficulty Level</div>
        <div className="flex flex-col space-y-4 pb-3 font-medium">
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"Beginner Level"}
              checked={selectedLevels.includes("Beginner Level")}
              onChange={() => handleFilterChange("level", "Beginner Level")}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Beginner Level
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"Intermediate Level"}
              checked={selectedLevels.includes("Intermediate Level")}
              onChange={() => handleFilterChange("level", "Intermediate Level")}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Intermediate Level
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"Advanced Level"}
              checked={selectedLevels.includes("Advanced Level")}
              onChange={() => handleFilterChange("level", "Advanced Level")}
              className="mr-2 h-[20px] w-[20px] cursor-pointer"
            />
            Advanced Level
          </label>
        </div>

        {/* Clear Filter */}
        <div className="flex justify-center pb-1 pt-3">
          <button
            className="font-semibold text-red-600"
            onClick={clearAllFilters}
          >
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};
