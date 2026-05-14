// src/components/profile/ProfileBadges.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "../Carousel";
import ProfileModal from "./ProfileModal";
import { Badge, MOCK_BADGES } from "../../features/profile/mockProfileData";

const ProfileBadges: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <>
      <div style={{ padding: "24px 0 20px" }}>
        <div style={{ padding: "0 28px 16px" }}>
          <span className="profile-section-label">Badges</span>
        </div>

        <Carousel cardWidth={100}>
          {MOCK_BADGES.map((badge) => (
            <motion.div
              key={badge.id}
              className="profile-badge-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedBadge(badge)}
            >
              <div
                className={`profile-badge-icon-wrap ${badge.unlocked ? "unlocked" : "locked"}`}
                style={
                  badge.unlocked
                    ? {
                        background: `${badge.color}22`,
                        border: `1px solid ${badge.color}55`,
                      }
                    : undefined
                }
              >
                {/* Glow behind unlocked badge */}
                {badge.unlocked && (
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: 20,
                      background: `${badge.color}33`,
                      filter: "blur(10px)",
                      zIndex: 0,
                    }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1, fontSize: 26 }}>
                  {badge.unlocked ? badge.icon : "🔒"}
                </span>
              </div>
              <span className={`profile-badge-name ${badge.unlocked ? "" : "locked"}`}>
                {badge.title}
              </span>
            </motion.div>
          ))}
        </Carousel>
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <ProfileModal
            isOpen={!!selectedBadge}
            onClose={() => setSelectedBadge(null)}
            title={selectedBadge.title}
            maxWidth={380}
            showFooterClose
          >
            <div style={{ padding: "28px 28px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Icon */}
              <div
                className="profile-badge-modal-icon"
                style={
                  selectedBadge.unlocked
                    ? {
                        background: `${selectedBadge.color}22`,
                        border: `1px solid ${selectedBadge.color}55`,
                        boxShadow: `0 0 24px ${selectedBadge.color}33`,
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        filter: "grayscale(1)",
                        opacity: 0.5,
                      }
                }
              >
                {selectedBadge.unlocked ? selectedBadge.icon : "🔒"}
              </div>

              {/* Status */}
              <div
                className="profile-badge-modal-status"
                style={{
                  color: selectedBadge.unlocked
                    ? selectedBadge.color
                    : "rgba(255,255,255,0.3)",
                }}
              >
                {selectedBadge.unlocked ? `✓ Unlocked ${selectedBadge.unlockedDate ?? ""}` : "Locked"}
              </div>

              {/* Description */}
              <p className="profile-badge-modal-desc">{selectedBadge.description}</p>

              {/* Unlock condition */}
              <div className="profile-badge-modal-condition">
                <span style={{ color: "rgba(255,255,255,0.35)", marginRight: 6 }}>Condition:</span>
                {selectedBadge.unlockCondition}
              </div>
            </div>
          </ProfileModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileBadges;