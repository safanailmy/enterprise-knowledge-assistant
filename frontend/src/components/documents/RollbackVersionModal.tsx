import { useState } from "react";
import { RotateCcw, X, Loader2 } from "lucide-react";

import { rollbackDocumentVersion } from "../../api/documents";
import { DocumentVersion } from "../../types/document";

type RollbackVersionModalProps = {
  open: boolean;
  version: DocumentVersion | null;
  onClose: () => void;
  onRolledBack: () => Promise<void>;
};


export default function RollbackVersionModal({
  open,
  version,
  onClose,
  onRolledBack,
}: RollbackVersionModalProps) {
  const [rollingBack, setRollingBack] = useState(false);

  if (!open || !version) return null;

  const selectedVersion = version;

 async function handleRollback() {
  if (rollingBack) return;

  try {
    setRollingBack(true);

    console.time("Rollback API");

    await rollbackDocumentVersion(
      selectedVersion.document_id
    );

    console.timeEnd("Rollback API");

    console.time("Refresh");

    await onRolledBack();

    console.timeEnd("Refresh");
  } catch (error) {
    console.error("Rollback failed:", error);
    alert("Failed to rollback document version.");
  } finally {
    setRollingBack(false);
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
            <div className="rounded-full bg-blue-500/20 p-2">
              <RotateCcw
                size={22}
                className="text-[#5C86F8]"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Rollback Version
              </h2>

              <p className="text-sm text-white/50">
                Restore an older version
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={rollingBack}
            className="
              rounded-lg
              p-2
              text-white/50
              transition
              hover:bg-white/5
              hover:text-white
              disabled:opacity-40
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-6">
          <p className="text-sm leading-6 text-white/75">
            Are you sure you want to rollback to{" "}
            <span className="font-semibold text-white">
              Version {selectedVersion.version}
            </span>
            ?
          </p>

          <div
            className="
              rounded-xl
              border
              border-yellow-500/20
              bg-yellow-500/10
              p-4
            "
          >
            <p className="text-sm text-yellow-200">
              This will create a new latest version using
              the contents of Version{" "}
              <strong>{selectedVersion.version}</strong>.
              Your current version will no longer be the
              active version.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-5">
          <button
            onClick={onClose}
            disabled={rollingBack}
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-2
              text-white/70
              transition
              hover:bg-white/5
              disabled:opacity-40
            "
          >
            Cancel
          </button>

          <button
            onClick={handleRollback}
            disabled={rollingBack}
            className={`
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-5
              py-2
              font-medium
              text-white
              transition

              ${
                rollingBack
                    ? "cursor-default bg-[#5C86F8]/60 opacity-60"
                    : "bg-[#5C86F8] hover:bg-[#4A73E6]"
              }
            `}
          >
            {rollingBack ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Rolling back...
              </>
            ) : (
              <>
                <RotateCcw size={18} />
                Rollback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}