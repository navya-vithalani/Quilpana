// ============================================================
// QuestModal.tsx
// Modal for submitting a quest completion.
// Frontend-only — no real API calls yet.
// ============================================================

import { useState } from "react";
import { X } from "lucide-react";
import { Quest } from "../../features/spark/mockSparkData";

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export default function QuestModal({ quest, onClose, onToast }: QuestModalProps) {
  const [response, setResponse] = useState("");
  const [gameLink, setGameLink] = useState("");

  function handleSubmit() {
    if (!response.trim()) return;

    // TODO: POST /api/quests/submit
    // TODO: attach userId + questId from auth context
    // TODO: send admin review email notification
    // TODO: add to moderation queue before marking complete
    console.log("[QuestModal] submission:", {
      questId: quest.id,
      response,
      gameLink,
      // userId: auth.currentUser.id — TODO
    });

    onToast("Quest submitted for review 🎯");
    onClose();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="spark-modal-overlay" onClick={handleOverlayClick}>
      <div className="spark-modal-box" role="dialog" aria-modal="true">

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div className="spark-modal-heading">{quest.title}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-soft)",
              padding: "2px",
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="spark-modal-desc">{quest.description}</div>

        <div className="spark-field">
          <label className="spark-field-label">How did you complete this?</label>
          <textarea
            className="spark-field-textarea"
            placeholder="Tell us about your approach, what you built, or what surprised you…"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <div className="spark-field">
          <label className="spark-field-label">
            Game Link{" "}
            <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
          </label>
          <input
            className="spark-field-input"
            placeholder="https://..."
            value={gameLink}
            onChange={(e) => setGameLink(e.target.value)}
          />
        </div>

        <div className="spark-modal-actions">
          <button className="spark-modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="spark-modal-btn-submit"
            onClick={handleSubmit}
            disabled={!response.trim()}
          >
            Submit Quest
          </button>
        </div>

      </div>
    </div>
  );
}