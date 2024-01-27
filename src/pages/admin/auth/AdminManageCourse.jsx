import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material Tailwind Components
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

// Components
import { AdminNavbar } from "../../../assets/components/admin/adminNavbar";
import { AdminSidebar } from "../../../assets/components/admin/AdminSidebar";
import { AdminCard } from "../../../assets/components/admin/AdminCard";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";

// Helper
import { showSuccessToast } from "../../../helper/ToastHelper";

// Icons
import { IoCloseSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

// Redux Actions
import { getAllDataAction } from "../../../redux/action/admin/data/getAllDataAction";
import {
  getAllCoursesAction,
  postCourseAction,
  putCourseAction,
  deleteCourseAction,
} from "../../../redux/action/courses/CoursesAction";
import { getAllCategoriesAction } from "../../../redux/action/categories/CategoriesAction";
import { getAllPromotionsAction } from "../../../redux/action/promotions/PromotionsAction";

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
  const [newCourseImg, setNewCourseImg] = useState("");
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
  const [updateCourseImg, setUpdateCourseImg] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [updatePromotionId, setUpdatePromotionId] = useState("");
  const [updateCourseDetail, setUpdateCourseDetail] = useState({});

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  // Redux Store
  const adminData = useSelector((state) => state.allAdminData);
  const storeAllCourse = useSelector(
    (state) => state.dataCourses.courses.courses,
  );
  const storeCategories = useSelector(
    (state) => state.dataCategories.categories,
  );
  const storePromotions = useSelector(
    (state) => state.promotions.promotions.promotions,
  );

  const isLoading = useSelector((state) => state.dataCourses.loading);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllDataAction());
    dispatch(getAllCoursesAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllPromotionsAction());
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllCoursesAction(formatSearch));
  };

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);

  // New Course
  const handleNewCourse = async () => {
    const newCourse = await dispatch(
      postCourseAction({
        courseName: newCourseName,
        price: Number(newPrice),
        level: newLevel,
        aboutCourse: newAboutCourse,
        targetAudience: newTargetAudience,
        learningMaterial: newLearningMaterial,
        mentor: newMentor,
        videoURL: newVideoUrl,
        forumURL: newForumUrl,
        courseImg: newCourseImg,
        categoryId: Number(newCategoryId),
        promotionId: newPromotionId ? Number(newPromotionId) : null,
      }),
    );

    if (!newCourse) {
      setDialogCreate(false);
      dispatch(getAllCoursesAction());
    }

    if (newCourse) {
      showSuccessToast("Course berhasil tambahkan!");
      setDialogCreate(false);

      setNewCourseName("");
      setNewPrice("");
      setNewLevel("");
      setNewAboutCourse("");
      setNewTargetAudience("");
      setNewLearningMaterial("");
      setNewMentor("");
      setNewVideoUrl("");
      setNewForumUrl("");
      setNewCourseImg("");
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
    setUpdateCourseImg(courseToEdit ? courseToEdit.courseImg : null || null);
    setUpdateCategoryId(courseToEdit ? courseToEdit.categoryId : null || null);
    setUpdatePromotionId(
      courseToEdit.promotionId ? courseToEdit.promotionId : null || null,
    );
    setUpdateCourseDetail(courseToEdit);

    setDialogEdit(true);
  };

  // Update Course
  const handleUpdateCourse = async () => {
    const updatedCourse = await dispatch(
      putCourseAction(
        {
          courseName: updateCourseName,
          price: Number(updatePrice),
          level: updateLevel,
          aboutCourse: updateAboutCourse,
          targetAudience: updateTargetAudience,
          learningMaterial: updateLearningMaterial,
          mentor: updateMentor,
          videoURL: updateVideoUrl,
          forumURL: updateForumUrl,
          courseImg: updateCourseImg,
          categoryId: updateCategoryId,
          promotionId: updatePromotionId,
        },
        editingCourseId,
      ),
    );

    if (!updatedCourse) {
      setDialogEdit(false);
      dispatch(getAllCoursesAction());
    }

    if (updatedCourse) {
      showSuccessToast("Course berhasil diupdate!");
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
      setUpdateCourseImg("");
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
      showSuccessToast("Course berhasil dihapus");

      window.scrollTo(0, 0);

      dispatch(getAllCoursesAction());
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <AdminSidebar />
      </div>
      <div className="flex w-5/6 flex-col pb-20">
        <AdminNavbar onSearch={handleSearch} />
        {/* Card */}
        <div className="flex w-full justify-between gap-10 px-14 py-10">
          <AdminCard title={"Active Users"} count={adminData.countUser} />
          <AdminCard
            title={"Active Class"}
            count={adminData.allCourse}
            cardColor={"bg-green"}
          />
          <AdminCard
            title={"Premium Class"}
            count={adminData.coursePremium}
            cardColor={"bg-primary"}
          />
        </div>

        {/* Table */}
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto px-4 lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <h2 className="text-xl font-semibold">Manage Course</h2>
                </div>
                <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                  <div className="flex w-full items-center space-x-3 md:w-auto">
                    <button
                      className="flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-2 text-white transition-all hover:bg-primary-hover"
                      onClick={handleDialogCreate}
                    >
                      <FiPlusCircle size={30} />
                      <span className="font-semibold">Create</span>
                    </button>
                  </div>
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
                    {storeAllCourse?.map((value, index) => (
                      <tr
                        className="border-b dark:border-gray-700"
                        key={value?.id}
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                        >
                          {index + 1}
                        </th>
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
                        <td className="flex gap-1 py-3 text-sm font-semibold text-white">
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dialog Create */}
      <Dialog open={dialogCreate} handler={handleDialogCreate} size="xxl">
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Create Course</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleDialogCreate}
            />
          </div>
        </DialogHeader>
        <DialogBody className="flex space-x-6 px-10 py-10">
          {/* Left Column */}
          <div className="flex-1 space-y-2">
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
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
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
              <span className="text-slate-700">Thumbnail Video URL</span>
              <input
                type="text"
                value={newCourseImg}
                onChange={(e) => setNewCourseImg(e.target.value)}
                placeholder="Input Thumbnail Video URL"
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
                {storeAllCourse.length === 0 ? (
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
                {storePromotions.length === 0 ? (
                  <option value="" hidden>
                    No promotion available
                  </option>
                ) : (
                  <>
                    <option value="" hidden>
                      Choose Promotion
                    </option>
                    {storePromotions.map((value) => (
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
        <DialogFooter className="flex justify-center gap-4">
          <div
            onClick={() => handleNewCourse()}
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 transition-all hover:bg-primary-hover"
          >
            <button className="flex font-semibold text-white">Tambah</button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog open={dialogEdit} handler={handleDialogEdit} size="xxl">
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
        <DialogBody className="flex space-x-6 px-10 py-10">
          {/* Left Column */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Nama Kelas</span>
              <input
                type="text"
                value={updateCourseName}
                onChange={(e) => setUpdateCourseName(e.target.value)}
                placeholder="Masukkan Nama Kelas"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-slate-700 ">Harga</span>
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
              <span className="text-slate-700">Tentang Course</span>
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
          <div className="flex-1 space-y-2">
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
              <span className="text-slate-700">Link Thumbnail</span>
              <input
                type="text"
                value={updateCourseImg}
                onChange={(e) => setUpdateCourseImg(e.target.value)}
                placeholder="Masukkan Link Thumbnail"
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
                <option value={updateCourseDetail?.categoryId} hidden>
                  {updateCourseDetail?.category?.categoryName}
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
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Promotion</span>
              <select
                value={newPromotionId}
                onChange={(e) => setNewPromotionId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                {storePromotions.length === 0 ? (
                  <option value="" hidden>
                    No promotion available
                  </option>
                ) : (
                  <>
                    <option value={updateCourseDetail?.promotionId} hidden>
                      {updateCourseDetail?.promotion?.discount * 100}%
                    </option>
                    {storePromotions.map((value) => (
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
        <DialogFooter className="flex justify-center gap-4">
          <div
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 transition-all hover:bg-primary-hover"
            onClick={handleUpdateCourse}
          >
            <button className="flex font-semibold text-white">Edit</button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
