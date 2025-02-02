import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Icons
import { GoArrowLeft } from "react-icons/go";

// Redux Actions
import {
  putVerifyOtpAction,
  putResendOtp,
} from "../../../redux/action/users/UsersAction";

// Helper
import {
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
} from "../../../helper/ToastHelper";

// Cookie

export const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [Email, setEmail] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!location.state) return navigate(`/register`);
    if (!Email) setEmail(location.state.email);
  }, [Email, setEmail]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Input Otp
  const handleChange = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;

    // Fokus ke input berikutnya jika input terisi dan belum mencapai input terakhir
    if (value && index < otpInputs.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Fokus ke input sebelumnya jika nilai dihapus dan bukan input pertama
    if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }

    setOtpInputs(newOtpInputs);
  };

  // Resend-Otp
  const handleResend = async () => {
    const resendData = await dispatch(
      putResendOtp({
        email: Email,
      }),
    );
    if (resendData) {
      showSuccessToast("OTP has been successfully resent");
      setSeconds(60);
    }
  };

  // Verify-Otp
  const handleSave = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const otpData = await dispatch(
        putVerifyOtpAction({
          email: Email,
          otp: otpInputs.join(""),
        }),
      );

      showLoadingToast("Loading...");

      if (!otpData) {
        showErrorToast("Account verification Failed");
      }

      if (otpData) {
        showSuccessToast("Account verification successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  const maskEmail = (email) => {
    const prefix = email.substring(0, email.indexOf("@"));
    const maskedPrefix =
      prefix.length > 1
        ? prefix.charAt(0) + "*".repeat(prefix.length - 1)
        : prefix;
    const maskedEmail = maskedPrefix + email.substring(email.indexOf("@"));

    return maskedEmail;
  };

  return (
    <div className="flex h-full w-full">
      <div className="mx-auto flex min-h-screen w-full items-center justify-center rounded-lg bg-white py-6 md:w-3/5">
        <form className="mx-auto flex w-[70%] flex-col" onKeyDown={handleSave}>
          <div
            className="relative flex w-fit cursor-pointer items-center font-semibold"
            onClick={() => {
              navigate("/register");
            }}
          >
            <GoArrowLeft size={25} className="absolute" />
            <p className="pl-8 text-xl">Back</p>
          </div>
          <span className="items-center py-4 text-3xl font-bold text-primary">
            Enter OTP
          </span>

          {/* Masukkan Kode OTP */}
          <div className="flex flex-col gap-2">
            <span className="py-6 text-center text-lg">
              Type the 6 digit code sent to{" "}
              <span className="font-bold">{maskEmail(Email)}</span>
            </span>

            {/* Lingkaran Otp */}
            <div
              className="flex flex-wrap items-center justify-center gap-4"
              onKeyDown={(e) => (e.key === "Enter" ? handleSave() : "")}
            >
              {otpInputs.map((value, index) => (
                <div key={index} className="h-[50px] w-[50px] rounded-xl">
                  <input
                    id={`otp-input-${index}`}
                    placeholder=""
                    className="h-10 w-10 rounded-xl border border-primary text-center font-semibold focus:border-primary"
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>

            {seconds > 0 ? (
              <span className="py-6 text-center text-lg">
                Resend OTP in{" "}
                <span className="font-bold text-primary">{seconds}</span> second
              </span>
            ) : (
              <span
                className="mx-auto my-3 w-fit cursor-pointer text-center text-xl font-bold text-red-500"
                onClick={handleResend}
              >
                Resend OTP
              </span>
            )}

            {/* Button Simpan */}
            <button
              type="button"
              className="mt-2 rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
              onClick={handleSave}
            >
              Submit
            </button>
          </div>
        </form>
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
