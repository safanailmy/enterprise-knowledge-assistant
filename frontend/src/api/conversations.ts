import api from "./axios";

import {
  ConversationItem,
  ConversationListResponse,
  ConversationDetailResponse,
} from "../types/chat";

/**
 * Create conversation
 */
export async function createConversation(
  title?: string
): Promise<ConversationItem> {
  const response = await api.post<ConversationItem>(
    "/conversations",
    {
      title,
    }
  );

  return response.data;
}

/**
 * Get my conversations
 */
export async function getMyConversations(): Promise<ConversationListResponse> {
  const response =
    await api.get<ConversationListResponse>(
      "/conversations"
    );

  return response.data;
}

/**
 * Get conversation
 */
export async function getConversation(
  conversationId: string
): Promise<ConversationDetailResponse> {
  const response =
    await api.get<ConversationDetailResponse>(
      `/conversations/${conversationId}`
    );

  return response.data;
}

/**
 * Rename conversation
 */
export async function renameConversation(
  conversationId: string,
  title: string
): Promise<ConversationItem> {
  const response =
    await api.patch<ConversationItem>(
      `/conversations/${conversationId}`,
      {
        title,
      }
    );

  return response.data;
}

/**
 * Delete conversation
 */
export async function deleteConversation(
  conversationId: string
) {
  const response = await api.delete(
    `/conversations/${conversationId}`
  );

  return response.data;
}