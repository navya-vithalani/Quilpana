// src/components/profile/ProfileFocusCard.tsx
import React from "react";
import { motion } from "framer-motion";

interface ProfileFocusCardProps {
  label: string;
  text: string;
}

const ProfileFocusCard: React.FC<ProfileFocusCardProps> = ({ label, text }) => {
  return (
    <motion.div
      className="profile-focus-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.008 }}
    >
      {/* Animated glowing border via CSS pseudo-elements */}
      <div className="profile-focus-border" />
      <div className="profile-focus-glow" />

      {/* Floating label at top edge of border */}
      <div className="profile-focus-label-wrap">
        <span className="profile-focus-label">{label}</span>
      </div>

      <p className="profile-focus-text">"{text}"</p>
    </motion.div>
  );
};

export default ProfileFocusCard;