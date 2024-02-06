import React from "react";

export const AccountProfileSkeleton = () => {
  return (
    <>
      <div className="mb-4 flex w-[60%] animate-pulse flex-col items-center justify-center gap-6">
        <div className="h-28 w-28 rounded-full bg-slate-300 bg-opacity-50"></div>

        <div className="flex w-[70%] flex-col gap-2">
          <div className="h-6 w-[25%] rounded bg-slate-300 bg-opacity-50"></div>
          <div className="h-9 w-full rounded bg-slate-300 bg-opacity-50"></div>
        </div>
        <div className="flex w-[70%] flex-col gap-2">
          <div className="h-6 w-[25%] rounded bg-slate-300 bg-opacity-50"></div>
          <div className="h-9 w-full rounded bg-slate-300 bg-opacity-50"></div>
        </div>
        <div className="flex w-[70%] flex-col gap-2">
          <div className="h-6 w-[25%] rounded bg-slate-300 bg-opacity-50"></div>
          <div className="h-9 w-full rounded bg-slate-300 bg-opacity-50"></div>
        </div>
        <div className="flex w-[70%] flex-col gap-2">
          <div className="h-6 w-[25%] rounded bg-slate-300 bg-opacity-50"></div>
          <div className="h-9 w-full rounded bg-slate-300 bg-opacity-50"></div>
        </div>
        <div className="flex w-[70%] flex-col gap-2">
          <div className="h-6 w-[25%] rounded bg-slate-300 bg-opacity-50"></div>
        </div>

        <div className="h-9 w-[70%] rounded bg-slate-300 bg-opacity-50"></div>
      </div>
    </>
  );
};
