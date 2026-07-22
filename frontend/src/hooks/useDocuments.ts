import { useEffect, useState } from "react";

import { searchDocuments } from "../api/documents";
import { Document } from "../types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState<
    "upload_date" | "filename" | "version"
  >("upload_date");

  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("desc");

  const [pageSize, setPageSize] = useState<
    10 | 20 | 50 | 100
  >(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalDocuments = documents.length;

  const readyCount = documents.filter(
    (doc) => doc.status.toUpperCase() === "READY"
  ).length;

  const processingCount = documents.filter(
    (doc) => doc.status.toUpperCase() === "PROCESSING"
  ).length;

  const failedCount = documents.filter(
    (doc) => doc.status.toUpperCase() === "FAILED"
  ).length;

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await searchDocuments({
        query: searchQuery,
        sort_by: sortBy,
        sort_order: sortOrder,
        page_size: pageSize,
      });

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
  }, [searchQuery, sortBy, sortOrder, pageSize]);

  return {
    documents,
    loading,
    error,

    totalDocuments,
    readyCount,
    processingCount,
    failedCount,

    searchQuery,
    setSearchQuery,

    sortBy,
    setSortBy,

    sortOrder,
    setSortOrder,

    pageSize,
    setPageSize,

    refreshDocuments: fetchDocuments,
  };
}