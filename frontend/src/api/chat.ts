import api from "./axios";

import {
  ChatRequest,
  ChatResponse,
} from "../types/chat";

/**
 * Ask AI
 */
export async function askQuestion(
  request: ChatRequest
): Promise<ChatResponse> {
  const response = await api.post<ChatResponse>(
    "/chat",
    request
  );

  return response.data;
}