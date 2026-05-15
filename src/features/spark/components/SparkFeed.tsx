// ============================================================
// SparkFeed.tsx
// Left panel: the primary Spark idea feed.
// Data flows in from SparkPage; no direct API calls here.
// ============================================================

import { Pencil } from "lucide-react";
import { Spark } from "./mockSparkData";
import SparkItem from "./SparkItem";

interface SparkFeedProps {
  sparks: Spark[];
  onOpenModal: () => void;
  onSparkUpdate: React.Dispatch<React.SetStateAction<Spark[]>>;
}

export default function SparkFeed({ sparks, onOpenModal, onSparkUpdate }: SparkFeedProps) {

  function handleUpvote(id: string) {
    // TODO: POST /api/spark/{id}/upvote — debounced, auth-gated
    onSparkUpdate((prev) =>
      prev.map((s) => s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s)
    );
  }

  function handleSparkIt(id: string) {
    // TODO: POST /api/spark/{id}/interest
    // TODO: check auth — redirect to login if not signed in
    // TODO: update user's interest graph for recommendations
    console.log("[SparkFeed] Spark It:", id);
  }

  return (
    <div className="spark-card spark-feed-card">

      {/* Header */}
      <div className="spark-feed-header">
        <div className="spark-feed-header-left">
          <div className="spark-feed-title">Spark Feed</div>
          <div className="spark-feed-subtitle">
            Unfinished ideas looking for collaborators
          </div>
        </div>

        <button
          className="spark-pencil-btn"
          onClick={onOpenModal}
          title="Submit a new idea"
          aria-label="Add new spark idea"
        >
          <Pencil size={16} strokeWidth={2.2} />
        </button>
      </div>

      {/* Scrollable feed */}
      <div className="spark-feed-scroll">
        {sparks.map((spark, i) => (
          <div key={spark.id}>
            <SparkItem
              spark={spark}
              onUpvote={handleUpvote}
              onSparkIt={handleSparkIt}
            />
            {i < sparks.length - 1 && (
              <div className="spark-item-divider" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}