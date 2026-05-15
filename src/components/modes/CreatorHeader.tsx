import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CodeIcon,
  BrainIcon,
} from "../Icons";
import DropdownMenu from "../DropdownMenu";

type CreatorHeaderProps = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onOpenPremiumModal: () => void;
  onOpenUploadModal: () => void;
};

const CreatorHeader: React.FC<CreatorHeaderProps> = ({
  onLogin,
  onLogout,
  onOpenPremiumModal,
  onOpenUploadModal,
}) => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const header = headerRef.current;
  if (!header) return;

  ScrollTrigger.create({
    trigger: header,
    start: "top -100",
    end: "+=500",
    onEnter: () => header.classList.add("shrunk"),
    onLeaveBack: () => header.classList.remove("shrunk"),
  });

}, []);

  return (
    <header ref={headerRef} className="qp-header creator-hero-bg">

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
              QUILPANA
            </h1>

            <p className="qp-header-subtitle text-gray-400">
              Possibility to Reality
            </p>

          {/* ACTIONS */}
          <div className="qp-pill-container mt-4">

            <button
              onClick={onOpenUploadModal}
              className="qp-action-button bg-gray-700 hover:bg-gray-600 text-white"
            >
              <CodeIcon className="w-5 h-5" />

              <span>
                Upload Code
              </span>
            </button>

            <button
              onClick={onOpenPremiumModal}
              className="
                qp-action-button
                bg-gradient-to-r
                from-blue-500
                to-violet-600
                text-white
              "
            >
              <BrainIcon className="w-5 h-5" />

              <span>
                Use SynAI
              </span>
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 w-[120px] justify-end">

          <button
            onClick={() => navigate("/player")}
            className="qp-switch-button border-indigo-500 text-indigo-400 hover:bg-indigo-500"
          >
            Play
          </button>

          <DropdownMenu />

        </div>

      </div>

    </header>
  );
};

export default CreatorHeader;