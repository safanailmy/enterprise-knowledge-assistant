import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

import { permanentlyDeleteDocument } from "../../api/documents";
import { Document } from "../../types/document";

type PermanentDeleteModalProps = {
  open: boolean;
  document: Document | null;
  onClose: () => void;
  onDeleted: () => Promise<void>;
};

export default function PermanentDeleteModal({
  open,
  document,
  onClose,
  onDeleted,
}: PermanentDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open || !document) return null;

  const currentDocument = document;

  async function handleDelete() {
    try {
      setLoading(true);
      setError("");

      await permanentlyDeleteDocument(currentDocument.document_id);

      await onDeleted();

      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Failed to permanently delete document."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-red-500/30
          bg-[#173A5D]
          p-6
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
                rounded-full
                bg-red-600/20
                p-2
              "
            >
              <Trash2
                className="text-red-400"
                size={22}
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Permanently Delete
            </h2>
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
        <div className="mt-6">
          <div
            className="
              mb-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              p-4
            "
          >
            <AlertTriangle
              className="mt-0.5 text-red-400"
              size={20}
            />

            <div>
              <p className="font-medium text-red-300">
                This action cannot be undone.
              </p>

              <p className="mt-1 text-sm text-red-200/80">
                The document and all of its versions
                will be permanently removed.
              </p>
            </div>
          </div>

          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-[#214B74]
              p-4
            "
          >
            <p className="truncate font-medium text-white">
              {currentDocument.original_filename}
            </p>

            <p className="mt-1 text-sm text-white/45">
              Version v{currentDocument.version}
            </p>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-2.5
              text-white/70
              transition
              hover:bg-white/5
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="
              rounded-xl
              bg-red-700
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-red-800
              disabled:opacity-50
            "
          >
            {loading
              ? "Deleting..."
              : "Delete Forever"}
          </button>
        </div>
      </div>
    </div>
  );
}