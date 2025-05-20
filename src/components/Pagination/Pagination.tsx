import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 5) {
    // Show all pages if totalPages is 5 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always show first page
    pageNumbers.push(1);

    // Show ellipsis if currentPage is beyond the first few pages
    if (currentPage > 3) pageNumbers.push("...");

    // Generate the middle page buttons dynamically
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Show ellipsis if not near the last page
    if (currentPage < totalPages - 2) pageNumbers.push("...");

    // Always show last page
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex justify-end mt-6 space-x-2">
      {pageNumbers.map((num, index) =>
        num === "..." ? (
          <span key={index} className="px-3 py-2 font-bold text-gray-400">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(num as number)}
            className={`px-3 py-2 rounded-md font-bold ${
              num === currentPage ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-blue-600"
            }`}
          >
            {num}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;