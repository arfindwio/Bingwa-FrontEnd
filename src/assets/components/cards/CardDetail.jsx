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
  totalRating,
  promotion,
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
          {!rating ? null : (
            <div className="flex items-center gap-1">
              <div className="text-yellow-700">
                <FaStar />
              </div>
              <div className="font-bold">
                {rating}
                <span className="ms-1 font-medium text-slate-500">
                  ({totalRating})
                </span>
              </div>
            </div>
          )}
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
            <div className="text-sm font-semibold text-primary">
              {duration} Minute
            </div>
          </div>
        </div>
        {isPremium ? (
          <div className="flex items-center">
            <div className="flex w-fit cursor-pointer justify-between rounded-3xl bg-blue px-4 py-1 transition-all hover:bg-blue-hover">
              <div className="flex items-center gap-2">
                <IoDiamond size={20} color="white" />
                <div className="font-bold text-white">
                  Rp{" "}
                  {promotion.discount
                    ? price - promotion.discount * price
                    : price}
                </div>
              </div>
            </div>
            {promotion.discount ? (
              <div className="ms-2 font-bold text-red-500">
                <span className="me-1 font-semibold text-slate-500 line-through">
                  Rp {price}
                </span>
                {promotion.discount * 100}%
              </div>
            ) : null}
          </div>
        ) : (
          // Non-premium content
          <div className="w-fit cursor-pointer rounded-3xl bg-green px-4 py-1 font-semibold text-white">
            Free
          </div>
        )}
      </div>
    </div>
  );
};
