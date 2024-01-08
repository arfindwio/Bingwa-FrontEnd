import React from "react";
import { LuUsers2 } from "react-icons/lu";

export const AdminCard = ({ title, count, cardColor }) => {
  const cardColorDefault = "bg-blue-400";

  return (
    <div
      className={`flex flex-1 items-center gap-5 rounded-xl px-4 py-6 shadow-lg ${
        cardColor ? cardColor : cardColorDefault
      }`}
    >
      <div className="rounded-full bg-white p-2 text-3xl font-semibold text-primary">
        <LuUsers2 />
      </div>
      <div className="text-white text-xl">
        <h1 className="font-semibold">{count}</h1>
        <h1 className="font-medium">{title}</h1>
      </div>
    </div>
  );
};
