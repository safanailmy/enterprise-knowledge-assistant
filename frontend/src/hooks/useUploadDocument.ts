import { useState } from "react";
import { uploadDocument } from "../api/documents";

export function useUploadDocument() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (
    file: File,
    department: string
  ) => {
    try {
      setUploading(true);
      setError("");

      const response = await uploadDocument(
        file,
        department
      );

      return response;
    } catch (err: any) {
      setError(
        err.response?.data?.detail ??
          "Upload failed."
      );

      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    upload,
    uploading,
    error,
  };
}