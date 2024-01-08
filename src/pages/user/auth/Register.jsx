import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { registerUserAction } from "../../../redux/action/auth/registerUserAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Register = () => {
  const navigate = useNavigate();
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "nama") {
        setFullName(e.target.value);
      }
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "telepon") {
        setPhoneNumber(e.target.value);
      }
      if (e.target.id === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const handleRegister = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const register = await dispatch(
      registerUserAction({
        fullName: FullName,
        email: Email,
        phoneNumber: PhoneNumber,
        password: Password,
      }),
    );

    toast.dismiss(loadingToastId);

    if (register) {
      showSuccessToast("Tautan Verifikasi telah dikirim!");
      setTimeout(() => {
        navigate(`/otp?email=${encodeURIComponent(Email)}`);
      }, 2000);
    }
  };

  const validateForm = () => {
    if (FullName.length === 0) {
      return showErrorToast("Nama Lengkap harus di isi");
    }

    if (FullName.length > 50) {
      return showErrorToast("Nama Maksimal 50 karakter");
    }

    if (Email.length === 0) {
      return showErrorToast("Email harus di isi");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return showErrorToast("Format Email tidak valid");
    }

    if (PhoneNumber.length === 0) {
      return showErrorToast("No Telepon harus di isi");
    }

    if (Password.length < 8) {
      return showErrorToast("Password minimal 8 karakter");
    }

    if (Password.length > 12) {
      return showErrorToast("Password maksimal 12 karakter");
    }

    // variable to count upper case characters in the password.
    let countUpperCase = 0;
    // variable to count lowercase characters in the password.
    let countLowerCase = 0;
    // variable to count digit characters in the password.
    let countDigit = 0;
    // variable to count special characters in the password.
    let countSpecialCharacters = 0;

    for (let i = 0; i < Password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes(Password[i])) {
        // this means that the character is special, so increment countSpecialCharacters
        countSpecialCharacters++;
      } else if (!isNaN(Password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++;
      } else {
        if (Password[i] === Password[i].toUpperCase()) {
          // this means that the character is an upper case character, so increment countUpperCase
          countUpperCase++;
        }
        if (Password[i] === Password[i].toLowerCase()) {
          // this means that the character is lowercase, so increment countUpperCase
          countLowerCase++;
        }
      }
    }

    if (countLowerCase === 0) {
      return showErrorToast("Password harus memiliki lower case");
    }

    if (countUpperCase === 0) {
      return showErrorToast("Password harus memiliki upper case");
    }

    if (countDigit === 0) {
      return showErrorToast("Password harus memiliki angka");
    }

    if (countSpecialCharacters === 0) {
      return showErrorToast("Passwsord harus memiliki simbol");
    }

    handleRegister();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full rounded-lg md:mt-0 md:max-w-md">
        <div className="mx-auto flex w-[22rem] flex-col lg:w-[30rem]">
          <span className="items-center py-6 text-4xl font-bold text-primary">
            Daftar
          </span>

          {/* Nama */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-left text-lg">Nama</span>
              <input
                placeholder="Nama Lengkap"
                onChange={handleInput}
                className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                type="text"
                value={FullName}
                id="nama"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-left text-lg">Email</span>
              <input
                placeholder="bingwa@gmail.com"
                onChange={handleInput}
                className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                type="email"
                value={Email}
                id="email"
              />
            </div>

            {/* Nomor Telepon */}
            <div className="flex flex-col gap-2">
              <span className="text-left text-lg">Nomor Telepon</span>
              <input
                placeholder="08"
                onChange={handleInput}
                className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                type="tel"
                value={PhoneNumber}
                id="telepon"
              />
            </div>

            {/* Buat Password */}
            <div className="flex flex-col gap-2">
              <span className="text-left text-lg">Buat Password</span>
              <div className="relative flex flex-col">
                <input
                  placeholder="Masukkan Password"
                  onChange={handleInput}
                  className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  value={Password}
                  id="password"
                />
                {showPassword ? (
                  <FiEye
                    size={27}
                    className="absolute inset-y-3 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute inset-y-3 right-4 w-8 cursor-pointer text-slate-400"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            </div>

            {/* Button Daftar */}
            <div className="flex flex-col py-2">
              <button
                type="button"
                className="rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
                onClick={() => {
                  validateForm();
                }}
              >
                Daftar
              </button>
            </div>

            <div className="text-center">
              <span className="items-center justify-center py-6 text-center text-black">
                Sudah punya akun?
                <span
                  className="cursor-pointer px-2 font-bold text-primary"
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  Masuk di sini
                </span>
              </span>
            </div>
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
