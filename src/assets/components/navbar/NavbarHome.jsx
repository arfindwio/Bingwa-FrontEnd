import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import { CgLogIn } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";

// Images
import BrandLogo from "../../img/brain.webp";

// Redux Actions
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";

export const NavbarHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchCourse = (searchInput) => {
    const search = dispatch(searchCourseAction(searchInput));

    if (search) {
      navigate(`/pilih-kelas?search=${searchInput}`);
    }
  };

  return (
    <div className="fixed top-0 z-50 flex w-screen items-center justify-between bg-primary px-6 py-4 md:px-14 lg:px-28">
      <div className="flex gap-10">
        <div
          className="hidden cursor-pointer items-center justify-center gap-2 md:flex lg:flex"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={BrandLogo} alt="Brand Logo" className="w-[2.5rem]" />
          <div className="gap-4 text-3xl font-semibold text-white">Bingwa</div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Cari kursus terbaik..."
            className="h-[3rem] w-[15rem] cursor-pointer rounded-xl bg-white px-3 py-2 outline-none lg:w-[30rem]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSearchCourse(searchInput) : ""
            }
          />
          <BiSearchAlt
            size={30}
            className="absolute inset-y-2 right-4 cursor-pointer rounded bg-primary p-1 text-white"
            onClick={() => {
              handleSearchCourse(searchInput);
            }}
          />
        </div>
      </div>

      <div
        className="flex cursor-pointer gap-2 font-semibold text-white"
        onClick={() => {
          navigate("/Login");
        }}
      >
        <CgLogIn size={30} className="hidden md:flex lg:flex" />
        <div className="text-xl">Masuk</div>
      </div>
    </div>
  );
};
