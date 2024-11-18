import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Images
import BrandLogo from "../../assets/img/brain.webp";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../helper/ToastHelper";

// Redux Actions
import { postLoginUserAction } from "../../redux/action/users/UsersAction";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async () => {
    const loadingToastId = showLoadingToast("Loading ...");

    const login = await dispatch(
      postLoginUserAction({
        emailOrPhoneNumber: Email,
        password: Password,
      }),
    );

    toast.dismiss(loadingToastId);

    if (login) {
      showSuccessToast("Login Berhasil!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    }
  };

  const validateForm = () => {
    // Check if the Email is an Empty string or not.

    if (Email.length === 0) {
      return showErrorToast("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return showErrorToast("Invalid Email Format");
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (Password.length < 8) {
      return showErrorToast("Minimum password length 8 characters");
    }

    if (Password.length > 12) {
      return showErrorToast("Maximum password length 12 characters");
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
      // invalid form, 0 lowercase characters
      return showErrorToast(
        "Password must contain at least one lowercase letter (a-z)",
      );
    }

    if (countUpperCase === 0) {
      // invalid form, 0 upper case characters
      return showErrorToast(
        "Password must contain at least one uppercase letter (A-Z)",
      );
    }

    if (countDigit === 0) {
      // invalid form, 0 digit characters
      return showErrorToast("Password must contain at least one number (0-9)");
    }

    if (countSpecialCharacters === 0) {
      // invalid form, 0 special characters characters
      return showErrorToast(
        "Password must contain at least one symbol (e.g., !@#$%^&*)",
      );
    }

    // if all the conditions are valid, this means that the form is valid

    handleLogin();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="hidden h-screen w-2/5 items-center justify-center bg-primary lg:flex">
        <div className="flex items-center justify-center gap-6">
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
      <div className="flex h-screen items-center justify-center">
        <div className="mx-4 w-full rounded-lg text-center md:w-3/6 lg:w-2/6">
          <div
            className="mx-auto flex w-[22rem] flex-col focus:outline-none md:w-[33rem] lg:w-[30rem]"
            onKeyPress={(e) => (e.key === "Enter" ? validateForm() : "")}
            tabIndex={0}
          >
            <span className="pb-10 text-4xl font-bold text-primary">
              Admin Login
            </span>

            {/* Email */}
            <div className="flex flex-col gap-2 ">
              <span className="text-left text-lg">Email</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                id="email"
                placeholder="bingwa@gmail.com"
                className="rounded-xl border-[3px] border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 pt-8">
              <div className="flex justify-between">
                <span className="text-left text-lg">Password</span>
                <span className="cursor-pointer text-lg font-semibold text-primary">
                  Forgot Password
                </span>
              </div>
              <div className="relative flex flex-col">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="**********"
                  className="rounded-xl border-[3px] border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  type={showPassword ? "text" : "password"}
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

            {/* Button Masuk */}
            <div className="flex flex-col py-4">
              <button
                type="button"
                className="mt-2 w-full rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
                onClick={() => {
                  validateForm();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
