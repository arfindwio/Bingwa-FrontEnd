import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Icons
import { BiSearchAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

// Component
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { CardGlobal } from "../../../assets/components/cards/CardGlobal";
import { SidebarCourse } from "../../../assets/components/sidebar/SidebarCourse";
import { Pagination } from "../../../assets/components/pagination/Pagination";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SearchMobile } from "../../../assets/components/search/SearchMobile";
import { Footer } from "../../../assets/components/footer/Footer";

// Redux Actions
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import { getAllLessonsAction } from "../../../redux/action/lessons/LessonsAction";
import { getAllEnrollmentsAction } from "../../../redux/action/enrollments/EnrollmentsAction";

// Material Tailwind Components
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const AllCourse = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    newest: false,
    populer: false,
    promo: false,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  // Redux Store
  const storeCourses = useSelector((state) => state.courses.courses.courses);
  const storePaginationCourses = useSelector(
    (state) => state.courses.courses.pagination,
  );
  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);
  const storeEnrollments = useSelector(
    (state) => state.enrollments.enrollments,
  );
  const isLoadingCourses = useSelector((state) => state.courses.loading);

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  const token = CookieStorage.get(CookiesKeys.AuthToken);
  const categoryFilter = CookieStorage.get(CookiesKeys.CategoryFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (categoryFilter) {
      if (!selectedCategories.includes(categoryFilter)) {
        return setSelectedCategories([categoryFilter]);
      }

      return CookieStorage.remove(CookiesKeys.CategoryFilter);
    } else {
      return getAllData();
    }
  }, [categoryFilter, filters, selectedCategories, selectedLevels, dispatch]);

  useEffect(() => {
    const formatSearch = searchInput ? `search=${searchInput}` : "";
    const fullQuery = formatSearch
      ? `${formatSearch}&${queryParams}`
      : queryParams;

    dispatch(getAllCoursesAction(fullQuery));
  }, [
    categoryFilter,
    filters,
    selectedCategories,
    selectedLevels,
    searchInput,
    dispatch,
  ]);

  const getAllData = () => {
    dispatch(getAllCoursesAction());
    dispatch(getAllLessonsAction());
    if (token) dispatch(getAllEnrollmentsAction());
  };

  // Function to handle filter changes

  const handleFilterChange = (filterType, value) => {
    if (filterType === "filter") {
      if (value === "all") {
        setFilters((prevFilters) => {
          const newFilters = {
            ...prevFilters,
            [value]: !prevFilters[value],
          };

          newFilters.all = false;
          newFilters.free = false;
          newFilters.premium = false;

          return newFilters;
        });
      } else {
        setFilters((prevFilters) => {
          const newFilters = {
            ...prevFilters,
            [value]: !prevFilters[value],
          };

          if (value === "premium" && newFilters.free) {
            newFilters.free = false;
            newFilters.all = false;
          } else if (value === "free" && newFilters.premium) {
            newFilters.premium = false;
            newFilters.all = false;
          }

          if (value === "newest" && newFilters.populer) {
            newFilters.populer = false;
          } else if (value === "populer" && newFilters.newest) {
            newFilters.newest = false;
          }

          return newFilters;
        });
      }
    } else if (filterType === "category") {
      // Handle category filter changes
      setSelectedCategories((prevCategories) => {
        return prevCategories.includes(value)
          ? prevCategories.filter((category) => category !== value)
          : [...prevCategories, value];
      });
    } else if (filterType === "level") {
      // Handle level filter changes
      setSelectedLevels((prevLevels) => {
        return prevLevels.includes(value)
          ? prevLevels.filter((level) => level !== value)
          : [...prevLevels, value];
      });
    }
  };

  const createQueryParams = (filters, selectedCategories, selectedLevels) => {
    const queryParams = [];

    // Handle checkbox filters (newest, popular, promo)
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.push(`f=${key}`);
      }
    });

    // Handle category filters
    selectedCategories.forEach((category) => {
      queryParams.push(`c=${encodeURIComponent(category)}`);
    });

    // Handle level filters
    selectedLevels.forEach((level) => {
      queryParams.push(`l=${encodeURIComponent(level)}`);
    });

    return queryParams.join("&");
  };

  const queryParams = createQueryParams(
    filters,
    selectedCategories,
    selectedLevels,
  );

  const clearAllFilters = () => {
    setFilters({
      newest: false,
      populer: false,
      promo: false,
      all: false,
      free: false,
      premium: false,
    });
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarCourse />}
      <div className="flex h-full min-h-screen flex-col justify-between bg-secondary pb-4">
        {isMobile ? <SearchMobile /> : <></>}
        <div className="flex flex-col justify-center px-4 pb-16 pt-2 md:px-8 md:pb-0 md:pt-20 lg:px-24 lg:pb-0 lg:pt-20">
          {/* Search */}
          <div className="flex items-center justify-between pt-4 sm:py-8 md:pb-0 md:pt-6">
            <div className="-mt-8 mb-2 px-0 py-6 text-xl font-bold sm:mb-0 sm:py-0 md:mt-0 md:text-3xl lg:mt-0 lg:text-3xl">
              Courses Topics
            </div>
            {isMobile ? (
              <div
                className="-mt-8 cursor-pointer font-semibold text-primary md:mt-0 lg:mt-0"
                onClick={handleOpen}
              >
                Filter
              </div>
            ) : (
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="cursor-pointer rounded-3xl border-2 border-primary py-2 pl-1 pr-3 outline-none md:px-4 lg:pl-4 lg:pr-12"
                  placeholder="Search Course..."
                />
                <BiSearchAlt
                  size={25}
                  className="absolute inset-y-2 right-4 cursor-pointer rounded-lg bg-primary p-1 text-white"
                />
              </div>
            )}
          </div>

          <div className="flex  items-start justify-center py-4 md:justify-between lg:justify-between">
            {/* Filter */}
            <div className="hidden w-[30%] md:flex lg:flex">
              <SidebarCourse
                filters={filters}
                selectedCategories={selectedCategories}
                selectedLevels={selectedLevels}
                handleFilterChange={handleFilterChange}
                clearAllFilters={clearAllFilters}
              />
            </div>

            {/* Button */}
            <div className="-mt-10 flex w-full flex-wrap items-center justify-between font-semibold md:mt-0 md:w-[65%] lg:mt-0 lg:w-[65%]">
              <div className="flex w-full gap-4 text-center">
                <div
                  className={`flex w-[20%] cursor-pointer items-center justify-center rounded-xl py-2 text-sm   md:text-base lg:text-base ${
                    filters.premium || filters.free
                      ? "bg-white hover:bg-primary hover:text-white"
                      : "bg-primary text-white"
                  }`}
                  onClick={() => handleFilterChange("filter", "all")}
                >
                  <button>All</button>
                </div>
                <div
                  className={`rounded- flex w-[40%] cursor-pointer items-center justify-center rounded-xl py-2 text-sm md:w-[50%] md:text-base lg:w-[60%] lg:text-base ${
                    filters.premium
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleFilterChange("filter", "premium")}
                >
                  <button>Premium Course</button>
                </div>
                <div
                  className={`flex w-[30%] cursor-pointer items-center justify-center rounded-xl  py-2 text-sm md:w-[40%] md:text-base lg:w-[30%] lg:text-base ${
                    filters.free
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleFilterChange("filter", "free")}
                >
                  <button>Free Course</button>
                </div>
              </div>

              {/* Main Content */}
              {searchInput ? (
                <div className="-mt-12 truncate font-medium md:mt-0 md:pt-4 md:text-lg lg:mt-0 lg:text-lg">
                  Result for
                  <span className="ms-3 font-bold text-primary ">
                    "{searchInput}"
                  </span>
                </div>
              ) : null}
              <div className="grid w-full grid-cols-1 gap-6 py-4 md:grid-cols-1 xl:grid-cols-2">
                {storeCourses?.length === 0 ? (
                  <p className="col-span-2 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - Course not found -
                  </p>
                ) : (
                  storeCourses?.map((value) => {
                    const lessonsData = storeLessons
                      ? storeLessons.filter(
                          (lesson) => lesson?.chapter?.course.id === value.id,
                        )
                      : null;

                    const enrollmentData = storeEnrollments?.find(
                      (enrollCourse) => {
                        return (
                          Number(enrollCourse.courseId) === Number(value.id)
                        );
                      },
                    );

                    return (
                      <CardGlobal
                        key={value?.id}
                        image={value?.courseImg}
                        category={value?.category?.categoryName}
                        rating={value?.averageRating}
                        totalRating={value?.enrollment?.length}
                        title={value?.courseName}
                        author={value?.mentor}
                        level={value?.level}
                        duration={value?.totalDuration}
                        courseId={value?.id}
                        isPremium={value?.isPremium}
                        price={value?.price}
                        promotion={!value?.promotion ? "" : value?.promotion}
                        modul={lessonsData?.length}
                        enrollmentData={enrollmentData}
                      />
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              {isLoadingCourses ? null : (
                <div className="mx-auto">
                  <Pagination
                    type={"courses"}
                    nextLink={storePaginationCourses?.links?.next}
                    prevLink={storePaginationCourses?.links?.prev}
                    totalItems={storePaginationCourses?.total_items}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Dialog Filter */}
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader className="-mb-6 flex justify-end pr-4 pt-4">
          <IoClose size={30} onClick={handleOpen} />
        </DialogHeader>
        <DialogBody>
          <SidebarCourse
            filters={filters}
            selectedCategories={selectedCategories}
            selectedLevels={selectedLevels}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};
