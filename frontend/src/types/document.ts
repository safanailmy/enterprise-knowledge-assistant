export interface Document {
  document_id: string;
  document_group_id: string;
  original_filename: string;
  department: string;
  uploaded_by: string;
  upload_date: string;
  version: number;
  status: string;
}

export interface DocumentListResponse {
  documents: Document[];
}

/* ---------------- Version History ---------------- */

export interface DocumentVersion extends Document {
  is_deleted: boolean;
}

export interface DocumentVersionsResponse {
  document_group_id: string;
  versions: DocumentVersion[];
}