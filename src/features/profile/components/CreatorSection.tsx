// src/components/profile/CreatorModeSection.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import ProfileAnalyticsSection from "./AnalyticsSection";
import ProfileFocusCard from "../../../shared/ui/FocusCard";
import Carousel from "../../../shared/ui/Carousel";
import ProfileGameCard from "../../../shared/ui/GameCard";
import {
  MOCK_CREATED_GAMES,
  UserProfile,
} from "../mockProfileData";

interface CreatorModeSectionProps {
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

const CreatorModeSection: React.FC<CreatorModeSectionProps> = ({ user }) => {
  return (
    <motion.div
      className="profile-section"
      key="creator-mode"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {/* ── 2. Creator Stat Cards ───────────────── */}
      <motion.div variants={sectionVariants}>
        <span className="profile-section-label" style={{ display: "block", marginBottom: 12 }}>
          Creator Analytics
        </span>
        <ProfileAnalyticsSection />
      </motion.div>

      {/* ── 3. Creator Focus Card ───────────────── */}
      {user.creatorFocus && (
        <motion.div variants={sectionVariants}>
          <ProfileFocusCard
            label={user.creatorFocusSubtitle}
            text={user.creatorFocus}
          />
        </motion.div>
      )}

      {/* ── 4. Created Games Carousel ───────────── */}
      <motion.div variants={sectionVariants}>
        <div style={{ padding: "24px 0 20px" }}>
          <div style={{ padding: "0 28px 16px" }}>
            <span style={{ fontSize: "24px"}}>Created Games</span>
          </div>

          <Carousel cardWidth={200}>
            {MOCK_CREATED_GAMES.map((game) => (
              <ProfileGameCard key={game.id} game={game} showCreator={false} />
            ))}
          </Carousel>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreatorModeSection;