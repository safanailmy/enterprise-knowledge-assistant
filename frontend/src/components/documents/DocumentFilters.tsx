type DocumentFiltersProps = {
  sortBy: "upload_date" | "filename" | "version";
  onSortByChange: (
    value: "upload_date" | "filename" | "version"
  ) => void;

  sortOrder: "asc" | "desc";
  onSortOrderChange: (
    value: "asc" | "desc"
  ) => void;

  pageSize: 10 | 20 | 50 | 100;
  onPageSizeChange: (
    value: 10 | 20 | 50 | 100
  ) => void;
};

export default function DocumentFilters({
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  pageSize,
  onPageSizeChange,
}: DocumentFiltersProps) {
  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-wrap items-center gap-6">

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-white/55">
              Sort By
            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                onSortByChange(
                  e.target.value as
                    | "upload_date"
                    | "filename"
                    | "version"
                )
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-[#173A5D]
                px-4
                py-2.5
                text-sm
                text-white
                outline-none
                transition
                hover:border-white/20
                focus:border-[#5C86F8]
              "
            >
              <option value="upload_date">
                Upload Date
              </option>

              <option value="filename">
                Filename
              </option>

              <option value="version">
                Version
              </option>
            </select>
          </div>

          {/* Order */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-white/55">
              Order
            </label>

            <select
              value={sortOrder}
              onChange={(e) =>
                onSortOrderChange(
                  e.target.value as "asc" | "desc"
                )
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-[#173A5D]
                px-4
                py-2.5
                text-sm
                text-white
                outline-none
                transition
                hover:border-white/20
                focus:border-[#5C86F8]
              "
            >
              <option value="desc">
                Newest First
              </option>

              <option value="asc">
                Oldest First
              </option>
            </select>
          </div>

          {/* Page Size */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-white/55">
              Page Size
            </label>

            <select
              value={pageSize}
              onChange={(e) =>
                onPageSizeChange(
                  Number(e.target.value) as
                    | 10
                    | 20
                    | 50
                    | 100
                )
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-[#173A5D]
                px-4
                py-2.5
                text-sm
                text-white
                outline-none
                transition
                hover:border-white/20
                focus:border-[#5C86F8]
              "
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
}