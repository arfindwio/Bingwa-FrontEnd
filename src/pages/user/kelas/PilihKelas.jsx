import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Components
import { NavbarKelas } from "../../../assets/components/navbar/NavbarKelas";
import { CardGlobal } from "../../../assets/components/cards/CardGlobal";
import { Pagination } from "../../../assets/components/pagination/Pagination";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SearchMobile } from "../../../assets/components/search/SearchMobile";

// Redux Actions
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import { getAllLessonsAction } from "../../../redux/action/lessons/LessonsAction";
import { getAllEnrollmentsAction } from "../../../redux/action/enrollments/EnrollmentsAction";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const PilihKelas = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Redux Store
  const storeCourses = useSelector((state) => state.courses.courses.courses);
  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);
  const storeEnrollments = useSelector((state) => state.enrollments.course);
  const storePaginationCourses = useSelector(
    (state) => state.courses.courses.pagination,
  );
  const isLoading = useSelector((state) => state.courses.loading);

  const [searchInput, setSearchInput] = useState("");

  const token = CookieStorage.get(CookiesKeys.AuthToken);
  const searchFilter = CookieStorage.get(CookiesKeys.SearchFilter);

  useEffect(() => {
    if (searchFilter) {
      setSearchInput(searchFilter);
      const formatSearch = `search=${searchFilter}&limit=15`;
      dispatch(getAllCoursesAction(formatSearch));

      CookieStorage.remove(CookiesKeys.SearchFilter);
    }
  }, [searchFilter]);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllCoursesAction("limit=15"));
    dispatch(getAllLessonsAction());
    if (token) dispatch(getAllEnrollmentsAction());
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarKelas />}
      <div className="flex h-fit min-h-screen flex-col justify-between bg-secondary">
        {isMobile ? <SearchMobile /> : <></>}
        <div className="flex flex-col justify-center px-4 pb-16 pt-4 md:px-4 md:pt-20 lg:px-24 lg:pt-20">
          {/* Search */}
          <div className="flex items-center justify-between py-4">
            <div className="-mt-8 py-6 text-xl font-bold md:mt-0 md:px-4 md:text-3xl lg:mt-0 lg:px-0 lg:text-3xl">
              Topik Kelas
            </div>
          </div>

          <div className="flex items-start justify-center py-4 md:justify-between md:py-0 lg:justify-between lg:py-0">
            {/* Button */}
            <div className="flex w-full flex-wrap items-center justify-between px-0 md:px-5 lg:px-0">
              {searchInput ? (
                <div className="-mt-12 font-medium md:mt-0 md:py-4 md:text-lg lg:mt-0 lg:pb-4 lg:pt-0 lg:text-lg">
                  Menampilkan{" "}
                  <span className="font-bold text-primary">
                    "{searchInput}"
                  </span>
                </div>
              ) : null}

              {/* Main Content */}
              <div className="grid w-full grid-cols-1 gap-6 py-2 md:grid-cols-2 lg:grid-cols-3">
                {/* Card Item */}
                {storeCourses.length === 0 ? (
                  <p className="col-span-3 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - Course tidak ditemukan -
                  </p>
                ) : (
                  storeCourses.map((value) => {
                    const lessonsData = storeLessons
                      ? storeLessons.filter(
                          (lesson) => lesson.chapter.course.id === value.id,
                        )
                      : null;
                    const enrollmentData = storeEnrollments
                      ? storeEnrollments.find(
                          (enrollCourse) =>
                            enrollCourse.courseId === Number(value.id),
                        )
                      : null;
                    return (
                      <CardGlobal
                        key={value.id}
                        courseId={value.id}
                        image={value.courseImg}
                        category={value.category.categoryName}
                        rating={value.averageRating}
                        title={value.courseName}
                        author={value.mentor}
                        price={value.price}
                        level={value.level}
                        duration={value.totalDuration}
                        isPremium={value.isPremium}
                        promotion={!value.promotion ? "" : value.promotion}
                        modul={lessonsData.length}
                        enrollmentData={enrollmentData}
                        totalRating={value.enrollment.length}
                      />
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              {storeCourses.length <= 15 ? null : (
                <div className="mx-auto mt-10 font-bold">
                  <Pagination
                    nextLink={storePaginationCourses.links.next}
                    prevLink={storePaginationCourses.links.prev}
                    totalItems={storePaginationCourses.total_items}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
