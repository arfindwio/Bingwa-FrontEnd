import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    const loadingToastId = showLoadingToast("Loading ...");

    const verifyAccount = await dispatch(
      putResendOtp({
        email: Email,
      }),
    );

    toast.dismiss(loadingToastId);

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
    <div className="flex h-full w-full ">
      <div className="m-auto flex min-h-screen w-full items-center justify-center  rounded-lg bg-white py-6 md:w-3/5">
        <div className="mx-auto flex w-[70%] flex-col">
          <div
            className="relative  flex w-fit cursor-pointer items-center font-semibold"
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
          <div
            className="flex flex-col gap-2"
            onKeyDown={(e) => (e.key === "Enter" ? handleSave() : "")}
          >
            <div className="flex justify-between">
              <span className="text-left text-lg">Email</span>
            </div>
            <div className="relative flex flex-col">
              <input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bingwa@gmail.com"
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

      <div className="hidden min-h-screen gap-6 bg-primary md:flex md:w-2/5 md:items-center md:justify-center">
        <img src={BrandLogo} alt="Brand Logo" className="w-[15%]" />
        <span className="text-center font-sans text-6xl text-white">
          Bingwa
        </span>
      </div>
    </div>
  );
};
