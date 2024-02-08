import { combineReducers } from "@reduxjs/toolkit";
import UsersSlice from "./users/UsersSlice";
import UserProfilesSlice from "./userProfiles/UserProfilesSlice";
import CategoriesSlice from "./categories/CategoriesSlice";
import adminLoginSlice from "./admin/auth/adminLoginSlice";
import CoursesSlice from "./courses/CoursesSlice";
import ChaptersSlice from "./chapters/ChaptersSlice";
import EnrollmentsSlice from "./enrollments/EnrollmentsSlice";
import ReviewsSlice from "./reviews/ReviewsSlice";
import LessonsSlice from "./lessons/LessonsSlice";
import PaymentsSlice from "./payments/PaymentsSlice";
import NotificationsSlice from "./notifications/NotificationsSlice";
import TrackingsSlice from "./trackings/TrackingsSlice";
import PromotionsSlice from "./promotions/PromotionsSlice";

export default combineReducers({
  // User
  users: UsersSlice,

  // User Profiles
  userProfiles: UserProfilesSlice,

  // Categories
  categories: CategoriesSlice,

  // Courses
  courses: CoursesSlice,

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
  payments: PaymentsSlice,

  // seNotifications
  notifications: NotificationsSlice,

  // Trackings
  trackings: TrackingsSlice,

  // Admin
  adminAuthLogin: adminLoginSlice,
});
