// src/components/profile/SettingsModal.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToggleRowProps {
  label: string;
  sub?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, sub, value, onChange }) => (
  <div
    className="profile-settings-item"
    onClick={() => onChange(!value)}
    role="switch"
    aria-checked={value}
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onChange(!value)}
  >
    <div>
      <div className="profile-settings-item-label">{label}</div>
      {sub && <div className="profile-settings-item-sub">{sub}</div>}
    </div>
    <button
      className={`profile-toggle-switch ${value ? "on" : "off"}`}
      onClick={(e) => { e.stopPropagation(); onChange(!value); }}
      aria-label={label}
    >
      <div className="profile-toggle-thumb" />
    </button>
  </div>
);

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // TODO: Load notification preferences from backend/user settings
  const [notifActivity, setNotifActivity] = useState(true);
  const [notifFeedback, setNotifFeedback] = useState(true);
  const [notifSpark, setNotifSpark]       = useState(false);
  const [notifWeekly, setNotifWeekly]     = useState(true);

  const handleLogout = () => {
    // TODO: Call auth signout endpoint
    // TODO: Clear auth tokens / session
    // TODO: Invalidate cached user state
    onClose();
    navigate("/login");
  };

  const handleChangePassword = () => {
    // TODO: Trigger change-password flow (email link or modal)
    console.log("Change password (mock)");
  };

  const handleDeleteAccount = () => {
    // TODO: Show confirmation dialog before deletion
    // TODO: Call backend delete account endpoint
    console.log("Delete account (mock — no-op)");
  };

  return (
    <ProfileModal isOpen={isOpen} onClose={onClose} title="Settings" maxWidth={420}>
      {/* Notifications group */}
      <div className="profile-settings-group">
        <div style={{ padding: "14px 28px 6px" }}>
          <span className="profile-section-label">Notifications</span>
        </div>

        <ToggleRow
          label="Activity alerts"
          sub="Plays, upvotes on your games"
          value={notifActivity}
          onChange={setNotifActivity}
        />
        <div className="profile-modal-divider" />
        <ToggleRow
          label="Feedback received"
          sub="When someone leaves feedback"
          value={notifFeedback}
          onChange={setNotifFeedback}
        />
        <div className="profile-modal-divider" />
        <ToggleRow
          label="Spark activity"
          sub="Replies and sparks on your ideas"
          value={notifSpark}
          onChange={setNotifSpark}
        />
        <div className="profile-modal-divider" />
        <ToggleRow
          label="Weekly digest"
          sub="A summary of your week on Quilpana"
          value={notifWeekly}
          onChange={setNotifWeekly}
        />
      </div>

      {/* Account group */}
      <div className="profile-settings-group" style={{ marginTop: 8 }}>
        <div style={{ padding: "14px 28px 6px" }}>
          <span className="profile-section-label">Account</span>
        </div>

        <div className="profile-settings-item" onClick={handleChangePassword} role="button" tabIndex={0}>
          <div>
            <div className="profile-settings-item-label">Change Password</div>
            <div className="profile-settings-item-sub">Send a reset link to your email</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2.5L9.5 7 5 11.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="profile-modal-divider" />

        <div
          className="profile-settings-item profile-settings-item-danger"
          onClick={handleLogout}
          role="button"
          tabIndex={0}
        >
          <div className="profile-settings-item-label">Log Out</div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9.5 5L12 7.5 9.5 10M12 7.5H5M7 2H2.5A1 1 0 001.5 3v8a1 1 0 001 1H7" stroke="rgba(255,105,105,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="profile-modal-divider" />

        <div
          className="profile-settings-item profile-settings-item-danger"
          onClick={handleDeleteAccount}
          role="button"
          tabIndex={0}
          style={{ opacity: 0.6 }}
        >
          <div>
            <div className="profile-settings-item-label">Delete Account</div>
            <div className="profile-settings-item-sub">This action is permanent and irreversible</div>
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />
    </ProfileModal>
  );
};

export default SettingsModal;