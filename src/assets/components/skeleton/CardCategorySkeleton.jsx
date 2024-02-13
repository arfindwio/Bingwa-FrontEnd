import React from "react";

export const CardCategorySkeleton = () => {
  return (
    <div className="flex w-fit animate-pulse flex-col items-center justify-center gap-2">
      <div className="h-36 w-52 rounded-2xl bg-slate-300 bg-opacity-60" />
      <div className="h-5 w-full rounded bg-slate-300 bg-opacity-60"></div>
    </div>
  );
};
