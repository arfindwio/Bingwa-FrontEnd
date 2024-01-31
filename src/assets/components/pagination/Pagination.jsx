import React from "react";
import { useDispatch } from "react-redux";

// Redux Action
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";

let currentPage = 2;

export const Pagination = ({ nextLink, prevLink, totalItems }) => {
  const dispatch = useDispatch();

  const handlePageChange = (link) => {
    const pageMatch = link.match(/page=(\d+)/);
    let page = pageMatch ? parseInt(pageMatch[1], 10) : 1;

    currentPage = page;
    let formatLink = link.split(`${process.env.REACT_APP_SERVER}/courses/?`)[1];

    dispatch(getAllCoursesAction(formatLink));
  };

  const handleNumberPageChange = (numberPage) => {
    let link = !nextLink ? prevLink : nextLink;
    let formatLink = link.split(`${process.env.REACT_APP_SERVER}/courses/?`)[1];

    let newLink = formatLink.replace(/(page=)\d+/, "$1" + numberPage);

    currentPage = numberPage;
    dispatch(getAllCoursesAction(newLink));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3; // Adjust the number of visible pages as needed
    const url = !nextLink ? prevLink : nextLink;
    const limit = parseInt(url.match(/limit=(\d+)/)[1], 10);
    const totalPage = Math.ceil(totalItems / limit);

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPage, startPage + visiblePages - 1);

    if (currentPage > Math.floor(visiblePages / 2) + 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handleNumberPageChange(1)}
          className={`mx-1 cursor-pointer ${
            currentPage === 1 ? "text-blue-500" : "text-gray-400"
          }`}
        >
          1
        </button>,
      );

      if (currentPage > Math.floor(visiblePages / 2) + 2) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (endPage < totalPage) {
      if (totalPage - endPage > 1) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPage}
          onClick={() => handleNumberPageChange(totalPage)}
          className={`mx-1 cursor-pointer ${
            currentPage === totalPage ? "text-blue-500" : "text-gray-400"
          }`}
        >
          {totalPage}
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
