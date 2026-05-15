// src/components/profile/ProfileGameCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Game } from "../../features/profile/mockProfileData";

interface ProfileGameCardProps {
  game: Game;
  showCreator?: boolean;
}

const ProfileGameCard: React.FC<ProfileGameCardProps> = ({
  game,
  showCreator = true,
}) => {
  return (
    <motion.div
      className="profile-game-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative" }}>
        <img
          src={game.thumbnail}
          alt={game.title}
          className="profile-game-thumb"
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            const placeholder = el.nextSibling as HTMLElement;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />
        {/* Fallback placeholder */}
        <div className="profile-game-thumb-placeholder" style={{ display: "none" }}>
          🎮
        </div>
</div>
      {/* Info */}
      <div className="profile-game-info">
        <div className="profile-game-title">{game.title}</div>
        <div className="profile-game-meta">{game.genre}</div>
        {showCreator && (
          <div className="profile-game-meta" style={{ marginTop: 2 }}>
            by {game.creator}
          </div>
        )}
        <div className="profile-game-meta" style={{ marginTop: 2 }}>
          {(game.plays / 1000).toFixed(1)}k plays
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileGameCard;