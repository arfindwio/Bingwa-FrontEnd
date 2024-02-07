import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material Tailwind Components
import { Dialog, DialogBody } from "@material-tailwind/react";

// Icons
import { IoHomeOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const NavbarMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  return (
    <>
      <div className="fixed bottom-0 z-50  flex w-screen items-start  justify-between gap-1 break-all bg-white px-0 py-2 shadow-2xl sm:gap-0 sm:px-5">
        <div
          className="flex w-1/4  flex-col items-center justify-center gap-2 text-center"
          onClick={() => {
            navigate("/");
          }}
        >
          <div
            className={
              location.pathname === "/" ? `text-primary` : `text-slate-500`
            }
          >
            <IoHomeOutline size={25} />
          </div>
          <span
            className={`text-sm
                ${
                  location.pathname === "/"
                    ? `font-semibold text-primary`
                    : `text-slate-500`
                }`}
          >
            Home
          </span>
        </div>
        <div
          className="flex w-1/4  flex-col items-center justify-center gap-2 text-center"
          onClick={() => {
            navigate("/notification");
          }}
        >
          <div
            className={
              location.pathname === "/notification"
                ? `text-primary`
                : `text-slate-500`
            }
          >
            <IoNotificationsOutline size={25} />
          </div>
          <span
            className={`text-sm
                ${
                  location.pathname === "/notification"
                    ? `font-semibold text-primary`
                    : `text-slate-500`
                }`}
          >
            Notification
          </span>
        </div>
        <div
          className="flex w-1/4  flex-col items-center justify-center gap-2 text-center"
          onClick={() => {
            navigate("/all-courses");
          }}
        >
          <div
            className={
              location.pathname === "/all-courses" ||
              location.pathname === "/pilih-gratis" ||
              location.pathname === "/pilih-premium"
                ? `text-primary`
                : `text-slate-500`
            }
          >
            <CiCircleList size={25} />
          </div>
          <span
            className={`text-sm
                ${
                  location.pathname === "/all-courses" ||
                  location.pathname === "/pilih-gratis" ||
                  location.pathname === "/pilih-premium"
                    ? `font-semibold text-primary`
                    : `text-slate-500`
                }`}
          >
            Courses
          </span>
        </div>
        <div
          className="flex w-1/4  flex-col items-center justify-center gap-2 text-center"
          onClick={handleOpen}
        >
          <div
            className={
              location.pathname === "/account-profile" ||
              location.pathname === "/change-password" ||
              location.pathname === "/payment-history"
                ? `text-primary`
                : `text-slate-500`
            }
          >
            <FaRegUser size={25} />
          </div>
          <span
            className={`text-sm
                ${
                  location.pathname === "/account-profile" ||
                  location.pathname === "/change-password" ||
                  location.pathname === "/payment-history"
                    ? `font-semibold text-primary`
                    : `text-slate-500`
                }`}
          >
            Account
          </span>
        </div>
      </div>

      {/* Dialog Navbar Mobile */}
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          {!token ? (
            <div
              className="flex cursor-pointer items-center gap-3 py-4 hover:text-primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              <div className="text-primary">
                <LuLogOut size={25} />
              </div>
              <div className="text-md font-semibold">Masuk</div>
            </div>
          ) : (
            <>
              <div
                className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
                onClick={() => {
                  navigate("/account-profile");
                }}
              >
                <div className="text-primary">
                  <LuPenLine size={25} />
                </div>
                <div className="text-md font-semibold">Profil Saya</div>
              </div>

              <div
                className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
                onClick={() => {
                  navigate("/change-password");
                }}
              >
                <div className="text-primary">
                  <IoSettingsOutline size={25} />
                </div>
                <div className="text-md font-semibold">Ubah Password</div>
              </div>

              <div
                className="flex cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:text-primary"
                onClick={() => {
                  navigate("/payment-history");
                }}
              >
                <div className="text-primary">
                  <MdOutlineShoppingCart size={25} />
                </div>
                <div className="text-md font-semibold">Riwayat Pembayaran</div>
              </div>

              <div
                className="flex cursor-pointer items-center gap-3 py-4 hover:text-primary"
                onClick={handleLogout}
              >
                <div className="text-primary">
                  <LuLogOut size={25} />
                </div>
                <div className="text-md font-semibold">Keluar</div>
              </div>
            </>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};
