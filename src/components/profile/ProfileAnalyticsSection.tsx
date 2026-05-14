// src/components/profile/ProfileAnalyticsSection.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { ProfileStatPill } from "./ProfileStatPill";
import { MOCK_CREATOR_STATS } from "../../features/profile/mockProfileData";

const CREATOR_STAT_DEFS = [
  {
    icon: "▶",
    label: "Total Plays",
    dataKey: "totalPlays" as const,
    modalTitle: "Total Plays by Game",
  },
  {
    icon: "↑",
    label: "Total Upvotes",
    dataKey: "totalUpvotes" as const,
    modalTitle: "Upvotes by Game",
  },
  {
    icon: "◎",
    label: "Total Feedback",
    dataKey: "totalFeedback" as const,
    modalTitle: "Feedback Received",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ProfileAnalyticsSection: React.FC = () => {
  return (
    <motion.div
      className="profile-stats-grid"
      style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {CREATOR_STAT_DEFS.map((def) => {
        const data = MOCK_CREATOR_STATS[def.dataKey];
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

export default ProfileAnalyticsSection;