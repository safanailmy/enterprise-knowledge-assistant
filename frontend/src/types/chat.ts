export interface Source {
  document_id: string;
  filename: string;
  version: number;
  page_number?: number;
  chunk_index: number;
}

export interface ChatRequest {
  conversation_id: string;
  question: string;
  department?: string;
  uploaded_by?: string;
  version?: number;
  status?: string;
}

export interface ChatResponse {
  conversation_id: string;
  answer: string;
  sources: Source[];
}

export interface ConversationItem {
  conversation_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationListResponse {
  conversations: ConversationItem[];
}

export interface MessageItem {
  message_id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  created_at: string;
}

export interface ConversationDetailResponse {
  conversation_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: MessageItem[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  created_at?: string;
}