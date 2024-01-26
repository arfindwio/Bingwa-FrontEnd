import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

// Components
import { NavbarKelas } from "../../../assets/components/navbar/NavbarKelas";
import { SidebarAkun } from "../../../assets/components/sidebar/SidebarAkun";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";

// Redux Action
import { putUpdateProfile } from "../../../redux/action/auth/getUserProfileAction";
import { getUserAuthenticate } from "../../../redux/action/auth/getUserAuthenticate";

export const AkunProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const storeUserProfile = useSelector((state) => state.users.userAuthenticate);

  const [image, setImage] = useState(null);
  const [newFullName, setNewFullName] = useState(
    storeUserProfile?.userProfile?.fullName || "",
  );
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    storeUserProfile?.userProfile?.phoneNumber || "",
  );
  const [newCity, setNewCity] = useState(
    storeUserProfile?.userProfile?.city || "",
  );
  const [newCountry, setNewCountry] = useState(
    storeUserProfile?.userProfile?.newCountry || "",
  );
  const [email, setEmail] = useState(storeUserProfile?.email || "");

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getUserAuthenticate());
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSave = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("fullName", newFullName);
    formData.append("email", email);
    formData.append("phoneNumber", newPhoneNumber);
    formData.append("city", newCity);
    formData.append("country", newCountry);

    const update = await dispatch(putUpdateProfile(formData));

    toast.dismiss(loadingToastId);

    if (update) {
      showSuccessToast("Update Profil Berhasil!");
    }
  };

  return (
    <>
      <div className="h-fit bg-secondary px-9 py-20 pt-2 md:h-screen md:px-20 md:pt-[5rem] lg:h-fit lg:px-80 lg:pt-[5rem]">
        <div
          className="relative flex cursor-pointer items-center gap-2 py-8 text-lg font-bold text-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          <GoArrowLeft
            size={30}
            className="absolute -inset-x-1 cursor-pointer md:-inset-x-12 lg:-inset-x-16"
          />
          <span className="hidden lg:flex">Kembali Ke Beranda</span>
        </div>

        {/* Akun */}
        <div className="rounded-xl border-2 border-primary">
          <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
            Akun
          </div>

          {/* Isi Akun */}
          <div className="flex py-4 text-center">
            <SidebarAkun />
            <div className="flex w-full flex-col items-center gap-4 md:w-[60%] lg:w-[60%]">
              <div className="relative h-28 w-28 cursor-pointer rounded-full border-[3px] border-primary">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="absolute inset-x-0 h-full w-full cursor-pointer rounded-full opacity-0"
                  onChange={(e) => handleImageUpload(e)}
                />
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : storeUserProfile.userProfile?.userProfile
                          ?.profilePicture || ""
                  }
                  alt=""
                  className="h-full w-full cursor-pointer rounded-full object-cover"
                />
                {storeUserProfile?.userProfile?.userProfile?.profilePicture ? (
                  <></>
                ) : (
                  <div className="absolute bottom-0 right-0 rounded-full bg-slate-100 p-1 text-primary">
                    <IoImageOutline size={30} />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-left">Nama</div>
                <input
                  type="text"
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="Bingwa"
                  id="name"
                  onChange={(e) => setNewFullName(e.target.value)}
                  value={newFullName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-left">Email</div>
                <input
                  type="text"
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="bingwa@gmail.com"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-left">Nomor Telepon</div>
                <input
                  type="text"
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="08123456789"
                  id="phone"
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  value={newPhoneNumber}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-left">Kota</div>
                <input
                  type="text"
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="Jakarta"
                  id="city"
                  onChange={(e) => setNewCity(e.target.value)}
                  value={newCity}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-left">Negara</div>
                <input
                  type="text"
                  className="w-[18rem] rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none md:w-[22rem] lg:w-[22rem]"
                  placeholder="Indonesia"
                  id="country"
                  onChange={(e) => setNewCountry(e.target.value)}
                  value={newCountry}
                />
              </div>
              <button
                className="w-[18rem] rounded-2xl bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-hover md:w-[22rem] lg:w-[22rem]"
                onClick={handleSave}
              >
                Simpan Profil Saya
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? <NavbarMobile /> : <NavbarKelas style={{ zIndex: 1 }} />}
    </>
  );
};
