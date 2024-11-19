import React from "react";
import { useNavigate } from "react-router-dom";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const CardCategory = ({ thumbnail, category }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    CookieStorage.set(CookiesKeys.CategoryFilter, category);
    navigate(`/all-courses`);
  };

  return (
    <div className="flex w-fit cursor-pointer flex-col items-center justify-center gap-2  transition-all hover:scale-95">
      <img
        src={thumbnail}
        alt="Thumbnail"
        className="h-36 w-52 rounded-2xl object-cover"
        loading="lazy"
        onClick={handleCategoryClick}
      />
      <div className="font-semibold">{category}</div>
    </div>
  );
};
