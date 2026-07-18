import { CloudUpload } from "lucide-react";

export default function UploadDropzone() {
  return (
    <section className="mb-6">

      <div
        className="
          flex
          h-[170px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-white/10
          bg-[#17395C]
          transition-all
          hover:border-[#5C86F8]
        "
      >

        <CloudUpload
          size={42}
          className="text-[#86B1FF]"
        />

        <h3 className="mt-5 text-lg font-medium text-white">
          Drop PDF files here
        </h3>

        <p className="mt-2 text-sm text-white/45">
          Drag & drop or browse from your computer
        </p>

        <button
          className="
            mt-5
            rounded-full
            border
            border-white/10
            px-5
            py-2
            text-sm
            text-white
            transition-all
            hover:bg-white/5
          "
        >
          Browse Files
        </button>

      </div>

    </section>
  );
}