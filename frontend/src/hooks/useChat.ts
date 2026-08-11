import { useEffect, useState } from "react";

import { askQuestion } from "../api/chat";

import {
  createConversation,
  deleteConversation as deleteConversationApi,
  getConversation,
  getMyConversations,
  renameConversation as renameConversationApi,
} from "../api/conversations";

import {
  ChatMessage,
  ConversationItem,
} from "../types/chat";

import { ChatFilters } from "../types/chatFilters";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [conversations, setConversations] = useState<
    ConversationItem[]
  >([]);

  const [conversationId, setConversationId] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] =
    useState<ChatFilters>({});

  /**
   * Load conversation list
   */
  const refreshConversations = async () => {
    try {
      const response =
        await getMyConversations();

      setConversations(response.conversations);
    } catch (err) {
      console.error(err);
    }
  };

  /**
 * Reset current chat
 */
const resetChat = () => {
  setConversationId("");
  setMessages([]);
  setError("");
};

  /**
   * Create new conversation
   */
  const createNewConversation = async () => {
    try {
      setLoading(true);
      setError("");

      const conversation =
        await createConversation();

      setConversationId(
        conversation.conversation_id
      );

      setMessages([]);

      await refreshConversations();

      return conversation.conversation_id;
    } catch (err) {
      console.error(err);

      setError(
        "Unable to create conversation."
      );

      return "";
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load conversation
   */
  const loadConversation = async (
    id: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const conversation =
        await getConversation(id);

      setConversationId(
        conversation.conversation_id
      );

      setMessages(
        conversation.messages.map((message) => ({
          id: message.message_id,
          role: message.role,
          content: message.content,
          sources: message.sources ?? [],
          created_at: message.created_at,
        }))
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load conversation."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
 * Generate conversation title from first message
 */
const generateConversationTitle = (
  question: string
) => {
  const title = question.trim();

  if (title.length <= 40) {
    return title;
  }

  return `${title.substring(0, 40)}...`;
};


/**
 * Send message
 */
const sendMessage = async (
  question: string,
  filtersOverride?: ChatFilters
) => {
  if (!question.trim()) return;

  let currentConversationId = conversationId;

  if (!currentConversationId) {
    currentConversationId =
      await createNewConversation();

    if (!currentConversationId) return;
  }

  // Give a new conversation a title based on the first message
  if (currentConversationId && !conversationId) {
    await renameConversationApi(
      currentConversationId,
      generateConversationTitle(question)
    );

    await refreshConversations();
  }

  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content: question,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  try {
    setLoading(true);

    const activeFilters =
      filtersOverride ?? filters;

    const response = await askQuestion({
      conversation_id: currentConversationId,
      question,

      department: activeFilters.department,
      uploaded_by: activeFilters.uploaded_by,
      version: activeFilters.version,
      status: activeFilters.status,
    });

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: response.answer,
      sources: response.sources,
    };

    setMessages((prev) => [
      ...prev,
      assistantMessage,
    ]);

    await refreshConversations();
  } catch (err) {
    console.error(err);

    setError("Unable to send message.");
  } finally {
    setLoading(false);
  }
};

  /**
   * Rename conversation
   */
  const renameConversation = async (
    id: string,
    title: string
  ) => {
    try {
      await renameConversationApi(
        id,
        title
      );

      await refreshConversations();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Delete conversation
   */
  const deleteConversation = async (
    id: string
  ) => {
    try {
      await deleteConversationApi(id);

      await refreshConversations();

      if (conversationId === id) {
        resetChat();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Initialize chat
   */
 useEffect(() => {
  refreshConversations();
}, []);

  return {
    messages,
    conversations,

    conversationId,

    loading,
    error,

    filters,
    setFilters,

    sendMessage,

    loadConversation,

    newConversation: resetChat,

    renameConversation,

    deleteConversation,

    refreshConversations,
  };
}