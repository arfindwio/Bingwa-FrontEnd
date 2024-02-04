import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { showSuccessToast } from "../../../helper/ToastHelper";

// Cookie
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";

export const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);

  const emailData = CookieStorage.get(CookiesKeys.EmailRegister);

  // Set Waktu Berjalan
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!Email) return navigate("/register");
    if (emailData) {
      if (!Email) {
        setEmail(emailData);
      }

      CookieStorage.remove(CookiesKeys.EmailRegister);
    }
  }, [emailData, Email]);

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
      showSuccessToast("OTP berhasil dikirim ulang");
      setSeconds(60);
    }
  };

  // Verify-Otp
  const handleSave = async () => {
    const otpData = await dispatch(
      putVerifyOtpAction({
        email: Email,
        otp: otpInputs.join(""),
      }),
    );
    if (otpData) {
      showSuccessToast("Registrasi Berhasil");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const maskEmail = (email) => {
    const prefix = email.substring(0, email.indexOf("@"));
    const maskedPrefix = prefix.charAt(0) + "*".repeat(prefix.length - 1);
    const maskedEmail = maskedPrefix + email.substring(email.indexOf("@"));

    return maskedEmail;
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full rounded-lg md:mt-0 md:max-w-md">
        <div className="mx-auto flex w-[22rem] flex-col lg:w-[30rem]">
          <div className="absolute top-[100px] cursor-pointer md:top-[320px] lg:top-[120px]">
            <GoArrowLeft
              size={25}
              className="items-center"
              onClick={() => {
                navigate("/register");
              }}
            />
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
              className="flex items-center justify-center gap-4"
              onKeyDown={(e) => (e.key === "Enter" ? handleSave() : "")}
            >
              {otpInputs.map((value, index) => (
                <div
                  key={index}
                  className="h-[50px] w-[50px] rounded-xl border-2"
                >
                  <input
                    id={`otp-input-${index}`}
                    placeholder=""
                    className="h-full w-full rounded-xl border border-primary text-center font-semibold"
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
                <span className="font-bold text-primary">{seconds}</span> detik
              </span>
            ) : (
              <span
                className="cursor-pointer py-6 text-center text-xl font-bold text-red-500"
                onClick={handleResend}
              >
                Resend OTP
              </span>
            )}
          </div>

          {/* Button Simpan */}
          <div className="flex flex-col py-4">
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
