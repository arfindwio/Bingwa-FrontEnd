import React from "react";

export const CardCourseSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white">
      <div className="flex animate-pulse flex-col">
        <div className="h-32 min-w-fit bg-slate-100"></div>
        <div className="px-4 py-5">
          <div className="h-4 w-[45%] rounded-full bg-slate-100"></div>
          <div className="mt-3 h-3 rounded-full bg-slate-100"></div>
          <div className="mt-2 h-3 w-[25%] rounded-full bg-slate-100"></div>
          <div className="mt-4 flex gap-3">
            <div className="flex h-5 w-1/3 gap-1">
              <div className="w-[20%] rounded-full bg-slate-100"></div>
              <div className="w-[80%] rounded-full bg-slate-100"></div>
            </div>
            <div className="flex h-5 w-1/3 gap-1">
              <div className="w-[20%] rounded-full bg-slate-100"></div>
              <div className="w-[80%] rounded-full bg-slate-100"></div>
            </div>
            <div className="flex h-5 w-1/3 gap-1">
              <div className="w-[20%] rounded-full bg-slate-100"></div>
              <div className="w-[80%] rounded-full bg-slate-100"></div>
            </div>
          </div>
          <div className="mt-4 h-6 w-[35%] rounded-full bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
};
