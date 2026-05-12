// pages/PlaceholderPage.tsx

import React from "react";
import { motion } from "framer-motion";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = "This page is still under construction. Good things take time. Unfortunately so do React refactors.",
}) => {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        bg-[var(--bg-main)]
        overflow-hidden
        relative
      "
    >
      {/* Ambient blobs */}

      <div className="absolute top-[-120px] left-[-100px] w-[360px] h-[360px] rounded-full bg-[rgba(140,122,230,0.18)] blur-3xl animate-drift"></div>

      <div className="absolute bottom-[-140px] right-[-100px] w-[320px] h-[320px] rounded-full bg-[rgba(142,218,229,0.14)] blur-3xl animate-drift"></div>

      {/* Content */}

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          max-w-2xl
          w-full
          rounded-[2.5rem]
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-[0_20px_80px_rgba(0,0,0,0.18)]
          px-10
          py-16
          text-center
        "
      >
        {/* Tiny label */}

        <p className="uppercase tracking-[0.35em] text-sm text-[var(--text-soft)] mb-6">
          Quilpana
        </p>

        {/* Main title */}

        <h1 className="text-5xl md:text-6xl font-black text-[var(--text-main)] leading-tight">
          {title}
        </h1>

        {/* Description */}

        <p className="mt-8 text-lg leading-relaxed text-[var(--text-soft)]">
          {description}
        </p>

        {/* Decorative line */}

        <div className="mt-10 flex justify-center">
          <div className="w-28 h-[3px] rounded-full bg-[linear-gradient(90deg,#8C7AE6,#8EDAE5)] opacity-80"></div>
        </div>

        {/* Tiny footer note */}

        <p className="mt-8 text-sm text-[var(--text-soft)] opacity-60">
          More features are slowly emerging from the developer cave.
        </p>
      </motion.div>
    </div>
  );
};

export default PlaceholderPage;