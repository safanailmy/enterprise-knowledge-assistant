import { useEffect, useState } from "react";

import { getDeletedDocuments } from "../api/documents";
import { Document } from "../types/document";

export function useDeletedDocuments() {
  const [deletedDocuments, setDeletedDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const deletedCount = deletedDocuments.length;

  const fetchDeletedDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDeletedDocuments();

      console.log("Deleted documents:", response.documents);

      setDeletedDocuments(response.documents);

      setDeletedDocuments(response.documents);
    } catch (err) {
      console.error(err);
      setError("Unable to load deleted documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedDocuments();
  }, []);

  return {
    deletedDocuments,
    deletedCount,
    loading,
    error,
    refreshDeletedDocuments: fetchDeletedDocuments,
  };
}