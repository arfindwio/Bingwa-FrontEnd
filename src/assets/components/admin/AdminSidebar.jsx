import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="fixed hidden h-screen w-1/6 flex-col items-center bg-primary py-6 lg:flex">
      <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
        <img src={BrandLogo} alt="Brand Logo" loading="lazy" className="w-10" />
        <span className="text-center font-sans text-2xl font-semibold text-white lg:text-xl xl:text-3xl">
          Bingwa
        </span>
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
    </div>
  );
};
