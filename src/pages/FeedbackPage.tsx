// src/pages/FeedbackPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { GAMES } from "../constants";

type StoredFeedback = {
  score: number;
  bestScore: number;
  vote: "up" | "down" | null;
  text?: string;
  updatedAt: number;
};

const STORAGE_KEY = (gameId: string) => `feedback_${gameId}`;

const FeedbackPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawScore = searchParams.get("score") ?? undefined;
  const parsedScore = rawScore ? Math.max(0, Math.floor(Number(rawScore))) : undefined;
  const gameMeta = GAMES.find((g) => g.id === gameId);

  // UI state
  const [score, setScore] = useState<number | undefined>(parsedScore);
  const [bestScore, setBestScore] = useState<number | undefined>(undefined);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [text, setText] = useState("");
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  // Load existing feedback from localStorage on mount
  useEffect(() => {
    if (!gameId) return;

    const raw = localStorage.getItem(STORAGE_KEY(gameId));
    if (raw) {
      try {
        const parsed: StoredFeedback = JSON.parse(raw);
        setBestScore(parsed.bestScore ?? parsed.score ?? undefined);
        setVote(parsed.vote ?? null);
        setText(parsed.text ?? "");
      } catch {
        // ignore parse errors
      }
    }
    // If route passed a score and it's better, show it and update best locally (persist on submit)
    if (parsedScore !== undefined) {
      setScore(parsedScore);
    }
  }, [gameId, parsedScore]);

  // Helper to persist feedback
  const persist = (payload: StoredFeedback) => {
    if (!gameId) return;
    localStorage.setItem(STORAGE_KEY(gameId), JSON.stringify(payload));
  };

  const handleVote = (v: "up" | "down") => {
    // toggle behaviour: clicking same option un-selects it
    setVote((prev) => (prev === v ? null : v));
  };

  const handleSubmit = () => {
    if (!gameId) return;

    const current = score ?? bestScore ?? 0;
    const existingRaw = localStorage.getItem(STORAGE_KEY(gameId));
    let existing: StoredFeedback | null = null;
    if (existingRaw) {
      try {
        existing = JSON.parse(existingRaw) as StoredFeedback;
      } catch {
        existing = null;
      }
    }

    const computedBest = Math.max(existing?.bestScore ?? 0, current);
    const payload: StoredFeedback = {
      score: current,
      bestScore: computedBest,
      vote: vote,
      text: text.trim() || undefined,
      updatedAt: Date.now(),
    };

    persist(payload);
    setBestScore(computedBest);
    setSavedMsg("Saved! Thanks for the feedback.");
    setTimeout(() => setSavedMsg(null), 2500);
  };

  if (!gameId) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 rounded-lg">Invalid game. No ID provided.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-sky-400 mb-2">Game Complete!</h1>
        <div className="text-gray-300 mb-4">
          <div className="font-semibold text-lg">{gameMeta?.name ?? gameId}</div>
          <div className="text-sm text-gray-400">ID: {gameId}</div>
        </div>

        <div className="bg-gray-700 p-4 rounded mb-4">
          <div className="text-sm text-gray-300">Score</div>
          <div className="text-2xl font-bold text-white">{score ?? "—"}</div>

          <div className="mt-2 text-sm text-gray-400">Best: {bestScore ?? "—"}</div>
        </div>

        {/* Vote buttons */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => handleVote("up")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              vote === "up" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            👍 Upvote
          </button>

          <button
            onClick={() => handleVote("down")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              vote === "down" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            👎 Downvote
          </button>
        </div>

        {/* Feedback textarea */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-2">Give feedback (optional)</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What worked? What didn't?"
            className="w-full p-3 bg-gray-900 text-white rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {savedMsg && <div className="text-sm text-green-300 mb-3">{savedMsg}</div>}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            className="bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-bold"
          >
            Submit Feedback
          </button>

          <button
            onClick={() => navigate("/player")}
            className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
