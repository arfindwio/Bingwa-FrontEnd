import React from "react";
import { useNavigate } from "react-router-dom";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const CardKategory = ({ thumbnail, category }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    CookieStorage.set(CookiesKeys.CategoryFilter, category);
    navigate(`/all-kelas`);
  };

  return (
    <div className="flex cursor-pointer flex-col items-center gap-2 transition-all hover:scale-95">
      <img
        src={thumbnail}
        alt="Thumbnail"
        className="w-52 rounded-2xl"
        onClick={handleCategoryClick}
      />
      <div className="font-semibold">{category}</div>
    </div>
  );
};
