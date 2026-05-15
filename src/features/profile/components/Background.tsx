import { useEffect, useRef } from "react";
import { motion } from "framer-motion";


// ─── Animated orb ─────────────────────────────────────────────────────────────
interface OrbProps {
  className: string;
  delay?: number;
  duration?: number;
}
function Orb({ className, delay = 0, duration = 22 }: OrbProps) {
  return (
    <motion.div
      className={`profile-bg-orb ${className}`}
      aria-hidden="true"
      animate={{
        y: [0, -28, 12, -18, 0],
        x: [0, 14, -10, 18, 0],
        scale: [1, 1.06, 0.97, 1.04, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  );
}

// ─── Flowing wave layer (SVG) ─────────────────────────────────────────────────
function WaveLayer() {
  return (
    <div className="profile-bg-wave-wrap" aria-hidden="true">
      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="profile-bg-wave"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="var(--primary)" stopOpacity="0.04" />
            <stop offset="50%"  stopColor="var(--secondary)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="var(--secondary)" stopOpacity="0.03" />
            <stop offset="60%"  stopColor="var(--primary)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* back wave */}
        <motion.path
          d="M0,160 C240,100 480,220 720,160 C960,100 1200,200 1440,140 L1440,320 L0,320 Z"
          fill="url(#waveGrad1)"
          animate={{
            d: [
              "M0,160 C240,100 480,220 720,160 C960,100 1200,200 1440,140 L1440,320 L0,320 Z",
              "M0,180 C200,130 500,200 740,170 C980,140 1220,190 1440,160 L1440,320 L0,320 Z",
              "M0,160 C240,100 480,220 720,160 C960,100 1200,200 1440,140 L1440,320 L0,320 Z",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* front wave */}
        <motion.path
          d="M0,200 C320,150 640,240 960,190 C1120,165 1300,210 1440,180 L1440,320 L0,320 Z"
          fill="url(#waveGrad2)"
          animate={{
            d: [
              "M0,200 C320,150 640,240 960,190 C1120,165 1300,210 1440,180 L1440,320 L0,320 Z",
              "M0,215 C280,170 600,230 900,200 C1100,180 1320,220 1440,200 L1440,320 L0,320 Z",
              "M0,200 C320,150 640,240 960,190 C1120,165 1300,210 1440,180 L1440,320 L0,320 Z",
            ],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.svg>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ProfileBackground() {
  return (
    <div className="profile-bg-root" aria-hidden="true">
      {/* 1. Base gradient foundation */}
      <div className="profile-bg-base" />

      {/* 2. Soft radial glow — top centre */}
      <div className="profile-bg-glow-top" />

      {/* 3. Orbs — slow drifting pools of colour */}
      <Orb className="profile-bg-orb--a" delay={0}   duration={26} />
      <Orb className="profile-bg-orb--b" delay={4}   duration={22} />
      <Orb className="profile-bg-orb--c" delay={8}   duration={30} />

      {/* 5. Flowing wave horizon */}
      <WaveLayer />

      {/* 8. Vignette — darkens edges, pulls focus inward */}
      <div className="profile-bg-vignette" />
    </div>
  );
}