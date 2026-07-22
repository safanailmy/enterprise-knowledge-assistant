type DocumentsHeaderProps = {
  totalDocuments: number;
};

export default function DocumentsHeader({
  totalDocuments,
}: DocumentsHeaderProps) {
  return (
    <header className="mt-2">

      {/* Title Row */}
      <div className="flex items-center justify-between">

        <div>

          <p
            className="
              mt-0
              text-sm
              text-white/50
            "
          >
            Manage and organize your enterprise knowledge base
          </p>
        </div>

        {/* Document Count */}

        <div
          className="
            rounded-full
            border
            border-white/10
            bg-[#173A5D]
            px-4
            py-1
          "
        >
          <span
            className="
              text-sm
              font-medium
              text-white/80
            "
          >
            {totalDocuments} Documents
          </span>
        </div>

      </div>

      {/* Divider */}

      <div className="mt-2 h-px bg-white/8" />

    </header>
  );
}