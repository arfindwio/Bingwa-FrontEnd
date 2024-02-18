import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import { AdminDataSkeleton } from "../../assets/components/skeleton/AdminDataSkeleton";

// Redux Actions
import { getAllUsersAction } from "../../redux/action/users/UsersAction";
import { getAllCoursesAction } from "../../redux/action/courses/CoursesAction";
import { getAllPaymentsAction } from "../../redux/action/payments/PaymentsAction";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeCountCourses = useSelector(
    (state) => state.courses.courses.courses,
  );
  const storePayments = useSelector((state) => state.payments.payments);
  const loadingPayments = useSelector((state) => state.payments.loading);
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
    dispatch(getAllPaymentsAction());
  };

  const handleSearch = (formatSearch) => {
    dispatch(getAllPaymentsAction(formatSearch));
  };

  const handleQuery = (formatLink) => {
    dispatch(getAllPaymentsAction(formatLink));
  };

  const handleOpen = (openValue) => setOpen(openValue);

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
            isLoading={loadingCourses && loadingUsers}
          />
          <AdminCard
            title={"Active Class"}
            count={storeCountCourses?.length}
            cardColor={"bg-green"}
            isLoading={loadingCourses && loadingUsers}
          />
          <AdminCard
            title={"Premium Class"}
            count={countPremiumCourse?.length}
            cardColor={"bg-primary"}
            isLoading={loadingCourses && loadingUsers}
          />
        </div>

        {/* Table */}
        <section className="px- bg-white dark:bg-gray-900">
          <div className="mx-auto px-4 lg:px-12">
            <div className="relative overflow-hidden border-2 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex w-full items-center px-4 py-6">
                <h2 className="break-words text-xl font-semibold">
                  Payment Status
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Course Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Code Payment
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Payment Method
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Payment Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!storePayments.payments ? (
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
                      storePayments.payments.map((value, index) =>
                        loadingPayments ? (
                          <tr key={index} className="animate-pulse">
                            <AdminDataSkeleton tdCount={7} />
                          </tr>
                        ) : (
                          <tr key={index} className="text-xs">
                            <td className="px-4 py-3">
                              {value?.user?.userProfile?.fullName.split(" ")[0]}
                            </td>
                            <td className="px-4 py-3">
                              {value?.course?.category?.categoryName}
                            </td>
                            <td className="px-4 py-3">
                              {value?.course?.courseName}
                            </td>
                            <td className="px-4 py-3">{value?.paymentCode}</td>
                            <td className="px-4 py-3 font-medium text-green">
                              {value?.status}
                            </td>
                            <td className="px-4 py-3">
                              {value?.methodPayment}
                            </td>
                            <td className="px-4 py-3">{value?.createdAt}</td>
                          </tr>
                        ),
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {loadingPayments ? null : (
              <div className="mx-auto pt-5 font-semibold">
                <Pagination
                  onQuery={handleQuery}
                  type={"payments"}
                  nextLink={storePayments?.pagination?.links.next}
                  prevLink={storePayments?.pagination?.links.prev}
                  totalItems={storePayments?.pagination?.total_items}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
