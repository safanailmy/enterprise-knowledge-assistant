import {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { X, Upload } from "lucide-react";

import { uploadNewVersion } from "../../api/documents";
import { Document } from "../../types/document";

type UploadVersionModalProps = {
  open: boolean;
  document: Document | null;
  onClose: () => void;
  onUploaded: () => void;
};

export default function UploadVersionModal({
  open,
  document,
  onClose,
  onUploaded,
}: UploadVersionModalProps) {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  function resetForm() {
    setSelectedFile(null);
    setUploading(false);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  function handleBrowse() {
    fileInputRef.current?.click();
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please select a PDF document.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile(file);
    setError("");
  }

  async function handleUpload() {
    if (!document) return;

    if (!selectedFile) {
      setError("Please select a PDF document.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      await uploadNewVersion(
        document.document_group_id,
        selectedFile
      );

      resetForm();

      onUploaded();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Failed to upload new version."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  if (!open || !document) return null;

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
          max-w-lg
          rounded-2xl
          border
          border-white/10
          bg-[#173A5D]
          p-6
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Upload New Version
            </h2>

            <p className="mt-1 text-sm text-white/45">
              Upload a new version of an existing document.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
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

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={handleFileChange}
        />

        {/* Current Document */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Current Document
          </label>

          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-[#214B74]
              px-4
              py-3
            "
          >
            <p className="truncate font-medium text-white">
              {document.original_filename}
            </p>

            <p className="mt-1 text-sm text-white/45">
              Version v{document.version}
            </p>
          </div>
        </div>

        {/* File Picker */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-white/70">
            New PDF Version
          </label>

          <button
            type="button"
            onClick={handleBrowse}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-dashed
              border-white/20
              py-6
              text-white/70
              transition
              hover:border-[#5C86F8]
              hover:text-white
            "
          >
            <Upload size={18} />
            Browse PDF
          </button>

          {selectedFile && (
            <div
              className="
                mt-4
                rounded-xl
                border
                border-white/10
                bg-[#214B74]
                p-4
              "
            >
              <p className="truncate font-medium text-white">
                {selectedFile.name}
              </p>

              <p className="mt-1 text-sm text-white/45">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
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
            type="button"
            onClick={handleUpload}
            disabled={
              uploading ||
              !selectedFile
            }
            className="
              rounded-xl
              bg-[#5C86F8]
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-[#7096FF]
              disabled:opacity-50
            "
          >
            {uploading
              ? "Uploading..."
              : "Upload New Version"}
          </button>
        </div>
      </div>
    </div>
  );
}