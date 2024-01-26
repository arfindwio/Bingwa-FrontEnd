import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { logoutAdminAction } from "../../../redux/action/admin/auth/logoutAdminAction";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="fixed flex h-screen w-1/6 flex-col items-center bg-primary py-6">
      <div className="mb-5 flex">
        <img src={BrandLogo} alt="Brand Logo" className="w-[2.5rem]" />
        <span className="ms-4 text-center font-sans text-3xl text-white">
          Bingwa
        </span>
      </div>
      <div
        className={`w-full ${
          currentPath === "/admin/dashboard"
            ? "bg-blue"
            : "hover:bg-blue-hover hover:bg-opacity-50"
        } cursor-pointer px-5 py-3 font-sans text-xl text-white `}
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
        } cursor-pointer px-5 py-3 font-sans text-xl text-white `}
        onClick={() => {
          navigate("/admin/manage-category");
        }}
      >
        Manage Category
      </div>
      <div
        className={`w-full ${
          currentPath === "/admin/kelola-kelas"
            ? "bg-blue"
            : "hover:bg-blue-hover hover:bg-opacity-50"
        } cursor-pointer px-5 py-3 font-sans text-xl text-white `}
        onClick={() => {
          navigate("/admin/kelola-kelas");
        }}
      >
        Manage Course
      </div>
      <div
        className={`w-full ${
          currentPath === "/admin/manage-chapter"
            ? "bg-blue"
            : "hover:bg-blue-hover hover:bg-opacity-50"
        } cursor-pointer px-5 py-3 font-sans text-xl text-white `}
        onClick={() => {
          navigate("/admin/manage-chapter");
        }}
      >
        Manage Chapter
      </div>
      <div
        className={
          "w-full cursor-pointer px-5 py-3 font-sans text-xl text-white hover:bg-blue-hover hover:bg-opacity-50"
        }
        onClick={() => {
          logoutAdminAction();
        }}
      >
        Keluar
      </div>
    </div>
  );
};
