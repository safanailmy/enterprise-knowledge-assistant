import { Search, Upload } from "lucide-react";

export default function DocumentsToolbar() {
  return (
    <section className="mb-8 flex items-center justify-between gap-5">

      <div
        className="
          flex
          w-[420px]
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-[#173A5D]
          px-4
          py-3
        "
      >
        <Search size={18} className="text-white/40" />

        <input
          placeholder="Search documents..."
          className="
            w-full
            bg-transparent
            text-white
            outline-none
            placeholder:text-white/35
          "
        />
      </div>

      <button
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-[#4F7DF3]
          px-5
          py-3
          text-white
          transition
          hover:bg-[#6B92FF]
        "
      >
        <Upload size={18} />

        Upload
      </button>

    </section>
  );
}