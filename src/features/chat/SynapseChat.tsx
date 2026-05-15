import React, { useEffect, useState } from "react";

import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";
import "./chat.css"

import {
  loadChatMessages,
  saveChatMessages,
} from "../../services/chatStorage";

import { getSynapseReply } from "../../services/chatEngine";

import { ChatMessage } from "../../types/chat";

const SynapseChat: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  const [messages, setMessages] = useState<ChatMessage[]>(
    []
  );

  

  // ============================================
  // LOAD CHAT
  // ============================================

  useEffect(() => {

    const storedMessages = loadChatMessages();

    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    } else {

      setMessages([
        {
          id: crypto.randomUUID(),
          sender: "synapse",
          text: "I am Synapse. Try not to destroy the platform.",
          timestamp: Date.now(),
        },
      ]);

    }
  }, []);

  // ============================================
  // SAVE CHAT
  // ============================================

  useEffect(() => {
    saveChatMessages(messages);
  }, [messages]);

  // ============================================
  // HANDLE PROMPT
  // ============================================

  const handlePrompt = async (
    prompt: string
  ) => {

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: prompt,
      timestamp: Date.now(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const reply = await getSynapseReply(prompt);

    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "synapse",
      text: reply,
      timestamp: Date.now(),
    };
    setMessages((prev) => [
      ...prev,
      aiMessage,
    ]);
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const reply = await getSynapseReply(input);

    await new Promise(resolve =>
  setTimeout(resolve, 1200)
);

    const synapseReply: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "synapse",
      text: reply,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, synapseReply]);

    setInput("");
  };

  return (
    <>
      <ChatBubble
        onClick={toggleChat}
      />

      <ChatWindow
        open={isOpen}
        messages={messages}
        onPromptClick={handlePrompt}
        onSend={handleSend}
        input={input}
        setInput={setInput}
      />
    </>
  );
};

export default SynapseChat;