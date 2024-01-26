import { combineReducers } from "@reduxjs/toolkit";
import RegisterSlice from "./auth/registerSlice";
import PasswordSlice from "./auth/passwordSlice";
import OtpSlice from "./auth/otpSlice";
import LoginSlice from "./auth/loginSlice";
import UsersSlice from "./auth/usersSlice";
import ProfileSlice from "./akun/profileSlice";
import ChangePassSlice from "./akun/ChangePassSlice";
import getAllCategoriesSlice from "./categories/getAllCategoriesSlice";
import adminLoginSlice from "./admin/auth/adminLoginSlice";
import allDataSlice from "./admin/data/allDataSlice";
import CoursesSlice from "./courses/CoursesSlice";
import ChaptersSlice from "./chapters/ChaptersSlice";
import EnrollmentsSlice from "./enrollments/EnrollmentsSlice";
import ReviewsSlice from "./reviews/reviewsSlice";
import LessonsSlice from "./lessons/LessonsSlice";
import PaymentSlice from "./payments/PaymentsSlice";
import getNotificationsSlice from "./notifications/getNotificationsSlice";
import TrackingsSlice from "./trackings/TrackingsSlice";
import PromotionsSlice from "./promotions/PromotionsSlice";

export default combineReducers({
  // User
  authLogin: LoginSlice,
  authRegister: RegisterSlice,
  authPassword: PasswordSlice,
  authOtp: OtpSlice,
  authProfile: ProfileSlice,
  changePass: ChangePassSlice,
  users: UsersSlice,

  // Categories
  dataCategories: getAllCategoriesSlice,

  // Courses
  dataCourses: CoursesSlice,

  // Chapters
  chapters: ChaptersSlice,

  // Lessons
  lessons: LessonsSlice,

  // Promotions
  promotions: PromotionsSlice,

  // Enrollments
  enrollments: EnrollmentsSlice,

  // Reviews
  reviews: ReviewsSlice,

  // Payment
  payment: PaymentSlice,

  // seNotifications
  notifications: getNotificationsSlice,

  // Trackings
  trackings: TrackingsSlice,

  // Admin
  adminAuthLogin: adminLoginSlice,
  allAdminData: allDataSlice,
});
