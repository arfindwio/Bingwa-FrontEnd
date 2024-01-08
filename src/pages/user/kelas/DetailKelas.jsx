import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import { NavbarKelas } from "../../../assets/components/navbar/NavbarKelas";
import { NavbarHome } from "../../../assets/components/navbar/NavbarHome";
import CardCoursesSkeleton from "../../../assets/components/skeleton/CardCourseSkeleton";
import { CardDetail } from "../../../assets/components/cards/CardDetail";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastHelper";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import { IoClose, IoCloseSharp, IoTime } from "react-icons/io5";
import { HiChatAlt2 } from "react-icons/hi";
import { FaCirclePlay } from "react-icons/fa6";
import { BiSolidLock } from "react-icons/bi";
import { FaArrowCircleRight } from "react-icons/fa";

// Redux Actions
import { postEnrollmentsAction } from "../../../redux/action/enrollments/EnrollmentsAction";

// Material Tailwind Components
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DetailKelas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeDetailCourses = useSelector((state) => state.dataCourses.detail);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentCourseId, setPaymentCourseId] = useState(null);

  const isLoading = useSelector((state) => state.dataCourses.loading);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDetail = () => {
    handleDialogOpen();
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setPaymentCourseId(storeDetailCourses?.id);
    setDialogOpen(true);
  };

  const handleEnrollCourse = async () => {
    try {
      if (token !== undefined) {
        const isPremium = storeDetailCourses?.isPremium;

        if (isPremium) {
          navigate(`/pembayaran/${paymentCourseId}`);
        }

        if (!isPremium) {
          await dispatch(postEnrollmentsAction(paymentCourseId));
          showSuccessToast("Berhasil Enrollments Course");
          navigate("/kelas-saya");
        }
      }

      if (token === undefined) {
        showErrorToast("Anda harus login terlebih dahulu");
      }
    } catch (err) {
      console.error("Error during enrollment:", err);
      showErrorToast("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
                {storeDetailCourses?.category?.categoryName}
              </div>
              <div className="flex items-center gap-1">
                <div className="text-yellow-700">
                  <FaStar />
                </div>
                <div className="text-lg font-bold">
                  {storeDetailCourses?.averageRating}4.9
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {storeDetailCourses?.courseName}
              </div>
              <div className="text-lg">{storeDetailCourses?.mentor}</div>
            </div>
            <div className="flex gap-4 md:gap-10 lg:gap-10">
              <div className="flex items-center gap-1">
                <RiShieldStarLine size={20} color="#22c55e" />
                <div className="text-sm font-semibold text-primary">
                  {storeDetailCourses?.level}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <LiaBookSolid size={20} color="#22c55e" />
                <div className="text-sm font-semibold">
                  {storeDetailCourses?.modul} Modul
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IoTime size={20} color="#22c55e" />
                <div className="text-sm font-semibold">
                  {storeDetailCourses?.duration}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-green px-6 py-2 text-white">
            <div className="font-semibold">Join Grup Telegram</div>
            <div>
              <HiChatAlt2 size={20} />
            </div>
          </div>

          {/* Section Detail Kelas */}
          <div className="flex flex-col">
            <div className="my-4 flex h-[20rem] items-center justify-center rounded-2xl bg-slate-300">
              <div className="cursor-pointer text-primary">
                <FaCirclePlay size={60} onClick={handleDialogOpen} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Tentang Kelas */}
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Tentang Kelas</h1>
                <p className="text-slate-600">
                  {storeDetailCourses?.aboutCourse}
                </p>
              </div>

              {/* Kelas ini ditujukan untuk */}
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Kelas Ini Ditujukan Untuk</h1>
                <ol className="list-decimal pl-4">
                  <li>{storeDetailCourses?.targetAudience}</li>
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
                <div
                  className="cursor-pointer rounded-xl bg-green px-3 py-1 font-bold text-white"
                  onClick={handleEnrollCourse}
                >
                  Buy Course
                </div>
              </div>
            </div>

            {/* Chapter */}
            {storeDetailCourses.chapter.map((chapter, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex justify-between gap-10">
                  <h2 className="font-semibold text-primary">
                    Chapter {index + 1} - {chapter.name}
                  </h2>
                  <h2 className="font-semibold text-blue">
                    {chapter.duration}
                  </h2>
                </div>
                {/* Lesson List */}
                {chapter.lesson.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex items-center justify-between"
                  >
                    <div className="flex w-full items-center gap-4">
                      <p className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold">
                        {lessonIndex + 1}
                      </p>
                      <p className="font-semibold">{lesson.lessonName}</p>
                    </div>
                    <div className="text-slate-500">
                      <BiSolidLock size={25} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} handler={handleDialogOpen} className="py-3">
        <DialogHeader className="relative flex flex-col items-center">
          <IoCloseSharp
            size={30}
            className="absolute right-4 top-4 cursor-pointer text-primary"
            onClick={handleDetail}
          />
          <h1 className="text-lg font-semibold text-slate-700">
            Selangkah lagi menuju
          </h1>
          <h1 className="text-lg font-semibold text-primary">
            Course Kebanggan Anda
          </h1>
        </DialogHeader>
        <DialogBody className="w-full text-sm">
          {storeDetailCourses === null ? (
            <CardCoursesSkeleton />
          ) : (
            <CardDetail
              image={storeDetailCourses?.courseImg}
              category={storeDetailCourses?.category?.categoryName}
              rating={storeDetailCourses?.averageRating}
              title={storeDetailCourses?.courseName}
              author={storeDetailCourses?.mentor}
              level={storeDetailCourses?.level}
              modul={storeDetailCourses?.modul}
              duration={storeDetailCourses?.duration}
              price={storeDetailCourses?.price}
              isPremium={storeDetailCourses?.isPremium}
            />
          )}
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <div
            className="flex w-64 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary py-2 transition-all hover:bg-primary-hover"
            onClick={handleEnrollCourse}
          >
            <div className="font-semibold text-white">Beli Sekarang</div>
            <FaArrowCircleRight size={17} className="text-white" />
          </div>
        </DialogFooter>
      </Dialog>

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
              <div
                className="cursor-pointer rounded-xl bg-green px-3 py-1 font-bold text-white"
                onClick={handleEnrollCourse}
              >
                Buy Course
              </div>
            </div>
          </div>

          {/* Chapter */}
          {storeDetailCourses.chapter.map((chapter, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex justify-between px-2 pt-6 text-lg">
                <h2 className="font-bold text-primary">Chapter {index + 1}</h2>
                <h2 className="font-bold text-blue">{chapter.duration}</h2>
              </div>
              <h2 className="text-center font-bold text-black">
                {chapter.name}
              </h2>
              {/* Lesson List */}
              {chapter.lesson.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="flex items-center justify-between"
                >
                  <div className="flex w-full items-center gap-4">
                    <p className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold">
                      {lessonIndex + 1}
                    </p>
                    <p className="font-semibold">{lesson.lessonName}</p>
                  </div>
                  <div className="text-slate-500">
                    <BiSolidLock size={25} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </DialogBody>
      </Dialog>
    </>
  );
};
