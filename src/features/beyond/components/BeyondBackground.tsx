// src/components/beyond/BeyondBackground.tsx
// Renders fixed atmospheric background: orbs, grid, noise

import React from 'react';

/**
 * BeyondBackground
 * Fixed behind all page content.
 * Pure CSS-animated — no JS overhead.
 */
const BeyondBackground: React.FC = () => (
  <div className="beyond-bg" aria-hidden="true">
    <div className="beyond-orb beyond-orb-1" />
    <div className="beyond-orb beyond-orb-2" />
    <div className="beyond-orb beyond-orb-3" />
    <div className="beyond-orb beyond-orb-4" />
  </div>
);

export default BeyondBackground;