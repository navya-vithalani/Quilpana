// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import ProfileHero from "./components/Hero";
import ProfileModeToggle from "./components/ModeToggle";
import PlayerModeSection from "./components/PlayerSection";
import CreatorModeSection from "./components/CreatorSection";
import ProfileBadges from "./components/Badges";
import EditProfileModal from "./modals/EditProfileModal";
import SettingsModal from "./modals/SettingsModal";
import { ProfileBackground } from "./components/Background"

// Data
import {
  UserProfile,
  MOCK_CURRENT_USER,
  MOCK_OTHER_USER,
} from "./mockProfileData";

// Styles
import "./profile.css";

// ─────────────────────────────────────────────────────────
// AUTH HELPERS  (all mocked — replace with real auth)
// ─────────────────────────────────────────────────────────

// TODO: Replace with real auth provider check (Supabase, Firebase, JWT, etc.)
async function checkAuth(): Promise<boolean> {
  // Simulated network delay
  await new Promise((r) => setTimeout(r, 120));
  // TODO: Validate session/token here
  return true; // always authenticated in mock
}

// TODO: Fetch actual user by ID from backend
async function fetchUserById(id: string): Promise<UserProfile | null> {
  await new Promise((r) => setTimeout(r, 80));
  // Mock: return other user for any ID that isn't "me"
  if (id === MOCK_CURRENT_USER.id) return MOCK_CURRENT_USER;
  return MOCK_OTHER_USER;
}

// ─────────────────────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────────────────────

const Divider: React.FC = () => <hr className="profile-divider" />;

// ─────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Derived: are we on /profile/me or /profile/:id?
  // TODO: Compare id against actual authenticated user ID from auth context
  const isOwnProfile = !id || id === "me";

  // ── State ──────────────────────────────────────────────
  const [authChecked, setAuthChecked]   = useState(false);
  const [user, setUser]                 = useState<UserProfile | null>(null);
  const [mode, setMode]                 = useState<"player" | "creator">("player");
  const [showEdit, setShowEdit]         = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // ── Auth + user load ───────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // TODO: Use auth context / hook instead of calling checkAuth() here
      const authed = await checkAuth();

      if (!authed) {
        // TODO: Route protection — redirect to login with return URL
        navigate("/login", { replace: true });
        return;
      }

      let profile: UserProfile;

      if (isOwnProfile) {
        // TODO: Fetch currently authenticated user from backend
        profile = MOCK_CURRENT_USER;
      } else {
        // TODO: Fetch user by id param from backend
        const fetched = await fetchUserById(id!);
        if (!fetched) {
          navigate("/404", { replace: true });
          return;
        }
        profile = fetched;
      }

      if (!cancelled) {
        setUser(profile);

        // For /profile/:id always show creator mode (view-only)
        if (!isOwnProfile) setMode("creator");

        setAuthChecked(true);
      }
    })();

    return () => { cancelled = true; };
  }, [id, isOwnProfile, navigate]);

  // ── Loading state ──────────────────────────────────────
  if (!authChecked || !user) {
    return (
      <div className="profile-page">
        <ProfileBackground />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            color: "rgba(255,255,255,0.35)",
            fontSize: 13,
            letterSpacing: "0.1em",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦ loading
          </motion.span>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────
  return (
    <div className="profile-page-root">
      <ProfileBackground />

      <div className="profile-content">

        {/* ── HERO ──────────────────────────────────── */}
        <ProfileHero
          user={user}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setShowEdit(true)}
          onSettingsClick={() => setShowSettings(true)}
        />

        <Divider />

        {/* ── MODE TOGGLE (own profile only) ────────── */}
        {isOwnProfile && (
          <>
            <ProfileModeToggle
              mode={mode}
              onChange={setMode}
              isCreator={user.isCreator}
            />
            <Divider />
          </>
        )}

        {/* ── MODE SECTIONS (animated swap) ─────────── */}
        <AnimatePresence mode="wait">
          {mode === "player" ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PlayerModeSection user={user} />
            </motion.div>
          ) : (
            <motion.div
              key="creator"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CreatorModeSection user={user} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BADGES (own profile only) ─────────────── */}
        {isOwnProfile && (
          <>
            <Divider />
            <ProfileBadges />
          </>
        )}
      </div>

      {/* ── MODALS ──────────────────────────────────── */}
      {isOwnProfile && (
        <>
          <EditProfileModal
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            user={user}
          />
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePage;