import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";
import { filterCoursesAction } from "../../../redux/action/courses/filterCourseAction";

// Material Tailwind Components
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const AllCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const categoryParam = new URLSearchParams(location.search).get("category");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Redux Store
  const storeCourses = useSelector((state) => state.dataCourses.courses);
  const storeFilteredCourses = useSelector(
    (state) => state.dataCourses.filteredCourses,
  );

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const getCourses = () => {
    dispatch(getAllCoursesAction());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCourses();
  }, [dispatch]);

  useEffect(() => {
    if (categoryParam) {
      dispatch(filterCoursesAction(categoryParam, []));
    }
  }, [categoryParam, dispatch]);

  // Search Feature
  const [searchInput, setSearchInput] = useState("");

  const handleSearchCourse = (searchInput) => {
    const search = dispatch(searchCourseAction(searchInput));

    if (search) {
      navigate(`/pilih-kelas?search=${searchInput}`);
    }
  };

  // Filter Feature
  const [displayedCourses, setDisplayedCourses] = useState([]);

  useEffect(() => {
    const coursesToDisplay =
      storeFilteredCourses?.length > 0 ? storeFilteredCourses : [];
    setDisplayedCourses(coursesToDisplay);
  }, [storeFilteredCourses, storeCourses]);

  const [open, setOpen] = React.useState(false);

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
                className="-mt-8 font-semibold text-primary md:mt-0 lg:mt-0"
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
              <SidebarKelas />
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
                {displayedCourses.length === 0 ? (
                  <p className="col-span-2 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - Course tidak ditemukan -
                  </p>
                ) : (
                  displayedCourses.map((value) => (
                    <CardGlobal
                      key={value.id}
                      image={value.courseImg}
                      category={value.category.categoryName}
                      rating={value.averageRating}
                      title={value.courseName}
                      author={value.mentor}
                      level={value.level}
                      modul={value.modul}
                      duration={value.duration}
                      courseId={value.id}
                      isPremium={value.isPremium}
                    />
                  ))
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
          <SidebarKelas />
        </DialogBody>
      </Dialog>
    </>
  );
};
