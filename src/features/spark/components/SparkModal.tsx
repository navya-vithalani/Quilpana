// ============================================================
// SparkModal.tsx
// Modal for submitting a new Spark idea.
// Frontend-only: no real API calls, uses placeholder state.
// ============================================================

import { useState } from "react";
import { X } from "lucide-react";
import { Spark } from "../mockSparkData";

const PRESET_TAGS = [
  "animation help",
  "UI polish",
  "sound design",
  "physics logic",
  "AI help",
  "game design",
  "accessibility",
  "multiplayer",
];

interface SparkModalProps {
  onClose: () => void;
  onSubmit: (spark: Spark) => void;
  onToast: (msg: string) => void;
}

export default function SparkModal({ onClose, onSubmit, onToast }: SparkModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [parentId, setParentId] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function addCustomTag() {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
    }
    setCustomTag("");
  }

  function handleSubmit() {
    if (!title.trim()) return;

    // TODO: check auth — if not signed in, redirect to login
    // TODO: POST /api/spark/create — include userId, title, desc, github, parentId, tags
    // TODO: submit to moderation queue before going live
    // TODO: send confirmation email to author

    const newSpark: Spark = {
      id: "SPK-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      title: title.trim(),
      description: description.trim(),
      author: "You", // TODO: replace with auth user display name
      github: github.trim() || undefined,
      parentSparkId: parentId.trim() || undefined,
      lookingFor: selectedTags,
      upvotes: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    onSubmit(newSpark);
    onToast("Idea submitted for review ✨");
    onClose();
  }

  // Close on overlay click
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="spark-modal-overlay" onClick={handleOverlayClick}>
      <div className="spark-modal-box" role="dialog" aria-modal="true" aria-label="Submit a Spark idea">

        {/* Heading */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div className="spark-modal-heading">Share an Idea</div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-soft)",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="spark-modal-desc">
          Drop an unfinished idea. Others can spark it, branch from it, or help you build it.
        </div>

        {/* Idea Title */}
        <div className="spark-field">
          <label className="spark-field-label">Idea Title</label>
          <input
            className="spark-field-input"
            placeholder="e.g. Gravity puzzle with reversible time"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="spark-field">
          <label className="spark-field-label">Description</label>
          <textarea
            className="spark-field-textarea"
            placeholder="What's the core mechanic or concept? What makes it interesting?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* GitHub */}
        <div className="spark-field">
          <label className="spark-field-label">GitHub Link <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <input
            className="spark-field-input"
            placeholder="https://github.com/..."
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>

        {/* Parent Spark ID */}
        <div className="spark-field">
          <label className="spark-field-label">Branching from <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional Spark ID)</span></label>
          <input
            className="spark-field-input"
            placeholder="e.g. SPK-001"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          />
        </div>

        {/* Looking For — tags */}
        <div className="spark-field">
          <label className="spark-field-label">What are you looking for?</label>
          <div className="spark-tag-picker" style={{ marginBottom: 10 }}>
            {PRESET_TAGS.map((tag) => (
              <button
                key={tag}
                className={`spark-tag-option ${selectedTags.includes(tag) ? "spark-tag-selected" : ""}`}
                onClick={() => toggleTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Custom tag input */}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="spark-field-input"
              placeholder="Add custom tag…"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
              style={{ flex: 1 }}
            />
            <button
              className="spark-tag-option"
              onClick={addCustomTag}
              type="button"
              style={{ whiteSpace: "nowrap" }}
            >
              + Add
            </button>
          </div>

          {/* Show custom tags */}
          {selectedTags.some((t) => !PRESET_TAGS.includes(t)) && (
            <div className="spark-tag-picker" style={{ marginTop: 8 }}>
              {selectedTags
                .filter((t) => !PRESET_TAGS.includes(t))
                .map((tag) => (
                  <button
                    key={tag}
                    className="spark-tag-option spark-tag-selected"
                    onClick={() => toggleTag(tag)}
                    type="button"
                  >
                    {tag} ×
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="spark-modal-actions">
          <button className="spark-modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="spark-modal-btn-submit"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Submit Idea
          </button>
        </div>

      </div>
    </div>
  );
}