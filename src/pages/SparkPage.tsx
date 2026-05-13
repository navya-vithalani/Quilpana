// ============================================================
// SparkPage.tsx
// Root page for the Spark feature.
// Owns all top-level state: sparks list, modal visibility, toast.
// No direct API calls — TODO markers indicate integration points.
// ============================================================

import { useState, useMemo, useEffect, useCallback } from "react";

import SparkFeed from "../components/spark/SparkFeed";
import SparkRightPanel from "../components/spark/SparkRightPanel";
import SparkModal from "../components/spark/SparkModal";

import {
  mockSparks,
  mockCreators,
  mockQuests,
  mockUsers,
  Spark,
} from "../features/spark/mockSparkData";

// ─── Toast helper ────────────────────────────────────────────
function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return { message, visible, showToast };
}

// ─── Page ────────────────────────────────────────────────────
export default function SparkPage() {
  const [sparkModalOpen, setSparkModalOpen] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>(mockSparks);

  // TODO: replace useState init with API fetch:
  // useEffect(() => {
  //   fetch("/api/sparks?sort=upvotes&limit=50")
  //     .then(r => r.json())
  //     .then(setSparks);
  // }, []);

  const { message: toastMsg, visible: toastVisible, showToast } = useToast();

  // Sort descending by upvotes; new unsubmitted items float to top
  const sortedSparks = useMemo(
    () => [...sparks].sort((a, b) => b.upvotes - a.upvotes),
    [sparks]
  );

  function handleAddSpark(newSpark: Spark) {
    // Optimistic UI update — prepend before backend confirms
    // TODO: await POST /api/spark/create, then replace optimistic item with real one
    setSparks((prev) => [newSpark, ...prev]);
  }

  return (
    <div className="spark-page">

      {/* ─── Hero ─── */}
      <div className="spark-hero">
        <h1 className="spark-hero-title">
          Welcome to{" "}
          <span className="spark-hero-highlight">Spark</span>
          {" "}— where ideas find each other
        </h1>
        <p className="spark-hero-sub">
          Share unfinished ideas. Find collaborators. Branch from other sparks.
          This is a lab, not a launchpad.
        </p>
      </div>

      {/* ─── Two-column layout ─── */}
      <div className="spark-layout">

        {/* Left — Feed */}
        <div className="spark-left">
          <SparkFeed
            sparks={sortedSparks}
            onOpenModal={() => setSparkModalOpen(true)}
            onSparkUpdate={setSparks}
          />
        </div>

        {/* Right — Panel */}
        <div className="spark-right">
          <SparkRightPanel
            creators={mockCreators}
            quests={mockQuests}
            users={mockUsers}
            onToast={showToast}
          />
        </div>

      </div>

      {/* ─── Spark idea modal ─── */}
      {sparkModalOpen && (
        <SparkModal
          onClose={() => setSparkModalOpen(false)}
          onSubmit={handleAddSpark}
          onToast={showToast}
        />
      )}

      {/* ─── Toast ─── */}
      <div className={`spark-toast ${toastVisible ? "spark-toast-visible" : ""}`}>
        {toastMsg}
      </div>

    </div>
  );
}