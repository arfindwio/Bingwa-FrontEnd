import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Material Tailwind Components
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

// Components
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import { AdminDataSkeleton } from "../../assets/components/skeleton/AdminDataSkeleton";

// Helper
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
} from "../../helper/ToastHelper";

// Icons
import { IoCloseSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

// Redux Actions
import { getAllUsersAction } from "../../redux/action/users/UsersAction";
import {
  getAllCoursesAction,
  postCourseAction,
  putCourseAction,
  deleteCourseAction,
} from "../../redux/action/courses/CoursesAction";
import { getAllCategoriesAction } from "../../redux/action/categories/CategoriesAction";
import { getAllPromotionsAction } from "../../redux/action/promotions/PromotionsAction";

export const AdminManageCourse = () => {
  const dispatch = useDispatch();

  const [newCourseName, setNewCourseName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newAboutCourse, setNewAboutCourse] = useState("");
  const [newTargetAudience, setNewTargetAudience] = useState("");
  const [newLearningMaterial, setNewLearningMaterial] = useState("");
  const [newMentor, setNewMentor] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newForumUrl, setNewForumUrl] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newPromotionId, setNewPromotionId] = useState("");

  // Edit Course
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [updateCourseName, setUpdateCourseName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateLevel, setUpdateLevel] = useState("");
  const [updateAboutCourse, setUpdateAboutCourse] = useState("");
  const [updateTargetAudience, setUpdateTargetAudience] = useState("");
  const [updateLearningMaterial, setUpdateLearningMaterial] = useState("");
  const [updateMentor, setUpdateMentor] = useState("");
  const [updateVideoUrl, setUpdateVideoUrl] = useState("");
  const [updateForumUrl, setUpdateForumUrl] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [updatePromotionId, setUpdatePromotionId] = useState("");
  const [updateCourseDetail, setUpdateCourseDetail] = useState({});
  console.log(updatePromotionId);

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [open, setOpen] = useState(false);

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeAllCourse = useSelector((state) => state.courses.courses.courses);
  const storePaginationCourses = useSelector(
    (state) => state.courses.courses.pagination,
  );
  const storeCategories = useSelector(
    (state) => state.categories.categories.categories,
  );
  const storePromotions = useSelector(
    (state) => state.promotions.promotions.promotions,
  );
  const loadingCourses = useSelector((state) => state.courses.loading);
  const loadingUsers = useSelector((state) => state.users.loading);

  const countPremiumCourse = storeAllCourse.filter(
    (course) => course.isPremium === true,
  );

  open
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllUsersAction());
    dispatch(getAllCoursesAction());
    dispatch(getAllCategoriesAction("limit=1000"));
    dispatch(getAllPromotionsAction("limit=1000"));
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllCoursesAction(formatSearch));
  };

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);
  const handleOpen = (openValue) => setOpen(openValue);

  // New Course
  const handleNewCourse = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const formData = new FormData();
    formData.append("courseName", newCourseName);
    formData.append("price", Number(newPrice));
    formData.append("level", newLevel);
    formData.append("aboutCourse", newAboutCourse);
    formData.append("targetAudience", newTargetAudience);
    formData.append("learningMaterial", newLearningMaterial);
    formData.append("mentor", newMentor);
    formData.append("videoURL", newVideoUrl);
    formData.append("forumURL", newForumUrl);
    formData.append("image", newImage);
    formData.append("categoryId", Number(newCategoryId));
    formData.append(
      "promotionId",
      newPromotionId ? Number(newPromotionId) : null,
    );

    const newCourse = await dispatch(postCourseAction(formData));

    toast.dismiss(loadingToastId);

    if (!newCourse) {
      setDialogCreate(false);
      showErrorToast("Course Failed Create!");
      dispatch(getAllCoursesAction());
    }

    if (newCourse) {
      setDialogCreate(false);
      showSuccessToast("Course successfully added!");

      setNewCourseName("");
      setNewPrice("");
      setNewLevel("");
      setNewAboutCourse("");
      setNewTargetAudience("");
      setNewLearningMaterial("");
      setNewMentor("");
      setNewVideoUrl("");
      setNewForumUrl("");
      setNewCategoryId("");
      setNewPromotionId("");

      dispatch(getAllCoursesAction());
    }
  };

  // Edit Course
  const handleEditCourse = (courseId) => {
    const courseToEdit = storeAllCourse.find(
      (course) => course.id === courseId,
    );

    setEditingCourseId(courseId);
    setUpdateCourseName(courseToEdit ? courseToEdit.courseName : null || null);
    setUpdatePrice(courseToEdit ? courseToEdit.price : null || null);
    setUpdateLevel(courseToEdit ? courseToEdit.level : null || null);
    setUpdateAboutCourse(
      courseToEdit ? courseToEdit.aboutCourse : null || null,
    );
    setUpdateTargetAudience(
      courseToEdit ? courseToEdit.targetAudience : null || null,
    );
    setUpdateLearningMaterial(
      courseToEdit ? courseToEdit.learningMaterial : null || null,
    );
    setUpdateMentor(courseToEdit ? courseToEdit.mentor : null || null);
    setUpdateVideoUrl(courseToEdit ? courseToEdit.videoURL : null || null);
    setUpdateForumUrl(courseToEdit ? courseToEdit.forumURL : null || null);
    setUpdateCategoryId(courseToEdit ? courseToEdit.categoryId : null || null);
    setUpdatePromotionId(
      !courseToEdit.promotionId
        ? null
        : Number(courseToEdit.promotionId) || null,
    );
    setUpdateCourseDetail(courseToEdit);

    setDialogEdit(true);
  };

  // Update Course
  const handleUpdateCourse = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const formData = new FormData();
    formData.append("courseName", updateCourseName);
    formData.append("price", Number(updatePrice));
    formData.append("level", updateLevel);
    formData.append("aboutCourse", updateAboutCourse);
    formData.append("targetAudience", updateTargetAudience);
    formData.append("learningMaterial", updateLearningMaterial);
    formData.append("mentor", updateMentor);
    formData.append("videoURL", updateVideoUrl);
    formData.append("forumURL", updateForumUrl);
    formData.append("image", updateImage);
    formData.append("categoryId", Number(updateCategoryId));
    formData.append("promotionId", updatePromotionId);

    const updatedCourse = await dispatch(
      putCourseAction(formData, editingCourseId),
    );

    toast.dismiss(loadingToastId);

    if (!updatedCourse) {
      setDialogEdit(false);
      showErrorToast("Course Failed update!");
      dispatch(getAllCoursesAction());
    }

    if (updatedCourse) {
      showSuccessToast("Course has been successfully updated!");
      setDialogEdit(false);

      // Clear state variables
      setEditingCourseId(null);
      setUpdateCourseName("");
      setUpdatePrice("");
      setUpdateLevel("");
      setUpdateAboutCourse("");
      setUpdateTargetAudience("");
      setUpdateLearningMaterial("");
      setUpdateMentor("");
      setUpdateVideoUrl("");
      setUpdateForumUrl("");
      setUpdateCategoryId("");
      setUpdatePromotionId("");

      dispatch(getAllCoursesAction());
    }
  };

  // Delete Course
  const handleDeleteCourse = async (courseId) => {
    const deleteCourse = await dispatch(deleteCourseAction(courseId));

    if (!deleteCourse) {
      dispatch(getAllCoursesAction());
    }

    if (deleteCourse) {
      showSuccessToast("Course successfully deleted");

      window.scrollTo(0, 0);

      dispatch(getAllCoursesAction());
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-1/6">
        <AdminSidebar />
      </div>
      <div className="flex w-full flex-col pb-5 lg:w-5/6">
        <AdminNavbar onSearch={handleSearch} onOpen={handleOpen} />
        {/* Card */}
        <div className="flex w-full flex-wrap justify-between gap-2 px-4 py-10 md:gap-10 lg:px-14">
          <AdminCard
            title={"Active Users"}
            count={storeCountUsers?.length}
            isLoading={loadingUsers && loadingCourses}
          />
          <AdminCard
            title={"Active Class"}
            count={storeAllCourse?.length}
            isLoading={loadingUsers && loadingCourses}
            cardColor={"bg-green"}
          />
          <AdminCard
            title={"Premium Class"}
            count={countPremiumCourse?.length}
            isLoading={loadingUsers && loadingCourses}
            cardColor={"bg-primary"}
          />
        </div>

        {/* Table */}
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto px-4 lg:px-12">
            <div className="relative border-2 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-0">
                <h2 className="w-fit break-words text-xl font-semibold">
                  Manage Course
                </h2>
                <div className="flex w-fit items-center ">
                  <button
                    className="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-white hover:bg-primary-hover"
                    onClick={handleDialogCreate}
                  >
                    <FiPlusCircle size={30} />
                    <span className="font-semibold">Create</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="text-md bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        No
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Category Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Course Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Course Type
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Level
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Price Course
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!storeAllCourse ? (
                      <tr>
                        <td
                          className="px-4 py-3 text-center text-sm
                  italic"
                          colSpan={7}
                        >
                          Data Not Found
                        </td>
                      </tr>
                    ) : (
                      storeAllCourse?.map((value, index) =>
                        loadingCourses ? (
                          <tr key={index} className="animate-pulse">
                            <AdminDataSkeleton tdCount={7} />
                          </tr>
                        ) : (
                          <tr className="dark:border-gray-700" key={value?.id}>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3">
                              {value.category?.categoryName}
                            </td>
                            <td className="px-4 py-3">{value.courseName}</td>
                            <td className="px-4 py-3">
                              {value?.isPremium ? (
                                <span className="font-semibold text-primary">
                                  Premium
                                </span>
                              ) : (
                                <span className="font-semibold text-green">
                                  Free
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {value?.level.split(" ")[0]}
                            </td>
                            <td className="px-4 py-3">Rp {value.price}</td>
                            <td className="flex gap-1 px-4 py-3 text-sm font-semibold text-white">
                              <button
                                className="rounded-full bg-primary px-3 py-1"
                                onClick={() => handleEditCourse(value.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="rounded-full bg-red-400 px-3 py-1"
                                onClick={() => {
                                  handleDeleteCourse(value?.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ),
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagiantion */}
            {loadingCourses ? null : (
              <div className="mx-auto pt-5 font-semibold">
                <Pagination
                  type={"courses"}
                  nextLink={storePaginationCourses.links.next}
                  prevLink={storePaginationCourses.links.prev}
                  totalItems={storePaginationCourses.total_items}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Dialog Create */}
      <Dialog
        open={dialogCreate}
        handler={handleDialogCreate}
        size="xl"
        className="h-full overflow-auto sm:h-auto"
      >
        <DialogHeader className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Create Course</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleDialogCreate}
            />
          </div>
        </DialogHeader>
        <DialogBody
          className="flex h-auto w-full flex-wrap gap-3 bg-white px-10 sm:gap-0"
          onKeyPress={(e) => (e.key === "Enter" ? handleNewCourse() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex w-full flex-col gap-3 sm:w-1/2 sm:pr-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Course Name</span>
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Input Course Name"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-slate-700 ">Price</span>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Rp"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Level</span>
              <input
                type="text"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                placeholder="Input Level Course"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">About Course</span>
              <input
                type="text"
                value={newAboutCourse}
                onChange={(e) => setNewAboutCourse(e.target.value)}
                placeholder="Input About Course"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Target Audience</span>
              <input
                type="text"
                value={newTargetAudience}
                onChange={(e) => setNewTargetAudience(e.target.value)}
                placeholder="Input Target Audience"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Learning Material</span>
              <input
                type="text"
                value={newLearningMaterial}
                onChange={(e) => setNewLearningMaterial(e.target.value)}
                placeholder="Input Learning Material"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-full flex-col gap-3 sm:w-1/2 sm:pl-2">
            <div className="flex flex-col ">
              <span className="text-slate-700">Mentor</span>
              <input
                type="text"
                value={newMentor}
                onChange={(e) => setNewMentor(e.target.value)}
                placeholder="Input Mentor"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Video URL</span>
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="Input Video URL"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Telegram Group URL</span>
              <input
                type="text"
                value={newForumUrl}
                onChange={(e) => setNewForumUrl(e.target.value)}
                placeholder="Input Telegram Group URL"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Course Image</span>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Category</span>
              <select
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                {!storeCategories.length ? (
                  <option value="" hidden>
                    No category available
                  </option>
                ) : (
                  <>
                    <option value="" hidden>
                      Choose Category
                    </option>
                    {storeCategories.map((value) => (
                      <option
                        key={value.id}
                        value={value.id}
                        className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                      >
                        {value?.categoryName}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Promotion</span>
              <select
                value={newPromotionId}
                onChange={(e) => setNewPromotionId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                {storePromotions?.length === 0 ? (
                  <option value="" hidden>
                    No promotion available
                  </option>
                ) : (
                  <>
                    <option value="" hidden>
                      Choose Promotion
                    </option>
                    <option value="null">Not promotion</option>

                    {storePromotions?.map((value) => (
                      <option
                        key={value.id}
                        value={value.id}
                        className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                      >
                        {value?.discount * 100}%
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex h-fit w-full justify-center gap-4">
          <button
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 font-semibold text-white transition-all hover:bg-primary-hover"
            onClick={() => handleNewCourse()}
          >
            Create
          </button>
        </DialogFooter>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog
        open={dialogEdit}
        handler={handleDialogEdit}
        size="xl"
        className="h-full overflow-auto sm:h-auto"
      >
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Edit Course</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={() => {
                handleDialogEdit();
              }}
            />
          </div>
        </DialogHeader>
        <DialogBody
          className="flex h-auto w-full flex-wrap gap-3 bg-white px-10 sm:gap-0"
          onKeyPress={(e) => (e.key === "Enter" ? handleUpdateCourse() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex w-full flex-col gap-3 sm:w-1/2 sm:pr-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Course Name</span>
              <input
                type="text"
                value={updateCourseName}
                onChange={(e) => setUpdateCourseName(e.target.value)}
                placeholder="Masukkan Nama Kelas"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-slate-700 ">Price</span>
              <input
                type="number"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
                placeholder="Rp"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Level</span>
              <input
                type="text"
                value={updateLevel}
                onChange={(e) => setUpdateLevel(e.target.value)}
                placeholder="Masukkan Level"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">About Course</span>
              <input
                type="text"
                value={updateAboutCourse}
                onChange={(e) => setUpdateAboutCourse(e.target.value)}
                placeholder="Masukkan Tentang Course"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Target User</span>
              <input
                type="text"
                value={updateTargetAudience}
                onChange={(e) => setUpdateTargetAudience(e.target.value)}
                placeholder="MAsukkan Target User"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Materi Pembelajaran</span>
              <input
                type="text"
                value={updateLearningMaterial}
                onChange={(e) => setUpdateLearningMaterial(e.target.value)}
                placeholder="Masukkan Materi Pembelajaran"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-full flex-col gap-3 sm:w-1/2 sm:pl-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Mentor</span>
              <input
                type="text"
                value={updateMentor}
                onChange={(e) => setUpdateMentor(e.target.value)}
                placeholder="Masukkan Mentor"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Link Video</span>
              <input
                type="text"
                value={updateVideoUrl}
                onChange={(e) => setUpdateVideoUrl(e.target.value)}
                placeholder="Masukkan Link Video"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Link Telegram</span>
              <input
                type="text"
                value={updateForumUrl}
                onChange={(e) => setUpdateForumUrl(e.target.value)}
                placeholder="Masukkan Link Telegram"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Course Image</span>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setUpdateImage(e.target.files[0])}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Category</span>
              <select
                value={updatePromotionId}
                onChange={(e) => setUpdateCategoryId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                <option value={updateCourseDetail?.categoryId} hidden>
                  {updateCourseDetail?.category?.categoryName}
                </option>
                {storeCategories?.map((value) => (
                  <option
                    key={value.id}
                    value={value.id}
                    className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                  >
                    {value?.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Promotion</span>
              <select
                value={updatePromotionId}
                onChange={(e) => setUpdatePromotionId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                {!storePromotions?.length ? (
                  <option value="" hidden>
                    No promotion available
                  </option>
                ) : (
                  <>
                    <option value="null">Not promotion</option>
                    <option value={updateCourseDetail?.promotionId} hidden>
                      {updateCourseDetail.promotionId
                        ? `${updateCourseDetail?.promotion?.discount * 100} %`
                        : "Choose Promotion"}
                    </option>
                    {storePromotions?.map((value) => (
                      <option
                        key={value.id}
                        value={value.id}
                        className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                      >
                        {value?.discount * 100}%
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex w-full justify-center gap-4 bg-white">
          <button
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 font-semibold text-white transition-all hover:bg-primary-hover"
            onClick={handleUpdateCourse}
          >
            Edit
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
