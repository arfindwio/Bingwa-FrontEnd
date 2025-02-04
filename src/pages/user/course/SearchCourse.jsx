import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { CardGlobal } from "../../../assets/components/cards/CardGlobal";
import { Pagination } from "../../../assets/components/pagination/Pagination";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SearchMobile } from "../../../assets/components/search/SearchMobile";

// Redux Actions
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import { getAllLessonsAction } from "../../../redux/action/lessons/LessonsAction";
import { getAllEnrollmentsAction } from "../../../redux/action/enrollments/EnrollmentsAction";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const SearchCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  // Redux Store
  const storeCourses = useSelector((state) => state.courses.courses.courses);
  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);
  const storeEnrollments = useSelector(
    (state) => state.enrollments.enrollments,
  );
  const storePaginationCourses = useSelector(
    (state) => state.courses.courses.pagination,
  );
  const isLoading = useSelector((state) => state.courses.loading);

  // Get Token
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    if (location.state) {
      const formatSearch = `search=${location.state.inputSearch}&limit=15`;
      dispatch(getAllCoursesAction(formatSearch));
    } else {
      dispatch(getAllCoursesAction("limit=15"));
    }
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(getAllLessonsAction());
    if (token) dispatch(getAllEnrollmentsAction());
  }, [dispatch, token]);

  const handleQuery = (formatLink) => {
    dispatch(getAllCoursesAction(formatLink));
  };

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarCourse />}
      <div className="flex h-fit min-h-screen flex-col justify-between bg-secondary">
        {isMobile ? <SearchMobile /> : <></>}
        <div className="flex flex-col justify-center px-4 pb-16 pt-4 md:px-4 md:pt-20 lg:px-24 lg:pt-20">
          {/* Search */}
          <div className="flex items-center justify-between py-4">
            <div className="-mt-8 py-6 text-xl font-bold md:mt-0 md:px-4 md:text-3xl lg:mt-0 lg:px-0 lg:text-3xl">
              Courses Topics
            </div>
          </div>

          <div className="flex items-start justify-center py-4 md:justify-between md:py-0 lg:justify-between lg:py-0">
            {/* Button */}
            <div className="flex w-full flex-wrap items-center justify-between px-0 md:px-5 lg:px-0">
              {location.state.inputSearch ? (
                <div className="-mt-12 font-medium md:mt-0 md:py-4 md:text-lg lg:mt-0 lg:pb-4 lg:pt-0 lg:text-lg">
                  Result for
                  <span className="ms-2 font-bold text-primary">
                    "{location.state.inputSearch}"
                  </span>
                </div>
              ) : null}

              {/* Main Content */}
              <div className="grid w-full grid-cols-1 gap-6 py-2 md:grid-cols-2 lg:grid-cols-3">
                {/* Card Item */}
                {storeCourses.length === 0 ? (
                  <p className="col-span-3 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - Course Not Found -
                  </p>
                ) : (
                  storeCourses?.map((value) => {
                    const lessonsData = storeLessons
                      ? storeLessons?.filter(
                          (lesson) => lesson?.chapter?.course?.id === value.id,
                        )
                      : null;
                    const enrollmentData = storeEnrollments
                      ? storeEnrollments?.find(
                          (enrollCourse) =>
                            enrollCourse?.courseId === Number(value?.id),
                        )
                      : null;
                    return (
                      <CardGlobal
                        key={value?.id}
                        courseId={value?.id}
                        image={value?.courseImg}
                        category={value?.category?.categoryName}
                        rating={value?.averageRating}
                        title={value?.courseName}
                        author={value?.mentor}
                        price={value?.price}
                        level={value?.level}
                        duration={value?.totalDuration}
                        isPremium={value?.isPremium}
                        promotion={!value?.promotion ? "" : value?.promotion}
                        modul={lessonsData?.length}
                        enrollmentData={enrollmentData}
                        totalRating={value?.enrollment?.length}
                      />
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              {isLoading ? null : (
                <div className="mx-auto mt-10 font-semibold">
                  <Pagination
                    onQuery={handleQuery}
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
    </>
  );
};
