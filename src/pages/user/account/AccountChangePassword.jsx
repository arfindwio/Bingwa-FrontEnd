import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { SidebarAccount } from "../../../assets/components/sidebar/SidebarAccount";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Helper
import { showSuccessToast } from "../../../helper/ToastHelper";

// Redux Actions
import { putChangePasswordUser } from "../../../redux/action/users/UsersAction";

export const AccountChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 720 });

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
      putChangePasswordUser(
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          newPasswordConfirmation: confirmPassword,
        },
        token,
      ),
    );

    if (changePassword) {
      showSuccessToast("Password Change Successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarCourse style={{ zIndex: 1 }} />}
      <div className="min-h-screen bg-secondary px-2 pb-20 pt-2 sm:px-10 md:px-6 md:pt-20 lg:px-28">
        <div className="py-8">
          <div className="relative flex w-fit cursor-pointer items-center gap-2  text-lg font-bold text-primary">
            <GoArrowLeft
              size={30}
              className="absolute  cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <span className="flex pl-10">Back to home</span>
          </div>
        </div>

        {/* Akun */}
        <div className="rounded-xl border-2 border-primary">
          <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
            Account
          </div>

          {/* Isi Akun*/}
          <div className="flex w-full p-6 text-center">
            <SidebarAccount />
            <div
              className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:w-[55%] md:pl-6 xl:pl-0 "
              onKeyPress={(e) => (e.key === "Enter" ? handleSave() : "")}
              tabIndex={0}
            >
              <div className="py-2 text-2xl font-bold">Change Password</div>
              <div className="relative flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                <div className="text-left">Enter Old Password</div>
                <input
                  onChange={handleInput}
                  type={showPassword1 ? "text" : "password"}
                  className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  placeholder="**********"
                  value={oldPassword}
                  id="old pass"
                  autoComplete="off"
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
              <div className="relative flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                <div className="text-left">Enter New Password</div>
                <input
                  onChange={handleInput}
                  type={showPassword2 ? "text" : "password"}
                  className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  placeholder="**********"
                  value={newPassword}
                  id="new pass"
                  autoComplete="off"
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
              <div className="relative flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                <div className="text-left">Confirm New Password</div>
                <input
                  onChange={handleInput}
                  type={showPassword3 ? "text" : "password"}
                  className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  placeholder="**********"
                  value={confirmPassword}
                  id="confirm pass"
                  autoComplete="off"
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
                className="w-full rounded-full bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-hover md:w-full xl:w-[80%] 2xl:w-[60%]"
                onClick={handleSave}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
