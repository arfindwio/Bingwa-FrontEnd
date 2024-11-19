import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { SidebarAccount } from "../../../assets/components/sidebar/SidebarAccount";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { AccountProfileSkeleton } from "../../../assets/components/skeleton/AccountProfileSkeleton";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";

// Redux Action
import { getUserAuthenticateAction } from "../../../redux/action/users/UsersAction";
import { putUpdateProfile } from "../../../redux/action/userProfiles/UserProfilesAction";

export const AccountProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [newFullName, setNewFullName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [email, setEmail] = useState("");

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  const storeUserProfile = useSelector((state) => state.users.userAuthenticate);
  const isLoading = useSelector((state) => state.users.loading);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  useEffect(() => {
    setEmail(storeUserProfile?.email || email);
    setNewFullName(storeUserProfile?.userProfile?.fullName || newFullName);
    setNewPhoneNumber(
      storeUserProfile?.userProfile.phoneNumber || newPhoneNumber,
    );
    setNewCity(storeUserProfile?.userProfile?.city || newCity);
    setNewCountry(storeUserProfile?.userProfile?.country || newCountry);
  }, [storeUserProfile]);

  const getAllData = async () => {
    dispatch(getUserAuthenticateAction());
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
      dispatch(getUserAuthenticateAction());
    }
  };

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarCourse style={{ zIndex: 1 }} />}

      <div className="min-h-screen bg-secondary px-2 pb-20 pt-2 sm:px-10 md:px-6 md:pt-20 lg:px-28">
        <div className="py-8">
          <div className="relative flex w-fit cursor-pointer items-center gap-2  text-lg font-bold text-primary">
            <GoArrowLeft
              size={30}
              className="absolute  cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <span className="flex pl-10">Back to home</span>
          </div>
        </div>

        {/* Akun */}
        <div className="rounded-xl border-2 border-primary">
          <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
            Account
          </div>

          {/* Isi Akun */}
          <div className="flex w-full p-6 text-center ">
            <SidebarAccount />
            {isLoading ? (
              <AccountProfileSkeleton />
            ) : (
              <div
                className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:w-[55%] md:pl-6 xl:pl-0 "
                onKeyPress={(e) => (e.key === "Enter" ? handleSave() : "")}
                tabIndex={0}
              >
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
                        : storeUserProfile?.userProfile?.userProfile
                            ?.profilePicture ||
                          "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                    }
                    alt="profile"
                    loading="lazy"
                    className="h-full w-full cursor-pointer rounded-full object-cover"
                  />
                  {storeUserProfile?.userProfile?.userProfile
                    ?.profilePicture ? (
                    <></>
                  ) : (
                    <div className="absolute bottom-0 right-0 rounded-full bg-slate-100 p-1 text-primary">
                      <IoImageOutline size={30} />
                    </div>
                  )}
                </div>
                <div className="flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                  <div className="text-left">Name</div>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                    placeholder="Bingwa"
                    id="name"
                    onChange={(e) => setNewFullName(e.target.value)}
                    value={newFullName}
                  />
                </div>
                <div className="flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                  <div className="text-left">Email</div>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                    placeholder="bingwa@gmail.com"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                  <div className="text-left">Phone Number</div>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                    placeholder="08123456789"
                    id="phone"
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    value={newPhoneNumber}
                  />
                </div>
                <div className="flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                  <div className="text-left">City</div>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                    placeholder="Jakarta"
                    id="city"
                    onChange={(e) => setNewCity(e.target.value)}
                    value={newCity}
                  />
                </div>
                <div className="flex w-full flex-col gap-1 md:w-full xl:w-[80%] 2xl:w-[60%]">
                  <div className="text-left">Country</div>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
                    placeholder="Indonesia"
                    id="country"
                    onChange={(e) => setNewCountry(e.target.value)}
                    value={newCountry}
                  />
                </div>
                <button
                  className="w-full rounded-full bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-hover md:w-full xl:w-[80%] 2xl:w-[60%]"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
