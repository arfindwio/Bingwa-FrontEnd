import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { NavbarPembayaran } from "../../../assets/components/navbar/NavbarPembayaran";
import { CardPembayaran } from "../../../assets/components/cards/CardPembayaran";
import CardCoursesSkeleton from "../../../assets/components/skeleton/CardCourseSkeleton";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { HiArrowCircleRight } from "react-icons/hi";

// Images
import indomaret from "../../../assets/img/INDOMARET.webp";
import alfamart from "../../../assets/img/ALFAMART.webp";
import bni from "../../../assets/img/BNI.webp";
import bri from "../../../assets/img/BRI.webp";
import bca from "../../../assets/img/BCA.webp";
import mandiri from "../../../assets/img/MANDIRI.webp";

// Redux Actions
import { postPaymentAction } from "../../../redux/action/payment/PaymentAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

export const Pembayaran = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeDetailCourses = useSelector((state) => state.dataCourses.detail);
  const [ppn, setPpn] = useState(0);
  const [showBankInput, setShowBankInput] = useState(false);

  // Handle Payment
  const handlePayment = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const payment = await dispatch(
      postPaymentAction(
        {
          methodPayment: "Bank Transfer",
        },
        storeDetailCourses?.id,
      ),
    );

    toast.dismiss(loadingToastId);

    if (payment) {
      showSuccessToast("Payment Success...!!!");
      setTimeout(() => {
        navigate("/pembayaran-sukses");
      }, 2000);
    } else {
      showErrorToast("Anda Telah Membeli Course Ini...!!!");
      setTimeout(() => {
        navigate("/kelas-saya");
      }, 2000);
    }
  };

  // Toggle Bank
  const toggleBankInput = () => {
    setShowBankInput(!showBankInput);
  };

  useEffect(() => {
    if (storeDetailCourses?.price) {
      const ppnValue = (storeDetailCourses.price * 11) / 100;
      setPpn(ppnValue);
    }
  }, [storeDetailCourses?.price]);

  return (
    <>
      <NavbarPembayaran />

      {/* First Container */}
      <div className="mt-[5rem] h-[13rem] px-14 shadow-lg md:h-[12rem] md:px-60 lg:h-[10rem] lg:px-80">
        {/* Button Back */}
        <div className="relative flex items-center gap-1 pt-5 text-lg font-bold">
          <GoArrowLeft
            size={30}
            className="absolute -inset-x-10 cursor-pointer md:-inset-x-14 lg:-inset-x-10"
            onClick={() => {
              navigate(window.history.back());
            }}
          />
          Kembali
        </div>

        <div className="py-6">
          <div className="items-center rounded-xl bg-red-500 py-4 text-center text-xl text-white">
            <div className="font-semibold">
              Selesaikan Pembayaran sampai 31 Desember 2023 23:59
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center gap-10 px-[1rem] py-10 md:px-2 lg:flex lg:px-[3rem]">
        {/* Payment Method */}
        <div className="flex flex-col gap-1 lg:w-[40%]">
          <div className="flex flex-col gap-2 pb-10 text-center">
            <div
              className={`flex cursor-pointer items-center rounded-xl bg-primary py-4 text-xl text-white ${
                showBankInput ? "bg-primary" : "cursor-pointer"
              }`}
              onClick={toggleBankInput}
            >
              <div className="flex w-full items-center justify-between px-4">
                <div className="font-semibold">Bank Transfer</div>
                <div>{showBankInput ? <GoChevronDown /> : <GoChevronUp />}</div>
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 shadow-lg ${
                showBankInput ? "block" : "hidden"
              }`}
            >
              <div className="flex w-fit items-center justify-between gap-4 py-2">
                <div className="flex-1 items-center">
                  <img src={bni} className="" alt="bni" />
                </div>
                <div className="flex-1 items-center">
                  <img src={bri} className="" alt="bri" />
                </div>
                <div className="flex-1 items-center">
                  <img src={bca} className="" alt="bca" />
                </div>
                <div className="flex-1 items-center">
                  <img src={mandiri} className="" alt="mandiri" />
                </div>
                <div className="flex-1 items-center">
                  <img src={alfamart} className="" alt="alfamart" />
                </div>
                <div className="flex-1 items-center">
                  <img src={indomaret} className="" alt="indomaret" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 rounded-xl border-2 border-slate-300 px-6 py-3 shadow-lg focus:outline-none md:w-auto lg:w-[30%]">
          <div className="flex flex-col items-center gap-4 text-2xl font-bold">
            Pembayaran Kelas
          </div>

          {/* Main Content */}
          <div className="w-full gap-6 px-0 md:px-44 lg:px-0">
            {/* Card Item */}
            {storeDetailCourses === null ? (
              <CardCoursesSkeleton />
            ) : (
              <CardPembayaran
                image={storeDetailCourses?.courseImg}
                category={storeDetailCourses?.category?.categoryName}
                title={storeDetailCourses?.courseName}
                author={storeDetailCourses?.mentor}
              />
            )}
          </div>

          {/* Detail Harga */}
          <div className="flex items-center justify-center gap-4 py-3 md:gap-10 lg:gap-6">
            <div className="flex flex-col">
              <div className="text-lg font-bold md:text-2xl lg:text-xl">
                Harga
              </div>
              <div className="text-base font-semibold md:text-xl lg:text-lg">
                Rp {storeDetailCourses?.price}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-lg font-bold md:text-2xl lg:text-xl">
                PPN 11%
              </div>
              <div className="text-base font-semibold md:text-xl lg:text-lg">
                Rp {ppn}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-lg font-bold md:text-2xl lg:text-xl">
                Total Bayar
              </div>
              <div className="text-base font-semibold text-primary md:text-xl lg:text-lg">
                Rp {storeDetailCourses?.price + ppn}
              </div>
            </div>
          </div>

          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 py-2 text-white"
            onClick={handlePayment}
          >
            <div className="text-center text-xl font-bold">
              Bayar dan Ikuti Kelas Selamanya
            </div>
            <div>
              <HiArrowCircleRight size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
