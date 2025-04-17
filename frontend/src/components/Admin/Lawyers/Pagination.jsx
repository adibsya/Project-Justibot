import React from 'react';

const Pagination = ({ totalPages, currentPage }) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1
              ? 'bg-[#652B19] text-white'
              : 'bg-gray-200'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
