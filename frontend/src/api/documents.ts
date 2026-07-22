import api from "./axios";
import { DocumentListResponse } from "../types/document";

/**
 * Get all documents
 */
export async function getDocuments(): Promise<DocumentListResponse> {
  const response = await api.get<DocumentListResponse>("/documents");

  return response.data;
}

/**
 * Upload document
 */
export async function uploadDocument(
  file: File,
  department: string
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("department", department);

  const response = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

/**
 * Download document
 */
export async function downloadDocument(documentId: string) {
  const response = await api.get(
    `/documents/${documentId}/download`,
    {
      responseType: "blob",
    }
  );

  console.log(response.headers);
  console.log(response.headers["content-disposition"]);

  const disposition = response.headers["content-disposition"];

  let filename = "download";

  if (disposition) {
    // RFC 5987 format: filename*=utf-8''HR%20Policy.pdf
    const utf8Match = disposition.match(/filename\*=utf-8''(.+)/i);

    if (utf8Match) {
      filename = decodeURIComponent(utf8Match[1]);
    } else {
      // Older format: filename="HR Policy.pdf"
      const normalMatch = disposition.match(/filename="?([^"]+)"?/);

      if (normalMatch) {
        filename = normalMatch[1];
      }
    }
  }

  return {
    blob: response.data,
    filename,
  };
}

/**
 * upload new version
 */

export async function uploadNewVersion(
  documentGroupId: string,
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/documents/${documentGroupId}/versions`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

/**
 * delete doc
 */
export async function deleteDocument(
  documentId: string
) {
  const response = await api.delete(
    `/documents/${documentId}`
  );

  return response.data;
}

/**
 * get deleted docs
 */

export async function getDeletedDocuments() {
  const response = await api.get("/documents/deleted");
  return response.data;
}

export async function restoreDocument(documentId: string) {
  await api.patch(`/documents/${documentId}/restore`);
}

export async function permanentlyDeleteDocument(documentId: string) {
  await api.delete(`/documents/${documentId}/permanent`);
}

export async function getDocumentVersions(documentGroupId: string) {
  const response = await api.get(
    `/documents/groups/${documentGroupId}/versions`
  );

  return response.data;
}
/**
 * rollback
 */
export async function rollbackDocumentVersion(documentId: string) {
  const response = await api.post(
    `/documents/versions/${documentId}/rollback`,
    {},
    {
      timeout: 60000,
    }
  );

  return response.data;
}

/**
 * search
 */

export type SearchDocumentsParams = {
  query?: string;
  page?: number;
  page_size?: number;
  sort_by?: "upload_date" | "filename" | "version";
  sort_order?: "asc" | "desc";
};

export async function searchDocuments(
  params: SearchDocumentsParams
) {
  const response = await api.get("/documents/search", {
    params,
  });

  return response.data;
}