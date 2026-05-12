export type Sender = "user" | "synapse";

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
}

export interface QuickReply {
  label: string;
  prompt: string;
}