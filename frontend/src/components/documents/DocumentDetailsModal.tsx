import { X, FileText } from "lucide-react";
import { Document } from "../../types/document";
import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/date";

type DocumentDetailsModalProps = {
  document: Document | null;
  open: boolean;
  onClose: () => void;
};

export default function DocumentDetailsModal({
  document,
  open,
  onClose,
}: DocumentDetailsModalProps) {
  if (!open || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          border
          border-white/10
          bg-[#17395C]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#214B74] p-3">
              <FileText className="text-[#8EB9FF]" size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                {document.original_filename}
              </h2>

              <p className="mt-1 text-sm text-white/45">
                Document Details
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-white/50
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 px-6 py-6">
          <InfoRow
            label="Status"
            value={<StatusBadge status={document.status} />}
          />

          <InfoRow
            label="Version"
            value={`v${document.version}`}
          />

          <InfoRow
            label="Department"
            value={document.department}
          />

          <InfoRow
            label="Uploaded By"
            value={document.uploaded_by}
          />

          <InfoRow
            label="Upload Date"
            value={formatDate(document.upload_date)}
          />

          <InfoRow
            label="Document ID"
            value={document.document_id}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-white/10 px-6 py-5">
          <button
            onClick={onClose}
            className="
              rounded-xl
              bg-[#5C86F8]
              px-6
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#7096FF]
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>

      <div className="text-sm text-white">
        {value}
      </div>
    </div>
  );
}