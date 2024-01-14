import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Icons
import { BiSearchAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

// Component
import { NavbarKelas } from "../../../assets/components/navbar/NavbarKelas";
import { NavbarHome } from "../../../assets/components/navbar/NavbarHome";
import { CardGlobal } from "../../../assets/components/cards/CardGlobal";
import { SidebarKelas } from "../../../assets/components/sidebar/SidebarKelas";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SearchMobile } from "../../../assets/components/search/SearchMobile";

// Redux Actions
import { getAllCoursesAction } from "../../../redux/action/courses/getAllCoursesAction";
import { getAllLessonsAction } from "../../../redux/action/lessons/getAllLessons";

// Material Tailwind Components
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const AllCourse = () => {
  const navigate = useNavigate();
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
  const storeCourses = useSelector((state) => state.dataCourses.courses);
  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllCoursesAction());
    dispatch(getAllLessonsAction());
  };

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === "filter") {
      setFilters((prevFilters) => {
        const newFilters = {
          ...prevFilters,
          [value]: !prevFilters[value],
        };
        return newFilters;
      });
    } else if (filterType === "category") {
      setSelectedCategories((prevCategories) => {
        return prevCategories.includes(value)
          ? prevCategories.filter((category) => category !== value)
          : [...prevCategories, value];
      });
    } else if (filterType === "level") {
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

  // Search Feature
  const handleSearchCourse = () => {
    const formatSearch = `search=${searchInput}`;

    const fullQuery = `${formatSearch}&${queryParams}`;

    dispatch(getAllCoursesAction(fullQuery));
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {isMobile ? (
        <NavbarMobile />
      ) : token === undefined ? (
        <NavbarHome />
      ) : (
        <NavbarKelas />
      )}
      <div className="flex h-full flex-col justify-between bg-secondary">
        {isMobile ? <SearchMobile /> : <></>}
        <div className="flex flex-col justify-center px-4 pb-16 pt-2 md:px-8 md:pb-0 md:pt-20 lg:px-24 lg:pb-0 lg:pt-20">
          {/* Search */}
          <div className="flex items-center justify-between py-4">
            <div className="-mt-8 px-0 py-6 text-xl font-bold md:mt-0 md:text-3xl lg:mt-0 lg:text-3xl">
              Topik Kelas
            </div>
            {isMobile ? (
              <div
                className="mt-8 font-semibold text-primary md:mt-0 lg:mt-0"
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
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleSearchCourse(searchInput) : ""
                  }
                  className="cursor-pointer rounded-3xl border-2 border-primary px-1 py-2 outline-none md:px-4 lg:px-4"
                  placeholder="Cari Kelas..."
                />
                <BiSearchAlt
                  size={25}
                  className="absolute inset-y-2 right-4 cursor-pointer rounded-lg bg-primary p-1 text-white"
                  onClick={() => {
                    handleSearchCourse(searchInput);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-start justify-center py-4 md:justify-between lg:justify-between">
            {/* Filter */}
            <div className="hidden w-[30%] md:flex lg:flex">
              <SidebarKelas
                filters={filters}
                selectedCategories={selectedCategories}
                selectedLevels={selectedLevels}
                handleFilterChange={handleFilterChange}
                queryParams={queryParams}
                searchInput={searchInput}
              />
            </div>

            {/* Button */}
            <div className="-mt-10 flex w-full flex-wrap items-center justify-between font-semibold md:mt-0 md:w-[65%] lg:mt-0 lg:w-[65%]">
              <div className="flex w-full gap-4 text-center">
                <div className="flex w-[20%] cursor-pointer items-center justify-center rounded-xl bg-primary py-2 text-sm text-white md:text-base lg:text-base">
                  <button>All</button>
                </div>
                <div
                  className="flex w-[40%] cursor-pointer items-center justify-center rounded-xl bg-white py-2 text-sm md:w-[50%] md:text-base lg:w-[60%] lg:text-base"
                  onClick={() => {
                    navigate("/pilih-premium");
                  }}
                >
                  <button>Kelas Premium</button>
                </div>
                <div
                  className="flex w-[30%] cursor-pointer items-center justify-center rounded-xl bg-white py-2 text-sm md:w-[40%] md:text-base lg:w-[30%] lg:text-base"
                  onClick={() => {
                    navigate("/pilih-gratis");
                  }}
                >
                  <button>Kelas Gratis</button>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid w-full grid-cols-1 gap-6 py-4 md:grid-cols-1 lg:grid-cols-2">
                {storeCourses.length === 0 ? (
                  <p className="col-span-2 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - Course tidak ditemukan -
                  </p>
                ) : (
                  storeCourses.map((value) => {
                    const lessonsData = storeLessons
                      ? storeLessons.filter(
                          (lesson) =>
                            lesson.chapter.course.courseName ===
                            value.courseName,
                        )
                      : null;

                    return (
                      <CardGlobal
                        key={value.id}
                        image={value.courseImg}
                        category={value.category.categoryName}
                        rating={value.averageRating}
                        title={value.courseName}
                        author={value.mentor}
                        level={value.level}
                        modul={lessonsData?.length}
                        duration={value.totalDuration}
                        courseId={value.id}
                        isPremium={value.isPremium}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Filter */}
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader className="-mb-6 flex justify-end pr-4 pt-4">
          <IoClose size={30} onClick={handleOpen} />
        </DialogHeader>
        <DialogBody>
          <SidebarKelas
            filters={filters}
            selectedCategories={selectedCategories}
            selectedLevels={selectedLevels}
            handleFilterChange={handleFilterChange}
            queryParams={queryParams}
            searchInput={searchInput}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};
