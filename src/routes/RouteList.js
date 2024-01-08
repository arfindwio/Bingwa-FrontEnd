import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/user/auth/LoginPage";
import { Register } from "../pages/user/auth/Register";
import { UpdatePass } from "../pages/user/auth/UpdatePass";
import { AdminLogin } from "../pages/admin/auth/AdminLogin";
import { KelasSaya } from "../pages/user/kelas/KelasSaya";
import { Otp } from "../pages/user/auth/Otp";
import { Error404 } from "../pages/errors/Error404";
import { Notifikasi } from "../pages/user/akun/Notifikasi";
import { PilihPremium } from "../pages/user/kelas/PilihPremium";
import { PilihGratis } from "../pages/user/kelas/PilihGratis";
import { PilihKelas } from "../pages/user/kelas/PilihKelas";
import { AkunProfile } from "../pages/user/akun/AkunProfile";
import { AkunPembayaran } from "../pages/user/akun/AkunPembayaran";
import { AkunPassword } from "../pages/user/akun/AkunPassword";
import { DetailKelas } from "../pages/user/kelas/DetailKelas";
import { DetailEnroll } from "../pages/user/kelas/DetailEnroll";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminKelolaKelas } from "../pages/admin/auth/AdminKelolaKelas";
import { Pembayaran } from "../pages/user/payment/Pembayaran";
import { PembayaranSukses } from "../pages/user/payment/PembayaranSukses";
import { ForgetPass } from "../pages/user/auth/ForgetPass";
import { AllCourse } from "../pages/user/kelas/AllCourse";

// Token Protected
import TokenProtected from "../assets/components/protected/TokenProtected";
import AdminTokenProtected from "../assets/components/protected/AdminTokenProtected";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />

        {/* User */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-password" element={<UpdatePass />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/otp" element={<Otp />} />

        {/* Kelas User */}
        <Route
          path="/kelas-saya"
          element={
            <TokenProtected>
              <KelasSaya />
            </TokenProtected>
          }
        />

        <Route path="/pilih-premium" element={<PilihPremium />} />
        <Route path="/pilih-gratis" element={<PilihGratis />} />
        <Route path="/pilih-kelas" element={<PilihKelas />} />
        {/* Belum Enroll */}
        <Route path="/detail-kelas/:courseId" element={<DetailKelas />} />
        {/* Sudah Enroll */}
        <Route path="/detail-course/:courseId" element={<DetailEnroll />} />
        <Route path="/all-kelas" element={<AllCourse />} />

        {/* Payment */}
        <Route path="/pembayaran/:courseId" element={<Pembayaran />} />
        <Route path="/pembayaran-sukses" element={<PembayaranSukses />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminTokenProtected>
              <AdminDashboard />
            </AdminTokenProtected>
          }
        />
        <Route
          path="/admin/kelola-kelas"
          element={
            <AdminTokenProtected>
              <AdminKelolaKelas />
            </AdminTokenProtected>
          }
        />

        {/* Data User */}
        <Route
          path="notifikasi"
          element={
            <TokenProtected>
              <Notifikasi />
            </TokenProtected>
          }
        />
        <Route
          path="akun-profile"
          element={
            <TokenProtected>
              <AkunProfile />
            </TokenProtected>
          }
        />
        <Route
          path="akun-password"
          element={
            <TokenProtected>
              <AkunPassword />
            </TokenProtected>
          }
        />
        <Route
          path="akun-pembayaran"
          element={
            <TokenProtected>
              <AkunPembayaran />
            </TokenProtected>
          }
        />

        {/* Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
