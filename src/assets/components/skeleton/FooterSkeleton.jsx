import React from "react";

export const FooterSkeleton = () => {
  return (
    <div className="bg-blue px-6 pb-6 pt-12 lg:px-28">
      <div className="flex animate-pulse flex-col gap-3 pb-4 sm:justify-between lg:flex-row lg:gap-1 xl:gap-0">
        {/* Bagian 1 */}
        <div className="flex w-2/4 flex-col">
          <div className="h-7 w-[25%] rounded bg-slate-100 bg-opacity-20"></div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-3 w-[80%] rounded bg-slate-100 bg-opacity-20"></div>
            <div className="h-3 w-[80%] rounded bg-slate-100 bg-opacity-20"></div>
            <div className="h-3 w-[80%] rounded bg-slate-100 bg-opacity-20"></div>
          </div>
        </div>

        {/* Bagian 2 */}
        <div className="flex w-1/4 flex-col">
          <div className="h-5 w-[25%] rounded bg-slate-100 bg-opacity-20"></div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="h-3 w-[80%] rounded bg-slate-100 bg-opacity-20"></div>
            <div className="h-3 w-[80%] rounded bg-slate-100 bg-opacity-20"></div>
          </div>
        </div>

        {/* Bagian 3 */}
        <div className="flex w-fit flex-col">
          <div className="h-5 w-[50%] rounded bg-slate-100 bg-opacity-20"></div>
          <div className="mt-5 flex gap-4">
            <div className="h-10 w-10 rounded bg-slate-100 bg-opacity-20"></div>
            <div className="h-10 w-10 rounded bg-slate-100 bg-opacity-20"></div>
            <div className="h-10 w-10 rounded bg-slate-100 bg-opacity-20"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t-2 pb-16 pt-6 text-white md:pb-0">
        <div className="h-4 w-[50%] rounded bg-slate-100 bg-opacity-20"></div>
      </div>
    </div>
  );
};
