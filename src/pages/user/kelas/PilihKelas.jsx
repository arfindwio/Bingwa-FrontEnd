import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Icons
import { BiSearchAlt } from "react-icons/bi";

// Components
import { NavbarKelas } from "../../../assets/components/navbar/NavbarKelas";
import { CardGlobal } from "../../../assets/components/cards/CardGlobal";
import { NavbarHome } from "../../../assets/components/navbar/NavbarHome";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";
import { CardPremium } from "../../../assets/components/cards/CardPremium";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SearchMobile } from "../../../assets/components/search/SearchMobile";

// Redux Actions
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const PilihKelas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParam = new URLSearchParams(location.search).get("search");
  const [searchInput, setSearchInput] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Redux Store
  const storeSearchedCourses = useSelector(
    (state) => state.dataCourses.searchedCourses,
  );
  const isLoading = useSelector((state) => state.dataCourses.loading);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Search Feature
  const handleSearchCourse = (searchInput) => {
    const search = dispatch(searchCourseAction(searchInput));

    if (search) {
      setSearchInput("");
      navigate(`/pilih-kelas?search=${searchInput}`);
    }
  };

  return (
    <>
      {isMobile ? (
        <NavbarMobile />
      ) : token === undefined ? (
        <NavbarHome />
      ) : (
        <NavbarKelas />
      )}
      <div className="flex h-fit min-h-screen flex-col justify-between bg-secondary">
        {isMobile ? <SearchMobile /> : <></>}
        <div className="flex flex-col justify-center px-4 pb-16 pt-4 md:px-4 md:pt-20 lg:px-24 lg:pt-20">
          {/* Search */}
          <div className="flex items-center justify-between py-4">
            <div className="-mt-8 py-6 text-xl font-bold md:mt-0 md:px-4 md:text-3xl lg:mt-0 lg:px-0 lg:text-3xl">
              Topik Kelas
            </div>
            {isMobile ? (
              <></>
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

          <div className="flex items-start justify-center py-4 md:justify-between md:py-0 lg:justify-between lg:py-0">
            {/* Button */}
            <div className="flex w-full flex-wrap items-center justify-between px-0 md:px-5 lg:px-0">
              <div className="-mt-12 font-medium md:mt-0 md:py-4 md:text-lg lg:mt-0 lg:py-4 lg:text-lg">
                Menampilkan{" "}
                <span className="font-bold text-primary">"{searchParam}"</span>
              </div>
              {/* Main Content */}
              <div className="grid w-full grid-cols-1 gap-6 py-2 md:grid-cols-2 lg:grid-cols-3">
                {/* Card Item */}
                {storeSearchedCourses.length === 0 ? (
                  <p className="col-span-3 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - Course tidak ditemukan -
                  </p>
                ) : (
                  storeSearchedCourses.map((value) =>
                    value.isPremium ? (
                      <CardPremium
                        key={value.id}
                        courseId={value.id}
                        image={value.courseImg}
                        category={value.category.categoryName}
                        rating={value.averageRating}
                        title={value.courseName}
                        author={value.mentor}
                        level={value.level}
                        modul={value.modul}
                        duration={value.duration}
                        isPremium={"Premium"}
                      />
                    ) : (
                      <CardGlobal
                        key={value.id}
                        courseId={value.id}
                        image={value.courseImg}
                        category={value.category.categoryName}
                        rating={value.averageRating}
                        title={value.courseName}
                        author={value.mentor}
                        level={value.level}
                        modul={value.modul}
                        duration={value.duration}
                        isPremium={value.isPremium}
                      />
                    ),
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
