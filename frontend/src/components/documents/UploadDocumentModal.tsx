import {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { X, Upload } from "lucide-react";

import { DEPARTMENTS } from "../../constants/departments";
import { uploadDocument } from "../../api/documents";

type UploadDocumentModalProps = {
  open: boolean;
  onClose: () => void;
  onUploaded: () => void;
};

export default function UploadDocumentModal({
  open,
  onClose,
  onUploaded,
}: UploadDocumentModalProps) {
  const [department, setDepartment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setDepartment("");
    setSelectedFile(null);
    setError("");
    setUploading(false);

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
    if (!department) {
      setError("Please select a department.");
      return;
    }

    if (!selectedFile) {
      setError("Please select a PDF document.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      await uploadDocument(selectedFile, department);

      resetForm();

      onUploaded();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Failed to upload document."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  if (!open) return null;

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
              Upload Document
            </h2>

            <p className="mt-1 text-sm text-white/45">
              Add a new document to the knowledge base.
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

        {/* Department */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Department
          </label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#214B74]
              px-4
              py-3
              text-white
              outline-none
              focus:border-[#5C86F8]
            "
          >
            <option value="">Select Department</option>

            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Document */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-white/70">
            Document
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
            !department ||
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
            : "Upload Document"}
        </button>
        </div>
      </div>
    </div>
  );
}