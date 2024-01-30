import React from "react";
import { useSelector } from "react-redux";

// Redux Action

export const SidebarKelas = ({
  filters,
  selectedCategories,
  selectedLevels,
  handleFilterChange,
  clearAllFilters,
}) => {
  // Redux Store
  const storeCategories = useSelector(
    (state) => state.dataCategories.categories,
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
              className="mr-2 h-[20px] w-[20px] "
            />
            Paling Baru
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"populer"}
              checked={filters.populer}
              onChange={() => handleFilterChange("filter", "populer")}
              className="mr-2 h-[20px] w-[20px]"
            />
            Paling Populer
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"promo"}
              checked={filters.promo}
              onChange={() => handleFilterChange("filter", "promo")}
              className="mr-2 h-[20px] w-[20px]"
            />
            Promo
          </label>
        </div>

        {/* Kategori */}
        <div className="flex px-4 py-3 text-xl font-bold">Kategori</div>
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
                className="mr-2 h-[20px] w-[20px]"
              />
              {value.categoryName}
            </label>
          ))}
        </div>

        {/* Level Kesulitan */}
        <div className="flex px-4 py-3 text-xl font-bold">Level Kesulitan</div>
        <div className="flex flex-col space-y-4 pb-3 font-medium">
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"Beginner Level"}
              checked={selectedLevels.includes("Beginner Level")}
              onChange={() => handleFilterChange("level", "Beginner Level")}
              className="mr-2 h-[20px] w-[20px]"
            />
            Beginner Level
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"Intermediate Level"}
              checked={selectedLevels.includes("Intermediate Level")}
              onChange={() => handleFilterChange("level", "Intermediate Level")}
              className="mr-2 h-[20px] w-[20px]"
            />
            Intermediate Level
          </label>
          <label className="flex cursor-pointer items-center px-6">
            <input
              type="checkbox"
              value={"Advanced Level"}
              checked={selectedLevels.includes("Advanced Level")}
              onChange={() => handleFilterChange("level", "Advanced Level")}
              className="mr-2 h-[20px] w-[20px]"
            />
            Advanced Level
          </label>
        </div>

        {/* Hapus Filter */}
        <div className="flex justify-center pb-1 pt-3">
          <button
            className="font-semibold text-red-600"
            onClick={clearAllFilters}
          >
            Hapus Filter
          </button>
        </div>
      </div>
    </>
  );
};
