import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import LoadingSpinner from "../../assets/components/loading/LoadingSpinner";

// Redux Actions
import { getAllUsersAction } from "../../redux/action/users/UsersAction";
import { getAllCoursesAction } from "../../redux/action/courses/CoursesAction";
import { getAllPaymentsAction } from "../../redux/action/payments/PaymentsAction";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Redux Store
  const storeCountUsers = useSelector((state) => state.users.users);
  const storeCountCourses = useSelector((state) => state.users.users);
  const storePayments = useSelector((state) => state.payment.payments);
  const isLoading = useSelector((state) => state.payment.loading);

  const countPremiumCourse = storeCountCourses.filter(
    (course) => course.isPremium === true,
  );

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <AdminSidebar />
      </div>
      <div className="flex w-5/6 flex-col pb-20">
        <div>
          <AdminNavbar onSearch={handleSearch} />
        </div>
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
                  <h2 className="text-xl font-semibold">Payment Status</h2>
                </div>
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
                      storePayments.payments.map((value, index) => (
                        <tr key={index} className="text-xs">
                          <td className="px-4 py-3">
                            {value.user.userProfile.fullName.split(" ")[0]}
                          </td>
                          <td className="px-4 py-3">
                            {value.course.category.categoryName}
                          </td>
                          <td className="px-4 py-3">
                            {value.course.courseName}
                          </td>
                          <td className="px-4 py-3">{value.paymentCode}</td>
                          <td className="px-4 py-3 font-medium text-green">
                            {value.status}
                          </td>
                          <td className="px-4 py-3">{value.methodPayment}</td>
                          <td className="px-4 py-3">{value.createdAt}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mx-auto pt-5 font-semibold">
              <Pagination
                nextLink={storePayments.pagination.links.next}
                prevLink={storePayments.pagination.links.prev}
                totalItems={storePayments.pagination.total_items}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
