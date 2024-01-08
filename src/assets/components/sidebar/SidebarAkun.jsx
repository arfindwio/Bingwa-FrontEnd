import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// icons
import { LuPenLine } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/auth/logoutUserAction";

export const SidebarAkun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  return (
    // Sidebar Container
    <div className="hidden w-[40%] flex-col px-4 md:flex lg:flex">
      {/* Sidebar Item */}
      <div
        className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
        onClick={() => {
          navigate("/akun-profile");
        }}
      >
        <div className="text-primary">
          <LuPenLine size={25} />
        </div>
        <div className="text-md font-semibold">Profil Saya</div>
      </div>
      {/* Sidebar Item */}
      <div
        className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
        onClick={() => {
          navigate("/akun-password");
        }}
      >
        <div className="text-primary">
          <IoSettingsOutline size={25} />
        </div>
        <div className="text-md font-semibold">Ubah Password</div>
      </div>
      {/* Sidebar Item */}
      <div
        className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
        onClick={() => {
          navigate("/akun-pembayaran");
        }}
      >
        <div className="text-primary">
          <MdOutlineShoppingCart size={25} />
        </div>
        <div className="text-md font-semibold">Riwayat Pembayaran</div>
      </div>
      {/* Sidebar Item */}
      <div
        className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
        onClick={handleLogout}
      >
        <div className="text-primary">
          <LuLogOut size={25} />
        </div>
        <div className="text-md font-semibold">Keluar</div>
      </div>
      <div className="py-6 text-gray-400">Version 1.1.0</div>
    </div>
  );
};
