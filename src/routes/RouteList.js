import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/user/auth/Login";
import { Register } from "../pages/user/auth/Register";
import { UpdatePassword } from "../pages/user/auth/UpdatePassword";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { Otp } from "../pages/user/auth/Otp";
import { Error404 } from "../pages/errors/Error404";
import { Notification } from "../pages/user/account/Notification";
import { SearchCourse } from "../pages/user/course/SearchCourse";
import { AccountProfile } from "../pages/user/account/AccountProfile";
import { AccountPaymentHistory } from "../pages/user/account/AccountPaymentHistory";
import { AccountChangePassword } from "../pages/user/account/AccountChangePassword";
import { DetailCourse } from "../pages/user/course/DetailCourse";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminManageCategory } from "../pages/admin/AdminManageCategory";
import { AdminManageCourse } from "../pages/admin/AdminManageCourse";
import { AdminManageChapter } from "../pages/admin/AdminManageChapter";
import { AdminManageLesson } from "../pages/admin/AdminManageLesson";
import { AdminManagePromotion } from "../pages/admin/AdminManagePromotion";
import { Payment } from "../pages/user/payment/Payment";
import { PaymentSuccess } from "../pages/user/payment/PaymentSuccess";
import { ForgetPassword } from "../pages/user/auth/ForgetPassword";
import { AllCourse } from "../pages/user/course/AllCourse";

// Token Protected
import TokenProtected from "../assets/components/protected/TokenProtected";
import AdminTokenProtected from "../assets/components/protected/AdminTokenProtected";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/otp" element={<Otp />} />

        {/* Course */}
        <Route path="/all-kelas" element={<AllCourse />} />
        <Route path="/search-course" element={<SearchCourse />} />
        <Route path="/detail-course/:courseId" element={<DetailCourse />} />

        {/* Payment */}
        <Route path="/payment/:courseId" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

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
              <Notification />
            </TokenProtected>
          }
        />
        <Route
          path="/account-profile"
          element={
            <TokenProtected>
              <AccountProfile />
            </TokenProtected>
          }
        />
        <Route
          path="/change-password"
          element={
            <TokenProtected>
              <AccountChangePassword />
            </TokenProtected>
          }
        />
        <Route
          path="/payment-history"
          element={
            <TokenProtected>
              <AccountPaymentHistory />
            </TokenProtected>
          }
        />

        {/* Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
