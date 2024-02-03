import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/user/auth/LoginPage";
import { Register } from "../pages/user/auth/Register";
import { UpdatePass } from "../pages/user/auth/UpdatePass";
import { AdminLogin } from "../pages/admin/auth/AdminLogin";
import { Otp } from "../pages/user/auth/Otp";
import { Error404 } from "../pages/errors/Error404";
import { Notifikasi } from "../pages/user/akun/Notifikasi";
import { SearchCourse } from "../pages/user/kelas/SearchCourse";
import { AkunProfile } from "../pages/user/akun/AkunProfile";
import { AkunPembayaran } from "../pages/user/akun/AkunPembayaran";
import { AkunPassword } from "../pages/user/akun/AkunPassword";
import { DetailKelas } from "../pages/user/kelas/DetailKelas";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminManageCategory } from "../pages/admin/auth/AdminManageCategory";
import { AdminManageCourse } from "../pages/admin/auth/AdminManageCourse";
import { AdminManageChapter } from "../pages/admin/auth/AdminManageChapter";
import { AdminManageLesson } from "../pages/admin/auth/AdminManageLesson";
import { AdminManagePromotion } from "../pages/admin/auth/AdminManagePromotion";
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

        {/* User */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-password" element={<UpdatePass />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/otp" element={<Otp />} />

        <Route path="/search-course" element={<SearchCourse />} />

        {/* Belum Enroll */}
        <Route path="/detail-course/:courseId" element={<DetailKelas />} />

        <Route path="/all-kelas" element={<AllCourse />} />

        {/* Payment */}
        <Route path="/payment/:courseId" element={<Pembayaran />} />
        <Route path="/payment-success" element={<PembayaranSukses />} />

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
          path="/admin/manage-category"
          element={
            <AdminTokenProtected>
              <AdminManageCategory />
            </AdminTokenProtected>
          }
        />
        <Route
          path="/admin/manage-course"
          element={
            <AdminTokenProtected>
              <AdminManageCourse />
            </AdminTokenProtected>
          }
        />
        <Route
          path="/admin/manage-chapter"
          element={
            <AdminTokenProtected>
              <AdminManageChapter />
            </AdminTokenProtected>
          }
        />
        <Route
          path="/admin/manage-lesson"
          element={
            <AdminTokenProtected>
              <AdminManageLesson />
            </AdminTokenProtected>
          }
        />
        <Route
          path="/admin/manage-promotion"
          element={
            <AdminTokenProtected>
              <AdminManagePromotion />
            </AdminTokenProtected>
          }
        />

        {/* Data User */}
        <Route
          path="/notification"
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
