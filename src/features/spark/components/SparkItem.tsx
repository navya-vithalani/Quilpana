// ============================================================
// SparkItem.tsx
// Single item in the Spark feed.
// No backend logic — all handlers are passed as props.
// ============================================================

import { useState } from "react";
import { Spark } from "./mockSparkData";

interface SparkItemProps {
  spark: Spark;
  onUpvote: (id: string) => void;
  onSparkIt: (id: string) => void;
}

export default function SparkItem({ spark, onUpvote, onSparkIt }: SparkItemProps) {
  const [sparked, setSparked] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  function handleSparkIt() {
    // TODO: check auth before proceeding
    // TODO: POST /api/spark/{id}/interest — save to user interest graph
    // TODO: update recommendation engine
    setSparked(true);
    onSparkIt(spark.id);
  }

  function handleUpvote() {
    // TODO: check auth
    // TODO: POST /api/spark/{id}/upvote
    // TODO: debounce to prevent spam
    if (!upvoted) {
      setUpvoted(true);
      onUpvote(spark.id);
    }
  }

  return (
    <div className="spark-item">

      {/* Title */}
      <div className="spark-item-title">{spark.title}</div>

      {/* Description */}
      <div className="spark-item-desc">{spark.description}</div>

      {/* Meta row */}
      <div className="spark-item-meta">
        <span>by <strong>{spark.author}</strong></span>

        <span className="spark-item-meta-dot" />
        <span style={{ fontFamily: "monospace", fontSize: "10px" }}>{spark.id}</span>

        {spark.parentSparkId && (
          <>
            <span className="spark-item-meta-dot" />
            <span>
              branch of{" "}
              <span className="spark-parent-link">
                {/* TODO: scroll to or highlight parent item */}
                {spark.parentSparkId}
              </span>
            </span>
          </>
        )}

        {spark.github && (
          <>
            <span className="spark-item-meta-dot" />
            <a
              className="spark-gh-link"
              href={spark.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </>
        )}

        <span className="spark-item-meta-dot" />
        <span>{spark.createdAt}</span>
      </div>

      {/* Looking-for tags */}
      {spark.lookingFor && spark.lookingFor.length > 0 && (
        <div className="spark-tags">
          {spark.lookingFor.map((tag) => (
            <span key={tag} className="spark-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="spark-item-actions">
        <button
          className={`spark-action-btn ${sparked ? "spark-action-active" : ""}`}
          onClick={handleSparkIt}
          disabled={sparked}
          title="Express interest in building this together"
        >
          ⚡ {sparked ? "Sparked" : "Spark It"}
        </button>

        <button
          className={`spark-action-btn ${upvoted ? "spark-action-active" : ""}`}
          onClick={handleUpvote}
          disabled={upvoted}
          title="Upvote this idea"
        >
          ↑ {spark.upvotes + (upvoted ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}