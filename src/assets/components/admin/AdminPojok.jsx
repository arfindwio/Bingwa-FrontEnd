import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { logoutAdminAction } from "../../../redux/action/admin/auth/logoutAdminAction";
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";

export const AdminPojok = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearSearchedCourse = () => {
    navigate("/admin/kelola-kelas");
    dispatch(searchCourseAction(null));
  };

  const handleLogout = () => {
    dispatch(logoutAdminAction());
  };

  return (
    <div className="flex h-full min-h-screen w-full items-start justify-center bg-primary">
      <div className="flex flex-col items-center justify-center py-5">
        <div className="flex items-center justify-center gap-4">
          <img src={BrandLogo} alt="Brand Logo" className="w-[2.5rem]" />
          <span className="text-center font-sans text-3xl text-white">
            Bingwa
          </span>
        </div>
        <div className="mr-auto mt-10 text-start">
          <button
            className="py-4 font-sans text-xl text-white"
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            Dashboard
          </button>
        </div>
        <div className="mr-auto text-start">
          <button
            className="py-4 font-sans text-xl text-white"
            onClick={clearSearchedCourse}
          >
            Kelola Kelas
          </button>
        </div>
        <div className="mr-auto text-start">
          <button
            className="py-4 font-sans text-xl text-white"
            onClick={handleLogout}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
