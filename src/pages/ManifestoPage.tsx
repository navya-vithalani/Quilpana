import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─────────────────────────────────────────────
// Motion Variants
// ─────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────
// Reusable: Animated Section Wrapper
// ─────────────────────────────────────────────
function RevealCard({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variants;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Reusable: Manifesto Label
// ─────────────────────────────────────────────
function CardLabel({ children }: { children: React.ReactNode }) {
  return <p className="manifesto-label mb-4">{children}</p>;
}

// ─────────────────────────────────────────────
// Reusable: Scribble Arrow SVG
// ─────────────────────────────────────────────
function ScribbleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="36" height="28"
      viewBox="0 0 36 28"
      fill="none"
      className={`scribble-arrow ${className}`}
      aria-hidden
    >
      <path
        d="M2 14 C8 6, 20 22, 30 10"
        stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      <path
        d="M26 6 L30 10 L24 14"
        stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// CARD 1 — HERO INTRO
// ─────────────────────────────────────────────
function HeroCard() {
  return (
    <RevealCard className="m-card hero-card col-12" delay={0}>
      <div className="hero-glow" />

      {/* Decorative floating particles */}
      <div
        className="particle"
        style={{
          width: 8, height: 8,
          background: "var(--primary)", opacity: 0.3,
          top: "20%", right: "15%",
          "--dur": "6s", "--delay": "0s",
        } as React.CSSProperties}
      />
      <div
        className="particle"
        style={{
          width: 5, height: 5,
          background: "var(--secondary)", opacity: 0.25,
          top: "45%", right: "30%",
          "--dur": "8s", "--delay": "2s",
        } as React.CSSProperties}
      />

      <motion.p
        className="hero-eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Replace with actual tagline / date / version label */}
        Quilpana · Manifesto · v0.1
      </motion.p>

      <motion.h1
        className="hero-headline"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Replace with actual manifesto opening line */}
        Quilpana was never meant to be another platform.
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* Replace with actual subtitle / philosophy teaser */}
        This is a document about building the internet we actually want. Not the one we were given.
      </motion.p>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 2 — WHY THIS EXISTS
// ─────────────────────────────────────────────
function WhyCard() {
  return (
    <RevealCard className="m-card m-card--filled why-card col-8" delay={0.05}>
      <CardLabel>001 — why this exists</CardLabel>

      <p className="why-main-text">
        {/* Replace with actual philosophy text about broken learning/creativity platforms */}
        Modern platforms are optimized for retention, not growth. They reward consumption over creation,
        completion over curiosity. Something about that felt deeply wrong.
      </p>

      <p className="why-annotation">
        {/* Replace with actual side note / annotation */}
        ↳ side note: learning feels like a chore because it's designed to be consumed, not lived.
      </p>

      {/* Hover-revealed expansion */}
      <div className="why-expand mt-4">
        <p className="why-main-text" style={{ fontSize: "0.95rem", opacity: 0.75 }}>
          {/* Replace with expanded philosophy / deeper reasoning */}
          The best learning happens when you're making something real. Not watching. Not clicking
          through modules. Building, breaking, rebuilding — that's where it lives.
        </p>
      </div>

      <span className="manifesto-label mt-6 block">hover to read more</span>

      <ScribbleArrow />
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 3 — LEARN BY BUILDING
// ─────────────────────────────────────────────
function LearnByBuildingCard() {
  const steps = [
    { icon: "✦", label: "idea" },
    { icon: "◈", label: "build" },
    { icon: "▷", label: "play" },
    { icon: "◎", label: "learn" },
  ];

  return (
    <RevealCard className="m-card m-card--bordered col-4" delay={0.08}>
      <CardLabel>002 — the loop</CardLabel>

      <p className="manifesto-serif" style={{ fontSize: "1.05rem" }}>
        {/* Replace with actual philosophy about building as learning */}
        Making things is the curriculum. The game is the lesson.
      </p>

      {/* Process flow diagram */}
      <div className="process-flow mt-6">
        {steps.map((step, i) => (
          <>
            <div className="process-step" key={step.label}>
              <div className="process-step-dot">{step.icon}</div>
              <span className="process-step-label">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="process-arrow" key={`arrow-${i}`} />
            )}
          </>
        ))}
      </div>

      <p className="manifesto-mono mt-6" style={{ fontSize: "11px" }}>
        {/* Replace with closing note for this card */}
        repeat until something clicks. then repeat again.
      </p>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 4 — PLAYER MODE
// ─────────────────────────────────────────────
function PlayerModeCard() {
  // Replace game thumbnails with real game data later
  const gameThumbs = [
    { tag: "logic" },
    { tag: "memory" },
    { tag: "spatial" },
    { tag: "language" },
  ];

  return (
    <RevealCard className="m-card m-card--translucent col-7" delay={0.1}>
      <CardLabel>003 — player mode</CardLabel>

      <h2 className="manifesto-display" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
        {/* Replace with actual player mode headline */}
        explore. play. discover.
      </h2>

      <p className="manifesto-mono mt-4" style={{ fontSize: "12px" }}>
        {/* Replace with actual player mode description */}
        A space where learning wears the costume of play. Every game is a secret syllabus.
      </p>

      {/* Mock game thumbnails */}
      <div className="game-thumb-grid">
        {gameThumbs.map((g) => (
          <div className="game-thumb" key={g.tag}>
            <span className="game-tag">{g.tag}</span>
          </div>
        ))}
      </div>

      <p className="manifesto-label mt-2">
        {/* Replace with actual mini tagline */}
        placeholder · replace with real game thumbnails
      </p>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 5 — CREATOR MODE
// ─────────────────────────────────────────────
function CreatorModeCard() {
  return (
    <RevealCard className="m-card m-card--filled col-5" delay={0.12}>
      <CardLabel>004 — creator mode</CardLabel>

      <div className="creator-split">
        {/* Left: messy ideas side */}
        <div className="creator-side">
          <p className="creator-side-label">the messy part</p>
          <p className="creator-messy">
            {/* Replace with creative process philosophy text */}
            half-baked ideas. rough sketches. wrong answers. late nights. this is where things start.
          </p>
        </div>

        <div className="creator-divider" />

        {/* Right: polished output side */}
        <div className="creator-side">
          <p className="creator-side-label">the finished thing</p>
          <p className="creator-polished">
            {/* Replace with creator output philosophy text */}
            A game someone else can play. An experience you made from nothing. That's the whole point.
          </p>
        </div>
      </div>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 6 — SPARK
// ─────────────────────────────────────────────
function SparkCard() {
  // Replace with real spark idea data later
  const sparks = [
    "what if math felt like a game?",
    "build a quiz about your city",
    "teach someone something weird",
    "a game about time",
    "collaborative world-building",
    "questions with no answers",
  ];

  return (
    <RevealCard className="m-card m-card--filled col-6" delay={0.1}>
      <CardLabel>005 — spark</CardLabel>

      <h2 className="manifesto-display" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}>
        {/* Replace with actual Spark description headline */}
        ideas don't belong to anyone.
      </h2>

      <p className="manifesto-mono mt-3" style={{ fontSize: "12px" }}>
        {/* Replace with actual Spark philosophy */}
        Spark is where curiosity meets collaboration. A living idea board, always evolving.
      </p>

      {/* Connected spark cluster */}
      <div className="spark-cluster">
        {/* Connector SVG lines — decorative only */}
        <svg className="spark-connector" aria-hidden>
          <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="rgba(169,122,230,0.18)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="50%" y1="60%" x2="80%" y2="25%" stroke="rgba(142,183,229,0.15)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="30%" y1="70%" x2="70%" y2="50%" stroke="rgba(169,122,230,0.12)" strokeWidth="1" strokeDasharray="3 4" />
        </svg>

        {sparks.map((s) => (
          <motion.div
            key={s}
            className="spark-mini"
            whileHover={{ scale: 1.04 }}
          >
            {s /* Replace with real spark idea text */}
          </motion.div>
        ))}
      </div>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 7 — NEXUS
// ─────────────────────────────────────────────
function NexusCard() {
  // Replace with real Nexus modules/tracks later
  const modules = [
    { icon: "◈", text: "Curated learning tracks",     status: "active" },
    { icon: "✦", text: "Creator-led courses",         status: "soon" },
    { icon: "◎", text: "Milestone certifications",    status: "planned" },
    { icon: "▷", text: "Guided project sequences",    status: "planned" },
  ];

  return (
    <RevealCard className="m-card m-card--bordered col-6" delay={0.13}>
      <CardLabel>006 — nexus</CardLabel>

      <h2 className="manifesto-display" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}>
        {/* Replace with actual Nexus headline */}
        structured for those who want a map.
      </h2>

      <p className="manifesto-mono mt-3 mb-4" style={{ fontSize: "12px" }}>
        {/* Replace with actual Nexus philosophy */}
        Not everyone needs chaos. Nexus is for deliberate learning — curated, progressive, clear.
      </p>

      {/* Certification-inspired rows */}
      <div>
        {modules.map((m) => (
          <div className="nexus-row" key={m.text}>
            <div className="nexus-badge">{m.icon}</div>
            <span className="nexus-text">{m.text /* Replace with real module names */}</span>
            <span className="nexus-status">{m.status}</span>
          </div>
        ))}
      </div>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 8 — SYNAPSE
// ─────────────────────────────────────────────
function SynapseCard() {
  return (
    <RevealCard className="m-card m-card--dark synapse-card col-12" delay={0.05}>
      <CardLabel>007 — synapse</CardLabel>

      {/* Ambient orbs */}
      <div className="synapse-orbs">
        <div className="synapse-orb" style={{
          width: 220, height: 220,
          background: "radial-gradient(circle, rgba(169,122,230,0.18), transparent)",
          top: "-20%", left: "5%",
          animationDelay: "0s",
        }} />
        <div className="synapse-orb" style={{
          width: 180, height: 180,
          background: "radial-gradient(circle, rgba(95,189,205,0.14), transparent)",
          bottom: "-15%", right: "10%",
          animationDelay: "3s",
        }} />
        <div className="synapse-orb" style={{
          width: 120, height: 120,
          background: "radial-gradient(circle, rgba(230,194,106,0.1), transparent)",
          top: "40%", left: "40%",
          animationDelay: "5s",
        }} />
      </div>

      {/* Neural path SVG — decorative */}
      <svg className="neural-svg" aria-hidden>
        <circle cx="15%" cy="30%" r="3" fill="rgba(169,122,230,0.5)" />
        <circle cx="40%" cy="55%" r="3" fill="rgba(142,183,229,0.4)" />
        <circle cx="65%" cy="25%" r="3" fill="rgba(169,122,230,0.35)" />
        <circle cx="80%" cy="60%" r="3" fill="rgba(230,194,106,0.35)" />
        <line x1="15%" y1="30%" x2="40%" y2="55%" stroke="rgba(169,122,230,0.25)" strokeWidth="1" />
        <line x1="40%" y1="55%" x2="65%" y2="25%" stroke="rgba(142,183,229,0.2)" strokeWidth="1" />
        <line x1="65%" y1="25%" x2="80%" y2="60%" stroke="rgba(169,122,230,0.2)" strokeWidth="1" />
        <line x1="15%" y1="30%" x2="80%" y2="60%" stroke="rgba(142,183,229,0.1)" strokeWidth="1" strokeDasharray="5 6" />
      </svg>

      {/* Blurred ghost text — purely decorative */}
      <div className="synapse-blur-text" aria-hidden>
        intelligence without walls
      </div>

      {/* Actual content */}
      <div className="synapse-content">
        <h2 className="manifesto-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          {/* Replace with actual Synapse headline */}
          an AI that learns how you think.
        </h2>
        <p className="manifesto-mono mt-4" style={{ fontSize: "13px", maxWidth: 560, lineHeight: 1.75 }}>
          {/* Replace with actual Synapse description */}
          Synapse isn't a chatbot. It's a thinking partner — one that remembers what you've built,
          understands what you're curious about, and nudges you toward your own next question.
        </p>
        <p className="manifesto-label mt-6">
          {/* Replace with actual status / teaser */}
          experimental · in development · more soon
        </p>
      </div>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 9 — FUTURE SIGNALS
// ─────────────────────────────────────────────
function FutureSignalsCard() {
  // Replace with real future feature ideas later
  const signals = [
    { icon: "🤖", title: "AI mentors",               desc: "placeholder · replace with actual idea" },
    { icon: "🌐", title: "interactive simulations",  desc: "placeholder · replace with actual idea" },
    { icon: "🔗", title: "collaborative learning",   desc: "placeholder · replace with actual idea" },
    { icon: "🌱", title: "creator ecosystems",       desc: "placeholder · replace with actual idea" },
    { icon: "🧠", title: "memory graphs",            desc: "placeholder · replace with actual idea" },
    { icon: "🎲", title: "open game standards",      desc: "placeholder · replace with actual idea" },
  ];

  return (
    <RevealCard className="m-card m-card--notebook col-7" delay={0.1}>
      <CardLabel>008 — future signals</CardLabel>

      <h2 className="manifesto-display" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)" }}>
        {/* Replace with actual future section headline */}
        things we're pointed toward.
      </h2>

      <motion.div className="signals-grid mt-2" variants={stagger} initial="hidden" animate="visible">
        {signals.map((s) => (
          <motion.div key={s.title} className="signal-card" variants={scaleIn}>
            <div className="signal-icon">{s.icon}</div>
            <div className="signal-title">{s.title}</div>
            <div className="signal-desc">{s.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 10 — THE INTERNET I WANT
// ─────────────────────────────────────────────
function InternetIWantCard() {
  return (
    <RevealCard className="m-card m-card--translucent quote-card col-5" delay={0.12}>
      <span className="quote-mark" aria-hidden>"</span>

      <p className="quote-text">
        {/* Replace with actual personal philosophical quote */}
        I want an internet that makes me feel smarter when I leave it than when I arrived.
        One that trusts me to be curious. One that doesn't need my attention — just my imagination.
      </p>

      <p className="quote-attr">
        {/* Replace with actual attribution or remove */}
        the internet i want · placeholder text
      </p>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// CARD 11 — THINGS STILL MISSING
// ─────────────────────────────────────────────
function StillMissingCard() {
  // Replace with real TODO / missing features list later
  const items = [
    { done: true,  label: "a space that rewards making" },
    { done: true,  label: "play as a pedagogy" },
    { done: false, label: "community tools that don't feel like social media" },
    { done: false, label: "AI that understands context, not just queries" },
    { done: false, label: "real collaborative creation tools" },
    { done: false, label: "economic models that support creators" },
  ];

  return (
    <RevealCard className="m-card m-card--sticky col-6" delay={0.08}>
      {/* Sticky tape strip — decorative */}
      <div className="tape-strip" />

      <CardLabel>009 — still missing</CardLabel>

      <h2 className="manifesto-display" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
        {/* Replace with actual "still missing" section headline */}
        the list keeps growing.
      </h2>

      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.label} className={`todo-item${item.done ? " todo-item--done" : ""}`}>
            <div className="todo-box">
              {item.done && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                  <path d="M1 4L3.5 6.5L9 1" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span>{item.label /* Replace with real missing-feature text */}</span>
          </li>
        ))}
      </ul>

      <p className="manifesto-mono mt-5" style={{ fontSize: "10px" }}>
        {/* Replace with actual note about incompleteness being intentional */}
        // unfinished by design. this list is the work.
      </p>
    </RevealCard>
  );
}

// ─────────────────────────────────────────────
// FINAL CARD — CLOSING THOUGHT
// ─────────────────────────────────────────────
function ClosingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="m-card closing-card col-12"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative floating dot */}
      <div className="particle" style={{
        width: 6, height: 6,
        background: "var(--primary)",
        top: "20%", left: "20%",
        "--dur": "7s",
      } as React.CSSProperties} />

      <motion.p
        className="closing-headline"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        {/* Replace with final closing statement */}
        still building. still learning. still unfinished.
      </motion.p>

      <motion.p
        className="closing-sub"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* Replace with year / version / signature */}
        quilpana · 2025 · a work in progress
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────
export default function ManifestoPage() {
  return (
    <div className="manifesto-root">
      <div className="manifesto-container">
        <div className="manifesto-grid">

          {/* ── ROW 1: Hero (full width) ── */}
          <HeroCard />

          {/* ── ROW 2: Why + Learn loop ── */}
          <WhyCard />
          <LearnByBuildingCard />

          {/* ── ROW 3: Player + Creator ── */}
          <PlayerModeCard />
          <CreatorModeCard />

          {/* ── ROW 4: Spark + Nexus ── */}
          <SparkCard />
          <NexusCard />

          {/* ── ROW 5: Synapse (full width) ── */}
          <SynapseCard />

          {/* ── ROW 6: Future Signals + Quote ── */}
          <FutureSignalsCard />
          <InternetIWantCard />

          {/* ── ROW 7: Still Missing + (decorative gap handled by grid) ── */}
          <StillMissingCard />

          {/* Decorative annotation label floating in the remaining col space */}
          <RevealCard className="col-6" delay={0.15}>
            <div className="m-card m-card--bordered" style={{ minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p className="manifesto-label mb-3">a note on incompleteness</p>
              <p className="manifesto-serif" style={{ fontSize: "1rem" }}>
                {/* Replace with actual reflection on why incompleteness matters */}
                Every version of this document is wrong. That's intentional.
                Writing it down is how we find out what we actually think.
              </p>
              {/* Decorative rotated mini label */}
              <span className="deco-label" style={{ bottom: 14, right: 18, transform: "rotate(-3deg)" }}>
                v0.1 draft
              </span>
            </div>
          </RevealCard>

          {/* ── FINAL: Closing (full width) ── */}
          <ClosingCard />

        </div>
      </div>
    </div>
  );
}