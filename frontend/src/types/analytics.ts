export interface CountByName {
  name: string;
  count: number;
}

export interface RecentUploadItem {
  document_id: string;
  document_group_id: string;
  filename: string;
  department: string;
  uploaded_by: string;
  version: number;
  status: string;
  upload_date: string;
}

export interface RecentQueryItem {
  user_email: string;
  question: string;
  department: string | null;
  retrieved_chunk_count: number;
  created_at: string;
}

export interface PopularDocumentItem {
  document_id: string | null;
  filename: string;
  usage_count: number;
}

export interface RecentActivityItem {
  audit_id: string;
  user_email: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  created_at: string;
}

export interface OverviewAnalytics {
  total_users: number;
  active_users: number;
  total_documents: number;
  total_document_versions: number;
  total_conversations: number;
  total_messages: number;
  total_chat_queries: number;
}

export interface DocumentAnalytics {
  by_department: CountByName[];
  by_status: CountByName[];
  recent_uploads: RecentUploadItem[];
}

export interface ChatAnalytics {
  queries_by_department: CountByName[];
  most_used_documents: PopularDocumentItem[];
  recent_queries: RecentQueryItem[];
}

export interface UserAnalytics {
  by_role: CountByName[];
  by_department: CountByName[];
}

export interface AnalyticsDashboardResponse {
  overview: OverviewAnalytics;
  documents: DocumentAnalytics;
  chat: ChatAnalytics;
  users: UserAnalytics;
  recent_activity: RecentActivityItem[];
}