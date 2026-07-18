import { Search } from "lucide-react";

export default function DocumentsHeader() {
  return (
    <>
      <div className="mt-2 flex items-end justify-between">
        <div>

          <p className="mt-2 text-sm text-white/45">
            Manage and organize your enterprise knowledge base
          </p>
        </div>

        <p className="text-sm text-white/40">
          24 Files
        </p>
      </div>

      <div className="mt-6 h-px bg-white/6" />

      <div className="relative mt-6">
        <Search
          size={18}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-white/30
          "
        />

        <input
          placeholder="Search documents..."
          className="
            h-10
            w-full
            rounded-xl
            border
            border-white/8
            bg-[#193C60]
            pl-12
            pr-4
            text-sm
            text-white
            placeholder:text-white/35
            outline-none
          "
        />
      </div>
    </>
  );
}