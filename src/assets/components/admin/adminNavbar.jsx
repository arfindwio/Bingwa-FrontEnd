import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Icons
import { BiSearchAlt } from "react-icons/bi";

// Redux Actions
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";

export const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchCourse = (searchInput) => {
    const search = dispatch(searchCourseAction(searchInput));

    if (search) {
      setSearchInput("");
      navigate(`/admin/kelola-kelas?search=${searchInput}`);
    }
  };

  return (
    <div className="flex w-full items-center justify-between bg-secondary px-14 py-4">
      <div className="flex w-full justify-between">
        <div className="hidden gap-2 lg:flex">
          <div className="gap-4 py-2 font-sans text-3xl font-bold text-primary">
            Hi, Admin!
          </div>
        </div>

        {location.pathname === "/admin/kelola-kelas" ? (
          <div className="relative cursor-pointer">
            <input
              type="text"
              placeholder="Cari..."
              className="h-full w-72 cursor-pointer rounded-xl border-[3px] border-white px-2 py-1 focus:border-primary focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSearchCourse(searchInput) : ""
              }
            />
            <BiSearchAlt
              size={30}
              className="absolute inset-y-2.5 right-4 cursor-pointer rounded bg-primary p-1 text-white"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
