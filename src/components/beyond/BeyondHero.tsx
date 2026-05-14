// src/components/beyond/BeyondHero.tsx
// Section 1: Hero — avatar placeholder + atmospheric intro text

import React from 'react';

const BeyondHero: React.FC = () => (
  <section className="beyond-hero">
    <div className="beyond-hero-inner">

      {/* ── Avatar ───────────────────────────────────────────── */}
      <div className="beyond-avatar-wrap">
        <div className="beyond-avatar-frame">
          {/* Outer glow halo */}
          <div className="beyond-avatar-glow" />

          {/* Spinning gradient ring */}
          <div className="beyond-avatar-ring" />

          {/* Avatar image area */}
          {/* Replace with stylized animated avatar later */}
          <div className="beyond-avatar-img">
            <span className="beyond-avatar-placeholder-icon" aria-hidden="true">◈</span>
          </div>

          {/* Floating badge — replace text as needed */}
          <div className="beyond-avatar-badge">
            {/* Replace badge label */}
            building things
          </div>
        </div>
      </div>

      {/* ── Intro text ───────────────────────────────────────── */}
      <div className="beyond-hero-text">

        {/* Replace with actual name */}
        <p className="beyond-hero-tagline">beyond / quilpana</p>

        <h1 className="beyond-hero-name">
          {/* Replace with actual name */}
          Your <em>Name</em>
        </h1>

        {/* Replace with actual bio — 60-100 words */}
        <p className="beyond-hero-bio">
          Somewhere between ideas and systems, I build things that feel{' '}
          <strong>quiet but alive</strong>. This is a small corner of the internet
          where experiments take shape, signals form, and things that don't fit
          anywhere else find a home. Quilpana is one of them — and this page is
          where I talk about the rest.
        </p>

        {/* Scroll nudge */}
        <div className="beyond-scroll-hint" aria-hidden="true">
          <span className="beyond-scroll-hint-line" />
          scroll
        </div>
      </div>
    </div>
  </section>
);

export default BeyondHero;