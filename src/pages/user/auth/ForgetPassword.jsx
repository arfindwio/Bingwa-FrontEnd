import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { postForgetPassAction } from "../../../redux/action/users/UsersAction";

// Helper
import { showSuccessToast } from "../../../helper/ToastHelper";

// Icons
import { GoArrowLeft } from "react-icons/go";

export const ForgetPassword = () => {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = async () => {
    const forget = await dispatch(
      postForgetPassAction({
        email: Email,
      }),
    );
    if (forget) {
      showSuccessToast("Tautan reset password terkirim, Periksa Email Anda");
      setTimeout(() => {
        window.location.href = "https://mail.google.com";
      }, 3000);
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="mx-auto flex min-h-screen w-full items-center justify-center rounded-lg bg-white py-6 md:w-3/5">
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
            Forget Password
          </span>

          {/* Konfirmasi Password Baru */}
          <div className="flex flex-col gap-2">
            <span className="text-left text-lg">Email</span>
            <div className="relative flex flex-col">
              <input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bingwa@gmail.com"
                className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                type="email"
              />
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
