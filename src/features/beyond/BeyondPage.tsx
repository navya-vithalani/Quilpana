// src/pages/BeyondPage.tsx
// Main Beyond page — assembles all sections

import React from 'react';
import "./beyond.css"

// Sections
import BeyondBackground  from './components/BeyondBackground';
import BeyondHero        from './components/BeyondHero';
import BeyondSignals     from './components/BeyondSignals';
import BeyondConnections from './components/BeyondConnections';
import BeyondFeedback    from './components/BeyondFeedback';


/**
 * BeyondPage
 *
 * A calm, atmospheric identity space that bridges Quilpana
 * and the creator's wider work.
 *
 * Sections:
 *  1. Hero        — avatar + intro
 *  2. Signals     — active experiments / forming ideas
 *  3. Connections — external links (GitHub, Instagram, Email, YouTube)
 *  4. Feedback    — open message form
 */
const BeyondPage: React.FC = () => (
  <div className="beyond-root">

    {/* Fixed atmospheric background */}
    <BeyondBackground />

    {/* Scrollable content layer */}
    <div className="beyond-content">

      {/* 1 — Hero */}
      <BeyondHero />

      {/* Separator */}
      <div className="beyond-sep">
        <div className="beyond-sep-line" />
      </div>

      {/* 2 — Signals */}
      <BeyondSignals />

      {/* Separator */}
      <div className="beyond-sep">
        <div className="beyond-sep-line" />
      </div>

      {/* 3 — Connections */}
      <BeyondConnections />

      {/* Separator */}
      <div className="beyond-sep">
        <div className="beyond-sep-line" />
      </div>

      {/* 4 — Feedback */}
      <BeyondFeedback />

    </div>
  </div>
);

export default BeyondPage;