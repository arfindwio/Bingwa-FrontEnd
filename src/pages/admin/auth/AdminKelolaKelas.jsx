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
import { AdminPojok } from "../../../assets/components/admin/AdminPojok";
import { AdminCard } from "../../../assets/components/admin/AdminCard";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";

// Helper
import { showSuccessToast } from "../../../helper/ToastHelper";

// Icons
import { IoCloseSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

// Redux Actions
import { getAllCoursesAction } from "../../../redux/action/courses/getAllCoursesAction";
import { deleteCourseAction } from "../../../redux/action/admin/course/deleteCourseAction";
import { editCourseAction } from "../../../redux/action/admin/course/editCourseAction";
import { getAllDataAction } from "../../../redux/action/admin/data/getAllDataAction";
import { getDetailCoursesAction } from "../../../redux/action/courses/getDetailCourseAction";
import { createCourseAction } from "../../../redux/action/admin/course/createCourseAction";

export const AdminKelolaKelas = () => {
  const dispatch = useDispatch();

  const storeSearchedCourses = useSelector(
    (state) => state.dataCourses.searchedCourses,
  );

  // Redux Store
  const adminData = useSelector((state) => state.allAdminData);
  const storeAllCourse = useSelector((state) => state.dataCourses.courses);
  const storeDetailCourse = useSelector((state) => state.dataCourses.detail);

  const [dialogTambah, setDialogTambah] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  const getAdminData = () => {
    dispatch(getAllDataAction());
  };

  const getAllCourse = () => {
    dispatch(getAllCoursesAction());
  };

  const getDetailCourse = (categoryId) => {
    dispatch(getDetailCoursesAction(categoryId));
  };

  const renderAllState = () => {
    getAllCourse();
    getAdminData();
    getDetailCourse();
  };

  useEffect(() => {
    renderAllState();
  }, [dispatch]);

  const handleDialogTambah = () => setDialogTambah(!dialogTambah);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);

  // Tambah Course
  const [newCourseName, setNewCourseName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newAboutCourse, setNewAboutCourse] = useState("");
  const [newTargetAudience, setNewTargetAudience] = useState("");
  const [newLearningMaterial, setNewLearningMaterial] = useState("");
  const [newMentor, setNewMentor] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newForumUrl, setNewForumUrl] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newCourseImg, setNewCourseImg] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newPromotionId, setNewPromotionId] = useState("");

  // New Course
  const handleNewCourse = async () => {
    const newCourse = await dispatch(
      createCourseAction({
        courseName: newCourseName,
        price: Number(newPrice),
        level: newLevel,
        aboutCourse: newAboutCourse,
        targetAudience: newTargetAudience,
        learningMaterial: newLearningMaterial,
        mentor: newMentor,
        videoURL: newVideoUrl,
        forumURL: newForumUrl,
        duration: newDuration,
        courseImg: newCourseImg,
        categoryId: Number(newCategoryId),
        promotionId: newPromotionId ? Number(newPromotionId) : null,
      }),
    );

    if (!newCourse) {
      setDialogTambah(false);
    }

    if (newCourse) {
      showSuccessToast("Course berhasil tambahkan!");
      setDialogTambah(false);

      setNewCourseName("");
      setNewPrice("");
      setNewLevel("");
      setNewAboutCourse("");
      setNewTargetAudience("");
      setNewLearningMaterial("");
      setNewMentor("");
      setNewVideoUrl("");
      setNewForumUrl("");
      setNewDuration("");
      setNewCourseImg("");
      setNewCategoryId("");
      setNewPromotionId("");

      renderAllState();
    }
  };

  // Edit Course
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [updateCourseName, setUpdateCourseName] = useState(
    storeDetailCourse?.courseName || "",
  );
  const [updatePrice, setUpdatePrice] = useState(
    storeDetailCourse?.price || "",
  );
  const [updateLevel, setUpdateLevel] = useState(
    storeDetailCourse?.level || "",
  );
  const [updateAboutCourse, setUpdateAboutCourse] = useState(
    storeDetailCourse?.aboutCourse || "",
  );
  const [updateTargetAudience, setUpdateTargetAudience] = useState(
    storeDetailCourse?.targetAudience || "",
  );
  const [updateLearningMaterial, setUpdateLearningMaterial] = useState(
    storeDetailCourse?.learningMaterial || "",
  );
  const [updateMentor, setUpdateMentor] = useState(
    storeDetailCourse?.mentor || "",
  );
  const [updateVideoUrl, setUpdateVideoUrl] = useState(
    storeDetailCourse?.videoURL || "",
  );
  const [updateForumUrl, setUpdateForumUrl] = useState(
    storeDetailCourse?.forumURL || "",
  );
  const [updateDuration, setUpdateDuration] = useState(
    storeDetailCourse?.duration || "",
  );
  const [updateCourseImg, setUpdateCourseImg] = useState(
    storeDetailCourse?.courseImg || "",
  );
  const [updateCategoryId, setUpdateCategoryId] = useState(
    storeDetailCourse?.categoryId || "",
  );
  const [updatePromotionId, setUpdatePromotionId] = useState(
    storeDetailCourse?.promotionId || "",
  );

  // Edit Course
  const handleEditCourse = (courseId) => {
    const courseToEdit = storeAllCourse.find(
      (course) => course.id === courseId,
    );

    setEditingCourseId(courseId);
    setUpdateCourseName(courseToEdit.courseName);
    setUpdatePrice(courseToEdit.price);
    setUpdateLevel(courseToEdit.level);
    setUpdateAboutCourse(courseToEdit.aboutCourse);
    setUpdateTargetAudience(courseToEdit.targetAudience);
    setUpdateLearningMaterial(courseToEdit.learningMaterial);
    setUpdateMentor(courseToEdit.mentor);
    setUpdateVideoUrl(courseToEdit.videoURL);
    setUpdateForumUrl(courseToEdit.forumURL);
    setUpdateDuration(courseToEdit.duration);
    setUpdateCourseImg(courseToEdit.courseImg);
    setUpdateCategoryId(courseToEdit.categoryId);
    setUpdatePromotionId(courseToEdit.promotionId);

    setDialogEdit(true);
  };

  // Update Course
  const handleUpdateCourse = async () => {
    const updatedCourse = await dispatch(
      editCourseAction(
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
          duration: updateDuration,
          courseImg: updateCourseImg,
          categoryId: updateCategoryId,
          promotionId: updatePromotionId,
        },
        editingCourseId,
      ),
    );

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
      setUpdateDuration("");
      setUpdateCourseImg("");
      setUpdateCategoryId("");
      setUpdatePromotionId("");

      renderAllState(); // Refresh course data
    }
  };

  // Delete Course
  const handleDeleteCourse = async (courseId) => {
    const deleteCourse = await dispatch(deleteCourseAction(courseId));

    if (deleteCourse) {
      showSuccessToast("Course berhasil dihapus");

      window.scrollTo(0, 0);

      renderAllState();
    }
  };

  // Displayed Course
  const [displayedCourses, setDisplayedCourses] = useState([]);

  useEffect(() => {
    const coursesToDisplay =
      storeSearchedCourses?.length > 0 ? storeSearchedCourses : storeAllCourse;
    setDisplayedCourses(coursesToDisplay);
  }, [storeSearchedCourses, storeAllCourse]);

  const isLoading = useSelector((state) => state.dataCourses.loading);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <AdminPojok />
      </div>
      <div className="flex w-5/6 flex-col pb-20">
        <AdminNavbar />
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
                  <h2 className="text-xl font-semibold">Kelola Kelas</h2>
                </div>
                <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                  <div className="flex w-full items-center space-x-3 md:w-auto">
                    <button
                      className="flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-2 text-white transition-all hover:bg-primary-hover"
                      onClick={handleDialogTambah}
                    >
                      <FiPlusCircle size={30} />
                      <span className="font-semibold">Tambah</span>
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
                        Kategori
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Nama Kelas
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Tipe Kelas
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Level
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Harga Kelas
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedCourses &&
                      displayedCourses?.map((value, index) => (
                        <tr
                          className="border-b dark:border-gray-700"
                          key={value.id}
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
                            {value.isPremium ? (
                              <span className="font-semibold text-primary">
                                Premium
                              </span>
                            ) : (
                              <span className="font-semibold text-green">
                                Gratis
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {value.level.split(" ")[0]}
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
                                handleDeleteCourse(value.id);
                              }}
                            >
                              Hapus
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

      {/* Dialog Tambah */}
      <Dialog open={dialogTambah} handler={handleDialogTambah} size="xxl">
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Tambah Kelas</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleDialogTambah}
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
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Masukkan Nama Kelas"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-slate-700 ">Harga</span>
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
                placeholder="Masukkan Level"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Tentang Course</span>
              <input
                type="text"
                value={newAboutCourse}
                onChange={(e) => setNewAboutCourse(e.target.value)}
                placeholder="Masukkan Tentang Course"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Target User</span>
              <input
                type="text"
                value={newTargetAudience}
                onChange={(e) => setNewTargetAudience(e.target.value)}
                placeholder="MAsukkan Target User"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Materi Pembelajaran</span>
              <input
                type="text"
                value={newLearningMaterial}
                onChange={(e) => setNewLearningMaterial(e.target.value)}
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
                value={newMentor}
                onChange={(e) => setNewMentor(e.target.value)}
                placeholder="Masukkan Mentor"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Link Video</span>
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="Masukkan Link Video"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Link Telegram</span>
              <input
                type="text"
                value={newForumUrl}
                onChange={(e) => setNewForumUrl(e.target.value)}
                placeholder="Masukkan Link Telegram"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Link Thumbnail</span>
              <input
                type="text"
                value={newCourseImg}
                onChange={(e) => setNewCourseImg(e.target.value)}
                placeholder="Masukkan Link Thumbnail"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Durasi</span>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                placeholder="Masukkan Durasi"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Kategori ID</span>
              <input
                type="number"
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
                placeholder="Masukkan Kategori ID"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Promotion ID</span>
              <input
                type="number"
                value={newPromotionId}
                onChange={(e) => setNewPromotionId(e.target.value)}
                placeholder="Masukkan Promotion ID"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
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
            <h1 className="font-semibold">Edit Kelas</h1>
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
              <span className="text-slate-700">Durasi</span>
              <input
                type="text"
                value={updateDuration}
                onChange={(e) => setUpdateDuration(e.target.value)}
                placeholder="Masukkan Durasi"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Kategori ID</span>
              <input
                type="number"
                value={updateCategoryId}
                onChange={(e) => setUpdateCategoryId(e.target.value)}
                placeholder="Masukkan Kategori ID"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Promotion ID</span>
              <input
                type="number"
                value={updatePromotionId}
                onChange={(e) => setUpdatePromotionId(e.target.value)}
                placeholder="Masukkan Promotion ID"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
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
