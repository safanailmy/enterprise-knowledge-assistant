import { FileText } from "lucide-react";

import { Document } from "../../types/document";
import { formatDate } from "../../utils/date";

import StatusBadge from "../common/StatusBadge";
import ActionMenu from "../common/ActionMenu";

type DocumentRowProps = {
  document: Document;

  isRecycleBin: boolean;

  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
  onUploadVersion: (document: Document) => void;
  onViewVersions: (document: Document) => void;
  onDelete: (document: Document) => void;

  onRestore: (document: Document) => void;
  onPermanentDelete: (document: Document) => void;
};

export default function DocumentRow({
  document,
  isRecycleBin,
  onView,
  onDownload,
  onUploadVersion,
  onViewVersions,
  onDelete,
  onRestore,
  onPermanentDelete,
}: DocumentRowProps) {
  return (
    <tr className="border-b border-white/6 transition hover:bg-white/[0.03]">
      {/* Document */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <FileText
            size={18}
            className="text-[#8EB9FF]"
          />

          <span className="text-sm text-white">
            {document.original_filename}
          </span>
        </div>
      </td>

      {/* Uploaded By */}
      <td className="text-sm text-white/70">
        {document.uploaded_by}
      </td>

      {/* Version */}
      <td className="text-sm text-white/70">
        v{document.version}
      </td>

      {/* Status */}
      <td>
        {isRecycleBin ? (
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-red-500/15
              px-2.5
              py-1
              text-xs
              font-medium
              text-red-300
            "
          >
            🗑 Deleted
          </span>
        ) : (
          <StatusBadge status={document.status} />
        )}
      </td>

      {/* Upload Date */}
      <td className="text-sm text-white/60">
        {formatDate(document.upload_date)}
      </td>

      {/* Actions */}
      <td className="w-14">
        <ActionMenu
          isRecycleBin={isRecycleBin}
          onView={() => onView(document)}
          onDownload={() => onDownload(document)}
          onUploadVersion={() => onUploadVersion(document)}
          onViewVersions={() => onViewVersions(document)}
          onDelete={() => onDelete(document)}
          onRestore={() => onRestore(document)}
          onPermanentDelete={() => onPermanentDelete(document)}
        />
      </td>
    </tr>
  );
}