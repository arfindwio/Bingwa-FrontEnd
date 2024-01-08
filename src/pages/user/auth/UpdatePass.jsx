import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { getUpdatePass } from "../../../redux/action/auth/getPasswordAction";

// Helper
import { showErrorToast, showSuccessToast } from "../../../helper/ToastHelper";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

export const UpdatePass = () => {
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

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "newPassword") {
        setPassword(e.target.value);
      }
      if (e.target.id === "confirmPassword") {
        setpasswordConfirmation(e.target.value);
      }
    }
  };

  const handleSave = async () => {
    if (password !== passwordConfirmation) {
      showErrorToast("Password baru dan konfirmasi password tidak sesuai");
      return;
    }
    const updatepass = await dispatch(
      getUpdatePass(
        {
          password: password,
          passwordConfirmation: passwordConfirmation,
        },
        token,
      ),
    );
    setTimeout(() => {
      showSuccessToast("Update Password Berhasil");
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full rounded-lg md:mt-0 md:max-w-md">
        <div className="mx-auto flex w-[22rem] flex-col lg:w-[30rem]">
          <span className="items-center py-2 text-4xl font-bold text-primary">
            Reset Password
          </span>

          {/* Password Baru */}
          <div className="flex flex-col gap-2 pt-8">
            <div className="flex justify-between">
              <span className="text-left text-lg">Masukkan Password Baru</span>
            </div>
            <div className="relative flex flex-col">
              <input
                onChange={handleInput}
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
          <div className="flex flex-col gap-2 pt-8">
            <div className="flex justify-between">
              <span className="text-left text-lg">Ulangi Password Baru</span>
            </div>
            <div className="relative flex flex-col">
              <input
                onChange={handleInput}
                placeholder="Ulangi Password Baru"
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
          <div className="flex flex-col py-6">
            <button
              type="button"
              className="rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
              onClick={handleSave}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>

      <div className="hidden h-screen w-2/5 items-center justify-center bg-primary md:flex lg:flex">
        <div className="flex items-center justify-center gap-6">
          <img src={BrandLogo} alt="Brand Logo" className="w-[15%]" />
          <span className="text-center font-sans text-6xl text-white">
            Bingwa
          </span>
        </div>
      </div>
    </div>
  );
};
