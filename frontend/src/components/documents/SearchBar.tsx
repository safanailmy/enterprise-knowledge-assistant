import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <section className="mb-6">
      <div
        className="
          flex
          h-11
          items-center
          rounded-xl
          border
          border-white/8
          bg-[#183C61]
          px-4
        "
      >
        <Search
          size={18}
          className="text-white/35"
        />

        <input
          placeholder="Search documents..."
          className="
            ml-3
            flex-1
            bg-transparent
            text-[15px]
            text-white
            placeholder:text-white/35
            outline-none
          "
        />
      </div>
    </section>
  );
}