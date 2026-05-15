// src/components/profile/ProfileModeToggle.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Mode = "player" | "creator";

interface ProfileModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  isCreator: boolean; // if false, locks toggle to player
}

const ProfileModeToggle: React.FC<ProfileModeToggleProps> = ({
  mode,
  onChange,
  isCreator,
}) => {
  const playerRef = useRef<HTMLButtonElement>(null);
  const creatorRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Measure button positions to drive the sliding indicator precisely
  useEffect(() => {
    const btn = mode === "player" ? playerRef.current : creatorRef.current;
    if (!btn) return;
    setIndicatorStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [mode]);

  const handleClick = (next: Mode) => {
    // TODO: if !isCreator and next === "creator", show toast: "Become a creator to unlock this"
    if (!isCreator && next === "creator") return;
    onChange(next);
  };

  return (
    <div className="profile-mode-toggle-wrap">
      <div className="profile-mode-toggle">
        <div className="profile-toggle-track">
          {/* Sliding indicator */}
          <motion.div
            className="profile-toggle-indicator"
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          />

          {/* Player button */}
          <button
            ref={playerRef}
            className={`profile-toggle-btn ${mode === "player" ? "active" : "inactive"}`}
            onClick={() => handleClick("player")}
          >
            {/* Controller icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3.5" width="12" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M4 7h2M5 6v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="9.5" cy="7" r="0.75" fill="currentColor"/>
            </svg>
            Player
          </button>

          {/* Creator button */}
          <button
            ref={creatorRef}
            className={`profile-toggle-btn ${mode === "creator" ? "active" : "inactive"} ${
              !isCreator ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handleClick("creator")}
            style={!isCreator ? { opacity: 0.4 } : {}}
            title={!isCreator ? "Become a creator to unlock this mode" : undefined}
          >
            {/* Wand/sparkle icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L9 5M9 5l1.5-1.5M9 5l-1.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 2l.4 1L12.8 3.4l-1.4.4-.4 1.4-.4-1.4L9.2 3.4l1.4-.4L11 2z" fill="currentColor"/>
            </svg>
            Creator
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModeToggle;