import { useEffect, useState } from "react";

import { getDocuments } from "../api/documents";
import { Document } from "../types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDocuments();

      setDocuments(response.documents);
    } catch (err) {
      console.error(err);
      setError("Unable to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    refresh: fetchDocuments,
  };
}