import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  UpArrowIcon,
  DownArrowIcon,
  SkillIcon,
} from "./Icons";
import DropdownMenu from "./DropdownMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TOTAL_VOTE_QUOTA,
  TOTAL_SKILL_GAMES_QUOTA,
} from "../constants";
import { useRef, useLayoutEffect } from "react";

type PlayerHeaderProps = {
  upvotesLeft: number;
  totalDownvotes: number;
  numFavorites: number;
  skillGamesLeft: number;
  onLogin: () => void;
  onLogout: () => void;
  onOpenPremiumModal: () => void;
};

const StatItem: React.FC<{
  icon: React.ReactNode;
  value: string | number;
  label: string;
  onClick?: () => void;
}> = ({ icon, value, label, onClick }) => (
  <div
    title={label}
    onClick={onClick}
    className={`
      qp-stat-item
      ${onClick ? "cursor-pointer" : ""}
    `}
  >
    {icon}

    <span className="font-semibold text-sm">
      {value}
    </span>
  </div>
);

const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  upvotesLeft,
  totalDownvotes,
  numFavorites,
  skillGamesLeft,
  onLogin,
  onLogout,
  onOpenPremiumModal,
}) => {
  
const navigate = useNavigate();

const headerRef = useRef<HTMLElement | null>(null);

 useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const header = headerRef.current;
  if (!header) return;

  ScrollTrigger.create({
    trigger: header,
    start: "top top",
    end: "+=500",
    onEnter: () => header.classList.add("shrunk"),
    onLeaveBack: () => header.classList.remove("shrunk"),
  });

  ScrollTrigger.create({
  trigger: header,
  start: "top top",
  end: "+=200", // scroll distance for transition (tweak this)
  scrub: true,

  onUpdate: (self) => {
    const p = self.progress; // 0 → 1

    // header height morph
    header.style.height = `${220 - p * 140}px`;

    // logo shrink
    const logo = header.querySelector(".qp-logo") as HTMLElement | null;
    logo?.style.setProperty("transform", `scale(${1 - p * 0.3})`);

    // title fade out
    const title = header.querySelector(".qp-header-title") as HTMLElement | null;
    if (title) {
      title.style.opacity = `${1 - p * 1.2}`;
    }

    // subtitle fade out
    const subtitle = header.querySelector(".qp-header-subtitle") as HTMLElement | null;
    if (subtitle) {
      subtitle.style.opacity = `${1 - p * 1.5}`;
    }
  },
});

}, []);

  return (
    <header ref={headerRef} className="qp-header bg-player-hero">

      <div className="qp-header-inner">

        {/* LEFT */}
        <div
            onClick={() => navigate("/")}
            className="qp-logo-group group"
          >
            <img
      src="/logo.png"
      className="qp-logo"
      alt="logo"
    />
    </div>

        {/* CENTER */}
        <div className="flex flex-col items-center">

          
            <h1 className="
              qp-header-title
            ">
              Explore Games
            </h1>

            <p className="qp-header-subtitle text-gray-500">
              Dive into a universe of player-created games
            </p>

          {/* STATS */}
          <div className="qp-pill-container mt-4">

            <StatItem
              icon={<UpArrowIcon className="w-5 h-5 text-green-500" />}
              value={`${TOTAL_VOTE_QUOTA - upvotesLeft}/${TOTAL_VOTE_QUOTA}`}
              label="Upvotes Used"
              onClick={onOpenPremiumModal}
            />

            <StatItem
              icon={<DownArrowIcon className="w-5 h-5 text-red-500" />}
              value={totalDownvotes}
              label="Downvotes"
            />

            <StatItem
              icon={<HeartIcon className="w-4 h-4 text-orange-500 fill-current" />}
              value={numFavorites}
              label="Favorites"
            />

            <StatItem
              icon={<SkillIcon className="w-5 h-5 text-indigo-500" />}
              value={`${skillGamesLeft}/${TOTAL_SKILL_GAMES_QUOTA}`}
              label="Skill Games Left"
              onClick={onOpenPremiumModal}
            />

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 w-[120px] justify-end">

          <button
            onClick={() => navigate("/creator")}
            className="qp-switch-button border-orange-400 text-orange-500 hover:bg-orange-500"
          >
            Create
          </button>

          <DropdownMenu
            isLoggedIn={false}
            onLogin={onLogin}
            onLogout={onLogout}
            onOpenPremiumModal={onOpenPremiumModal}
          />

        </div>

      </div>

    </header>
  );
};

export default PlayerHeader;