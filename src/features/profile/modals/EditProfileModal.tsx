// src/components/profile/EditProfileModal.tsx
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import { UserProfile } from "../mockProfileData";

const ALL_TAGS = [
  "Game Design", "UI", "Storytelling", "Psychology", "Animation",
  "Audio", "Physics", "Worldbuilding", "Systems", "Narrative",
  "Puzzle", "Exploration", "Experimental", "AI", "Mechanics",
];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [username, setUsername] = useState(user.username);
  const [selectedTags, setSelectedTags] = useState<string[]>(user.tags);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    // TODO: Call backend API to update profile
    // TODO: Upload avatar image if changed
    // TODO: Persist changes to database
    // TODO: Invalidate/refetch user profile cache
    console.log("Profile save (mock):", { username, selectedTags });
    onClose();
  };

  return (
    <ProfileModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      maxWidth={480}
    >
      <div className="profile-edit-form">
        {/* Avatar upload */}
        <div className="profile-edit-avatar-area">
          {/* TODO: Wire up file input for actual image upload */}
          <img
            src={user.avatar}
            alt="avatar"
            className="profile-edit-avatar-btn"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
          />
          <span className="profile-edit-avatar-hint">Click to change photo</span>
        </div>

        {/* Username */}
        <div className="profile-edit-field">
          <label className="profile-edit-label">Username</label>
          <input
            className="profile-edit-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your.handle"
            maxLength={32}
          />
        </div>


        {/* Tags */}
        <div className="profile-edit-field">
          <label className="profile-edit-label">Interests & Skills</label>
          <div className="profile-edit-tags">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                className={`profile-edit-tag ${selectedTags.includes(tag) ? "selected" : ""}`}
                onClick={() => toggleTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="profile-edit-actions">
        <button className="profile-edit-cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="profile-edit-save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </ProfileModal>
  );
};

export default EditProfileModal;