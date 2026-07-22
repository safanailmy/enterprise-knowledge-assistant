import { Plus } from "lucide-react";

import SearchBar from "./SearchBar";
import DocumentFilters from "./DocumentFilters";

type DocumentsToolbarProps = {
  onUploadClick?: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function DocumentsToolbar({
  onUploadClick,
  searchQuery,
  onSearchChange,
}: DocumentsToolbarProps) {
  return (
    <section className="mt-8 space-y-6">
      {/* Search + Upload */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>

        <button
          onClick={onUploadClick}
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            bg-[#5C86F8]
            px-5
            text-sm
            font-medium
            text-white
            shadow-md
            transition-all
            hover:bg-[#7096FF]
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <Plus size={18} />
          Upload Document
        </button>
      </div>

    </section>
  );
}