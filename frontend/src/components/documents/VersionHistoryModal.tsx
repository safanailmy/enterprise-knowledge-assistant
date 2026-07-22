import { useEffect, useState } from "react";
import { X, History, RotateCcw } from "lucide-react";

import { getDocumentVersions } from "../../api/documents";
import {
  DocumentVersion,
  DocumentVersionsResponse,
} from "../../types/document";

type VersionHistoryModalProps = {
  open: boolean;
  documentGroupId: string | null;
  onClose: () => void;
  onRollback: (version: DocumentVersion) => void;
};

export default function VersionHistoryModal({
  open,
  documentGroupId,
  onClose,
  onRollback,
}: VersionHistoryModalProps) {
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !documentGroupId) return;

    loadVersions();
  }, [open, documentGroupId]);

  async function loadVersions() {
    if (!documentGroupId) return;

    try {
      setLoading(true);
      setError("");

      const response: DocumentVersionsResponse =
        await getDocumentVersions(documentGroupId);

      const sortedVersions = [...response.versions].sort(
        (a, b) => b.version - a.version
      );

      setVersions(sortedVersions);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Failed to load version history."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const latestVersion =
    versions.length > 0
      ? Math.max(...versions.map((v) => v.version))
      : 0;

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
          max-w-2xl
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#173A5D]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <History
              className="text-[#5C86F8]"
              size={24}
            />

            <div>
              <h2 className="text-xl font-semibold text-white">
                Version History
              </h2>

              <p className="text-sm text-white/50">
                View all versions of this document
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[500px] overflow-y-auto scrollbar-hide p-6">
          {loading && (
            <div className="py-10 text-center text-white/60">
              Loading version history...
            </div>
          )}

          {!loading && error && (
            <div className="py-10 text-center text-red-400">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            versions.length === 0 && (
              <div className="py-10 text-center text-white/50">
                No versions found.
              </div>
            )}

          {!loading &&
            !error &&
            versions.map((version) => (
              <div
                key={version.document_id}
                className="mb-4 rounded-xl border border-white/10 bg-[#214B74] p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Version {version.version}
                    </h3>

                    <p className="mt-1 text-sm text-white/60">
                      Uploaded by {version.uploaded_by}
                    </p>

                    <p className="text-sm text-white/45">
                      {new Date(
                        version.upload_date
                      ).toLocaleString()}
                    </p>
                  </div>

                  {version.version === latestVersion ? (
                    <span
                      className="
                        rounded-full
                        bg-green-500/20
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-green-300
                      "
                    >
                      Current Version
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        onRollback(version)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-[#5C86F8]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-[#4A73E6]
                      "
                    >
                      <RotateCcw size={16} />
                      Rollback
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-white/10 px-6 py-4">
          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-2
              text-white/70
              hover:bg-white/5
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}