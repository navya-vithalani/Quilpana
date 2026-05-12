import React, { useState, useEffect } from "react";
import { Game } from "../types/types";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";
import { GAMES } from "../constants";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// Simple inline card for favorite games
const FavoriteGameCard: React.FC<{ game: Game }> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/player/${game.id}`)}
      className="
        flex
        items-center
        bg-gray-800
        p-3
        rounded-lg
        hover:bg-gray-700
        transition-colors
        cursor-pointer
      "
    >
      <img
        src={game.thumbnailUrl}
        alt={game.name}
        className="w-16 h-12 object-cover rounded-md mr-4"
      />

      <div>
        <h4 className="font-semibold text-gray-200">
          {game.name}
        </h4>

        <p className="text-sm text-gray-400">
          by {game.creator}
        </p>
      </div>
    </div>
  );
};

interface ProfilePageProps {
  favoriteGames?: Game[];
  totalUpvotes?: number;
  totalDownvotes?: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  favoriteGames: favoriteGameObjects = [],
  totalUpvotes = 0,
  totalDownvotes = 0
}) => {

  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState<"player" | "creator">("player");

  const [showFavorites, setShowFavorites] = useState(false);

  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {

    setLoading(true);

    const isLoggedIn =
      localStorage.getItem("quilpana-login-status");

    const savedUser =
      localStorage.getItem("quilpana-user");

    if (!isLoggedIn || !savedUser) {

      setProfile(null);

      setLoading(false);

      navigate("/login");

      return;
    }

    try {

      const parsedUser = JSON.parse(savedUser);

      setProfile(parsedUser);

    } catch (error) {

      console.error("Error loading profile:", error);

      setProfile(null);
    }

    setLoading(false);

  }, [navigate]);

  const {
    username,
    avatarUrl,
    points = 0,
    credits = 0,
    favoriteGames: favoriteGameIds = [],
    playerBadges = [],
    creatorBadges = [],
    hasCreated
  } = profile || {};

  // Use favorite games from props if available
  const favoriteGamesList =
    favoriteGameObjects.length > 0
      ? favoriteGameObjects
      : GAMES.filter(game =>
          favoriteGameIds.includes(game.id)
        );

  const resolvedAvatar =
    avatarUrl === "default" || !avatarUrl
      ? DEFAULT_AVATAR
      : avatarUrl;

  // Fake avatar upload using localStorage
  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setUploadingAvatar(true);

    try {

      // Fake upload delay because modern software apparently needs theatrics 🎭
      await new Promise(resolve =>
        setTimeout(resolve, 1200)
      );

      const imageUrl = URL.createObjectURL(file);

      const updatedProfile = {
        ...profile,
        avatarUrl: imageUrl
      };

      localStorage.setItem(
        "quilpana-user",
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);

      setShowAvatarPopup(false);

    } catch (error) {

      console.error(
        "Error uploading avatar:",
        error
      );

    } finally {

      setUploadingAvatar(false);

    }
  };

  const renderPlaceholderBadges = (count = 8) =>
    Array(count)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="
            w-16
            h-16
            rounded-full
            bg-gray-700
            animate-pulse
          "
        ></div>
      ));

  if (loading) {

    return (
      <div className="
        flex
        items-center
        justify-center
        min-h-[400px]
      ">
        <div className="text-gray-400 text-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {

    return (
      <div className="
        flex
        items-center
        justify-center
        min-h-[400px]
      ">
        <div className="text-gray-400 text-lg">
          No profile found.
        </div>
      </div>
    );
  }

  return (

    <div className="max-w-5xl mx-auto space-y-12">

      {/* Profile Header */}

      <div className="
        flex
        flex-col
        md:flex-row
        items-center
        md:items-start
        gap-6
        bg-gray-800
        rounded-xl
        shadow-lg
        p-8
      ">

        <div
          className="
            relative
            h-32
            w-32
            cursor-pointer
          "
          onClick={() => setShowAvatarPopup(true)}
        >

          <img
            src={resolvedAvatar}
            alt="Avatar"
            className="
              h-32
              w-32
              rounded-full
              ring-4
              ring-orange-500
              object-cover
            "
          />

        </div>

        <div className="
          flex-1
          space-y-2
          text-center
          md:text-left
        ">

          <h2 className="
            text-3xl
            font-bold
            text-gray-200
          ">
            {username || "User"}
          </h2>

          <div className="
            flex
            justify-center
            md:justify-start
            gap-6
            mt-4
          ">

            <Stat
              label="Upvotes"
              value={totalUpvotes}
              color="text-red-400"
            />

            <Stat
              label="Downvotes"
              value={totalDownvotes}
              color="text-blue-400"
            />

          </div>

        </div>

      </div>

      {/* Favorites */}

      <div>

        <button
          className="
            flex
            items-center
            gap-2
            text-left
            bg-purple-600
            hover:bg-purple-700
            px-4
            py-2
            rounded-lg
            font-semibold
            text-gray-200
            transition-colors
          "
          onClick={() =>
            setShowFavorites(!showFavorites)
          }
        >

          Favorites

          <span className="text-orange-400">
            {favoriteGamesList.length}
          </span>

          {showFavorites ? "▲" : "▼"}

        </button>

        {showFavorites && (

          <div className="
            mt-4
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          ">

            {favoriteGamesList.length === 0 ? (

              <p className="text-gray-400">
                You haven't added any favorites yet.
              </p>

            ) : (

              favoriteGamesList.map((game: Game) => (

                <FavoriteGameCard
                  key={game.id}
                  game={game}
                />

              ))

            )}

          </div>

        )}

      </div>

      {/* Badges */}

      <div>

        <div className="
          flex
          gap-4
          border-b-2
          border-gray-200
        ">

          <TabButton
            active={activeTab === "player"}
            label="Player"
            onClick={() =>
              setActiveTab("player")
            }
          />

          <TabButton
            active={activeTab === "creator"}
            label={`Creator ${hasCreated ? "" : "🔒"}`}
            disabled={!hasCreated}
            onClick={() =>
              hasCreated &&
              setActiveTab("creator")
            }
          />

        </div>

        {/* PLAYER TAB */}

        {activeTab === "player" && (

          <div className="
            justify-start
            mt-6
            space-y-6
          ">

            <Stat
              label="Points"
              value={points}
              color="text-green-400"
            />

            {playerBadges.length ? (

              <Carousel
                items={playerBadges}
                renderItem={(b) => (
                  <BadgeItem badge={b} />
                )}
                
              />

            ) : (

              <div className="
                flex
                gap-4
                flex-wrap
              ">
                {renderPlaceholderBadges()}
              </div>

            )}

          </div>

        )}

        {/* CREATOR TAB */}

        {activeTab === "creator" && (

          <div className="
            mt-6
            space-y-6
          ">

            <Stat
              label="Credits"
              value={credits}
              color="text-purple-400"
            />

            {creatorBadges.length ? (

              <Carousel
                items={creatorBadges}
                renderItem={(b) => (
                  <BadgeItem badge={b} />
                )}
              />

            ) : (

              <div className="
                flex
                gap-4
                flex-wrap
              ">
                {renderPlaceholderBadges()}
              </div>

            )}

          </div>

        )}

      </div>

      {/* AVATAR POPUP */}

      {showAvatarPopup && (

        <div className="
          fixed
          inset-0
          bg-black
          bg-opacity-60
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            bg-gray-800
            rounded-xl
            p-6
            w-80
            text-center
            space-y-6
          ">

            <img
              src={resolvedAvatar}
              alt="Avatar preview"
              className="
                w-40
                h-40
                mx-auto
                rounded-full
                object-cover
                ring-4
                ring-orange-500
              "
            />

            <label className="
              block
              cursor-pointer
              font-semibold
              text-orange-400
              hover:text-orange-300
              transition-colors
            ">

              {uploadingAvatar
                ? "Uploading..."
                : "Change Photo"}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
              />

            </label>

            <button
              onClick={() =>
                setShowAvatarPopup(false)
              }
              disabled={uploadingAvatar}
              className="
                block
                w-full
                bg-gray-700
                hover:bg-gray-600
                disabled:bg-gray-800
                disabled:cursor-not-allowed
                py-2
                rounded-lg
                font-semibold
                text-gray-200
                transition-colors
              "
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

const Stat = ({
  label,
  value,
  color
}: {
  label: string;
  value: number;
  color: string;
}) => (

  <div>

    <span className={`
      text-2xl
      font-bold
      ${color}
    `}>
      {value}
    </span>

    <p className="text-sm text-gray-400">
      {label}
    </p>

  </div>
);

const TabButton = ({
  active,
  label,
  onClick,
  disabled
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => (

  <button
    className={`
      px-4
      py-2
      font-semibold

      ${
        active
          ? "border-b-4 border-blue-400 text-blue-400"
          : "text-gray-400"
      }

      ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:text-gray-300"
      }
    `}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

const BadgeItem = ({
  badge
}: {
  badge: any
}) => (

  <div className="
    bg-gray-700
    p-4
    rounded-lg
    text-center
    font-medium
    text-gray-200
  ">
    {badge.name}
  </div>
);

export default ProfilePage;