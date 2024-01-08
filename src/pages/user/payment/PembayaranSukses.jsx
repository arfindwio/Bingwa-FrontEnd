import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { NavbarPembayaran } from "../../../assets/components/navbar/NavbarPembayaran";

// Images
import payment from "../../../assets/img/payment.webp";
import onboarding from "../../../assets/img/onboarding.webp";

// Material Tailwind Components
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

export const PembayaranSukses = () => {
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(!dialogOpen);
  return (
    <>
      <NavbarPembayaran />

      <div className="mt-[4rem] h-[11rem] px-20 shadow-lg md:h-[9rem] md:px-60 lg:h-[8rem] lg:px-80">
        <div className="py-10">
          <div className="items-center rounded-xl bg-green px-2 py-4 text-center text-xl text-white">
            <div className="font-semibold">
              Terimakasih atas pembayaran transaksi
            </div>
          </div>
        </div>

        <div className="items-center bg-white py-2">
          <div className="font-montserrat text-center text-5xl font-extrabold text-primary">
            Selamat!
          </div>

          <div className="-z-20 mx-auto w-3/5 items-center justify-center py-4 md:w-3/5 lg:w-1/5">
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

          <div className="flex flex-col items-center space-y-4 py-10">
            <div
              className="w-fit cursor-pointer items-center rounded-2xl bg-primary px-10 py-2 text-center text-lg font-semibold text-white"
              onClick={handleDialogOpen}
            >
              Mulai Belajar
            </div>

            <div
              className="cursor-pointer items-center px-2 py-2 text-center text-lg font-semibold text-blue"
              onClick={() => {
                navigate("/homepage");
              }}
            >
              Kembali ke Beranda
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} handler={handleDialogOpen} className="py-3">
        <DialogHeader className="flex flex-col">
          <h1 className="text-3xl font-semibold text-primary">Onboarding...</h1>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center px-12">
          <img src={onboarding} alt="onboarding" className="w-[50%]" />
          <h1 className="my-6 font-semibold text-slate-800">
            Persiapkan hal berikut untuk belajar yang maksimal:
          </h1>
          <p className="text-slate-600">
            Mempunyai akun Figma atau Install Adobe XD
          </p>
          <p className="text-slate-600">
            Menggunakan internet minimal kecepatan 2Mbps
          </p>
          <p className="text-slate-600">Belajar di tempat yang nyaman</p>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <div
            className="flex w-64 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary py-2 transition-all hover:bg-primary-hover"
            onClick={() => {
              navigate("/kelas-saya");
            }}
          >
            <div className="font-semibold text-white">Ikuti Kelas</div>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
