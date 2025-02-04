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
import { AdminDataSkeleton } from "../../assets/components/skeleton/AdminDataSkeleton";

// Helper
import { showSuccessToast } from "../../helper/ToastHelper";

// Icons
import { IoCloseSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

// Redux Actions
import { getAllUsersAction } from "../../redux/action/users/UsersAction";
import {
  getAllChaptersAction,
  postChapterAction,
  putChapterAction,
  deleteChapterAction,
} from "../../redux/action/chapters/ChaptersAction";
import { getAllCoursesAction } from "../../redux/action/courses/CoursesAction";
import { type } from "@testing-library/user-event/dist/type";

export const AdminManageChapter = () => {
  const dispatch = useDispatch();

  const [newChapterName, setNewChapterName] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newDuration, setNewDuration] = useState("");

  // Edit Category
  const [editChapterId, setEditChapterId] = useState(null);
  const [updateChapterName, setUpdateChapterName] = useState("");
  const [updateDuration, setUpdateDuration] = useState("");
  const [updateCourseId, setUpdateCourseId] = useState("");
  const [updateChapterDetail, setUpdateChapterDetail] = useState("");

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [open, setOpen] = useState(false);

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeChapters = useSelector(
    (state) => state.chapters.chapters.chapters,
  );
  const storePaginationChapters = useSelector(
    (state) => state.chapters.chapters.pagination,
  );
  const storeCourses = useSelector((state) => state.courses.courses.courses);

  const loadingChapters = useSelector((state) => state.chapters.loading);
  const loadingCourses = useSelector((state) => state.courses.loading);
  const loadingUsers = useSelector((state) => state.users.loading);

  const countPremiumCourse = storeCourses.filter(
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
    dispatch(getAllCoursesAction("limit=1000"));
    dispatch(getAllChaptersAction());
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllChaptersAction(formatSearch));
  };

  const handleQuery = (formatLink) => {
    dispatch(getAllChaptersAction(formatLink));
  };

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);
  const handleOpen = (openValue) => setOpen(openValue);

  // New Chapter
  const handleNewChapter = async () => {
    const newChapter = await dispatch(
      postChapterAction({
        name: newChapterName,
        courseId: parseInt(newCourseId),
        duration: parseInt(newDuration),
      }),
    );

    if (!newChapter) {
      setDialogCreate(false);
      dispatch(getAllChaptersAction());
    }

    if (newChapter) {
      setDialogCreate(false);
      showSuccessToast("Chapter successfully added!");

      setNewChapterName("");
      setNewCourseId("");
      setNewDuration("");

      dispatch(getAllChaptersAction());
    }
  };

  // Edit Chapter
  const handleEditChapter = (chapterId) => {
    const chapterToEdit = storeChapters?.find(
      (chapter) => chapter.id === chapterId,
    );

    setEditChapterId(chapterId);
    setUpdateChapterName(chapterToEdit?.name);
    setUpdateDuration(chapterToEdit?.duration);
    setUpdateCourseId(chapterToEdit?.courseId);
    setUpdateChapterDetail(chapterToEdit);

    setDialogEdit(true);
  };

  // Update Chapter
  const handleUpdateChapter = async () => {
    const updatedChapter = await dispatch(
      putChapterAction(
        {
          name: updateChapterName,
          duration: updateDuration,
          courseId: updateCourseId,
        },
        editChapterId,
      ),
    );

    if (!updatedChapter) {
      setDialogEdit(false);
      dispatch(getAllChaptersAction());
    }

    if (updatedChapter) {
      showSuccessToast("Chapter has been successfully updated!");
      setDialogEdit(false);

      // Clear state variables
      setEditChapterId(null);
      setUpdateChapterName("");
      setUpdateDuration("");
      setUpdateCourseId("");

      dispatch(getAllChaptersAction());
    }
  };

  // Delete Chapter
  const handleDeleteChapter = async (chapterId) => {
    const deleteChapter = await dispatch(deleteChapterAction(chapterId));

    if (!deleteChapter) {
      dispatch(getAllChaptersAction());
    }

    if (deleteChapter) {
      showSuccessToast("Chapter successfully deleted");

      window.scrollTo(0, 0);

      dispatch(getAllChaptersAction());
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-1/6">
        <AdminSidebar />
      </div>
      <div className="flex w-full flex-col pb-20 lg:w-5/6">
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
            count={storeCourses?.length}
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
                  Manage Chapter
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
                        Chapter Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Course Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!storeChapters ? (
                      <tr>
                        <td
                          className="px-4 py-3 text-center text-sm
                    italic"
                          colSpan={5}
                        >
                          Data Not Found
                        </td>
                      </tr>
                    ) : (
                      storeChapters?.map((value, index) =>
                        loadingChapters ? (
                          <tr key={index} className="animate-pulse">
                            <AdminDataSkeleton tdCount={5} />
                          </tr>
                        ) : (
                          <tr className="dark:border-gray-700" key={value?.id}>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3">{value?.name}</td>
                            <td className="px-4 py-3">
                              {value?.duration} Minute
                            </td>
                            <td className="px-4 py-3">
                              {value?.course.courseName}
                            </td>
                            <td className="flex gap-1 px-4 py-3 text-sm font-semibold text-white">
                              <button
                                className="rounded-full bg-primary px-3 py-1"
                                onClick={() => handleEditChapter(value?.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="rounded-full bg-red-400 px-3 py-1"
                                onClick={() => {
                                  handleDeleteChapter(value?.id);
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

            {/* pagination */}
            {loadingChapters ? null : (
              <div className="mx-auto pt-5 font-semibold">
                <Pagination
                  onQuery={handleQuery}
                  type={"chapters"}
                  nextLink={storePaginationChapters?.links?.next}
                  prevLink={storePaginationChapters?.links?.prev}
                  totalItems={storePaginationChapters?.total_items}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Dialog Create */}
      <Dialog open={dialogCreate} handler={handleDialogCreate} size="md">
        <DialogHeader className="flex flex-col bg-white">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Create Chapter</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleDialogCreate}
            />
          </div>
        </DialogHeader>
        <DialogBody
          className="flex flex-col justify-center gap-3 bg-white px-10"
          onKeyPress={(e) => (e.key === "Enter" ? handleNewChapter() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex flex-col">
            <span className="text-slate-700">Chapter Name</span>
            <input
              type="text"
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              placeholder="Input Chapter Image"
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-700">Course</span>
            <select
              value={newCourseId}
              onChange={(e) => setNewCourseId(e.target.value)}
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            >
              {storeCourses.length === 0 ? (
                <option value="" hidden>
                  No course available
                </option>
              ) : (
                <>
                  <option value="" hidden>
                    Choose Course
                  </option>
                  {storeCourses.map((value) => (
                    <option
                      key={value?.id}
                      value={value?.id}
                      className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                    >
                      {value?.courseName}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-700">Duration</span>
            <input
              type="number"
              min={0}
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              placeholder="Input Duration"
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center bg-white">
          <button
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 font-semibold text-white transition-all hover:bg-primary-hover"
            onClick={() => handleNewChapter()}
          >
            Create
          </button>
        </DialogFooter>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog open={dialogEdit} handler={handleDialogEdit} size="md">
        <DialogHeader className="flex flex-col bg-white">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Edit Chapter</h1>
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
          className="flex flex-col justify-center gap-3 bg-white px-10"
          onKeyPress={(e) => (e.key === "Enter" ? handleUpdateChapter() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex flex-col">
            <span className="text-slate-700">Chapter Name</span>
            <input
              type="text"
              value={updateChapterName}
              onChange={(e) => setUpdateChapterName(e.target.value)}
              placeholder="Input Chapter Name"
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-700">Course</span>
            <select
              value={updateCourseId}
              onChange={(e) => setUpdateCourseId(e.target.value)}
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            >
              <option value={updateChapterDetail?.courseId} hidden>
                {updateChapterDetail?.course?.courseName}
              </option>
              {storeCourses.map((value) => (
                <option
                  key={value.id}
                  value={value.id}
                  className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none"
                >
                  {value?.courseName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-700">Duration</span>
            <input
              type="number"
              value={updateDuration}
              onChange={(e) => setUpdateDuration(e.target.value)}
              placeholder="Input Duration"
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center bg-white">
          <button
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 font-semibold text-white transition-all hover:bg-primary-hover"
            onClick={handleUpdateChapter}
          >
            Edit
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
