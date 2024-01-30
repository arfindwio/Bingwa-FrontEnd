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
import { getAllUsersAction } from "../../../redux/action/users/UsersAction";
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import {
  getAllPromotionsAction,
  postPromotionAction,
  putPromotionAction,
  deletePromotionAction,
} from "../../../redux/action/promotions/PromotionsAction";

export const AdminManagePromotion = () => {
  const dispatch = useDispatch();

  const [newDiscount, setNewDiscount] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  // Edit Category
  const [editPromotionId, setEditPromotionId] = useState(null);
  const [updateDiscount, setUpdateDiscount] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeCountCourses = useSelector(
    (state) => state.dataCourses.courses.courses,
  );

  const storePromotions = useSelector(
    (state) => state.promotions.promotions.promotions,
  );
  const isLoading = useSelector((state) => state.promotions.loading);

  const countPremiumCourse = storeCountCourses.filter(
    (course) => course.isPremium === true,
  );

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllUsersAction());
    dispatch(getAllCoursesAction());
    dispatch(getAllPromotionsAction());
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllPromotionsAction(formatSearch));
  };

  const handleDialogCreate = () => setDialogCreate(!dialogCreate);
  const handleDialogEdit = () => setDialogEdit(!dialogEdit);

  // New Promotion
  const handleNewPromotion = async () => {
    const newPromotion = await dispatch(
      postPromotionAction({
        discount: newDiscount,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    );

    if (!newPromotion) {
      setDialogCreate(false);
      dispatch(getAllPromotionsAction());
    }

    if (newPromotion) {
      showSuccessToast("Promotion berhasil tambahkan!");
      setDialogCreate(false);

      setNewDiscount("");
      setNewStartDate("");
      setNewEndDate("");

      dispatch(getAllPromotionsAction());
    }
  };

  // Edit Promotion
  const handleEditPromotion = (promotionId) => {
    const promotionToEdit = storePromotions.find(
      (promotion) => promotion.id === promotionId,
    );

    setEditPromotionId(promotionId);
    setUpdateDiscount(promotionToEdit.discount);
    setUpdateStartDate(convertToISOFormat(promotionToEdit.startDate));
    setUpdateEndDate(convertToISOFormat(promotionToEdit.endDate));

    setDialogEdit(true);
  };

  // Update Promotion
  const handleUpdatePromotion = async () => {
    const updatedPromotion = await dispatch(
      putPromotionAction(
        {
          discount: updateDiscount,
          startDate: updateStartDate,
          endDate: updateEndDate,
        },
        editPromotionId,
      ),
    );

    if (!updatedPromotion) {
      setDialogEdit(false);
      dispatch(getAllPromotionsAction());
    }

    if (updatedPromotion) {
      showSuccessToast("Promotion berhasil diupdate!");
      setDialogEdit(false);

      // Clear state variables
      setEditPromotionId(null);
      setUpdateDiscount("");
      setUpdateStartDate("");
      setUpdateEndDate("");

      dispatch(getAllPromotionsAction());
    }
  };

  // Delete Promotion
  const handleDeletePromotion = async (promotionId) => {
    const deletePromotion = await dispatch(deletePromotionAction(promotionId));

    if (!deletePromotion) {
      dispatch(getAllPromotionsAction());
    }

    if (deletePromotion) {
      showSuccessToast("Promotion berhasil dihapus");
      dispatch(getAllPromotionsAction());
      window.scrollTo(0, 0);
    }
  };

  const convertToISOFormat = (originalDate) => {
    // Mendefinisikan array nama bulan
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const parts = originalDate.split(" ");
    const monthIndex = monthNames.indexOf(parts[1]);

    if (monthIndex !== -1) {
      const isoFormattedDate = `${parts[2]}-${(monthIndex + 1)
        .toString()
        .padStart(2, "0")}-${parts[0]}`;
      return isoFormattedDate;
    } else {
      console.error("Format tanggal tidak valid");
      return null;
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
                  <h2 className="text-xl font-semibold">Manage Promotion</h2>
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
                        Discount
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Start Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        End Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storePromotions.map((value, index) => (
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
                        <td className="px-4 py-3">{value?.discount * 100}%</td>
                        <td className="px-4 py-3">{value?.startDate}</td>
                        <td className="px-4 py-3">{value?.endDate}</td>
                        <td className="flex gap-1 py-3 text-sm font-semibold text-white">
                          <button
                            className="rounded-full bg-primary px-3 py-1"
                            onClick={() => handleEditPromotion(value?.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-full bg-red-400 px-3 py-1"
                            onClick={() => {
                              handleDeletePromotion(value?.id);
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
            <h1 className="font-semibold">Create Promotion</h1>
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
              <span className="text-slate-700">Discount</span>
              <input
                type="number"
                value={newDiscount}
                min={0}
                max={1}
                step={0.1}
                onChange={(e) => setNewDiscount(e.target.value)}
                placeholder="Input Discount"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Start Date</span>
              <input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                placeholder="Input Start Date"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">End Date</span>
              <input
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                placeholder="Input End Date"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <div
            onClick={() => handleNewPromotion()}
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
            <h1 className="font-semibold">Edit Promotion</h1>
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
              <span className="text-slate-700">Discount</span>
              <input
                type="number"
                value={updateDiscount}
                min={0}
                max={1}
                step={0.1}
                onChange={(e) => setUpdateDiscount(e.target.value)}
                placeholder="Input Discount"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">Start Date</span>
              <input
                type="date"
                value={updateStartDate}
                onChange={(e) => setUpdateStartDate(e.target.value)}
                placeholder="Input Start Date"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col">
              <span className="text-slate-700">End Date</span>
              <input
                type="date"
                value={updateEndDate}
                onChange={(e) => setUpdateEndDate(e.target.value)}
                placeholder="Input End Date"
                className="flex rounded-xl border-2 border-slate-300 px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <div
            className="flex cursor-pointer rounded-full bg-primary px-10 py-2 transition-all hover:bg-primary-hover"
            onClick={handleUpdatePromotion}
          >
            <button className="flex font-semibold text-white">Edit</button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
