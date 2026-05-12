import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, QuickReply } from "../../types/chat";
import { TypeAnimation } from "react-type-animation";

interface ChatWindowProps {
  open: boolean;
  messages: ChatMessage[];
  onPromptClick: (prompt: string) => void;
  onSend: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const quickReplies: QuickReply[] = [
  {
    label: "What is Quilpana?",
    prompt: "What is Quilpana?",
  },
  {
    label: "Explain Player Mode",
    prompt: "Explain Player Mode",
  },
  {
    label: "Explain Creator Studio",
    prompt: "Explain Creator Studio",
  },
  {
    label: "Who are you?",
    prompt: "Who are you?",
  },
];

const ChatWindow: React.FC<ChatWindowProps> = ({
  open,
  messages,
  onPromptClick,
  onSend,
  input,
  setInput,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="synapse-chat-window"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.92,
          }}
          transition={{
            duration: 0.3,
          }}
        >

          <div className="synapse-memory">
  <button onClick={() => {}} className="synapse-memory-button">
    ✦
  </button>
</div>
          {/* MESSAGES */}

          <div className="synapse-messages">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender}`}
              >
                <div className="message-bubble">
                  <TypeAnimation
  sequence={[message.text]}
  speed={70}
  cursor={false}
/>
                </div>

                
              </div>

              
            ))}

          </div>

          {/* QUICK REPLIES */}

          <div className="synapse-prompts">

            {quickReplies.map((reply) => (
              <button
                key={reply.label}
                onClick={() =>
                  onPromptClick(reply.prompt)
                }
                className="synapse-prompt"
              >
                {reply.label}
              </button>
            ))}

          </div>

          {/* INPUT AREA */}

          <div className="chat-input-area">
  <input
    type="text"
    placeholder="Talk to Synapse..."
    className="chat-input"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        onSend();
      }
    }}
  />

  <button onClick={onSend} className="chat-send">
    ✦
  </button>
</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;