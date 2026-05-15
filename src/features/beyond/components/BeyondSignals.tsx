// src/components/beyond/BeyondSignals.tsx
// Section 2: Signals — current experiments split into Active / Forming columns

import React from 'react';

/* ── Types ─────────────────────────────────────────────────── */

type SignalStatus = 'active' | 'forming' | 'pending';

interface Signal {
  id: string;
  main: string;
  desc: string;
  status: SignalStatus;
}

/* ── Data ──────────────────────────────────────────────────── */
/* Add/edit signals here later */

const activeSignals: Signal[] = [
  {
    id: 'SIG-001',
    main: 'Building an AI layer that learns from how players move through games',
    desc: 'Exploring how interaction patterns can feed back into content generation — making games that subtly adapt.',
    status: 'active',
  },
  {
    id: 'SIG-002',
    main: 'Creator tooling that feels more like a canvas than a dashboard',
    desc: 'The current interface is functional. The next one should feel like thinking out loud.',
    status: 'active',
  },
  {
    id: 'SIG-003',
    main: "Mapping the shape of a game's emotional arc as a data structure",
    desc: "If a game can be described by its tension and release curves, what can be automated and what can't?",
    status: 'active',
  },
  {
    id: 'SIG-004',
    main: 'Prototype: a shared game replay space where players leave marks',
    desc: "Like marginalia — tiny timestamps, reactions, notes that layer on top of a game's run history.",
    status: 'pending',
  },
  {
    id: 'SIG-005',
    main: 'Quilpana embed SDK for third-party sites',
    desc: 'Drop a game anywhere. Minimal config. Full analytics piped back.',
    status: 'active',
  },
];

const formingSignals: Signal[] = [
  {
    id: 'FRM-001',
    main: 'A quiet writing space — for longer ideas that need room to breathe',
    desc: 'Not a blog. Not a newsletter. Something slower and stranger.',
    status: 'forming',
  },
  {
    id: 'FRM-002',
    main: 'Voice-first game creation — describe a game, watch it scaffold',
    desc: 'Still early. More of a hypothesis than a roadmap.',
    status: 'forming',
  },
  {
    id: 'FRM-003',
    main: 'Collaborative mode: two creators, one game, async editing',
    desc: "The hard part isn't the multiplayer — it's the merge conflicts in creative decisions.",
    status: 'forming',
  },
  {
    id: 'FRM-004',
    main: "An open-source game physics playground built on Quilpana's engine",
    desc: 'Let people poke the internals. See what breaks. See what bends usefully.',
    status: 'pending',
  },
  {
    id: 'FRM-005',
    main: 'Platform-level achievements that travel with the player, not the game',
    desc: "Identity-layer for players. What you've done across every Quilpana game, visible anywhere.",
    status: 'forming',
  },
];

/* ── Sub-components ────────────────────────────────────────── */

const statusLabel: Record<SignalStatus, string> = {
  active: 'active',
  forming: 'forming',
  pending: 'soon',
};

const SignalItem: React.FC<{ signal: Signal; side: 'active' | 'forming' }> = ({ signal, side }) => (
  <div className={`beyond-signal-item ${side === 'active' ? 'active-item' : 'forming-item'}`}>
    <div className="beyond-signal-id">{signal.id}</div>
    <div className="beyond-signal-main">{signal.main}</div>
    {/* Description expands on hover via CSS */}
    <div className="beyond-signal-desc">{signal.desc}</div>
    <div className="beyond-signal-status">
      <span className={`beyond-signal-dot ${signal.status}`} />
      <span className="beyond-signal-status-label">{statusLabel[signal.status]}</span>
    </div>
  </div>
);

/* ── Section ───────────────────────────────────────────────── */

const BeyondSignals: React.FC = () => (
  <section className="beyond-signals-section">

    {/* Header */}
    <div className="beyond-signals-header">
      <p className="beyond-section-label">transmission</p>
      {/* Replace section title as needed */}
      <h2 className="beyond-signals-title">Signals</h2>
      <p className="beyond-signals-subtitle">
        current experiments · active ideas · future directions
      </p>
    </div>

    {/* Two-column grid with animated divider */}
    <div className="beyond-signals-grid">

      {/* Left: Active Now */}
      <div>
        <div className="beyond-signals-col-head active">Active Now</div>
        <div className="beyond-signal-list">
          {/* Add/edit signals here later */}
          {activeSignals.map(s => (
            <SignalItem key={s.id} signal={s} side="active" />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="beyond-signals-divider" aria-hidden="true" />

      {/* Right: Forming Next */}
      <div>
        <div className="beyond-signals-col-head forming">Forming Next</div>
        <div className="beyond-signal-list">
          {/* Add/edit signals here later */}
          {formingSignals.map(s => (
            <SignalItem key={s.id} signal={s} side="forming" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BeyondSignals;