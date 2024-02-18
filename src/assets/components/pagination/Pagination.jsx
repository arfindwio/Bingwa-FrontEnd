import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Icon
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

// Redux Action
import { getAllCategoriesAction } from "../../../redux/action/categories/CategoriesAction";
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import { getAllChaptersAction } from "../../../redux/action/chapters/ChaptersAction";
import { getAllLessonsAction } from "../../../redux/action/lessons/LessonsAction";
import { getAllPromotionsAction } from "../../../redux/action/promotions/PromotionsAction";
import { getAllPaymentsAction } from "../../../redux/action/payments/PaymentsAction";

let currentPage = 1;

export const Pagination = ({ type, nextLink, prevLink, totalItems }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  if (!nextLink && !prevLink) return null;

  const getAllData = (formatLink) => {
    dispatch(getAllCategoriesAction(formatLink));
    dispatch(getAllCoursesAction(formatLink));
    dispatch(getAllChaptersAction(formatLink));
    dispatch(getAllLessonsAction(formatLink));
    dispatch(getAllPromotionsAction(formatLink));
    dispatch(getAllPaymentsAction(formatLink));
  };

  const handlePageChange = (link) => {
    const pageMatch = link.match(/page=(\d+)/);
    let page = pageMatch ? parseInt(pageMatch[1], 10) : 1;

    let formatLink = link.split(`${process.env.REACT_APP_SERVER}/${type}/?`)[1];

    currentPage = page;
    getAllData(formatLink);
  };

  const handleNumberPageChange = (numberPage) => {
    let link = !nextLink ? prevLink : nextLink;
    let formatLink = link.split(`${process.env.REACT_APP_SERVER}/${type}/?`)[1];

    let newLink = formatLink?.replace(/(page=)\d+/, "$1" + numberPage);

    currentPage = numberPage;
    getAllData(newLink);
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
