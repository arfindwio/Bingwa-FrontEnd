import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { NavbarMobile } from "../../../assets/components/navbar/NavbarMobile";
import { NotificationSkeleton } from "../../../assets/components/skeleton/NotificationSkeleton";

// Redux Actions
import {
  getAllNotificationsAction,
  putNotificationsAction,
} from "../../../redux/action/notifications/NotificationsAction";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { IoNotificationsCircleSharp } from "react-icons/io5";

export const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeNotif = useSelector((state) => state.notifications.notifications);
  const isLoading = useSelector((state) => state.notifications.loading);

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  useEffect(() => {
    dispatch(getAllNotificationsAction());
    dispatch(putNotificationsAction());
  }, [dispatch]);

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarCourse />}
      {isMobile ? (
        <div className="flex min-h-screen flex-col p-4">
          <h1 className="pb-8 text-2xl font-bold">Notification</h1>
          {/* Notif Item */}
          {storeNotif && storeNotif.length > 0 ? (
            storeNotif.map((notification) => (
              <div
                key={notification.id}
                className="mb-2 flex gap-4 border-b-2 border-slate-300 pb-5"
              >
                {isLoading ? (
                  <NotificationSkeleton />
                ) : (
                  <>
                    <div className="text-primary">
                      <IoNotificationsCircleSharp size={30} />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-primary">
                          {notification.title}
                        </h4>
                        <div className="flex items-center justify-center gap-2">
                          <h5 className="text-sm text-slate-500">
                            {notification.createdAt}
                          </h5>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        {notification.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500">
              No notifications at this time
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-screen bg-secondary px-2 pb-20 pt-2 sm:px-10 md:px-6 md:pt-20 lg:px-28">
          <div className="py-8">
            <div
              className="relative flex w-fit cursor-pointer items-center gap-2  text-lg font-semibold text-black"
              onClick={() => {
                navigate("/");
              }}
            >
              <GoArrowLeft size={30} className="absolute  cursor-pointer" />
              <p className="pl-10">Back to home</p>
            </div>
          </div>

          {/* Notification */}
          <div className="rounded-xl border-2 border-primary">
            <div className="rounded-t-lg bg-primary py-4 text-center text-xl font-semibold text-white">
              Notification
            </div>

            {/* Isi Notifikasi */}
            {storeNotif && storeNotif.length > 0 ? (
              storeNotif.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between px-10 py-6"
                >
                  {isLoading ? (
                    <NotificationSkeleton />
                  ) : (
                    <>
                      <div className="flex flex-col space-y-2">
                        <div className="flex gap-4 text-lg font-semibold text-primary">
                          <IoNotificationsCircleSharp size={30} />
                          {notification.title}
                        </div>
                        <div className="flex px-11 font-semibold">
                          {notification.message}
                        </div>
                      </div>

                      {/* Tanggal */}
                      <div className="flex gap-2 font-thin">
                        {notification.createdAt}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-10">
                <div className="text-center text-slate-500">
                  No notifications at this time
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
