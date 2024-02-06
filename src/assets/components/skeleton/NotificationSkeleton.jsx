import React from "react";

export const NotificationSkeleton = () => {
  return (
    <>
      <div className="flex w-[77%] flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-slate-300 bg-opacity-50"></div>
          <div className="h-6 w-[30%] rounded bg-slate-300 bg-opacity-50"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 rounded-full bg-transparent"></div>
          <div className="h-5 w-full rounded bg-slate-300 bg-opacity-50"></div>
        </div>
      </div>

      <div className="my-auto w-[20%]">
        <div className="h-5  rounded bg-slate-300 bg-opacity-50"></div>
      </div>
    </>
  );
};
