import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Images
import BrandLogo from "../../../assets/img/brain.webp";

// Icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

// Redux Actions
import { loginUserAction } from "../../../redux/action/auth/loginUserAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Components
import { LoginGoogle } from "../../../assets/components/google/LoginGoogle";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const handleLogin = async () => {
    const loadingToastId = showLoadingToast("Loading ...");

    const login = await dispatch(
      loginUserAction({
        emailOrPhoneNumber: Email,
        password: Password,
      }),
    );

    toast.dismiss(loadingToastId);

    if (login) {
      showSuccessToast("Login Berhasil!");
      setTimeout(() => {
        navigate("/homepage");
      }, 2000);
    }
  };

  const validateForm = () => {
    // Check if the Email is an Empty string or not.

    if (Email.length === 0) {
      return showErrorToast("Email harus di isi");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return showErrorToast("Format Email tidak valid");
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

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
      // invalid form, 0 lowercase characters
      return showErrorToast("Password harus memiliki lower case");
    }

    if (countUpperCase === 0) {
      // invalid form, 0 upper case characters
      return showErrorToast("Password harus memiliki upper case");
    }

    if (countDigit === 0) {
      // invalid form, 0 digit characters
      return showErrorToast("Password harus memiliki angka");
    }

    if (countSpecialCharacters === 0) {
      // invalid form, 0 special characters characters
      return showErrorToast("Passwsord harus memiliki simbol");
    }

    // if all the conditions are valid, this means that the form is valid

    handleLogin();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full rounded-lg md:mt-0 md:max-w-md">
        <div className="mx-auto flex w-[22rem] flex-col lg:w-[30rem]">
          <span className="items-center py-8 text-4xl font-bold text-primary">
            Masuk
          </span>

          {/* Email atau No Telepon */}
          <form>
            <div className="flex flex-col gap-2">
              <span className="text-left text-lg">Email/No Telepon</span>
              <input
                placeholder="bingwa@gmail.com"
                onChange={handleInput}
                className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                type="email"
                value={Email}
                id="email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 py-6">
              <div className="flex items-center justify-between">
                <span className="text-left text-lg">Password</span>
                <span
                  className="text-md cursor-pointer font-semibold text-primary"
                  onClick={() => {
                    navigate("/forget-password");
                  }}
                >
                  Lupa Kata Sandi
                </span>
              </div>
              <div className="relative flex flex-col">
                <input
                  placeholder="**********"
                  onChange={handleInput}
                  onKeyDown={(e) => (e.key === "Enter" ? validateForm() : "")}
                  className="rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                  value={Password}
                  id="password"
                  type={showPassword ? "text" : "password"}
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

            {/* Button Masuk */}
            <div className="flex flex-col py-2">
              <button
                type="button"
                className="rounded-xl bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-hover"
                onClick={() => {
                  validateForm();
                }}
              >
                Masuk
              </button>

              <div className="flex items-center justify-center py-6">
                <LoginGoogle />
              </div>

              <div className="text-center">
                <span className="items-center justify-center py-8 text-center text-black">
                  Belum punya akun?
                  <span
                    className="cursor-pointer px-2 font-bold text-primary"
                    onClick={() => {
                      navigate("/Register");
                    }}
                  >
                    Daftar di sini.
                  </span>
                </span>
              </div>
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
