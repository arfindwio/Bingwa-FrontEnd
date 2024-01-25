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
  AUTH_USER: "/users/authenticate", // [GET] Get User by Authenticate

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

  // COURSES
  GET_ALL_COURSES: "/courses", // [GET] Get All Courses
  UPDATE_COURSE: "/courses", // [PUT] Update Course by ID
  CREATE_COURSE: "/courses", // [POST] Create Course
  GET_COURSE: "/courses", // [GET] Get Course by ID
  DELETE_COURSE: "/courses", // [DELETE] Delete Course by ID

  // CHAPTERS
  CREATE_CHAPTER: "/chapters", // [POST] Create Chapter
  GET_ALL_CHAPTERS: "/chapters", // [GET] Get All Chapter
  GET_CHAPTER: "/chapters/{chapterId}", // [GET] Get Chapter by ID
  UPDATE_CHAPTER: "/chapters/{chapterId}", // [PUT] Update Chapter by ID
  DELETE_CHAPTER: "/chapters/{chapterId}", // [DELETE] Delete Chapter by ID

  // LESSONS
  // /lessons [GET] Get All Lessons
  // /lessons [POST] Create Lesson
  // /lessons/{courseId} [GET] Get Lesson by Course
  // /lessons/{lessonId} [GET] Get Lesson by ID
  // /lessons/{lesssonId} [PUT] Update Lesson by ID
  // /lessons/{lesssonId} [DELETE] Delete Lesson by ID
  LESSONS: "/lessons",

  // ENROLLMENTS
  GET_ALL_ENROLLMENTS: "/enrollments", // [GET] Get All Enrollments
  GET_ENROLMENT: "/enrollments", //{courseId} // [GET] Get Enrollments by ID
  CREATE_ENROLLMENT: "/enrollments", // [POST] Create Enrollment by Course ID
  // /enrollments/{courseId} // [PUT] Update Enrollment Preparation by Course ID
  ENROLLMENTS: "/enrollments",

  // REVIEWS
  // /reviews/{courseId}" [POST] Create Review
  REVIEWS: "/reviews",

  // PROMOTIONS
  GET_ALL_PROMOTIONS: "/promotions", // [GET] Get All Promotions
  CREATE_PROMOTION: "/promotions", // [POST] Create Promotions
  GET_PROMOTION: "/promotions/{promotionId}", // [GET] Get Promotions by ID
  UPDATE_PROMOTION: "/promotions/{promotionId}", // [PUT] Update Promotions by ID
  DELETE_PROMOTION: "/promotions/{promotionId}", // [DELETE] Delete Promotions by ID

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
  GET_ALL_PAYMENTS: "/payments", // [GET] Get All Payment
  GET_HISTORY_PAYMENTS: "/payments/history", // [GET] Get All Payment by Authentication
  GET_PAYMENT_BY_COURSE: "/payments/{courseId}", // [GET] Get Payment by Course ID
  CREATE_PAYMENT: "/payments", // [POST] Create Payment
  CREATE_MIDTRANS_PAYMENT: "/payment/midtrans", // [POST] Create Payment Midtrans
  PAYMENTS: "/payments",

  // ADMIN
  GET_ADMIN_ALL: "/admin/all", // [GET] Get All Data From Admin
};
