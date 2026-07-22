type FilterType =
  | "ALL"
  | "READY"
  | "PROCESSING"
  | "FAILED"
  | "RECYCLE_BIN";

type StatusFilterProps = {
  totalDocuments: number;
  readyCount: number;
  processingCount: number;
  failedCount: number;
  deletedCount: number;

  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function StatusFilter({
  totalDocuments,
  readyCount,
  processingCount,
  failedCount,
  deletedCount,
  selectedFilter,
  onFilterChange,
}: StatusFilterProps) {
  const filters: {
    key: FilterType;
    label: string;
    count: number;
  }[] = [
    {
      key: "ALL",
      label: "All",
      count: totalDocuments,
    },
    {
      key: "READY",
      label: "Ready",
      count: readyCount,
    },
    {
      key: "PROCESSING",
      label: "Processing",
      count: processingCount,
    },
    {
      key: "FAILED",
      label: "Failed",
      count: failedCount,
    },
    {
    key: "RECYCLE_BIN",
    label: "🗑 Recycle Bin",
    count: deletedCount,
  },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`
            rounded-full
            border
            px-4
            py-2
            text-xs
            transition
            ${
              selectedFilter === filter.key
                ? "border-[#5C86F8] bg-[#5C86F8] text-white"
                : "border-white/10 bg-transparent text-white/60 hover:bg-white/5"
            }
          `}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}