import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { CardDetailCourse } from "../../../assets/components/cards/CardDetailCourse";
import {
  DetailCourseSkeleton,
  DetailCourseSkeleton1,
  DetailCourseSkeleton2,
  DetailCourseSkeleton3,
} from "../../../assets/components/skeleton/DetailCourseSkeleton";
import { Footer } from "../../../assets/components/footer/Footer";

// Images
import onboarding from "../../../assets/img/onboarding.webp";

// Helper
import {
  showLoadingToast,
  showErrorToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { FaStar, FaRegStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import { IoClose, IoCloseSharp, IoTime } from "react-icons/io5";
import { HiChatAlt2 } from "react-icons/hi";
import { FaCirclePlay } from "react-icons/fa6";
import { BiSolidLock } from "react-icons/bi";
import { FaArrowCircleRight } from "react-icons/fa";
import { TbProgressCheck } from "react-icons/tb";

// Redux Actions
import { getAllLessonsByCourseIdAction } from "../../../redux/action/lessons/LessonsAction";
import {
  getAllCoursesAction,
  getDetailCoursesAction,
} from "../../../redux/action/courses/CoursesAction";
import { postReviewCourseAction } from "../../../redux/action/reviews/ReviewsAction";
import {
  getAllEnrollmentsAction,
  postEnrollmentAction,
  putEnrollmentPreparationAction,
} from "../../../redux/action/enrollments/EnrollmentsAction";
import {
  getTrackingsByCourseId,
  putTrackingAction,
} from "../../../redux/action/trackings/TrackingsAction";

// service
import { reduxPostEnrollment } from "../../../services/enrollments/Enrollments";

// Material Tailwind Components
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DetailCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoLink, setVideoLink] = useState(null);
  const [rating, setRating] = useState(0);
  const [Comment, setComment] = useState("");

  const [selectedTab, setSelectedTab] = useState("about");
  const [dialogReviewOpen, setDialogReviewOpen] = useState(false);
  const [dialogPreparationOpen, setDialogPreparationOpen] = useState(true);

  const storeDetailCourses = useSelector((state) => state.courses.detailCourse);
  const storeLessonsCourseId = useSelector(
    (state) => state.lessons.lessonsCourseId.lessons,
  );
  const storeEnrollments = useSelector(
    (state) => state.enrollments.enrollments,
  );
  const storeTrackingsCourseEnroll = useSelector(
    (state) => state.trackings.trackingsCourseId.allTrackings,
  );
  const storeCourses = useSelector((state) => state.courses.courses.courses);
  const loadingCourses = useSelector((state) => state.courses.loading);
  const loadingChapters = useSelector((state) => state.chapters.loading);
  const loadingLessons = useSelector((state) => state.lessons.loading);
  const loadingTracking = useSelector((state) => state.trackings.loading);
  const loadingEnrollments = useSelector((state) => state.enrollments.loading);

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  const handleDialogPreparationOpen = () =>
    setDialogPreparationOpen(!dialogPreparationOpen);

  const handleDialogReviewOpen = () => {
    setDialogReviewOpen(!dialogReviewOpen);
    setRating(0);
  };

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const enrollmentData = storeEnrollments
    ? storeEnrollments.find((enrollCourse) => {
        return Number(enrollCourse.courseId) === Number(courseId);
      })
    : null;

  const selectedCourse = !token
    ? storeDetailCourses
    : !enrollmentData
      ? storeDetailCourses
      : enrollmentData.course;

  const filteredCourses = storeCourses.find(
    (course) => Number(course.id) === Number(courseId),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllCoursesAction());
    getAllData();
    if (!filteredCourses) {
      return navigate("/all-courses");
    }
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getDetailCoursesAction(courseId));
    dispatch(getAllLessonsByCourseIdAction(courseId));
    if (token) {
      dispatch(getAllEnrollmentsAction());
      dispatch(getTrackingsByCourseId(courseId));
      if (enrollmentData && !enrollmentData.preparationCheck) {
        dispatch(putEnrollmentPreparationAction(courseId));
      }
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleEnrollCourse = async () => {
    try {
      if (token) {
        if (storeDetailCourses?.isPremium) {
          navigate(`/payment/${courseId}`, { state: { time: 60 * 60 } });
        }

        if (!storeDetailCourses?.isPremium) {
          const enrollCourse = await reduxPostEnrollment(courseId);

          if (enrollCourse) {
            dispatch(getAllEnrollmentsAction());
            dispatch(getTrackingsByCourseId(courseId));
            showSuccessToast("Successful Course Enrollments");
          }

          if (!enrollCourse) {
            showSuccessToast("Course Enrollments Failed");
          }
        }
      }

      if (!token) {
        showErrorToast("You need to log in first!");
      }
    } catch (err) {
      console.error("Error during enrollment:", err);
      showErrorToast("Registration failed. Please try again!");
    }
  };

  const handleTrackings = async (lessonId, videoUrl) => {
    try {
      const trackingLesson = await dispatch(putTrackingAction(lessonId));

      if (trackingLesson) {
        setVideoLink(videoUrl.split("https://youtu.be/")[1]);
        dispatch(getTrackingsByCourseId(courseId));
        dispatch(getAllEnrollmentsAction());
      }
    } catch (error) {
      console.error("Error handling trackings:", error);
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleReview = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const review = await dispatch(
      postReviewCourseAction(courseId, {
        userRating: rating,
        userComment: Comment,
      }),
    );

    toast.dismiss(loadingToastId);

    if (review) {
      setDialogReviewOpen(false);
      setTimeout(() => {
        showSuccessToast("Your review has been submitted successfully!");
      }, 1000);
      dispatch(getDetailCoursesAction(courseId));
    }
  };

  const validateForm = () => {
    if (rating?.length === 0 || !rating || rating === 0) {
      setDialogReviewOpen(!dialogReviewOpen);
      setTimeout(() => {
        showErrorToast("Rating cannot be empty. Please provide a rating");
      }, 400);
      return false;
    }

    handleReview();
  };

  const renderDescCourse = () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-xl font-bold text-primary">
            {storeDetailCourses?.category?.categoryName}
          </p>
          <div className="flex items-center gap-1">
            {!storeDetailCourses.averageRating ? null : (
              <>
                <FaStar className="text-yellow-700" />
                <p className="text-lg font-bold">
                  {Math.floor(storeDetailCourses.averageRating * 10) / 10}
                  <span className="ms-1 font-medium text-slate-500">
                    ({storeDetailCourses?.enrollment?.length})
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="text-xl font-bold">
              {storeDetailCourses?.courseName}
            </p>
            <p className="text-lg">{storeDetailCourses?.mentor}</p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-5">
            <div className="flex items-center gap-1">
              <RiShieldStarLine size={20} color="#22c55e" />
              <p className="text-sm font-semibold text-primary">
                {storeDetailCourses?.level}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <LiaBookSolid size={20} color="#22c55e" />
              <p className="text-sm font-semibold">
                {storeLessonsCourseId?.length} Module
              </p>
            </div>
            <div className="flex items-center gap-1">
              <IoTime size={20} color="#22c55e" />
              <p className="text-sm font-semibold">
                {storeDetailCourses?.totalDuration} Minute
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex w-full flex-col items-center
         gap-3 sm:flex-row "
        >
          <div
            className="flex w-full cursor-pointer flex-wrap items-center justify-center gap-2 break-all rounded-full bg-green px-6 py-2 text-center font-semibold text-white sm:w-[50%] sm:flex-nowrap lg:w-[45%]"
            onClick={() => {
              if (token && enrollmentData)
                window.open(storeDetailCourses?.forumURL, "_blank");
            }}
          >
            <p>Join Telegram Grup</p>
            <HiChatAlt2 size={20} />
          </div>
          {!token || !enrollmentData || enrollmentData.review ? null : (
            <div
              className="w-full cursor-pointer items-center break-all rounded-full border-2 border-green bg-white px-6 py-2 text-center font-semibold text-green sm:w-[50%] lg:w-[45%]"
              onClick={handleDialogReviewOpen}
            >
              Add Review This Course
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAboutCourse = () => {
    return (
      <>
        <div className="flex flex-col gap-3">
          {/* Tentang Kelas */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">About Course</h1>
            <p className="indent-8 text-slate-600">
              {storeDetailCourses?.aboutCourse}
            </p>
          </div>

          {/* Kelas ini ditujukan untuk */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">This Course is Targeted For</h1>
            <ol className="list-decimal pl-4">
              <li>{storeDetailCourses?.targetAudience}</li>
            </ol>
          </div>
        </div>
      </>
    );
  };

  const renderLearningMaterial = () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          {loadingChapters ? (
            <DetailCourseSkeleton1 />
          ) : (
            <>
              <h1 className="text-xl font-bold">Learning Materials</h1>
              <div className="flex w-fit items-center justify-between gap-2 rounded-xl">
                {!token && (
                  <div
                    className="cursor-pointer rounded-xl bg-green px-3 py-1 font-bold text-white"
                    onClick={
                      storeDetailCourses?.isPremium && token
                        ? handleDialogOpen
                        : handleEnrollCourse
                    }
                  >
                    {storeDetailCourses?.isPremium
                      ? "Buy Course"
                      : "Enroll Course"}
                  </div>
                )}

                {token && !enrollmentData && (
                  <div
                    className="cursor-pointer rounded-xl bg-green px-3 py-1 font-bold text-white"
                    onClick={
                      storeDetailCourses?.isPremium && token
                        ? handleDialogOpen
                        : handleEnrollCourse
                    }
                  >
                    {storeDetailCourses?.isPremium
                      ? "Buy Course"
                      : "Enroll Course"}
                  </div>
                )}

                {token && enrollmentData && (
                  <>
                    <TbProgressCheck
                      size={30}
                      color="#22c55e"
                      className="hidden md:hidden lg:flex"
                    />
                    <div className="rounded-3xl bg-primary px-3 py-1 font-bold text-white">
                      {Math.floor(enrollmentData?.progress * 100)}% Completed
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Chapter */}
        {selectedCourse &&
          selectedCourse?.chapter &&
          selectedCourse?.chapter?.map((chapter, index) => (
            <div key={index} className="flex flex-col gap-4">
              {loadingChapters ? (
                <DetailCourseSkeleton2 />
              ) : (
                <div className="flex justify-between pt-2">
                  <h2 className="w-[75%] font-semibold text-primary">
                    Chapter {index + 1} - {chapter?.name}
                  </h2>
                  <h2 className="w-[25%] text-right font-semibold text-blue">
                    {chapter?.duration} Minute
                  </h2>
                </div>
              )}
              {/* Lesson List */}
              {chapter?.lesson &&
                chapter?.lesson?.map((lesson, lessonIndex) => {
                  const trackingData = storeTrackingsCourseEnroll
                    ? storeTrackingsCourseEnroll?.find(
                        (tracking) => tracking?.lessonId === lesson?.id,
                      )
                    : null;

                  return (
                    <div
                      key={lessonIndex}
                      className={`flex cursor-pointer items-center justify-between border-b-2 pb-2 ${
                        !token ? "" : "cursor-pointer"
                      }`}
                      onClick={
                        !token
                          ? null
                          : !enrollmentData
                            ? handleDialogOpen
                            : () => handleTrackings(lesson.id, lesson.videoURL)
                      }
                    >
                      {loadingLessons ? (
                        <DetailCourseSkeleton3 />
                      ) : (
                        <>
                          <div className="flex w-full items-center gap-4">
                            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold">
                              {lessonIndex + 1}
                            </p>
                            <p className="font-semibold">
                              {lesson?.lessonName}
                            </p>
                          </div>
                          <div
                            className={`${
                              !token
                                ? "text-slate-500"
                                : !enrollmentData
                                  ? "cursor-pointer text-slate-500"
                                  : trackingData && trackingData.status
                                    ? "cursor-pointer text-slate-500"
                                    : "cursor-pointer text-green"
                            }`}
                          >
                            {!token ? (
                              <BiSolidLock size={25} />
                            ) : !enrollmentData ? (
                              <BiSolidLock size={25} />
                            ) : (
                              <FaCirclePlay size={25} />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <NavbarCourse />

      {/* Parent Container */}
      {loadingCourses ? (
        <DetailCourseSkeleton />
      ) : (
        <>
          <div className="flex min-h-screen flex-col px-0 pb-6 pt-20 md:px-4 lg:px-28">
            {/* Button Back */}
            <div className="w-fit px-4 pb-2 pt-4 md:mb-2 md:pb-0 md:pt-6">
              <div
                className="flex cursor-pointer items-center gap-2 font-semibold"
                onClick={() => {
                  navigate(window.history.back());
                }}
              >
                <GoArrowLeft size={30} />
                Other Courses
              </div>
            </div>
            {/* Left Container */}
            <div className="flex">
              <div className="flex w-full flex-col px-4 md:w-3/5 lg:w-3/5">
                {isMobile ? (
                  ""
                ) : (
                  <div className="rounded-lg border-2 bg-secondary px-6 py-4 shadow-sm">
                    {renderDescCourse()}
                  </div>
                )}

                {/* Section Detail Kelas */}
                <div className="flex flex-col">
                  {!videoLink ? (
                    <div
                      className="my-3 flex h-[20rem] items-center justify-center rounded-2xl border-2 shadow-md"
                      style={{
                        backgroundImage: `url(${storeDetailCourses?.courseImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="cursor-pointer rounded-full bg-white p-1 text-primary">
                        <FaCirclePlay
                          size={60}
                          onClick={() =>
                            window.open(storeDetailCourses?.videoURL, "_blank")
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative my-3 h-0 overflow-hidden rounded-2xl border-2 pb-[56.25%] shadow-lg">
                      <iframe
                        title="YouTube Video"
                        className="absolute left-0 top-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${videoLink}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {isMobile ? (
                    <>
                      <div className="mb-4 mt-2 rounded-lg bg-secondary px-6 py-4">
                        {renderDescCourse()}
                      </div>
                      <div className="border-t-lg w-full overflow-hidden rounded-t-lg border-2">
                        <div className="flex w-full">
                          <p
                            className={`w-1/2 cursor-pointer  py-4 text-center text-lg font-semibold ${
                              selectedTab === "about"
                                ? "bg-primary text-white"
                                : "bg-secondary text-blue"
                            }`}
                            onClick={() => {
                              setSelectedTab("about");
                            }}
                          >
                            About
                          </p>
                          <p
                            className={`w-1/2 cursor-pointer  py-4 text-center text-lg font-semibold ${
                              selectedTab === "material"
                                ? "bg-primary text-white"
                                : "bg-secondary text-blue"
                            }`}
                            onClick={() => {
                              setSelectedTab("material");
                            }}
                          >
                            Material Course
                          </p>
                        </div>
                        <div className="px-6 py-4">
                          {selectedTab === "about"
                            ? renderAboutCourse()
                            : renderLearningMaterial()}
                        </div>
                      </div>
                    </>
                  ) : (
                    renderAboutCourse()
                  )}
                </div>
              </div>

              {/* Right Container */}
              {/* Sidebar */}
              <div className="hidden h-fit w-2/5 gap-6  rounded-2xl border-2 bg-white px-6 pb-8 pt-4 shadow-lg md:flex md:flex-col">
                {/* Materi Belajar */}
                {isMobile ? "" : renderLearningMaterial()}
              </div>
            </div>
          </div>

          <Footer />

          {/* Dialog OnBoarding */}
          <Dialog
            open={
              enrollmentData && !enrollmentData?.preparationCheck
                ? dialogPreparationOpen
                : false
            }
            handler={handleDialogPreparationOpen}
            className="flex h-full flex-col items-center justify-center overflow-auto pt-5 sm:h-auto sm:py-3"
          >
            <DialogHeader className="flex flex-col">
              <IoCloseSharp
                size={30}
                className="absolute right-4 top-4 cursor-pointer text-primary"
                onClick={handleDialogPreparationOpen}
              />
              <h1 className="break-all text-center text-3xl font-semibold text-primary sm:break-normal">
                Onboarding...
              </h1>
            </DialogHeader>
            <DialogBody className="flex flex-col items-center justify-center px-20 text-center">
              <img src={onboarding} alt="onboarding" className="w-[50%]" />
              <h1 className="my-6 font-semibold text-slate-800">
                Things to prepare for maximum learning:
              </h1>
              <p className="text-slate-600">
                {storeDetailCourses?.learningMaterial}
              </p>
            </DialogBody>
            <DialogFooter className="flex justify-center">
              <div
                className="flex w-64 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary py-2 transition-all hover:bg-primary-hover"
                onClick={handleDialogPreparationOpen}
              >
                <div className="font-semibold text-white">Join Course</div>
              </div>
            </DialogFooter>
          </Dialog>

          {/* Dialog Review */}
          <Dialog
            open={dialogReviewOpen}
            handler={handleDialogReviewOpen}
            className="py-3"
          >
            <DialogHeader className="flex items-center justify-center sm:relative">
              <h1 className="break-words text-center text-2xl font-semibold text-slate-700 sm:break-normal">
                Rate and Review
              </h1>
              <IoCloseSharp
                size={30}
                className="cursor-pointer text-primary sm:absolute sm:right-4 sm:top-4"
                onClick={handleDialogReviewOpen}
              />
            </DialogHeader>
            <DialogBody className="w-full text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-center text-lg">Rating</span>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((star, index) => {
                      const starValue = index + 1;
                      return starValue <= rating ? (
                        <FaStar
                          size={60}
                          key={index}
                          className="cursor-pointer text-yellow-700"
                          onClick={() => handleStarClick(starValue)}
                        />
                      ) : (
                        <FaRegStar
                          size={60}
                          key={index}
                          className="cursor-pointer text-slate-500"
                          onClick={() => handleStarClick(starValue)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-center text-lg">Review</span>
                  <textarea
                    placeholder="Share your experience with this course..."
                    onChange={(e) => setComment(e.target.value)}
                    className="max-h-[30vh] rounded-lg border-2 border-slate-300 p-4 focus:border-primary focus:outline-none"
                    value={Comment}
                    id="comment"
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </DialogBody>
            <DialogFooter className="flex justify-center">
              <div className="flex w-64 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary py-2 transition-all hover:bg-primary-hover">
                <button
                  type="button"
                  className="font-semibold text-white"
                  onClick={() => {
                    validateForm();
                  }}
                >
                  Submit
                </button>
              </div>
            </DialogFooter>
          </Dialog>

          {/* Dialog Payment */}
          <Dialog
            open={dialogOpen}
            handler={handleDialogOpen}
            className="rounded-3xl py-3 "
          >
            <DialogHeader className="relative flex flex-col items-center">
              <IoCloseSharp
                size={30}
                className="absolute right-4 top-4 cursor-pointer text-primary"
                onClick={handleDialogOpen}
              />
              <h1 className="pr-4 text-center text-xl font-bold text-slate-700 sm:pr-0">
                One step closer to
              </h1>
              <h1 className="pr-4 text-center text-xl font-semibold text-primary sm:pr-0">
                Premium Course
              </h1>
            </DialogHeader>
            <DialogBody className="w-full py-0">
              <CardDetailCourse
                image={storeDetailCourses?.courseImg}
                category={storeDetailCourses?.category?.categoryName}
                rating={storeDetailCourses?.averageRating}
                title={storeDetailCourses?.courseName}
                author={storeDetailCourses?.mentor}
                level={storeDetailCourses?.level}
                duration={storeDetailCourses?.totalDuration}
                price={storeDetailCourses?.price}
                isPremium={storeDetailCourses?.isPremium}
                totalRating={storeDetailCourses?.enrollment?.length}
                promotion={
                  !storeDetailCourses?.promotion
                    ? ""
                    : storeDetailCourses?.promotion
                }
                modul={storeLessonsCourseId?.length}
              />
            </DialogBody>
            <DialogFooter className="flex justify-center">
              <div
                className="flex w-64 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary py-2 transition-all hover:bg-primary-hover"
                onClick={handleEnrollCourse}
              >
                <div className="font-semibold text-white">Buy Now</div>
                <FaArrowCircleRight size={17} className="text-white" />
              </div>
            </DialogFooter>
          </Dialog>
        </>
      )}
    </>
  );
};
