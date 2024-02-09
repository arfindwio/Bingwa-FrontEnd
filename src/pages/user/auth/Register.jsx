import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Redux Actions
import { postRegisterUserAction } from "../../../redux/action/users/UsersAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const Register = () => {
  const navigate = useNavigate();
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    if (token) return navigate("/");
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "fullName") {
        setFullName(e.target.value);
      }
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "phoneNumber") {
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
      postRegisterUserAction({
        fullName: FullName,
        email: Email,
        phoneNumber: PhoneNumber,
        password: Password,
      }),
    );

    toast.dismiss(loadingToastId);

    if (!register) {
      showErrorToast("Registration Failed");
    }
    if (register) {
      showSuccessToast("Verification link has been sent!");
      setTimeout(() => {
        navigate(`/otp`, { state: { email: Email } });
      }, 1000);
    }
  };

  const validateForm = () => {
    if (FullName.length === 0) {
      return showErrorToast("Full Name must be filled");
    }

    if (FullName.length > 50) {
      return showErrorToast("Maximum 50 characters for Full Name");
    }

    if (Email.length === 0) {
      return showErrorToast("Email must be filled");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return showErrorToast("Invalid Email format");
    }

    if (PhoneNumber.length === 0) {
      return showErrorToast("Phone Number must be filled");
    }

    if (Password.length < 8) {
      return showErrorToast("Minimum 8 characters for Password");
    }

    if (Password.length > 12) {
      return showErrorToast("Maximum 12 characters for Password");
    }

    // Variables to count character types in the password.
    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;
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
        countSpecialCharacters++;
      } else if (!isNaN(Password[i] * 1)) {
        countDigit++;
      } else {
        if (Password[i] === Password[i].toUpperCase()) {
          countUpperCase++;
        }
        if (Password[i] === Password[i].toLowerCase()) {
          countLowerCase++;
        }
      }
    }

    if (countLowerCase === 0) {
      return showErrorToast("Password must have at least one lowercase letter");
    }

    if (countUpperCase === 0) {
      return showErrorToast("Password must have at least one uppercase letter");
    }

    if (countDigit === 0) {
      return showErrorToast("Password must have at least one digit");
    }

    if (countSpecialCharacters === 0) {
      return showErrorToast(
        "Password must have at least one special character",
      );
    }

    handleRegister();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full rounded-lg md:mt-0 md:max-w-md">
        <div className="mx-auto flex w-[22rem] flex-col lg:w-[30rem]">
          <span className="items-center py-6 text-4xl font-bold text-primary">
            Register
          </span>

          {/* Nama */}
          <form
            className="flex flex-col gap-4"
            onKeyDown={(e) => (e.key === "Enter" ? validateForm() : "")}
          >
            <div className="flex flex-col gap-2">
              <span className="text-left text-lg">Name</span>
              <input
                placeholder="Full Name"
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
              <span className="text-left text-lg">Phone Number</span>
              <input
                placeholder="08123456789"
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
                  autoComplete="off"
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
                Register
              </button>
            </div>

            <div className="flex flex-col text-center">
              <span className=" text-center text-black">
                Already have an account?
                <span
                  className="cursor-pointer px-2 font-bold text-primary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in here
                </span>
              </span>
              <span className=" text-center text-black">
                Account not verified?
                <span
                  className="cursor-pointer px-2 font-bold text-primary"
                  onClick={() => {
                    navigate("/account-verification");
                  }}
                >
                  Verify it here.
                </span>
              </span>
            </div>
          </form>
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
