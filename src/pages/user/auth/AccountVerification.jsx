import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { putResendOtp } from "../../../redux/action/users/UsersAction";

// Helper
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
} from "../../../helper/ToastHelper";

// Icons
import { GoArrowLeft } from "react-icons/go";

export const AccountVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");

  const handleSave = async () => {
    const verifyAccount = await dispatch(
      putResendOtp({
        email: Email,
      }),
    );

    showLoadingToast("Loading...");

    if (!verifyAccount) {
      showErrorToast("Verification Account Failed");
    }
    if (verifyAccount) {
      showSuccessToast("Verification link has been sent!");
      setTimeout(() => {
        navigate(`/otp`, { state: { email: Email } });
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full rounded-lg md:mt-0 md:max-w-md">
        <div className="mx-auto flex w-[22rem] flex-col lg:w-[30rem]">
          <div
            className="relative flex w-fit cursor-pointer items-center font-semibold"
            onClick={() => {
              navigate("/login");
            }}
          >
            <GoArrowLeft size={25} className="absolute" />
            <p className="pl-8 text-xl">Back</p>
          </div>
          <span className="items-center py-4 text-4xl font-bold text-primary">
            Account Verification
          </span>

          {/* Konfirmasi Password Baru */}
          <div className="flex flex-col gap-2 py-4">
            <div className="flex justify-between">
              <span className="text-left text-lg">Email</span>
            </div>
            <div className="relative flex flex-col">
              <input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input Email"
                className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                type="email"
              />
            </div>
          </div>

          {/* Button Simpan */}
          <div className="flex flex-col py-6">
            <button
              type="button"
              className="rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
              onClick={handleSave}
            >
              Submit
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
