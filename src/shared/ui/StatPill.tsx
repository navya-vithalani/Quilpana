import { useState } from "react";
import { motion } from "framer-motion";
import ProfileModal from "../../features/profile/modals/ProfileModal";
import type { StatModalItem } from "../../features/profile/mockProfileData";

interface ProfileStatCardProps {
  icon: string;
  label: string;
  count: number | string;
  modalTitle: string;
  items: StatModalItem[];
}

export function ProfileStatPill({
  icon,
  label,
  count,
  modalTitle,
  items,
}: ProfileStatCardProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.div
        className="profile-stat-pill"
        onClick={() => setOpen(true)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -2, scale: 1.012 }}
        whileTap={{ scale: 0.975, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        aria-label={`${label}: ${count}. Click to view details.`}
      >
        {/* Animated accent stripe */}
        <motion.div
          className="profile-stat-pill__stripe"
          animate={{ opacity: hovered ? 1 : 0.45, scaleY: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.22 }}
        />

        {/* Left: icon + label */}
        <div className="profile-stat-pill__left">
          <motion.span
            className="profile-stat-pill__icon"
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            aria-hidden="true"
          >
            {icon}
          </motion.span>
          <span className="profile-stat-pill__label">{label}</span>
        </div>

        {/* Separator dot */}
        <motion.span
          className="profile-stat-pill__dot"
          animate={{ opacity: hovered ? 0.7 : 0.25 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        />

        {/* Right: count + chevron */}
        <div className="profile-stat-pill__right">
          <motion.span
            className="profile-stat-pill__count"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
          >
            {typeof count === "number" ? count.toLocaleString() : count}
          </motion.span>
          <motion.svg
            className="profile-stat-pill__chevron"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ x: hovered ? 2 : 0, opacity: hovered ? 0.85 : 0.3 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <path
              d="M3 2L7 5L3 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        {/* Hover glow layer */}
        <motion.div
          className="profile-stat-pill__glow"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          aria-hidden="true"
        />
      </motion.div>

      <ProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        maxWidth={520}
        showFooterClose
      >
        <div className="profile-stat-pill-modal-list">
          {items.length === 0 ? (
            <p className="profile-stat-pill-modal-empty">Nothing here yet.</p>
          ) : (
            items.map((item, idx) => (
              <motion.div
                key={idx}
                className="profile-stat-pill-modal-item"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.045, duration: 0.3 }}
              >
                <span className="profile-stat-pill-modal-serial">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="profile-stat-pill-modal-img"
                    aria-hidden="true"
                  />
                )}
                <div className="profile-stat-pill-modal-text">
                  <span className="profile-stat-pill-modal-title">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="profile-stat-pill-modal-subtitle">
                      {item.subtitle}
                    </span>
                  )}
                  {item.pills && item.pills.length > 0 && (
                    <div className="profile-stat-pill-modal-pills">
                      {item.pills.map((pill, pi) => (
                        <span
                          key={pi}
                          className={`profile-pill profile-pill--${pill.variant}`}
                        >
                          {pill.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </ProfileModal>
    </>
  );
}