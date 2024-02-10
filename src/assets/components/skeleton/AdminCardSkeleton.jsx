import React from "react";

export const AdminCardSkeleton = ({ cardColor }) => {
  return (
    <div
      className={`flex flex-1 items-center gap-5 rounded-xl px-4 py-6 shadow-lg ${
        cardColor ? cardColor : "bg-blue-400"
      }`}
    >
      <div className="h-12 w-16 animate-pulse rounded-full bg-slate-100 opacity-5"></div>
      <div className="flex w-full flex-col gap-2">
        <div className="h-5 w-[30%] animate-pulse rounded bg-slate-100 opacity-5"></div>
        <div className="h-5 w-full animate-pulse rounded bg-slate-100 opacity-5"></div>
      </div>
    </div>
  );
};
