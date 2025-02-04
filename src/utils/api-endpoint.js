//  API Endpoint
export const API_ENDPOINT = {
  // USERS
  USER_LOGIN: "/users/login", // [POST] Login User
  USER_REGISTER: "/users/register", // [POST] Register User
  VERIFY_OTP: "/users/verify-otp", // [PUT] Verify OTP User
  RESEND_OTP: "/users/resend-otp", // [PUT] Resend OTP User
  FORGET_PASS: "/users/forget-password", // [POST] Forgot Password
  UPDATE_PASS: "/users/update-password", // [PUT] Update Password
  CHANGE_PASS: "/users/change-password", // [PUT] Change Password
  // /users/authenticate // [GET] Get User by Authenticate
  USERS: "/users",

  // GOOGLE
  GOOGLE: "/users/google", // [GET] Login User With Google
  GOOGLE_CALLBACK: "/users/google/callback", // [GET] Google Callback

  // USER PROFILE
  UPDATE_PROFILE: "/user-profiles/update-profile", // [PUT] Edit User by Authenticate

  // CATEGORIES
  CREATE_CATEGORY: "/categories", // [POST] Create Category
  GET_ALL_CATEGORIES: "/categories", // [GET] Get All Categories
  UPDATE_CATEGORY: "/categories/{categoryId}", // [PUT] Update Category by ID
  DELETE_CATEGORY: "/categories/{categoryId}", // [DELETE] Delete Category by ID
  CATEGORIES: "/categories",

  // COURSES
  GET_ALL_COURSES: "/courses", // [GET] Get All Courses
  UPDATE_COURSE: "/courses", // [PUT] Update Course by ID
  CREATE_COURSE: "/courses", // [POST] Create Course
  GET_COURSE: "/courses", // [GET] Get Course by ID
  DELETE_COURSE: "/courses", // [DELETE] Delete Course by ID

  // CHAPTERS
  // "/chapters // [POST] Create Chapter
  // "/chapters // [GET] Get All Chapter
  // "/chapters/{chapterId} // [GET] Get Chapter by ID
  // "/chapters/{chapterId} // [PUT] Update Chapter by ID
  // "/chapters/{chapterId} // [DELETE] Delete Chapter by ID
  CHAPTERS: "/chapters",

  // LESSONS
  // /lessons [GET] Get All Lessons
  // /lessons [POST] Create Lesson
  // /lessons/{courseId} [GET] Get Lesson by Course
  // /lessons/{lessonId} [GET] Get Lesson by ID
  // /lessons/{lesssonId} [PUT] Update Lesson by ID
  // /lessons/{lesssonId} [DELETE] Delete Lesson by ID
  LESSONS: "/lessons",

  // ENROLLMENTS
  // /enrollments // [GET] Get All Enrollments
  // /enrollments // [POST] Create Enrollment by Course ID
  // /enrollments/{courseId} // [GET] Get Enrollments by ID
  // /enrollments/{courseId} // [PUT] Update Enrollment Preparation by Course ID
  ENROLLMENTS: "/enrollments",
  ENROLLMENTS1: "/enrollments",

  // REVIEWS
  // /reviews/{courseId}" [POST] Create Review
  REVIEWS: "/reviews",

  // PROMOTIONS
  // /promotions // [GET] Get All Promotions
  // /promotions // [POST] Create Promotions
  // /promotions/{promotionId} // [GET] Get Promotions by ID
  // /promotions/{promotionId} // [PUT] Update Promotions by ID
  // /promotions/{promotionId} // [DELETE] Delete Promotions by ID
  PROMOTIONS: "/promotions",

  // NOTIFICATIONS
  GET_ALL_NOTIFICATIONS: "/notifications", // [GET] Get All Notification by Authentication
  CREATE_NOTIFICATIONS: "/notifications", // [POST] Create Notification
  UPDATE_NOTIFICATIONS: "/notifications/markAsRead", // [PUT] Update Notification by Authentication

  // TRACKINGS
  // /trackings/{courseId} [GET] get Trackings by Course ID
  // /trackings/{lessonId} [PUT] put Trackings by Lesson ID
  UPDATE_TRACKINGS: "/trackings", // [PUT] Update Trackings
  TRACKINGS: "/trackings",

  // PAYMENTS
  // /payments // [GET] Get All Payment
  // /payments/history // [GET] Get All Payment by Authentication
  // /payments/{courseId} // [GET] Get Payment by Course ID
  // /payments // [POST] Create Payment
  // payment/midtrans/{courseId} // [POST] Create Payment Midtrans
  PAYMENTS: "/payments",
};
