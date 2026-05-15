// ============================================================
// SparkRightPanel.tsx
// Right column: three stacked scrollable panel cards.
// — New Creators
// — Quests
// — Recognition (exactly 20 users, not clickable)
// ============================================================

import { useState } from "react";
import { Creator, Quest, UserRank } from "./mockSparkData";
import QuestModal from "./QuestModal";

interface SparkRightPanelProps {
  creators: Creator[];
  quests: Quest[];
  users: UserRank[];
  onToast: (msg: string) => void;
}

export default function SparkRightPanel({
  creators,
  quests,
  users,
  onToast,
}: SparkRightPanelProps) {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  return (
    <>
      {/* ─── NEW CREATORS ─── */}
      <div className="spark-card spark-panel-card">
        <div className="spark-panel-card-header">
          <div className="spark-panel-card-title">New Creators</div>
        </div>

        <div className="spark-panel-scroll">
          {creators.map((creator, i) => (
            <div key={creator.id}>
              <div className="spark-creator-row">
                {/* Avatar */}
                <div className="spark-creator-avatar">
                  <img src={creator.avatar} alt={creator.username} />
                </div>

                {/* Info */}
                <div className="spark-creator-info">
                  <a
                    className="spark-creator-name"
                    href={`/profile/${creator.id}`}
                    // TODO: use router Link when integrated
                  >
                    {creator.username}
                  </a>
                  <div className="spark-creator-date">
                    First upload: {creator.firstUploadDate}
                  </div>

                  {/* Game preview chips — horizontal scroll */}
                  <div className="spark-creator-games">
                    {creator.games.map((game) => (
                      <a
                        key={game.id}
                        className="spark-game-chip"
                        href={game.url}
                        // TODO: router Link
                      >
                        <img
                          className="spark-game-thumb"
                          src={game.thumbnail}
                          alt={game.title}
                        />
                        <span className="spark-game-chip-name">{game.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {i < creators.length - 1 && <div className="spark-row-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* ─── QUESTS ─── */}
      <div className="spark-card spark-panel-card">
        <div className="spark-panel-card-header">
          <div className="spark-panel-card-title">Quests</div>
        </div>

        <div className="spark-panel-scroll">
          {quests.map((quest, i) => (
            <div key={quest.id}>
              <div
                className="spark-quest-row"
                onClick={() => setSelectedQuest(quest)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedQuest(quest)}
              >
                <div className="spark-quest-left">
                  <div className="spark-quest-title">{quest.title}</div>
                  <div className="spark-quest-desc">{quest.description}</div>
                </div>
                <div className="spark-quest-completions">
                  {quest.completions}
                </div>
              </div>

              {i < quests.length - 1 && <div className="spark-row-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* ─── RECOGNITION — exactly 20 users, NOT clickable ─── */}
      <div className="spark-card spark-panel-card">
        <div className="spark-panel-card-header">
          <div className="spark-panel-card-title">Recognition</div>
        </div>

        <div className="spark-panel-scroll">
          {users.slice(0, 20).map((user, i) => (
            <div key={user.id}>
              <div className="spark-recognition-row">
                <span className="spark-recognition-rank">{i + 1}</span>

                <div className="spark-recognition-avatar">
                  <img src={user.avatar} alt={user.username} />
                </div>

                <span className="spark-recognition-name">{user.username}</span>

                <div className="spark-recognition-stats">
                  <span className="spark-recognition-pts">{user.points.toLocaleString()} pts</span>
                  <span className="spark-recognition-cr">{user.credits} cr</span>
                </div>
              </div>

              {i < users.length - 1 && <div className="spark-row-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* Quest modal — rendered at panel level so it overlays page */}
      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
          onToast={onToast}
        />
      )}
    </>
  );
}