import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Icons
import { BiSearchAlt } from "react-icons/bi";

// Redux Actions
import { searchCourseAction } from "../../../redux/action/courses/searchCourseAction";

export const SearchMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchCourse = (searchInput) => {
    const search = dispatch(searchCourseAction(searchInput));

    if (search) {
      navigate(`/pilih-kelas?search=${searchInput}`);
    }
  };
  return (
    <div className="bg-secondary px-3 pt-5">
      <div className="relative rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Cari kursus terbaik..."
          className="h-[3.5rem] w-full cursor-pointer rounded-2xl bg-white px-3 py-2 outline-none lg:w-[30rem]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" ? handleSearchCourse(searchInput) : ""
          }
        />
        <BiSearchAlt
          size={30}
          className="absolute inset-y-3 right-4 cursor-pointer rounded bg-primary p-1 text-white"
          onClick={() => {
            handleSearchCourse(searchInput);
          }}
        />
      </div>
    </div>
  );
};
