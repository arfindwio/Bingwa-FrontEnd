import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import { FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import { IoTime } from "react-icons/io5";
import { TbProgressCheck } from "react-icons/tb";

// Redux Actions
import { getCoursesEnrollAction } from "../../../redux/action/courses/getCoursesEnrollAction";

// Material Tailwind
import { Progress } from "@material-tailwind/react";

export const CardKelasSaya = ({
  image,
  category,
  rating,
  title,
  author,
  level,
  modul,
  duration,
  progress,
  courseId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(getCoursesEnrollAction(courseId));
    navigate(`/detail-course/${courseId}`);
  };

  return (
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
          <div className="flex items-center gap-1">
            <div className="text-yellow-700">
              <FaStar />
            </div>
            <div className="font-bold">{rating}4.9</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-slate-800">{title}</div>
          <div className="text-slate-500">by {author}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <RiShieldStarLine
              size={20}
              color="#22c55e"
              className="hidden md:flex lg:flex"
            />
            <div className="text-sm font-semibold text-primary">{level}</div>
          </div>
          <div className="flex items-center gap-1">
            <LiaBookSolid
              size={20}
              color="#22c55e"
              className="hidden md:flex lg:flex"
            />
            <div className="text-sm font-semibold text-primary">
              {modul} Modul
            </div>
          </div>
          <div className="flex items-center gap-1">
            <IoTime
              size={20}
              color="#22c55e"
              className="hidden md:flex lg:flex"
            />
            <div className="text-sm font-semibold text-primary">{duration}</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <TbProgressCheck size={20} color="#22c55e" />
          <div className="flex w-full">
            <Progress value={progress} size="lg" label={true} color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
};
