import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Gamepad2,
  Lightbulb,
  Orbit,
  CheckSquare,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardHover = {
  whileHover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.25 },
  },
};

const ManifestoCard = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      {...cardHover}
      className={`manifesto-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Manifesto() {
  return (
    <div className="manifesto-page">
      {/* Ambient Glows */}
      <div className="manifesto-glow manifesto-glow-1" />
      <div className="manifesto-glow manifesto-glow-2" />
      <div className="manifesto-noise" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="manifesto-grid"
      >
        {/* ===================================================== */}
        {/* HERO */}
        {/* ===================================================== */}

        <ManifestoCard className="hero-card col-span-2">
          <div className="tiny-label">manifesto / archive / unfinished</div>

          <h1 className="hero-title">
            Quilpana was never meant to be another platform.
          </h1>

          <p className="hero-subtext">
            {/* Replace with actual philosophy text later */}
            Placeholder reflection about curiosity, systems, creativity,
            experimentation, and learning through interaction.
          </p>

          <div className="hero-orb" />
        </ManifestoCard>

        {/* ===================================================== */}
        {/* WHY THIS EXISTS */}
        {/* ===================================================== */}

        <ManifestoCard className="scrapbook-card hover-expand">
          <div className="sticky-note">annotation</div>

          <h2>why this exists</h2>

          <p>
            {/* Replace with actual philosophy text later */}
            Placeholder thoughts about fragmented learning systems,
            creativity becoming performative, and curiosity feeling boxed
            into rigid structures.
          </p>

          <div className="fragmented-layout">
            <span>too optimized</span>
            <span>not playful enough</span>
            <span>creativity ≠ productivity</span>
          </div>

          <div className="hidden-expand-text">
            {/* Replace with actual philosophy text later */}
            Additional hidden placeholder paragraph revealed on hover.
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* LEARN BY BUILDING */}
        {/* ===================================================== */}

        <ManifestoCard className="tall-card process-card">
          <div className="card-icon">
            <Lightbulb size={18} />
          </div>

          <h2>learn by building</h2>

          <p>
            {/* Replace with actual philosophy text later */}
            Placeholder explanation about experimentation becoming the
            learning process itself.
          </p>

          <div className="process-flow">
            <div>idea</div>
            <ArrowRight size={14} />
            <div>build</div>
            <ArrowRight size={14} />
            <div>play</div>
            <ArrowRight size={14} />
            <div>learn</div>
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* PLAYER MODE */}
        {/* ===================================================== */}

        <ManifestoCard className="wide-card player-card col-span-2">
          <div className="card-top-row">
            <h2>player mode</h2>
            <Gamepad2 size={18} />
          </div>

          <p>
            {/* Replace with actual philosophy text later */}
            Placeholder text about exploration, immersion, playful
            discovery, and curiosity-driven learning.
          </p>

          <div className="thumbnail-grid">
            <div className="mock-thumb large-thumb">
              <span>simulation</span>
            </div>
            <div className="mock-thumb">
              <span>challenge</span>
            </div>
            <div className="mock-thumb rotated">
              <span>world</span>
            </div>
            <div className="mock-thumb small-thumb">
              <span>play</span>
            </div>
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* CREATOR MODE */}
        {/* ===================================================== */}

        <ManifestoCard className="creator-card col-span-2">
          <div className="split-layout">
            <div className="messy-side">
              <div className="tiny-label rotate-left">
                unfinished concepts
              </div>

              <h2>creator mode</h2>

              <p>
                {/* Replace with actual philosophy text later */}
                Placeholder text describing messy creation, iteration,
                sketching, prototyping, and experimentation.
              </p>

              <div className="messy-bubbles">
                <span>idea fragments</span>
                <span>systems</span>
                <span>mechanics</span>
                <span>emotion</span>
              </div>
            </div>

            <div className="finished-side">
              <div className="finished-window">
                <div className="window-top" />
                <div className="window-content">
                  finished experience
                </div>
              </div>
            </div>
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* SPARK */}
        {/* ===================================================== */}

        <ManifestoCard className="spark-card">
          <div className="card-top-row">
            <h2>spark</h2>
            <Sparkles size={18} />
          </div>

          <p>
            {/* Replace with actual philosophy text later */}
            Placeholder text about collaborative creativity and ideas
            branching through community interaction.
          </p>

          <div className="spark-network">
            <div className="spark-node">idea</div>
            <div className="spark-node">prototype</div>
            <div className="spark-node">feedback</div>
            <div className="spark-node">remix</div>

            <div className="connector connector-1" />
            <div className="connector connector-2" />
            <div className="connector connector-3" />
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* NEXUS */}
        {/* ===================================================== */}

        <ManifestoCard className="nexus-card">
          <div className="card-top-row">
            <h2>nexus</h2>
            <Orbit size={18} />
          </div>

          <p>
            {/* Replace with actual philosophy text later */}
            Placeholder text about curated educational journeys,
            structured progression, and refined learning experiences.
          </p>

          <div className="certificate-block">
            <div className="certificate-line" />
            <div className="certificate-line short" />
            <div className="certificate-badge">verified path</div>
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* SYNAPSE */}
        {/* ===================================================== */}

        <ManifestoCard className="synapse-card col-span-2">
          <div className="synapse-overlay" />

          <div className="card-top-row synapse-header">
            <h2>synapse</h2>
            <BrainCircuit size={22} />
          </div>

          <p>
            {/* Replace with actual philosophy text later */}
            Placeholder text about intelligent systems, adaptive learning,
            memory, interaction, and experimental AI-driven experiences.
          </p>

          <div className="neural-grid">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.25, 1, 0.25],
                }}
                transition={{
                  duration: 2 + i * 0.12,
                  repeat: Infinity,
                }}
                className="neural-dot"
              />
            ))}
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* FUTURE SIGNALS */}
        {/* ===================================================== */}

        <div className="future-grid col-span-2">
          {[
            "AI mentors",
            "interactive simulations",
            "creator economies",
            "shared laboratories",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -3 }}
              className="future-mini-card"
            >
              <div className="tiny-label">future signal</div>
              <h3>{item}</h3>

              <p>
                {/* Replace with actual philosophy text later */}
                Placeholder experimental concept text.
              </p>
            </motion.div>
          ))}
        </div>

        {/* ===================================================== */}
        {/* INTERNET I WANT */}
        {/* ===================================================== */}

        <ManifestoCard className="quote-card">
          <div className="quote-mark">“</div>

          <p className="quote-text">
            {/* Replace with actual philosophy text later */}
            Placeholder emotional reflection about the kind of internet,
            learning culture, and creative ecosystem Quilpana hopes to
            contribute toward.
          </p>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* THINGS STILL MISSING */}
        {/* ===================================================== */}

        <ManifestoCard className="todo-card">
          <div className="card-top-row">
            <h2>things still missing</h2>
            <CheckSquare size={18} />
          </div>

          <div className="todo-list">
            <div>☐ Placeholder unresolved system</div>
            <div>☐ Placeholder creator workflow</div>
            <div>☐ Placeholder educational layer</div>
            <div>☐ Placeholder community mechanic</div>
          </div>
        </ManifestoCard>

        {/* ===================================================== */}
        {/* FINAL */}
        {/* ===================================================== */}

        <ManifestoCard className="final-card col-span-2">
          <div className="final-line" />

          <h2>
            still building.<br />
            still learning.<br />
            still unfinished.
          </h2>
        </ManifestoCard>
      </motion.div>
    </div>
  );
}