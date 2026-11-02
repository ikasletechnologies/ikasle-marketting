import { api } from './api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  ok: boolean;
  message?: string;
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  let response: ChatResponse;

  try {
    response = await api.post<ChatResponse>('/chat', { messages });
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('The chat service is unavailable right now.');
    }
    throw error;
  }

  if (!response.ok || !response.message) {
    throw new Error(response.message || 'We could not get a response right now.');
  }

  return response.message;
}