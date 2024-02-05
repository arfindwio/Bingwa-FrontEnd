import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import { BiSearchAlt } from "react-icons/bi";
import { IoIosNotificationsOutline, IoIosList } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
import { CgLogIn } from "react-icons/cg";

// Images
import BrandLogo from "../../img/brain.webp";

// Material Tailwind Components
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

// Redux Actionss
import { logoutUserAction } from "../../../redux/action/users/UsersAction";
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const NavbarCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");

  const currentPath = location.pathname;

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const handleSearchCourse = (searchInput) => {
    const search = dispatch(getAllCoursesAction(searchInput));

    if (search) {
      CookieStorage.set(CookiesKeys.SearchFilter, searchInput);
      navigate(`/search-course`);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  return (
    <div className="fixed top-0 z-20 flex w-screen items-center justify-between gap-2 bg-primary px-2 py-4 md:px-6 lg:px-28">
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
            placeholder="Search best courses..."
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

      {!token ? (
        <div
          className="flex cursor-pointer gap-2 font-semibold text-white"
          onClick={() => {
            navigate("/login");
          }}
        >
          <CgLogIn size={30} className="hidden md:flex lg:flex" />
          <div className="text-xl">Masuk</div>
        </div>
      ) : (
        <div className="flex cursor-pointer items-center gap-1 space-x-2 text-white md:space-x-4 lg:gap-2 lg:space-x-4">
          <div
            className={`${
              currentPath === "/all-kelas"
                ? "flex gap-2 rounded-xl bg-blue-400 px-2 py-1 font-bold lg:px-6"
                : "flex space-x-2 md:space-x-4 lg:space-x-4"
            }`}
            onClick={() => {
              navigate("/all-kelas");
            }}
          >
            <IoIosList size={28} />
            {currentPath === "/all-kelas" ? (
              <div className="text-lg">Class</div>
            ) : null}
          </div>

          <div
            className={`${
              currentPath === "/notification"
                ? "flex gap-2 rounded-xl bg-blue-400 px-2 py-1 font-bold lg:px-6"
                : "flex space-x-2 md:space-x-4 lg:space-x-4"
            }`}
          >
            <IoIosNotificationsOutline
              size={30}
              onClick={() => {
                navigate("/notification");
              }}
            />
            {currentPath === "/notification" ? (
              <div className="text-lg">Notification</div>
            ) : null}
          </div>
          {currentPath === "/account-profile" ||
          currentPath === "/change-password" ||
          currentPath === "/payment-history" ? (
            <div className="flex rounded-xl bg-blue-400 px-2 py-1 font-bold lg:gap-2 lg:px-6">
              <LuUser size={28} />
              <div className="text-lg">Account</div>
            </div>
          ) : (
            <Menu>
              <MenuHandler>
                <Button
                  className="bg-primary p-0 shadow-none hover:shadow-none"
                  ripple={false}
                  size="sm"
                >
                  <LuUser size={30} />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/account-profile");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FaUser size={17} />
                    <span>Profile</span>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <div className="flex items-center gap-3">
                    <LuLogOut size={17} />
                    <span>Logout</span>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>
      )}
    </div>
  );
};
