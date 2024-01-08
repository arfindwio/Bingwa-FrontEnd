import React from "react";

// Icons
import { FaStar } from "react-icons/fa";
import { IoDiamond, IoTime } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { RiShieldStarLine } from "react-icons/ri";

export const CardDetail = ({
  image,
  category,
  rating,
  title,
  author,
  level,
  modul,
  duration,
  price,
  isPremium,
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <div
        className="h-32 min-w-fit scale-105 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          objectFit: "cover",
        }}
      ></div>
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
        {isPremium ? (
          <div className="flex w-fit justify-between rounded-3xl bg-blue px-4 py-1 transition-all">
            <div className="flex items-center gap-1">
              <IoDiamond size={20} color="white" />
              <div className="font-bold text-white">Beli</div>
              <div className="font-bold text-white">Rp {price}</div>
            </div>
          </div>
        ) : (
          <div className="w-fit rounded-3xl bg-green px-4 py-1 text-center text-base font-bold text-white transition-all">
            Gratis
          </div>
        )}
      </div>
    </div>
  );
};
