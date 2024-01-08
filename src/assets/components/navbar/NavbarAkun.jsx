import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import { BiSearchAlt } from "react-icons/bi";
import { IoIosNotificationsOutline, IoIosList } from "react-icons/io";
import { LuUser } from "react-icons/lu";

// Images
import BrandLogo from "../../img/brain.webp";

// Redux Actions
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";

export const NavbarAkun = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Search Feature
  const [searchInput, setSearchInput] = useState("");

  const handleSearchCourse = (searchInput) => {
    const search = dispatch(searchCourseAction(searchInput));

    if (search) {
      navigate(`/pilih-kelas?search=${searchInput}`);
    }
  };

  return (
    <div className="fixed top-0 flex w-screen items-center justify-between gap-2 bg-primary px-4 py-4 md:px-6 lg:px-28">
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSearchCourse(searchInput) : ""
            }
            placeholder="Cari kursus terbaik..."
            className="h-[3rem] w-[12rem] cursor-pointer rounded-xl bg-white px-3 py-2 md:w-[20rem] lg:w-[30rem]"
          />
          <BiSearchAlt
            size={30}
            className="absolute inset-y-2 right-4 hidden cursor-pointer rounded bg-primary p-1 text-white md:flex lg:flex"
            onClick={() => {
              handleSearchCourse(searchInput);
            }}
          />
        </div>
      </div>

      <div className="flex cursor-pointer items-center gap-2 text-white md:gap-4 lg:gap-6">
        <div className="flex space-x-1 md:space-x-4 lg:space-x-4">
          <IoIosList
            size={30}
            onClick={() => {
              navigate("/kelas-saya");
            }}
          />
          <IoIosNotificationsOutline
            size={30}
            onClick={() => {
              navigate("/notifikasi");
            }}
          />
        </div>
        <div className="flex rounded-xl bg-blue-400 px-2 py-1 font-bold lg:gap-2 lg:px-6">
          <LuUser size={28} />
          <div className="text-lg">Akun</div>
        </div>
      </div>
    </div>
  );
};
