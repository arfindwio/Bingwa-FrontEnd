import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Components
import { NavbarKelas } from "../../../assets/components/navbar/NavbarKelas";
import { NavbarHome } from "../../../assets/components/navbar/NavbarHome";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import { IoClose, IoTime } from "react-icons/io5";
import { HiChatAlt2 } from "react-icons/hi";
import { FaCirclePlay } from "react-icons/fa6";
import { TbProgressCheck } from "react-icons/tb";

// Material Tailwind Components
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

// Services
import { reduxPutTrackings } from "../../../services/trackings/Tracking";

// Redux Action
import { getEnrollmentsByCourseIdAction } from "../../../redux/action/enrollments/getEnrollmentsByCourseIdAction";
import { getTrackingByCourseId } from "../../../redux/action/trackings/getTrackingByCourseId";
import { getAllLessonsByCourseIdAction } from "../../../redux/action/lessons/getAllLessonsByCourseId";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DetailEnroll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseId } = useParams();

  const storeDetailCoursesEnroll = useSelector(
    (state) => state.enrollments.enrollCourseId.enrollment,
  );

  const storeTrackingsCourseEnroll = useSelector(
    (state) => state.trackings.trackingsCourseId.allTrackings,
  );

  const storeLessonsCourseId = useSelector(
    (state) => state.lessons.lessonsCourseId.lessons,
  );

  const isLoading = useSelector((state) => state.dataCourses.loading);

  const [videoLink, setVideoLink] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAllData = () => {
    dispatch(getTrackingByCourseId(courseId));
    dispatch(getAllLessonsByCourseIdAction(courseId));
    dispatch(getEnrollmentsByCourseIdAction(courseId));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleTrackings = async (lessonId, videoUrl) => {
    const loadingToastId = showLoadingToast("Loading ...");

    try {
      await reduxPutTrackings(lessonId);
      setVideoLink(videoUrl.split("https://youtu.be/")[1]);
      toast.dismiss(loadingToastId);
      showSuccessToast("Selamat Telah Menyelesaikan Lesson Ini...!!!");
    } catch (error) {
      console.error("Error handling trackings:", error);
    }
  };

  return (
    <>
      {token === undefined ? <NavbarHome /> : <NavbarKelas />}

      {/* Parent Container */}
      <div className="z-20 flex min-h-screen px-0 py-6 md:px-4 lg:px-20">
        {/* Left Container */}
        <div className="mt-16 flex w-full flex-col gap-4 px-4 md:w-3/5 lg:w-3/5">
          {/* Button Back */}
          <div className="flex w-full items-center gap-2 py-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate(window.history.back());
              }}
            >
              <GoArrowLeft size={30} />
            </div>
            <div className="flex w-full justify-between">
              <div className="font-semibold">Kelas Lainnya</div>
              <div
                className="font-bold text-primary md:hidden lg:hidden"
                onClick={handleOpen}
              >
                Chapter
              </div>
            </div>
          </div>
          {/* Container Desc Kelas */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-xl font-bold text-primary">
                {storeDetailCoursesEnroll?.course?.category?.categoryName}
              </div>
              <div className="flex items-center gap-1">
                {storeDetailCoursesEnroll?.course?.averageRating === null ||
                storeDetailCoursesEnroll?.course?.averageRating ===
                  undefined ? null : (
                  <>
                    <div className="text-yellow-700">
                      <FaStar />
                    </div>
                    <div className="text-lg font-bold">
                      {storeDetailCoursesEnroll?.course?.averageRating}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {storeDetailCoursesEnroll?.course?.courseName}
              </div>
              <div className="text-lg">
                {storeDetailCoursesEnroll?.course?.mentor}
              </div>
            </div>
            <div className="flex gap-4 md:gap-10 lg:gap-10">
              <div className="flex items-center gap-1">
                <RiShieldStarLine size={20} color="#22c55e" />
                <div className="text-sm font-semibold text-primary">
                  {storeDetailCoursesEnroll?.course?.level}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <LiaBookSolid size={20} color="#22c55e" />
                <div className="text-sm font-semibold">
                  {storeLessonsCourseId?.length} Modul
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IoTime size={20} color="#22c55e" />
                <div className="text-sm font-semibold">
                  {storeDetailCoursesEnroll?.course?.totalDuration} Minute
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-green px-6 py-2 text-white"
            onClick={() =>
              window.open(storeDetailCoursesEnroll?.course?.forumURL, "_blank")
            }
          >
            <div className="font-semibold">Join Grup Telegram</div>
            <div>
              <HiChatAlt2 size={20} />
            </div>
          </div>
          {/* Section Detail Kelas */}
          <div className="flex flex-col">
            {videoLink === null || videoLink === undefined ? (
              <div
                className="my-4 flex h-[20rem] items-center justify-center rounded-2xl"
                style={{
                  backgroundImage: `url(${storeDetailCoursesEnroll?.course?.courseImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="cursor-pointer rounded-full bg-white p-1 text-primary">
                  <FaCirclePlay
                    size={60}
                    onClick={() =>
                      window.open(
                        storeDetailCoursesEnroll?.course?.videoURL,
                        "_blank",
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              <div
                className="relative h-0 overflow-hidden rounded-2xl"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  title="YouTube Video"
                  className="absolute left-0 top-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${videoLink}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* Tentang Kelas */}
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Tentang Kelas</h1>
                <p className="text-slate-600">
                  {storeDetailCoursesEnroll?.course?.aboutCourse}
                </p>
              </div>

              {/* Kelas ini ditujukan untuk */}
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Kelas Ini Ditujukan Untuk</h1>
                <ol className="list-decimal pl-4">
                  <li>{storeDetailCoursesEnroll?.course?.targetAudience}</li>
                </ol>
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
              <h1 className="text-xl font-bold">Materi Belajar</h1>
              <div className="flex w-fit items-center justify-between gap-2 rounded-3xl">
                <TbProgressCheck
                  size={30}
                  color="#22c55e"
                  className="hidden md:hidden lg:flex"
                />
                <div className="rounded-3xl bg-primary px-3 py-1 font-semibold text-white">
                  {storeDetailCoursesEnroll?.progres * 100}% Completed
                </div>
              </div>
            </div>

            {/* Chapter */}
            {storeDetailCoursesEnroll?.course?.chapter.map((chapter, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex justify-between gap-10">
                  <h2 className="w-3/4 font-semibold text-primary">
                    Chapter {index + 1} - {chapter.name}
                  </h2>
                  <h2 className="w-1/4 text-end font-semibold text-blue">
                    {chapter.duration} Minute
                  </h2>
                </div>
                {/* Lesson List */}
                {chapter?.lesson.map((lesson, lessonIndex) => {
                  const trackingData = storeTrackingsCourseEnroll.find(
                    (tracking) => tracking.lessonId === lesson.id,
                  );

                  return (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between"
                    >
                      <div
                        className="flex w-full cursor-pointer items-center gap-4"
                        onClick={() =>
                          handleTrackings(lesson.id, lesson.videoURL)
                        }
                      >
                        <p className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold">
                          {lessonIndex + 1}
                        </p>
                        <p className="font-semibold">{lesson.lessonName}</p>
                      </div>
                      <div
                        className={`cursor-pointer ${
                          trackingData?.status ? "text-slate-500" : "text-green"
                        }`}
                        onClick={() =>
                          handleTrackings(lesson.id, lesson.videoURL)
                        }
                      >
                        <FaCirclePlay size={25} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog Chapter */}
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader className="-mb-6 flex justify-end pr-4 pt-10">
          <IoClose size={30} onClick={handleOpen} />
        </DialogHeader>
        <DialogBody className="bg-white">
          {/* Materi Belajar */}
          <div className="flex justify-between py-4">
            <h1 className="text-xl font-bold">Materi Belajar</h1>
            <div className="flex w-fit items-center justify-between gap-2 rounded-3xl">
              <TbProgressCheck
                size={30}
                color="#22c55e"
                className="hidden md:hidden lg:flex"
              />
              <div className="rounded-3xl bg-primary px-3 py-1 font-bold text-white">
                {storeDetailCoursesEnroll?.progres}% Completed
              </div>
            </div>
          </div>

          {/* Chapter */}
          {storeDetailCoursesEnroll?.course?.chapter.map((chapter, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex justify-between px-2 pt-6 text-lg">
                <h2 className="font-bold text-primary">Chapter {index + 1}</h2>
                <h2 className="font-bold text-blue">{chapter.duration}</h2>
              </div>
              <h2 className="text-center font-bold text-black">
                {chapter?.name}
              </h2>
              {/* Lesson List */}
              {chapter?.lesson.map((lesson, lessonIndex) => {
                const trackingData = storeTrackingsCourseEnroll.find(
                  (tracking) => tracking.lessonId === lesson.id,
                );

                return (
                  <div
                    key={lessonIndex}
                    className="flex items-center justify-between"
                  >
                    <div
                      className="flex w-full cursor-pointer items-center gap-4"
                      onClick={() =>
                        handleTrackings(lesson.id, lesson.videoURL)
                      }
                    >
                      <p className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold">
                        {lessonIndex + 1}
                      </p>
                      <p className="font-semibold">{lesson.lessonName}</p>
                    </div>
                    <div
                      className={`cursor-pointer ${
                        trackingData?.status ? "text-slate-500" : "text-green"
                      }`}
                      onClick={() =>
                        handleTrackings(lesson.id, lesson.videoURL)
                      }
                    >
                      <FaCirclePlay size={25} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </DialogBody>
      </Dialog>
    </>
  );
};
