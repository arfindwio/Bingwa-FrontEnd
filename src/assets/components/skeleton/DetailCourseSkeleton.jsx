import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Icons

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DetailCourseSkeleton = () => {
  const { courseId } = useParams();

  const storeDetailCourses = useSelector((state) => state.courses.detailCourse);
  const storeEnrollments = useSelector(
    (state) => state.enrollments.enrollments,
  );

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const enrollmentData = storeEnrollments
    ? storeEnrollments.find(
        (enrollCourse) => enrollCourse.courseId === Number(courseId),
      )
    : null;

  const selectedCourse = !token
    ? storeDetailCourses
    : !enrollmentData
      ? storeDetailCourses
      : enrollmentData.course;

  return (
    <>
      {/* Parent Container */}
      <div className="z-20 flex min-h-screen animate-pulse px-0 py-6 md:px-4 lg:px-20">
        {/* Bagian 1 */}
        {/* Left Container */}
        <div className="mt-16 flex w-full flex-col gap-4 px-4 md:w-3/5 lg:w-3/5">
          {/* Button Back */}
          <div className="flex items-center gap-2 py-4">
            <div className="h-6 w-6 rounded-md bg-slate-200 opacity-50"></div>
            <div className="h-5 w-[20%] rounded bg-slate-200 opacity-50"></div>
          </div>

          {/* Container Desc Kelas */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="h-6 w-[30%] rounded bg-slate-200 opacity-50"></div>
              <div className="h-6 w-[15%] rounded bg-slate-200 opacity-50"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-8 w-[45%] rounded bg-slate-200 opacity-50"></div>
              <div className="mt-2 h-5 w-[10%] rounded bg-slate-200 opacity-50"></div>
            </div>
            <div className="flex gap-4 md:gap-10 lg:gap-10">
              <div className="flex w-1/3 items-center gap-3">
                <div className="h-6 w-7 rounded bg-slate-200 opacity-50"></div>
                <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
              </div>
              <div className="flex w-1/3 items-center gap-3">
                <div className="h-6 w-7 rounded bg-slate-200 opacity-50"></div>
                <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
              </div>
              <div className="flex w-1/3 items-center gap-3">
                <div className="h-6 w-7 rounded bg-slate-200 opacity-50"></div>
                <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-[30%] rounded-xl bg-slate-200 opacity-50"></div>
            <div className="h-10 w-[30%] rounded-xl bg-slate-200 opacity-50"></div>
          </div>

          {/* Section Detail Kelas */}
          <div className="flex flex-col">
            <div className="mb-2 h-72 w-full rounded-2xl bg-slate-200 opacity-50"></div>
            <div className="flex flex-col gap-3">
              {/* Tentang Kelas */}
              <div className="flex flex-col gap-2">
                <div className="h-7 w-[25%] rounded bg-slate-200 opacity-50"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
                  <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
                  <div className="h-4 w-[30%] rounded bg-slate-200 opacity-50"></div>
                </div>
              </div>

              {/* Kelas ini ditujukan untuk */}
              <div className="flex flex-col gap-2">
                <div className="h-7 w-[25%] rounded bg-slate-200 opacity-50"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
                  <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
                  <div className="h-4 w-full rounded bg-slate-200 opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Container */}
        <div className="mt-20 hidden w-2/5 flex-col md:flex lg:flex">
          {/* Sidebar */}
          <div className="mt-8 flex flex-col gap-6 rounded-2xl p-6 shadow-lg">
            {/* Materi Belajar */}
            <div className="flex justify-between">
              <div className="h-7 w-[40%] rounded bg-slate-200 opacity-50"></div>
              <div className="h-7 w-[30%] rounded-2xl bg-slate-200 opacity-50"></div>
            </div>

            {/* Chapter */}
            {selectedCourse &&
              selectedCourse.chapter &&
              selectedCourse.chapter.map((chapter, index) => (
                // bagian 2
                <div key={index} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="h-7 w-[50%] rounded bg-slate-200 opacity-50"></div>
                    <div className="h-6 w-[25%] rounded bg-slate-200 opacity-50"></div>
                  </div>
                  {/* Lesson List */}
                  {chapter.lesson &&
                    chapter.lesson.map((lesson, lessonIndex) => {
                      return (
                        // bagian 3
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between"
                        >
                          <div className="flex w-[90%] items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-slate-200 opacity-50"></div>
                            <div className="h-7 w-[90%] rounded bg-slate-200 opacity-50"></div>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-slate-200 opacity-50"></div>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const DetailCourseSkeleton1 = () => {
  return (
    <>
      <div className="h-7 w-[40%] rounded bg-slate-200 opacity-50"></div>
      <div className="h-7 w-[30%] rounded-2xl bg-slate-200 opacity-50"></div>
    </>
  );
};

export const DetailCourseSkeleton2 = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="h-7 w-[50%] rounded bg-slate-200 opacity-50"></div>
        <div className="h-6 w-[25%] rounded bg-slate-200 opacity-50"></div>
      </div>
    </>
  );
};

export const DetailCourseSkeleton3 = () => {
  return (
    <>
      <div className="flex w-[90%] items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-200 opacity-50"></div>
        <div className="h-7 w-[90%] rounded bg-slate-200 opacity-50"></div>
      </div>
      <div className="h-8 w-8 rounded-full bg-slate-200 opacity-50"></div>
    </>
  );
};
