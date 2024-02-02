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
import { Pagination } from "../../../assets/components/pagination/Pagination";
import LoadingSpinner from "../../../assets/components/loading/loadingSpinner";

// Helper
import { showSuccessToast } from "../../../helper/ToastHelper";

// Icons
import { IoCloseSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

// Redux Actions
import { getAllUsersAction } from "../../../redux/action/users/UsersAction";
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import {
  getAllCategoriesAction,
  postCategoryAction,
  putCategoryAction,
  deleteCategoryAction,
} from "../../../redux/action/categories/CategoriesAction";

export const AdminManageCategory = () => {
  const dispatch = useDispatch();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");

  // Edit Category
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [updateCategoryImage, setUpdateCategoryImage] = useState("");

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

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
  const isLoading = useSelector((state) => state.categories.loading);

  const countPremiumCourse = storeCountCourses.filter(
    (course) => course.isPremium === true,
  );

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

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);

  // New Category
  const handleNewCategory = async () => {
    const newCategory = await dispatch(
      postCategoryAction({
        categoryName: newCategoryName,
        categoryImg: newCategoryImage,
      }),
    );

    if (!newCategory) {
      setDialogCreate(false);
      dispatch(getAllCategoriesAction());
    }

    if (newCategory) {
      showSuccessToast("Category berhasil tambahkan!");
      setDialogCreate(false);

      setNewCategoryName("");
      setNewCategoryImage("");

      dispatch(getAllCategoriesAction());
    }
  };

  // Edit Category
  const handleEditCategory = (categoryId) => {
    const categoryToEdit = storeCategories?.find(
      (category) => category.id === categoryId,
    );

    setEditCategoryId(categoryId);
    setUpdateCategoryName(categoryToEdit.categoryName);
    setUpdateCategoryImage(categoryToEdit.categoryImg);

    setDialogEdit(true);
  };

  // Update Category
  const handleUpdateCategory = async () => {
    const updatedCategory = await dispatch(
      putCategoryAction(
        {
          categoryName: updateCategoryName,
          categoryImg: updateCategoryImage,
        },
        editCategoryId,
      ),
    );

    if (!updatedCategory) {
      setDialogEdit(false);
      dispatch(getAllCategoriesAction());
    }

    if (updatedCategory) {
      showSuccessToast("Category berhasil diupdate!");
      setDialogEdit(false);

      // Clear state variables
      setEditCategoryId(null);
      setUpdateCategoryName("");
      setUpdateCategoryImage("");

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
      showSuccessToast("Category berhasil dihapus");

      window.scrollTo(0, 0);

      dispatch(getAllCategoriesAction());
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
          <AdminCard title={"Active Users"} count={storeCountUsers.length} />
          <AdminCard
            title={"Active Class"}
            count={storeCountCourses.length}
            cardColor={"bg-green"}
          />
          <AdminCard
            title={"Premium Class"}
            count={countPremiumCourse.length}
            cardColor={"bg-primary"}
          />
        </div>

        {/* Table */}
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto px-4 lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <h2 className="text-xl font-semibold">Manage Category</h2>
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
                    {storeCategories?.map((value, index) => (
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
                        <td className="px-4 py-3">{value?.categoryImg}</td>
                        <td className="px-4 py-3">{value?.categoryName}</td>
                        <td className="flex gap-1 py-3 text-sm font-semibold text-white">
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagiantion */}
            <div className="mx-auto pt-5 font-semibold">
              <Pagination
                nextLink={storePaginationCategories.links.next}
                prevLink={storePaginationCategories.links.prev}
                totalItems={storePaginationCategories.total_items}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Dialog Create */}
      <Dialog open={dialogCreate} handler={handleDialogCreate} size="xxl">
        <DialogHeader className="flex flex-col">
          <div className="flex w-full items-center justify-between px-6 text-primary">
            <h1 className="font-semibold">Tambah Kelas</h1>
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
              <span className="text-slate-700">Category Image</span>
              <input
                type="text"
                value={newCategoryImage}
                onChange={(e) => setNewCategoryImage(e.target.value)}
                placeholder="Input Category Image"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
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
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <div
            onClick={() => handleNewCategory()}
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
        <DialogBody className="flex space-x-6 px-10 py-10">
          {/* Left Column */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">Category Image</span>
              <input
                type="text"
                value={updateCategoryImage}
                onChange={(e) => setUpdateCategoryImage(e.target.value)}
                placeholder="Input Category Image"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
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
