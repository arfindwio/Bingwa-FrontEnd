import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Redux Action
import { getAllCoursesAction } from "../../../redux/action/courses/getAllCoursesAction";

export const Pagination = ({ nextLink, prevLink, totalItems }) => {
  const dispatch = useDispatch();

  const [currentPage, setcurrentPage] = useState(1);

  const handlePageChange = (link) => {
    const pageMatch = link.match(/page=(\d+)/);
    let page = pageMatch ? parseInt(pageMatch[1], 10) : 1;

    setcurrentPage(page);
    let formatLink = link.split(`${process.env.REACT_APP_SERVER}/courses/?`)[1];

    dispatch(getAllCoursesAction(formatLink));
  };

  const handleNumberPageChange = (numberPage) => {
    let link = !nextLink ? prevLink : nextLink;

    let formatLink = link.split(`${process.env.REACT_APP_SERVER}/courses/?`)[1];

    var newLink = formatLink.replace(/(page=)\d+/, "$1" + numberPage);

    setcurrentPage(numberPage);

    dispatch(getAllCoursesAction(newLink));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPage = Math.ceil(totalItems / 10);
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleNumberPageChange(i)}
          className={`mx-1 cursor-pointer ${
            currentPage === i ? "text-blue-500" : "text-gray-400"
          }`}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => handlePageChange(prevLink)}
        className={`mx-1 cursor-pointer ${
          prevLink ? "text-blue-500" : "pointer-events-none text-gray-400"
        }`}
        disabled={!prevLink}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(nextLink)}
        className={`mx-1 cursor-pointer ${
          nextLink ? "text-blue-500" : "pointer-events-none text-gray-400"
        }`}
        disabled={!nextLink}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
