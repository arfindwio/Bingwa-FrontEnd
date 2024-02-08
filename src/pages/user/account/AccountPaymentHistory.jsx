import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { SidebarAccount } from "../../../assets/components/sidebar/SidebarAccount";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { CardPaymentHistory } from "../../../assets/components/cards/CardPaymentHistory";

// Icons
import { GoArrowLeft } from "react-icons/go";

// Redux Actions
import { getHistoryPaymentAction } from "../../../redux/action/payments/PaymentsAction";
import { getAllLessonsAction } from "../../../redux/action/lessons/LessonsAction";

export const AccountPaymentHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);
  const storeHistoryPayments = useSelector(
    (state) => state.payments?.historyPayments,
  );

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getHistoryPaymentAction());
    dispatch(getAllLessonsAction());
  };

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarCourse style={{ zIndex: 1 }} />}
      <div className="min-h-screen bg-secondary px-2 pb-20 pt-2 sm:px-10 md:px-6 md:pt-20 lg:px-28">
        <div className="py-8">
          <div className="relative flex w-fit cursor-pointer items-center gap-2  text-lg font-bold text-primary">
            <GoArrowLeft
              size={30}
              className="absolute  cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <span className="flex pl-10">Back to home</span>
          </div>
        </div>

        {/* Akun */}
        <div className="rounded-xl border-2 border-primary">
          <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
            Account
          </div>

          {/* Isi Akun */}
          <div className="flex w-full p-6 text-center">
            <SidebarAccount />

            {/* Riwayat Pembayaran */}
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:w-[55%] md:pl-6 xl:pl-0">
              <div className="py-4 text-center text-2xl font-bold">
                Payment History
              </div>

              {/* Main Content */}
              <div className=" flex w-full flex-col gap-4">
                {/* Card Item */}
                {storeHistoryPayments && storeHistoryPayments.length > 0 ? (
                  storeHistoryPayments.map((value) => {
                    const lessonsData = storeLessons
                      ? storeLessons.filter(
                          (lesson) =>
                            Number(lesson.chapter.course.id) ===
                            Number(value.courseId),
                        )
                      : null;

                    return (
                      <CardPaymentHistory
                        key={value?.courseId}
                        image={value?.course?.courseImg}
                        category={value?.course?.category?.categoryName}
                        rating={value?.course?.averageRating}
                        totalRating={value?.course?.enrollment?.length}
                        title={value?.course?.courseName}
                        author={value?.course?.mentor}
                        level={value?.course?.level}
                        modul={lessonsData?.length}
                        duration={value?.course?.totalDuration}
                        courseId={value?.courseId}
                        status={value?.status}
                        price={value?.amount}
                      />
                    );
                  })
                ) : (
                  <p className="col-span-2 py-10 text-center text-lg font-semibold italic text-slate-500">
                    - No payment transactions found -
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
