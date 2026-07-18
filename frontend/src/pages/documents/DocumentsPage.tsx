import DocumentsHeader from "../../components/documents/DocumentsHeader";
import UploadArea from "../../components/documents/UploadArea";
import DocumentsTable from "../../components/documents/DocumentsTable";

export default function DocumentsPage() {
  return (
    <main
      className="
        relative
        mx-auto
        flex
        h-full
        w-full
        max-w-6xl
        flex-col
        px-10
        pt-0
        pb-4
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-48
          h-[520px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#4F7DF3]/8
          blur-[170px]
        "
      />

      <div className="relative z-10 -mt-8 flex h-full flex-col">
        <DocumentsHeader />

        <UploadArea />

        <div className="mt-0 flex-1 overflow-hidden">
          <DocumentsTable />
      </div>
      </div>
    </main>
  );
}