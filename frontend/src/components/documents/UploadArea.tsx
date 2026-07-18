import { CloudUpload } from "lucide-react";

export default function UploadArea() {
  return (
    <div
      className="
        mt-5
        rounded-2xl
        border
        border-dashed
        border-white/10
        bg-[#224B74]/70
        px-10
        py-6
        text-center
        transition-all
        hover:border-[#5C86F8]/40
      "
    >
      <CloudUpload
        size={32}
        className="mx-auto text-[#84AFFF]"
      />

      <h3 className="mt-4 text-base font-semibold text-white">
        Drop PDF files
      </h3>

      <p className="mt-2 text-sm text-white/45">
        Drag & drop or browse from your computer
      </p>

      <button
        className="
          mt-4
          rounded-full
          border
          border-white/10
          bg-[#214B74]
          px-6
          py-2
          text-sm
          text-white
          transition
          hover:bg-[#295A89]
        "
      >
        Browse Files
      </button>
    </div>
  );
}