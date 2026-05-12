import { ChatMessage } from "../types/chat";

const STORAGE_KEY = "quilpana_synapse_chat";

export const loadChatMessages = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load chat messages:", error);
    return [];
  }
};

export const saveChatMessages = (
  messages: ChatMessage[]
): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );
  } catch (error) {
    console.error("Failed to save chat messages:", error);
  }
};

export const clearChatMessages = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};