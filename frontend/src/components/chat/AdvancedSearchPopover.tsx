import { X, RotateCcw, Check } from "lucide-react";

import { ChatFilters } from "../../types/chatFilters";

type Props = {
  open: boolean;
  filters: ChatFilters;
  onChange: (filters: ChatFilters) => void;
  onClose: () => void;
};

export default function AdvancedSearchPopover({
  open,
  filters,
  onChange,
  onClose,
}: Props) {
  if (!open) return null;

  const clearFilters = () => {
    onChange({});
  };

  const applyFilters = () => {
    onClose();
  };

  return (
    <div
  className="
  fixed
  inset-0
  z-[9999]
  flex
  items-center
  justify-center
  p-6
  bg-black/50
  backdrop-blur-md
"
    onClick={onClose}
>
  <div
      onClick={(e) => e.stopPropagation()}
      className="
        w-full
        max-w-xl
        mx-4
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        border
        border-white/10
        bg-[#173A5D]
        p-6
        shadow-[0_30px_80px_rgba(0,0,0,.45)]
      "
    >
      {/* Header */}
      <div 
      className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Advanced Search
          </h3>

          <p className="mt-1 text-xs text-white/50">
            Choose filters to narrow the documents used to answer your question.
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            rounded-xl
            p-2
            text-white/60
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-6 space-y-5">

        {/* Department */}
        <div>
          <label className="mb-2 block text-xs font-medium text-white/70">
            Department
          </label>

          <input
            value={filters.department ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                department: e.target.value,
              })
            }
            placeholder="e.g. HR"
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#102D49]/80
              px-4
              py-2.5
              text-sm
              text-white
              placeholder:text-white/30
              outline-none
              transition
              focus:border-[#76A8FF]
              focus:ring-2
              focus:ring-[#76A8FF]/20
            "
          />
        </div>

        {/* Uploaded By */}
        <div>
          <label className="mb-2 block text-xs font-medium text-white/70">
            Uploaded By
          </label>

          <input
            value={filters.uploaded_by ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                uploaded_by: e.target.value,
              })
            }
            placeholder="e.g. admin@example.com"
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#102D49]
              px-4
              py-2.5
              text-sm
              text-white
              placeholder:text-white/30
              outline-none
              transition
              focus:border-[#76A8FF]
              focus:ring-2
              focus:ring-[#76A8FF]/20
            "
          />
        </div>

        {/* Version */}
        <div>
          <label className="mb-2 block text-xs font-medium text-white/70">
            Version
          </label>

          <input
            type="number"
            value={filters.version ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                version: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            placeholder="e.g. 1"
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#102D49]
              px-4
              py-2.5
              text-sm
              text-white
              placeholder:text-white/30
              outline-none
              transition
              focus:border-[#76A8FF]
              focus:ring-2
              focus:ring-[#76A8FF]/20
            "
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-xs font-medium text-white/70">
            Status
          </label>

          <input
            value={filters.status ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                status: e.target.value,
              })
            }
            placeholder="e.g. READY"
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#102D49]
              px-4
              py-2.5
              text-sm
              text-white
              placeholder:text-white/30
              outline-none
              transition
              focus:border-[#76A8FF]
              focus:ring-2
              focus:ring-[#76A8FF]/20
            "
          />
        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          onClick={clearFilters}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2
            text-sm
            text-white/70
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <RotateCcw size={15} />
          Clear All
        </button>

        <button
          onClick={applyFilters}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#76A8FF]
            to-[#5B84F8]
            px-5
            py-2
            text-sm
            font-medium
            text-white
            shadow-lg
            transition
            hover:scale-[1.02]
            active:scale-95
          "
        >
          <Check size={15} />
          Apply Filters
        </button>
      </div>
    </div>
    </div>
  );
}