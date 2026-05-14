// src/components/profile/ProfileHero.tsx
import React from "react";
import { motion } from "framer-motion";
import { UserProfile } from "../../features/profile/mockProfileData";

interface ProfileHeroProps {
  user: UserProfile;
  isOwnProfile: boolean;
  onEditClick: () => void;
  onSettingsClick: () => void;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({
  user,
  isOwnProfile,
  onEditClick,
  onSettingsClick,
}) => {
  const visibleTags = user.tags.slice(0, 9);

  return (
    <motion.div
      className="profile-glass profile-hero"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ── LEFT: Avatar + Points ─────────────────── */}
      <div className="profile-hero-left">
        <div className="profile-avatar-ring">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="profile-avatar"
            onError={(e) => {
              // fallback initials placeholder handled by CSS bg
              (e.target as HTMLImageElement).style.opacity = "0";
            }}
          />
        </div>
        </div>

      {/* ── RIGHT: Info ───────────────────────────── */}
      <div className="profile-hero-right">
        <div className="profile-hero-top">
          <div className="profile-names">
            <h1 className="profile-display-name">{user.displayName}</h1>
            <span className="profile-username">@{user.username}</span>
          </div>

          {/* Controls — only for own profile */}
          {isOwnProfile && (
            <div className="profile-hero-controls">
              <motion.button
                className="profile-icon-btn"
                onClick={onEditClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Edit profile"
                aria-label="Edit profile"
              >
                {/* Pencil icon */}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M10.5 1.5l3 3L4 14H1v-3L10.5 1.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.button
                className="profile-icon-btn"
                onClick={onSettingsClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Settings"
                aria-label="Settings"
              >
                {/* Gear icon */}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path
                    d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.9 2.9l1.06 1.06M11.04 11.04l1.06 1.06M2.9 12.1l1.06-1.06M11.04 3.96l1.06-1.06"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="profile-status-row">
          <div className="profile-status-dot" />
          <span className="profile-status-text">{user.status}</span>
          <span className="profile-status-text" style={{ opacity: 0.70 }}>·</span>
          <span className="profile-status-text">Since {user.joinedDate}</span>
        </div>


        {/* Tags */}
        <div className="profile-pills-row">
          {visibleTags.map((tag) => (
            <span key={tag} className="profile-pill profile-pill-tag">
              {tag}
            </span>
          ))}
          {user.tags.length > 9 && (
            <span className="profile-pill profile-pill-tag" style={{ opacity: 0.5 }}>
              +{user.tags.length - 9}
            </span>
          )}
        </div>
        <div className="profile-stats-grid">
        <div className="profile-main-stats">
          ✦ {user.points.toLocaleString()} pts
        </div>

        {/* Creator-only pills below avatar */}
        {user.isCreator && (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span className="profile-main-stats">
              ◎ {user.credits.toLocaleString()} credits
            </span>
            <span className="profile-main-stats">
              ↑ {user.followers} followers
            </span>
          </div>
        )}
        </div>
      </div>
       
    </motion.div>
  );
};

export default ProfileHero;