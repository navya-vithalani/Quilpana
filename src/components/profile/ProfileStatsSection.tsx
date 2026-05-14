// src/components/profile/ProfileStatsSection.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { ProfileStatPill } from "./ProfileStatPill";
import { MOCK_PLAYER_STATS } from "../../features/profile/mockProfileData";

const PLAYER_STAT_DEFS = [
  {
    icon: "💡",
    label: "Ideas Posted",
    dataKey: "ideasPosted" as const,
    modalTitle: "Ideas Posted",
  },
  {
    icon: "🎮",
    label: "Games Played",
    dataKey: "gamesPlayed" as const,
    modalTitle: "Games Played",
  },
  {
    icon: "↑",
    label: "Upvotes Given",
    dataKey: "upvotesGiven" as const,
    modalTitle: "Upvotes Given",
  },
  {
    icon: "✦",
    label: "Sparked Ideas",
    dataKey: "sparkedIdeas" as const,
    modalTitle: "Sparked Ideas",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ProfileStatsSection: React.FC = () => {
  return (
    <motion.div
      className="profile-stats-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {PLAYER_STAT_DEFS.map((def) => {
        const data = MOCK_PLAYER_STATS[def.dataKey];
        return (
          <motion.div key={def.dataKey} variants={cardVariants}>
            <ProfileStatPill
              icon={def.icon}
              label={def.label}
              count={data.count}
              modalTitle={def.modalTitle}
              items={data.items}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProfileStatsSection;