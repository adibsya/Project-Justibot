import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  const handlePageClick = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages ||
      pageNumber === currentPage
    ) {
      return;
    }
    onPageChange(pageNumber);
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Previous page button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page buttons */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1
              ? "bg-[#652B19] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next page button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
