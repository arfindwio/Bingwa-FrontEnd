import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import { IoDiamond, IoTime } from "react-icons/io5";

// Component
import { CardCourseSkeleton } from "../skeleton/CardCourseSkeleton";

// Redux Actions
import { getEnrollmentByCourseIdAction } from "../../../redux/action/enrollments/EnrollmentsAction";

export const CardPaymentHistory = ({
  image,
  category,
  rating,
  totalRating,
  title,
  author,
  level,
  modul,
  duration,
  courseId,
  status,
  price,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.payments.loading);

  const handleCardClick = () => {
    dispatch(getEnrollmentByCourseIdAction(courseId));
    navigate(`/detail-course/${courseId}`);
  };

  return (
    <>
      {isLoading ? (
        <CardCourseSkeleton />
      ) : (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-95">
          <div
            className="h-32 min-w-fit scale-105 cursor-pointer bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              objectFit: "cover",
            }}
            onClick={handleCardClick}
          ></div>
          {/* Container Desc Card Kelas */}
          <div className="flex flex-col gap-4 bg-white px-4 py-3">
            <div className="flex justify-between">
              <div className="text-lg font-bold text-primary">{category}</div>
              {!rating ? null : (
                <div className="flex items-center gap-1">
                  <div className="text-yellow-700">
                    <FaStar />
                  </div>
                  <div className="font-bold">
                    {Math.floor(rating * 10) / 10}
                    <span className="ms-1 font-medium text-slate-500">
                      ({totalRating})
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col text-left">
              <div className="font-semibold text-slate-800">{title}</div>
              <div className="text-slate-500">by {author}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <RiShieldStarLine
                  size={20}
                  color="#22c55e"
                  className="hidden md:hidden lg:flex"
                />
                <div className="text-sm font-semibold text-primary">
                  {level}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <LiaBookSolid
                  size={20}
                  color="#22c55e"
                  className="hidden md:hidden lg:flex"
                />
                <div className="text-sm font-semibold text-primary">
                  {modul} Modul
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IoTime
                  size={20}
                  color="#22c55e"
                  className="hidden md:hidden lg:flex"
                />
                <div className="text-sm font-semibold text-primary">
                  {duration} Minute
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2 rounded-3xl bg-green px-4 py-1">
                <IoDiamond size={20} color="white" />
                <div className="font-bold text-white">{status}</div>
              </div>
              <div className="flex items-center gap-2 rounded-3xl bg-primary px-4 py-1">
                <div className="font-semibold text-white">Rp {price}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
