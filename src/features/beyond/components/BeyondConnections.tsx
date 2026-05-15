// src/components/beyond/BeyondConnections.tsx
// Section 3: Connections — large interactive rows for external links

import React from 'react';

/* ── Types ─────────────────────────────────────────────────── */

interface Connection {
  id: string;
  icon: string;                  // emoji icon (replace with SVG/icon library later)
  iconClass: string;
  title: string;
  subtitle: string;              // Replace with actual subtitles later
  href: string;                  // Replace with actual links later
}

/* ── Data ──────────────────────────────────────────────────── */
/* Replace with actual links later */

const connections: Connection[] = [
  {
    id: 'github',
    icon: '⌥',
    iconClass: 'github',
    title: 'GitHub',
    subtitle: 'open experiments and unfinished systems',   // Replace subtitle
    href: 'https://github.com/',                           // Replace with actual link
  },
  {
    id: 'instagram',
    icon: '◎',
    iconClass: 'instagram',
    title: 'Instagram',
    subtitle: 'creative updates and visual explorations',  // Replace subtitle
    href: 'https://instagram.com/',                        // Replace with actual link
  },
  {
    id: 'email',
    icon: '✦',
    iconClass: 'email',
    title: 'Email',
    subtitle: 'say hello, pitch something strange',        // Replace subtitle
    href: 'mailto:hello@example.com',                      // Replace with actual email
  },
  {
    id: 'youtube',
    icon: '▶',
    iconClass: 'youtube',
    title: 'YouTube',
    subtitle: 'future long-form ideas',                   // Replace subtitle
    href: 'https://youtube.com/',                          // Replace with actual link
  },
];

/* ── Arrow icon ────────────────────────────────────────────── */

const ArrowIcon: React.FC = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Section ───────────────────────────────────────────────── */

const BeyondConnections: React.FC = () => (
  <section className="beyond-connections-section">
    <div className="beyond-connections-inner">

      <div className="beyond-connections-header">
        <p className="beyond-section-label">reach out</p>
        <h2 className="beyond-signals-title">Connections</h2>
      </div>

      <div className="beyond-connections-list">
        {connections.map(c => (
          /* Replace with actual links later */
          <a
            key={c.id}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="beyond-connection-item"
            aria-label={`${c.title} — ${c.subtitle}`}
          >
            <div className={`beyond-connection-icon ${c.iconClass}`} aria-hidden="true">
              {c.icon}
            </div>

            <div className="beyond-connection-text">
              <span className="beyond-connection-title">{c.title}</span>
              <span className="beyond-connection-sub">{c.subtitle}</span>
            </div>

            <div className="beyond-connection-arrow">
              <ArrowIcon />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default BeyondConnections;