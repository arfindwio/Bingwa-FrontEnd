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
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import LoadingSpinner from "../../assets/components/loading/LoadingSpinner";

// Helper
import { showSuccessToast } from "../../helper/ToastHelper";

// Icons
import { IoCloseSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

// Redux Actions
import { getAllUsersAction } from "../../redux/action/users/UsersAction";
import { getAllCoursesAction } from "../../redux/action/courses/CoursesAction";
import {
  getAllLessonsAction,
  postLessonAction,
  putLessonAction,
  deleteLessonAction,
} from "../../redux/action/lessons/LessonsAction";
import { getAllChaptersAction } from "../../redux/action/chapters/ChaptersAction";

export const AdminManageLesson = () => {
  const dispatch = useDispatch();

  const [newLessonName, setNewLessonName] = useState("");
  const [newVideoURL, setNewVideoURL] = useState("");
  const [newChapterId, setNewChapterId] = useState("");

  // Edit Category
  const [editLessonId, setEditLessonId] = useState(null);
  const [updateLessonName, setUpdateLessonName] = useState("");
  const [updateVideoURL, setUpdateVideoURL] = useState("");
  const [updateChapterId, setUpdateChapterId] = useState("");
  const [updateLessonDetail, setUpdateLessonDetail] = useState("");

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeCountCourses = useSelector(
    (state) => state.courses.courses.courses,
  );
  const storeLessons = useSelector((state) => state.lessons.lessons.lessons);
  const storePaginationLessons = useSelector(
    (state) => state.lessons.lessons.pagination,
  );
  const storeChapters = useSelector(
    (state) => state.chapters.chapters.chapters,
  );
  const isLoading = useSelector((state) => state.lessons.loading);

  const countPremiumCourse = storeCountCourses.filter(
    (course) => course.isPremium === true,
  );

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllUsersAction());
    dispatch(getAllCoursesAction());
    dispatch(getAllLessonsAction());
    dispatch(getAllChaptersAction());
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllLessonsAction(formatSearch));
  };

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);

  // New Lesson
  const handleNewLesson = async () => {
    const newLesson = await dispatch(
      postLessonAction({
        lessonName: newLessonName,
        videoURL: newVideoURL,
        chapterId: parseInt(newChapterId),
      }),
    );

    if (!newLesson) {
      setDialogCreate(false);
      dispatch(getAllLessonsAction());
    }

    if (newLesson) {
      showSuccessToast("Lesson successfully added!");
      setDialogCreate(false);

      setNewLessonName("");
      setNewVideoURL("");
      setNewChapterId("");

      dispatch(getAllLessonsAction());
    }
  };

  // Edit Lesson
  const handleEditLesson = (lessonId) => {
    const lessonToEdit = storeLessons?.find((lesson) => lesson.id === lessonId);

    setEditLessonId(lessonId);
    setUpdateLessonName(lessonToEdit?.lessonName);
    setUpdateVideoURL(lessonToEdit?.videoURL);
    setUpdateChapterId(lessonToEdit?.chapterId);
    setUpdateLessonDetail(lessonToEdit);

    setDialogEdit(true);
  };

  // Update Lesson
  const handleUpdateLesson = async () => {
    const updatedLesson = await dispatch(
      putLessonAction(
        {
          lessonName: updateLessonName,
          videoURL: updateVideoURL,
          chapterId: updateChapterId,
        },
        editLessonId,
      ),
    );

    if (!updatedLesson) {
      setDialogEdit(false);
      dispatch(getAllLessonsAction());
    }

    if (updatedLesson) {
      showSuccessToast("Lesson has been successfully updated!");
      setDialogEdit(false);

      // Clear state variables
      setEditLessonId(null);
      setUpdateLessonName("");
      setUpdateVideoURL("");
      setUpdateChapterId("");

      dispatch(getAllLessonsAction());
    }
  };

  // Delete Lesson
  const handleDeleteLesson = async (lessonId) => {
    const deleteLesson = await dispatch(deleteLessonAction(lessonId));

    if (!deleteLesson) {
      dispatch(getAllLessonsAction());
    }

    if (deleteLesson) {
      showSuccessToast("Lesson successfully deleted");
      dispatch(getAllLessonsAction());
      window.scrollTo(0, 0);
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
          <AdminCard title={"Active Users"} count={storeCountUsers?.length} />
          <AdminCard
            title={"Active Class"}
            count={storeCountCourses?.length}
            cardColor={"bg-green"}
          />
          <AdminCard
            title={"Premium Class"}
            count={countPremiumCourse?.length}
            cardColor={"bg-primary"}
          />
        </div>

        {/* Table */}
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto px-4 lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <h2 className="text-xl font-semibold">Manage Lesson</h2>
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
                        Lesson Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Video URL
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Chapter Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeLessons?.map((value, index) => (
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
                        <td className="px-4 py-3">{value?.lessonName}</td>
                        <td className="px-4 py-3">{value?.videoURL}</td>
                        <td className="px-4 py-3">{value?.chapter?.name}</td>
                        <td className="flex gap-1 py-3 text-sm font-semibold text-white">
                          <button
                            className="rounded-full bg-primary px-3 py-1"
                            onClick={() => handleEditLesson(value?.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-full bg-red-400 px-3 py-1"
                            onClick={() => {
                              handleDeleteLesson(value?.id);
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
            <div className="mx-auto pt-5 font-semibold">
              <Pagination
                nextLink={storePaginationLessons?.links?.next}
                prevLink={storePaginationLessons?.links?.prev}
                totalItems={storePaginationLessons?.total_items}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Dialog Create */}
      <Dialog open={dialogCreate} handler={handleDialogCreate} size="xxl">
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Create Lesson</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleDialogCreate}
            />
          </div>
        </DialogHeader>
        <DialogBody
          className="flex space-x-6 px-10 py-10"
          onKeyPress={(e) => (e.key === "Enter" ? handleNewLesson() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Lesson Name</span>
              <input
                type="text"
                value={newLessonName}
                onChange={(e) => setNewLessonName(e.target.value)}
                placeholder="Input Lesson Image"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">video URL</span>
              <input
                type="text"
                value={newVideoURL}
                onChange={(e) => setNewVideoURL(e.target.value)}
                placeholder="Input Video URL"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Chapter</span>
              <select
                value={newChapterId}
                onChange={(e) => setNewChapterId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                {storeChapters.length === 0 ? (
                  <option value="" hidden>
                    No chapter available
                  </option>
                ) : (
                  <>
                    <option value="" hidden>
                      Choose Chapter
                    </option>
                    {storeChapters.map((value) => (
                      <option
                        key={value?.id}
                        value={value?.id}
                        className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                      >
                        {value?.name}
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
            onClick={() => handleNewLesson()}
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 transition-all hover:bg-primary-hover"
          >
            <button className="flex font-semibold text-white">Create</button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog open={dialogEdit} handler={handleDialogEdit} size="xxl">
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Edit Lesson</h1>
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
          className="flex space-x-6 px-10 py-10"
          onKeyPress={(e) => (e.key === "Enter" ? handleUpdateLesson() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Lesson Name</span>
              <input
                type="text"
                value={updateLessonName}
                onChange={(e) => setUpdateLessonName(e.target.value)}
                placeholder="Input Lesson Name"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Video URL</span>
              <input
                type="text"
                value={updateVideoURL}
                onChange={(e) => setUpdateVideoURL(e.target.value)}
                placeholder="Input Video URL"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Chapter</span>
              <select
                value={updateChapterId}
                onChange={(e) => setUpdateChapterId(e.target.value)}
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              >
                <option value={updateLessonDetail?.chapterId} hidden>
                  {updateLessonDetail?.chapter?.name}
                </option>
                {storeChapters.map((value) => (
                  <option
                    key={value.id}
                    value={value.id}
                    className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                  >
                    {value?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <div
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 transition-all hover:bg-primary-hover"
            onClick={handleUpdateLesson}
          >
            <button className="flex font-semibold text-white">Edit</button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
