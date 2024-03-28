import React from "react";
import { useMediaQuery } from "react-responsive";

// Icon
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

let currentPage = 1;

export const Pagination = ({
  onQuery,
  type,
  nextLink,
  prevLink,
  totalItems,
}) => {
  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  const getValueBetweenStrings = (url, startString, endString) => {
    const regex = new RegExp(`${startString}(.*?)${endString}`);
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handlePageChange = (link) => {
    const pageMatch = link.match(/page=(\d+)/);
    let page = pageMatch ? parseInt(pageMatch[1], 10) : 1;

    currentPage = page;

    const formatLink = getValueBetweenStrings(
      link,
      `${process.env.REACT_APP_SERVER}/${type}/?`,
      "&page=",
    );

    if (formatLink) {
      onQuery(`${formatLink}&page=${page}&limit=10`);
    } else {
      onQuery(`page=${page}&limit=10`);
    }
  };

  const handleNumberPageChange = (numberPage) => {
    let link = !nextLink ? prevLink : nextLink;

    currentPage = numberPage;

    const newLink = getValueBetweenStrings(
      link,
      `${process.env.REACT_APP_SERVER}/${type}/?`,
      "&page=",
    );

    if (newLink) {
      onQuery(`${newLink}&page=${numberPage}&limit=10`);
    } else {
      onQuery(`page=${numberPage}&limit=10`);
    }
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
          className={`mx-1 cursor-pointer rounded-full px-3 py-1 md:px-4 md:py-2 ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
          }`}
        >
          1
        </button>,
      );

      if (currentPage > Math.floor(visiblePages / 2) + 2) {
        pageNumbers.push(
          <span key="ellipsis1" className="py-1 md:py-2">
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleNumberPageChange(i)}
          className={`mx-1 cursor-pointer rounded-full px-3 py-1 md:px-4 md:py-2 ${
            currentPage === i
              ? "rounded-full bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
          }`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPage) {
      if (totalPage - endPage > 1) {
        pageNumbers.push(
          <span key="ellipsis2" className="py-1 md:py-2">
            ...
          </span>,
        );
      }

      pageNumbers.push(
        <button
          key={totalPage}
          onClick={() => handleNumberPageChange(totalPage)}
          className={`mx-1 cursor-pointer rounded-full px-3 py-1 md:px-4 md:py-2 ${
            currentPage === totalPage
              ? "rounded-full bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
          }`}
        >
          {totalPage}
        </button>,
      );
    }

    return pageNumbers;
  };

  if (!nextLink && !prevLink) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center">
      <div className="flex items-center">
        <button
          onClick={() => handlePageChange(prevLink)}
          className={`flex cursor-pointer items-center rounded-full px-2 py-1 hover:bg-blue-500 hover:bg-opacity-20 ${
            prevLink ? "text-blue-500" : "pointer-events-none text-gray-400"
          }`}
          disabled={!prevLink}
        >
          <GoArrowLeft size={20} className="mr-1" />
          {isMobile ? "" : "Previous"}
        </button>
      </div>
      <div className="mx-2 flex">{renderPageNumbers()}</div>
      <div className="flex items-center ">
        <button
          onClick={() => handlePageChange(nextLink)}
          className={`flex cursor-pointer items-center rounded-full px-3 py-1 hover:bg-blue-500 hover:bg-opacity-20 ${
            nextLink ? "text-blue-500" : "pointer-events-none text-gray-400"
          }`}
          disabled={!nextLink}
        >
          {isMobile ? "" : "Next"}
          <GoArrowRight size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
};
