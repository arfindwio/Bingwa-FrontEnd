import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";

// Images
import payment from "../../../assets/img/payment.webp";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(!dialogOpen);
  return (
    <>
      <NavbarCourse />

      <div className="md:px-30 mt-[5rem] px-20 py-3 shadow-lg md:mt-[5rem] lg:mt-[5rem] lg:px-52 lg:py-4">
        <div className="items-center rounded-xl bg-green px-2 py-2 text-center text-base text-white md:text-xl">
          <div className="font-semibold">
            Terimakasih atas pembayaran transaksi
          </div>
        </div>
      </div>

      <div className="mt-5 items-center bg-white py-2">
        <div className="font-montserrat text-center text-3xl font-extrabold text-primary md:text-4xl">
          Selamat!
        </div>

        <div className=" mx-auto my-5 flex w-[25%] items-center justify-center pl-14">
          <img src={payment} className="max-h-full max-w-full" alt="Header" />
        </div>

        <div className="flex flex-col">
          <div className="font-montserrat py-6 text-center text-lg font-bold md:py-10 md:text-xl lg:py-2 lg:text-xl">
            Transaksi pembayaran kelas premium berhasil!
          </div>
          <div className="text-center text-xl">
            E-receipt telah dikirimkan ke email.
          </div>
        </div>

        <div className="my-5 flex flex-col items-center">
          <div
            className="mb-3 w-fit cursor-pointer items-center rounded-full bg-primary px-20 py-2 text-center text-lg font-semibold text-white"
            onClick={handleDialogOpen}
          >
            Mulai Belajar
          </div>

          <div
            className="cursor-pointer items-center px-2 py-2 text-center text-lg font-semibold text-blue"
            onClick={() => {
              navigate("/");
            }}
          >
            Kembali ke Beranda
          </div>
        </div>
      </div>
    </>
  );
};
