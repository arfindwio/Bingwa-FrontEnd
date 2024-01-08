import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Components
import { NavbarAkun } from "../../../assets/components/navbar/NavbarAkun";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SidebarAkun } from "../../../assets/components/sidebar/SidebarAkun";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Helper
import { showSuccessToast } from "../../../helper/ToastHelper";

// Redux Actions
import { changePass } from "../../../redux/action/akun/changePassAction";

export const AkunPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "old pass") {
        setOldPassword(e.target.value);
      }
      if (e.target.id === "new pass") {
        setNewPassword(e.target.value);
      }
      if (e.target.id === "confirm pass") {
        setConfirmPassword(e.target.value);
      }
    }
  };

  const handleSave = async () => {
    const changePassword = await dispatch(
      changePass(
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          newPasswordConfirmation: confirmPassword,
        },
        token,
      ),
    );
    setTimeout(() => {
      showSuccessToast("Ganti Password telah Berhasil");
      navigate("/kelas-saya");
    }, 2000);
  };

  return (
    <>
      <div className="h-fit bg-secondary px-9 py-20 pt-2 md:h-screen md:px-20 md:pt-[5rem] lg:h-fit lg:px-80 lg:pt-[5rem]">
        <div className="relative flex items-center gap-2 py-8 text-lg font-bold text-primary">
          <GoArrowLeft
            size={30}
            className="absolute -inset-x-1 cursor-pointer md:-inset-x-12 lg:-inset-x-16"
            onClick={() => {
              navigate("/");
            }}
          />
          <span className="hidden lg:block">Kembali Ke Beranda</span>
        </div>

        {/* Akun */}
        <div className="rounded-xl border-2 border-primary">
          <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
            Akun
          </div>

          {/* Isi Akun*/}
          <div className="flex py-4 text-center">
            <SidebarAkun />
            <div className="flex w-full flex-col items-center gap-10 md:w-[60%] lg:w-[60%]">
              <div className="py-2 text-2xl font-bold">Ubah Password</div>
              <div className="relative flex flex-col gap-1">
                <div className="text-left">Masukkan Password Lama</div>
                <input
                  onChange={handleInput}
                  type={showPassword1 ? "text" : "password"}
                  className="relative w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="**********"
                  value={oldPassword}
                  id="old pass"
                />
                {showPassword1 ? (
                  <FiEye
                    size={27}
                    className="absolute inset-y-10 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword1}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute inset-y-10 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword1}
                  />
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <div className="text-left">Masukkan Password Baru</div>
                <input
                  onChange={handleInput}
                  type={showPassword2 ? "text" : "password"}
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="**********"
                  value={newPassword}
                  id="new pass"
                />
                {showPassword2 ? (
                  <FiEye
                    size={27}
                    className="absolute inset-y-10 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword2}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute inset-y-10 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword2}
                  />
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <div className="text-left">Ulangi Password Baru</div>
                <input
                  onChange={handleInput}
                  type={showPassword3 ? "text" : "password"}
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="**********"
                  value={confirmPassword}
                  id="confirm pass"
                />
                {showPassword3 ? (
                  <FiEye
                    size={27}
                    className="absolute inset-y-10 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword3}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute inset-y-10 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword3}
                  />
                )}
              </div>
              <button
                className="w-[18rem] rounded-2xl bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-hover md:w-[22rem] lg:w-[22rem]"
                onClick={handleSave}
              >
                Ubah Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? <NavbarMobile /> : <NavbarAkun style={{ zIndex: 1 }} />}
    </>
  );
};
