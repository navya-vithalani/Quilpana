import React from "react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}

      className={`
        synapse-bubble
        h-screen
        z-50
        hidden
        md:flex
        items-center
        transition-all
        duration-700
      `}

      initial={{
        opacity: 0,
        x: 100,
      }}

      animate={{
        opacity: 1,
        x: 0,
      }}

      transition={{
        duration: 0.5,
        delay: 1.3,
        ease: "easeOut",
      }}

      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <img
        src="/synapse.png"
        alt="Synapse"
        className="synapse-avatar"
      />

      <div className="synapse-hover-text">
        Chat with Synapse
      </div>
    </motion.button>
  );
};

export default ChatBubble;