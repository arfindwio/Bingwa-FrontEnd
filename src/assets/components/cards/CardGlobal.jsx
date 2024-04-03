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
import { getDetailCoursesAction } from "../../../redux/action/courses/CoursesAction";

export const CardGlobal = ({
  image,
  category,
  totalRating,
  rating,
  title,
  author,
  level,
  modul,
  duration,
  courseId,
  isPremium,
  price,
  promotion,
  enrollmentData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoadingCourses = useSelector((state) => state.courses.loading);
  const isLoadingLessons = useSelector((state) => state.lessons.loading);
  const isLoadingEnrollments = useSelector(
    (state) => state.enrollments.loading,
  );

  const handleCardClick = () => {
    dispatch(getDetailCoursesAction(courseId));
    navigate(`/detail-course/${courseId}`);
  };

  return (
    <>
      {isLoadingCourses || isLoadingEnrollments || isLoadingLessons ? (
        <CardCourseSkeleton />
      ) : (
        <div
          className="flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-95"
          onClick={handleCardClick}
        >
          <div
            className="h-32 min-w-fit bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              objectFit: "cover",
            }}
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
            <div className="flex flex-col">
              <div className="truncate font-semibold text-slate-800">
                {title}
              </div>
              <div className="text-slate-500">by {author}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <RiShieldStarLine size={20} color="#22c55e" className="flex" />
                <div className="text-sm font-semibold text-primary">
                  {level}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <LiaBookSolid size={20} color="#22c55e" className="flex" />
                <div className="text-sm font-semibold text-primary">
                  {modul} Modul
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IoTime size={20} color="#22c55e" className="flex" />
                <div className="text-sm font-semibold text-primary">
                  {duration} Minute
                </div>
              </div>
            </div>
            {enrollmentData ? (
              <>
                <div className="relative h-7 w-full overflow-hidden rounded-full bg-slate-300 shadow-[inset_2px_2px_3px_#5b6065,_inset_-2px_-2px_3px_#5b6065]">
                  <div
                    className={`h-full w-[${Math.floor(
                      enrollmentData?.progress * 100,
                    )}%] rounded-full bg-primary`}
                  ></div>
                  <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-sm font-bold text-white">
                    {Math.floor(enrollmentData?.progress * 100)}% Complete
                  </p>
                </div>
              </>
            ) : isPremium ? (
              <div className="flex items-center">
                <div
                  className="flex w-fit cursor-pointer justify-between rounded-3xl bg-blue px-4 py-1 transition-all hover:bg-blue-hover"
                  onClick={handleCardClick}
                >
                  <div className="flex items-center gap-2">
                    <IoDiamond size={20} color="white" />
                    <div className="font-bold text-white">Rp {price}</div>
                  </div>
                </div>
                {promotion.discount ? (
                  <div className="ms-2 font-bold text-red-500">
                    <span className="me-1 font-semibold text-slate-500 line-through">
                      Rp {price / (1 - promotion?.discount)}
                    </span>
                    {promotion?.discount * 100}%
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                className="w-fit cursor-pointer rounded-3xl bg-green px-4 py-1 font-semibold text-white"
                onClick={handleCardClick}
              >
                Free
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
