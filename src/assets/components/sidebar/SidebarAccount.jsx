import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// icons
import { LuPenLine } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

export const SidebarAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  // Handle Logout
  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  return (
    // Sidebar Container
    <div className="hidden w-[45%] flex-col break-all px-4 md:flex lg:flex">
      {/* Sidebar Item */}
      <div
        className={`flex cursor-pointer items-center gap-3 border-b-2  py-4 hover:text-primary ${
          currentPath === "/account-profile"
            ? "border-primary"
            : "border-slate-300"
        }`}
        onClick={() => {
          navigate("/account-profile");
        }}
      >
        <LuPenLine size={25} className="text-primary" />
        <div
          className={`${
            currentPath === "/account-profile"
              ? "text-lg font-bold text-primary "
              : "text-md font-semibold"
          }`}
        >
          Account Profile
        </div>
      </div>
      {/* Sidebar Item */}
      <div
        className={`flex cursor-pointer items-center gap-3 border-b-2 py-4 hover:text-primary ${
          currentPath === "/change-password"
            ? "border-primary"
            : "border-slate-300"
        }`}
        onClick={() => {
          navigate("/change-password");
        }}
      >
        <IoSettingsOutline size={25} className="text-primary" />
        <div
          className={`${
            currentPath === "/change-password"
              ? "text-lg font-bold text-primary "
              : "text-md font-semibold"
          }`}
        >
          Change Password
        </div>
      </div>
      {/* Sidebar Item */}
      <div
        className={`flex cursor-pointer items-center gap-3 border-b-2 py-4 hover:text-primary ${
          currentPath === "/payment-history"
            ? "border-primary"
            : "border-slate-300"
        }`}
        onClick={() => {
          navigate("/payment-history");
        }}
      >
        <MdOutlineShoppingCart size={25} className="text-primary" />
        <div
          className={`${
            currentPath === "/payment-history"
              ? "text-lg font-bold text-primary "
              : "text-md font-semibold"
          }`}
        >
          Payment History
        </div>
      </div>
      {/* Sidebar Item */}
      <div
        className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
        onClick={handleLogout}
      >
        <LuLogOut size={25} className="text-primary" />
        <div className="text-md font-semibold">Logout</div>
      </div>
      <div className="py-6 text-gray-400">Version 1.1.0</div>
    </div>
  );
};
