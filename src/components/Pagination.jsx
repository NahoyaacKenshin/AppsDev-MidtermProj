import React from "react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 text-sm sm:text-base"
      >
        Prev
      </button>

      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded text-sm sm:text-base ${
              page === currentPage ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 text-sm sm:text-base"
      >
        Next
      </button>
    </div>
  );
}