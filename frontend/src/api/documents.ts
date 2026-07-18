import api from "./axios";
import { DocumentListResponse } from "../types/document";

/**
 * Get all documents
 */
export async function getDocuments(): Promise<DocumentListResponse> {
  const response = await api.get<DocumentListResponse>("/documents");

  return response.data;
}