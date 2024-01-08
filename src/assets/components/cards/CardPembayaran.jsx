import React from "react";

export const CardPembayaran = ({ image, category, title, author, price }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <div
        className="h-32 min-w-fit scale-105 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          objectFit: "cover",
        }}
      ></div>
      {/* Container Desc Card Kelas */}
      <div className="flex flex-col bg-white px-4 py-3">
        <div className="flex justify-between">
          <div className="text-xl font-bold text-primary">{category}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-slate-800">{title}</div>
          <div className="text-lg text-slate-500">by {author}</div>
        </div>
      </div>
    </div>
  );
};
