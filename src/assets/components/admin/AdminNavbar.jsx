import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Icons
import { BiSearchAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

// Material Tailwind Components
import { Drawer } from "@material-tailwind/react";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

export const AdminNavbar = ({ onSearch, onOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");

  const [open, setOpen] = useState(false);

  const currentPath = location.pathname;

  const openDrawer = () => {
    setOpen(!open);
    onOpen(!open);
  };

  const handleSearchCourse = (searchInput) => {
    setSearchInput(searchInput);
    onSearch(`search=${searchInput}`);
  };
  return (
    <div
      className={`flex w-full items-center justify-between bg-secondary px-4 py-5 lg:px-14`}
    >
      <div className="flex w-1/2 items-center gap-3">
        <div
          className="cursor-pointer p-1 hover:rounded hover:bg-slate-300 lg:hidden"
          onClick={() => openDrawer()}
        >
          <GiHamburgerMenu size={25} />
        </div>
        <p className="font-sans text-lg font-bold text-primary md:text-xl xl:text-3xl">
          Hi, Admin!
        </p>
      </div>

      <div className="relative flex w-1/2 cursor-pointer justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="h-full w-[70%] cursor-pointer rounded-xl border-[3px] border-white p-2 pr-12 focus:border-primary focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" ? handleSearchCourse(searchInput) : ""
          }
        />
        <BiSearchAlt
          size={30}
          className="absolute right-3 top-2 cursor-pointer rounded bg-primary p-1 text-white"
        />
      </div>

      <Drawer open={open} onClose={openDrawer} className="bg-primary py-6">
        <div className="mb-6 flex items-center justify-between px-4 ">
          <div className="flex flex-wrap items-center justify-start gap-2">
            <img
              src={BrandLogo}
              alt="Brand Logo"
              loading="lazy"
              className="w-10"
            />
            <span className="text-center font-sans text-2xl font-semibold text-white lg:text-xl xl:text-3xl">
              Bingwa
            </span>
          </div>
          <div
            onClick={openDrawer}
            className="cursor-pointer p-1 text-white hover:rounded-full hover:bg-slate-300 hover:bg-opacity-30"
          >
            <IoClose size={30} />
          </div>
        </div>
        <div
          className={`w-full ${
            currentPath === "/admin/dashboard"
              ? "bg-blue"
              : "hover:bg-blue-hover hover:bg-opacity-50"
          } cursor-pointer px-5 py-3 font-sans text-lg text-white xl:text-xl `}
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          Dashboard
        </div>
        <div
          className={`w-full ${
            currentPath === "/admin/manage-category"
              ? "bg-blue"
              : "hover:bg-blue-hover hover:bg-opacity-50"
          } cursor-pointer px-5 py-3 font-sans text-lg text-white xl:text-xl `}
          onClick={() => {
            navigate("/admin/manage-category");
          }}
        >
          Manage Categories
        </div>
        <div
          className={`w-full ${
            currentPath === "/admin/manage-course"
              ? "bg-blue"
              : "hover:bg-blue-hover hover:bg-opacity-50"
          } cursor-pointer px-5 py-3 font-sans text-lg text-white xl:text-xl `}
          onClick={() => {
            navigate("/admin/manage-course");
          }}
        >
          Manage Courses
        </div>
        <div
          className={`w-full ${
            currentPath === "/admin/manage-chapter"
              ? "bg-blue"
              : "hover:bg-blue-hover hover:bg-opacity-50"
          } cursor-pointer px-5 py-3 font-sans text-lg text-white xl:text-xl `}
          onClick={() => {
            navigate("/admin/manage-chapter");
          }}
        >
          Manage Chapters
        </div>
        <div
          className={`w-full ${
            currentPath === "/admin/manage-lesson"
              ? "bg-blue"
              : "hover:bg-blue-hover hover:bg-opacity-50"
          } cursor-pointer px-5 py-3 font-sans text-lg text-white xl:text-xl `}
          onClick={() => {
            navigate("/admin/manage-lesson");
          }}
        >
          Manage Lessons
        </div>
        <div
          className={`w-full ${
            currentPath === "/admin/manage-promotion"
              ? "bg-blue"
              : "hover:bg-blue-hover hover:bg-opacity-50"
          } cursor-pointer px-5 py-3 font-sans text-lg text-white xl:text-xl `}
          onClick={() => {
            navigate("/admin/manage-promotion");
          }}
        >
          Manage Promotions
        </div>
        <div
          className={
            "w-full cursor-pointer px-5 py-3 font-sans text-lg text-white hover:bg-blue-hover hover:bg-opacity-50 xl:text-xl"
          }
          onClick={() => {
            dispatch(logoutUserAction());
          }}
        >
          Logout
        </div>
      </Drawer>
    </div>
  );
};
