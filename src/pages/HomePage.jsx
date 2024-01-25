import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";

// Images
import Header from "../assets/img/Header.webp";

// Components
import { NavbarHome } from "../assets/components/navbar/NavbarHome";
import { CardGlobal } from "../assets/components/cards/CardGlobal";
import { NavbarKelas } from "../assets/components/navbar/NavbarKelas";
import CardKategorySkeleton from "../assets/components/skeleton/CardKategorySkeleton";
import { Footer } from "../assets/components/footer/Footer";
import { NavbarMobile } from "../assets/components/navbar/NavbarMobile";
import { SearchMobile } from "../assets/components/search/SearchMobile";
import { SliderFilterCategories } from "../assets/components/slider/SliderFilterCategories";
import { SliderCardCategories } from "../assets/components/slider/SliderCardCategories";
import LoadingSpinner from "../assets/components/loading/loadingSpinner";

// Redux Actions
import { getAllCategoriesAction } from "../redux/action/categories/getAllCategoriesAction";
import { getAllCoursesAction } from "../redux/action/courses/getAllCoursesAction";
import { getAllLessonsAction } from "../redux/action/lessons/getAllLessons";
import { getAllEnrollmentsAction } from "../redux/action/enrollments/getAllEnrollmentsAction";

// Cookies
import { CookieStorage, CookiesKeys } from "../utils/cookie";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Redux Store
  const storeCategories = useSelector(
    (state) => state.dataCategories.categories,
  );
  const storeCourses = useSelector(
    (state) => state.dataCourses.courses.courses,
  );
  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);
  const storeEnrollments = useSelector((state) => state.enrollments.course);
  const loading = useSelector((state) => state.authLogin.loading);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllCoursesAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllLessonsAction());
    if (token) dispatch(getAllEnrollmentsAction());
  };

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarKelas />}
      <div className="flex flex-col md:mt-[5rem] lg:mt-[5rem]">
        {isMobile ? <SearchMobile /> : <></>}
        {/* Hero Section */}
        <div className="hidden md:flex lg:flex">
          <div className="relative -z-10 w-2/3">
            <img src={Header} alt="Header" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-primary"></div>
          </div>
          <div className="flex w-full items-center justify-center bg-primary md:w-1/3 md:pr-10 lg:w-1/3 lg:pr-6">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-semibold tracking-wide text-white md:text-xl lg:text-3xl">
                Belajar
              </div>
              <div className="text-lg font-semibold tracking-wide text-white md:text-xl lg:text-3xl">
                dari Praktisi Terbaik!
              </div>
              <div
                className="mt-4 cursor-pointer rounded-lg border-2 bg-white px-3 py-2 text-center text-lg font-bold tracking-wide text-primary transition-all hover:border-white hover:bg-primary hover:text-white"
                onClick={() => {
                  navigate("/all-kelas");
                }}
              >
                IKUTI KELAS
              </div>
            </div>
          </div>
        </div>

        {/* Start Kategori Belajar Section */}
        <div className="flex flex-col gap-5 bg-secondary px-4 py-6 md:px-20 md:py-12 lg:px-28 lg:py-12">
          <div className="flex items-center">
            <div className="text-xl font-semibold md:text-2xl lg:text-2xl">
              Kategori Belajar
            </div>
          </div>
          {storeCategories == null ? (
            <div className="grid grid-cols-6 gap-4">
              <CardKategorySkeleton />
            </div>
          ) : (
            <div className="-ms-6">
              <SliderCardCategories />
            </div>
          )}
        </div>
        {/* End Kategori Belajar Section */}

        {/* Start Kursus Populer Section */}
        <div className="flex flex-col gap-8 px-4 py-6 md:px-20 md:py-12 lg:px-28 lg:py-12">
          <div className="flex items-center justify-between">
            <div className="lg:text:2xl text-xl font-semibold md:text-2xl">
              Kursus Pembelajaran
            </div>
            <div
              className="text-md cursor-pointer font-semibold text-primary md:text-lg lg:text-lg"
              onClick={toggleShowAllCourses}
            >
              {showAllCourses ? "Lebih Sedikit" : "Lihat Semua"}
            </div>
          </div>

          {/* Filter */}
          <div className="-ms-3">
            <SliderFilterCategories
              storeCategories={storeCategories}
              selectedCategory={selectedCategory}
              handleCategoryFilter={handleCategoryFilter}
            />
          </div>

          {/* Container Card Kelas */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {showAllCourses ? (
              storeCourses?.filter(
                (value) =>
                  selectedCategory === "All" ||
                  value.category.categoryName === selectedCategory,
              ).length > 0 ? (
                storeCourses
                  ?.filter(
                    (value) =>
                      selectedCategory === "All" ||
                      value.category.categoryName === selectedCategory,
                  )
                  .slice(0, 6)
                  .map((value) => {
                    const lessonsData = storeLessons
                      ? storeLessons?.filter(
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
                        image={value.courseImg}
                        category={value.category.categoryName}
                        rating={value.averageRating}
                        title={value.courseName}
                        author={value.mentor}
                        level={value.level}
                        duration={value.totalDuration}
                        price={value.price}
                        courseId={value.id}
                        isPremium={value.isPremium}
                        promotion={!value.promotion ? "" : value.promotion}
                        totalRating={value.enrollment?.length}
                        modul={lessonsData?.length}
                        enrollmentData={enrollmentData}
                      />
                    );
                  })
              ) : (
                <p className="col-span-3 py-10 text-center text-lg italic text-slate-500">
                  - Course Belum Tersedia -
                </p>
              )
            ) : storeCourses
                ?.filter(
                  (value) =>
                    selectedCategory === "All" ||
                    value.category.categoryName === selectedCategory,
                )
                .slice(0, 3).length > 0 ? (
              storeCourses
                ?.filter(
                  (value) =>
                    selectedCategory === "All" ||
                    value.category.categoryName === selectedCategory,
                )
                .slice(0, 3)
                .map((value) => {
                  const lessonsData = storeLessons
                    ? storeLessons?.filter(
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
                      image={value.courseImg}
                      category={value.category.categoryName}
                      rating={value.averageRating}
                      title={value.courseName}
                      author={value.mentor}
                      level={value.level}
                      duration={value.totalDuration}
                      price={value.price}
                      courseId={value.id}
                      isPremium={value.isPremium}
                      promotion={!value.promotion ? "" : value.promotion}
                      totalRating={value.enrollment?.length}
                      modul={lessonsData?.length}
                      enrollmentData={enrollmentData}
                    />
                  );
                })
            ) : (
              <p className="col-span-3 py-10 text-center text-lg italic text-slate-500">
                - Course Belum Tersedia -
              </p>
            )}
          </div>
        </div>
        {/* End Kursus Populer */}
      </div>
      <Footer />
    </>
  );
};
