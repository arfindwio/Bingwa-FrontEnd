import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { AdminNavbar } from "../../assets/components/admin/adminNavbar";
import { AdminPojok } from "../../assets/components/admin/AdminPojok";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import LoadingSpinner from "../../assets/components/loading/loadingSpinner";

// Redux Actions
import { getAllDataAction } from "../../redux/action/admin/data/getAllDataAction";
import { getAllPaymentsAction } from "../../redux/action/admin/payments/getAllPaymentsAction";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Redux Store
  const adminData = useSelector((state) => state.allAdminData);
  const adminPayment = useSelector((state) => state.adminPayment.payments);
  const isLoading = useSelector((state) => state.adminPayment.loading);

  const getAdminData = () => {
    dispatch(getAllDataAction());
  };

  const getAllAdminPayments = () => {
    dispatch(getAllPaymentsAction());
  };

  useEffect(() => {
    getAdminData();
    getAllAdminPayments();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <AdminPojok />
      </div>
      <div className="flex w-5/6 flex-col pb-20">
        <div>
          <AdminNavbar />
        </div>
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
                  <h2 className="text-xl font-semibold">Status Pembayaran</h2>
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
                        Kategori
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Nama Course
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Kode Pembayaran
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Metode Pembayaran
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Tanggal Bayar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminPayment === null ? (
                      <tr>
                        <td
                          className="px-4 py-3 text-center text-sm
                      italic"
                          colSpan={7}
                        >
                          Data tidak ditemukan
                        </td>
                      </tr>
                    ) : (
                      adminPayment.map((value, index) => (
                        <tr key={index} className="text-xs">
                          <td className="px-4 py-3">{value.id}</td>
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
          </div>
        </section>
      </div>
    </div>
  );
};
