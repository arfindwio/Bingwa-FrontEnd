import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

// Components
import { NavbarAkun } from "../../../assets/components/navbar/NavbarAkun";
import { SidebarAkun } from "../../../assets/components/sidebar/SidebarAkun";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { CardRiwayat } from "../../../assets/components/cards/CardRiwayat";
import CardCoursesSkeleton from "../../../assets/components/skeleton/CardCourseSkeleton";

// Icons
import { GoArrowLeft } from "react-icons/go";

// Redux Actions
import { getHistoryAction } from "../../../redux/action/payment/HistoryAction";

export const AkunPembayaran = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const storeHistory = useSelector((state) => state.payment.history);
  const storeCourses = useSelector((state) => state.dataCourses.courses);

  useEffect(() => {
    dispatch(getHistoryAction());
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen bg-secondary px-4 py-20 pt-2 md:h-screen md:px-20 md:pt-[5rem] lg:h-fit lg:px-80 lg:pt-[5rem]">
        <div className="relative flex items-center gap-2 py-8 text-lg font-bold text-primary">
          <GoArrowLeft
            size={30}
            className="absolute -inset-x-1 cursor-pointer md:-inset-x-12 lg:-inset-x-16"
            onClick={() => {
              navigate("/");
            }}
          />
          <span className="hidden lg:block">Kembali ke Beranda</span>
        </div>

        {/* Akun */}
        <div className="rounded-xl border-2 border-primary">
          <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
            Akun
          </div>

          {/* Isi Akun */}
          <div className="flex py-4 text-center">
            <SidebarAkun />

            {/* Riwayat Pembayaran */}
            <div className="flex w-full flex-col items-center md:w-[60%] lg:w-[60%]">
              <div className="py-4 text-center text-2xl font-bold">
                Riwayat Pembayaran
              </div>

              {/* Main Content */}
              <div className="w-full space-y-6 px-3 md:px-5 lg:px-5">
                {/* Card Item */}
                {storeHistory == null ? (
                  <CardCoursesSkeleton />
                ) : (
                  storeHistory.map((value) => {
                    const matchedCourse = storeCourses.find(
                      (course) => course.id === value.courseId,
                    );

                    if (matchedCourse) {
                      return (
                        <CardRiwayat
                          key={value.courseId}
                          image={matchedCourse.courseImg}
                          category={value?.course?.category?.categoryName}
                          rating={value.course.averageRating}
                          title={value.course.courseName}
                          author={value.course.mentor}
                          level={value.course.level}
                          modul={value.course.modul}
                          duration={value.course.duration}
                          courseId={value.courseId}
                          status={value.status}
                          price={value.amount}
                        />
                      );
                    }
                    return null;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? <NavbarMobile /> : <NavbarAkun style={{ zIndex: 1 }} />}
    </>
  );
};
