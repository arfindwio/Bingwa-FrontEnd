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
import { getAllCoursesAction } from "../../redux/action/courses/CoursesAction";
import {
  getAllCategoriesAction,
  postCategoryAction,
  putCategoryAction,
  deleteCategoryAction,
} from "../../redux/action/categories/CategoriesAction";

export const AdminManageCategory = () => {
  const dispatch = useDispatch();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newImage, setNewImage] = useState("");

  // Edit Category
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [updateImage, setUpdateImage] = useState("");

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [open, setOpen] = useState(false);

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeCountCourses = useSelector(
    (state) => state.courses.courses.courses,
  );
  const storeCategories = useSelector(
    (state) => state.categories.categories.categories,
  );
  const storePaginationCategories = useSelector(
    (state) => state.categories.categories.pagination,
  );
  const loadingCategories = useSelector((state) => state.categories.loading);
  const loadingUsers = useSelector((state) => state.users.loading);
  const loadingCourses = useSelector((state) => state.courses.loading);

  const countPremiumCourse = storeCountCourses.filter(
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
    dispatch(getAllCategoriesAction());
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllCategoriesAction(formatSearch));
  };

  const handleQuery = (formatLink) => {
    dispatch(getAllCategoriesAction(`${formatLink}`));
  };

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);
  const handleOpen = (openValue) => setOpen(openValue);

  // New Category
  const handleNewCategory = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("categoryName", newCategoryName);

    const newCategory = await dispatch(postCategoryAction(formData));

    toast.dismiss(loadingToastId);

    if (!newCategory) {
      setDialogCreate(false);
      dispatch(getAllCategoriesAction());
    }

    if (newCategory) {
      setDialogCreate(false);
      showSuccessToast("Category successfully added!");

      setNewCategoryName("");

      dispatch(getAllCategoriesAction());
    }
  };

  // Edit Category
  const handleEditCategory = (categoryId) => {
    const categoryToEdit = storeCategories?.find(
      (category) => category.id === categoryId,
    );

    setEditCategoryId(categoryId);
    setUpdateCategoryName(categoryToEdit?.categoryName);

    setDialogEdit(true);
  };

  // Update Category
  const handleUpdateCategory = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const formData = new FormData();
    formData.append("image", updateImage);
    formData.append("categoryName", updateCategoryName);

    const updatedCategory = await dispatch(
      putCategoryAction(formData, editCategoryId),
    );

    toast.dismiss(loadingToastId);

    if (!updatedCategory) {
      setDialogEdit(false);
      dispatch(getAllCategoriesAction());
    }

    if (updatedCategory) {
      showSuccessToast("Category has been successfully updated!");
      setDialogEdit(false);

      // Clear state variables
      setEditCategoryId(null);
      setUpdateCategoryName("");

      dispatch(getAllCategoriesAction());
    }
  };

  // Delete Category
  const handleDeleteCategory = async (categoryId) => {
    const deleteCategory = await dispatch(deleteCategoryAction(categoryId));

    if (!deleteCategory) {
      dispatch(getAllCategoriesAction());
    }

    if (deleteCategory) {
      showSuccessToast("Category successfully deleted!");

      window.scrollTo(0, 0);

      dispatch(getAllCategoriesAction());
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
            count={storeCountCourses?.length}
            cardColor={"bg-green"}
            isLoading={loadingUsers && loadingCourses}
          />
          <AdminCard
            title={"Premium Class"}
            count={countPremiumCourse?.length}
            cardColor={"bg-primary"}
            isLoading={loadingUsers && loadingCourses}
          />
        </div>

        {/* Table */}
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto px-4 lg:px-12">
            <div className="relative border-2 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-0">
                <h2 className="w-fit break-words text-xl font-semibold">
                  Manage Category
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
                        Category Image
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Category Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!storeCategories ? (
                      <tr>
                        <td
                          className="px-4 py-3 text-center text-sm
                      italic"
                          colSpan={4}
                        >
                          Data Not Found
                        </td>
                      </tr>
                    ) : (
                      storeCategories?.map((value, index) =>
                        loadingCategories ? (
                          <tr key={index} className="animate-pulse">
                            <AdminDataSkeleton tdCount={4} />
                          </tr>
                        ) : (
                          <tr className="dark:border-gray-700" key={value?.id}>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="break-all px-4 py-3">
                              {value?.categoryImg}
                            </td>
                            <td className="break-all px-4 py-3">
                              {value?.categoryName}
                            </td>
                            <td className="flex gap-1 px-4 py-3 text-sm font-semibold text-white">
                              <button
                                className="rounded-full bg-primary px-3 py-1"
                                onClick={() => handleEditCategory(value?.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="rounded-full bg-red-400 px-3 py-1"
                                onClick={() => {
                                  handleDeleteCategory(value?.id);
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
            {loadingCategories ? null : (
              <div className="mx-auto pt-5 font-semibold">
                <Pagination
                  onQuery={handleQuery}
                  type={"categories"}
                  nextLink={storePaginationCategories?.links?.next}
                  prevLink={storePaginationCategories?.links?.prev}
                  totalItems={storePaginationCategories?.total_items}
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
            <h1 className="font-semibold">Create Category</h1>
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleDialogCreate}
            />
          </div>
        </DialogHeader>
        <DialogBody
          className="flex flex-col justify-center gap-3 bg-white px-10"
          onKeyPress={(e) => (e.key === "Enter" ? handleNewCategory() : "")}
          tabIndex={0}
        >
          <div className="flex flex-col">
            <span className="text-slate-700">Category Image</span>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-700">Category Name</span>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Input Category Name"
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center bg-white">
          <button
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 font-semibold text-white transition-all hover:bg-primary-hover"
            onClick={() => handleNewCategory()}
          >
            Create
          </button>
        </DialogFooter>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog open={dialogEdit} handler={handleDialogEdit} size="md">
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Edit Category</h1>
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
          className="flex flex-col justify-center gap-5 px-10 py-5"
          onKeyPress={(e) => (e.key === "Enter" ? handleUpdateCategory() : "")}
          tabIndex={0}
        >
          {/* Left Column */}
          <div className="flex flex-col">
            <span className="text-slate-700">Category Image</span>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setUpdateImage(e.target.files[0])}
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-700">Category Name</span>
            <input
              type="text"
              value={updateCategoryName}
              onChange={(e) => setUpdateCategoryName(e.target.value)}
              placeholder="Input Category Name"
              className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <div
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 transition-all hover:bg-primary-hover"
            onClick={handleUpdateCategory}
          >
            <button className="flex font-semibold text-white">Edit</button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
