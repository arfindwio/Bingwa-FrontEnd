import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { putUpdatePassword } from "../../../redux/action/users/UsersAction";

// Helper
import { showErrorToast, showSuccessToast } from "../../../helper/ToastHelper";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const dispatch = useDispatch();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSave = async () => {
    if (password !== passwordConfirmation) {
      showErrorToast("Passwords do not match. Please try again!");
      return;
    }
    const updatepass = await dispatch(
      putUpdatePassword(
        {
          password: password,
          passwordConfirmation: passwordConfirmation,
        },
        token,
      ),
    );
    if (updatepass) {
      showSuccessToast("Password Updated Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="mx-auto flex min-h-screen w-full items-center justify-center rounded-lg bg-white py-6 md:w-3/5">
        <div className="mx-auto flex w-[70%] flex-col">
          <span className="items-center pb-6 text-4xl font-bold text-primary">
            Reset Password
          </span>

          <div className="flex flex-col gap-4">
            {/* Password Baru */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-left text-lg">New Password</span>
              </div>
              <div className="relative flex flex-col">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password Baru"
                  className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  type={showPassword1 ? "text" : "password"}
                  value={password}
                  id="newPassword"
                />
                {showPassword1 ? (
                  <FiEye
                    size={27}
                    className="absolute inset-y-3 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword1}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute inset-y-3 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword1}
                  />
                )}
              </div>
            </div>

            {/* Konfirmasi Password Baru */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-left text-lg">Confirm New Password</span>
              </div>
              <div className="relative flex flex-col">
                <input
                  onChange={(e) => setpasswordConfirmation(e.target.value)}
                  placeholder="Confirm New Password"
                  className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  type={showPassword2 ? "text" : "password"}
                  value={passwordConfirmation}
                  id="confirmPassword"
                />
                {showPassword2 ? (
                  <FiEye
                    size={27}
                    className="absolute inset-y-3 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword2}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute inset-y-3 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword2}
                  />
                )}
              </div>
            </div>

            {/* Button Simpan */}
            <button
              type="button"
              className="mt-2 rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
              onClick={handleSave}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="hidden min-h-screen gap-6 bg-primary md:flex md:w-2/5 md:items-center md:justify-center">
        <img
          src={BrandLogo}
          alt="Brand Logo"
          loading="lazy"
          className="w-[15%]"
        />
        <span className="text-center font-sans text-6xl text-white">
          Bingwa
        </span>
      </div>
    </div>
  );
};
