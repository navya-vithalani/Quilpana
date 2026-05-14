// src/components/profile/PlayerModeSection.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import ProfileStatsSection from "./ProfileStatsSection";
import ProfileFocusCard from "./ProfileFocusCard";
import Carousel from "../Carousel";
import ProfileGameCard from "./ProfileGameCard";
import {
  MOCK_FAVORITE_GAMES,
  UserProfile,
} from "../../features/profile/mockProfileData";

interface PlayerModeSectionProps {
  user: UserProfile;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
};

const PlayerModeSection: React.FC<PlayerModeSectionProps> = ({ user }) => {
  return (
    <motion.div
      className="profile-section"
      key="player-mode"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {/* ── 2. Stats Grid ───────────────────────── */}
      <motion.div variants={sectionVariants}>
        <span className="profile-section-label" style={{ display: "block", marginBottom: 12 }}>
          Player Stats
        </span>
        <div className="stats-grid">
        <ProfileStatsSection />
        </div>
      </motion.div>

      {/* ── 3. Current Obsession / Focus Card ───── */}
      <motion.div variants={sectionVariants}>
        <ProfileFocusCard
          label={user.currentFocusSubtitle}
          text={user.currentFocus}
        />
      </motion.div>

      {/* ── 4. Favourite Games Carousel ─────────── */}
      <motion.div variants={sectionVariants}>
        <div className="profile-glass" style={{ padding: "24px 0 20px" }}>
          <div style={{ padding: "0 28px 16px" }}>
            <span className="profile-section-label">Favourite Games</span>
          </div>

          <Carousel cardWidth={200} >
            {MOCK_FAVORITE_GAMES.map((game) => (
              <ProfileGameCard key={game.id} game={game} showCreator />
            ))}
          </Carousel>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlayerModeSection;