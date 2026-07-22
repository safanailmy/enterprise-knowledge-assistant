import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-t
        border-white/8
        px-6
        py-4
      "
    >
      <p className="text-sm text-white/45">
        Showing {startItem}–{endItem} of {totalItems} documents
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className="
            rounded-lg
            border
            border-white/10
            p-2
            text-white/60
            transition
            hover:bg-white/5
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-2 text-sm transition
              ${
                currentPage === page
                  ? "bg-[#5C86F8] text-white"
                  : "text-white/60 hover:bg-white/5"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages || totalPages === 0}
          className="
            rounded-lg
            border
            border-white/10
            p-2
            text-white/60
            transition
            hover:bg-white/5
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}