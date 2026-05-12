import { useState, useEffect } from "react";
import { Game } from "../types/types";

interface UserGameData {
  id: string;
  name: string;
  description: string;
  category: "Play" | "Skill";
  status: "live" | "pending_review";

  files: Array<{
    name: string;
    size: number;
  }>;

  createdAt: string;
}

export const useUserGames = () => {
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      const storedGames: UserGameData[] = JSON.parse(
        localStorage.getItem("quilpana-user-games") || "[]"
      );

      // only live games
      const liveGames = storedGames.filter(
        (game) => game.status === "live"
      );

      const convertedGames: Game[] = liveGames.map((game) => ({
        id: String(game.id),

        name: game.name,

        creator: "User Created",

        thumbnailUrl:
          "https://picsum.photos/seed/" +
          encodeURIComponent(game.name) +
          "/400/300",

        description: game.description,

        tags: [],

        category: game.category,

        upvotes: 0,

        downvotes: 0,

        createdAt: new Date(game.createdAt),
      }));

      setUserGames(convertedGames);

    } catch (err) {
      console.error("Error loading user games:", err);

      setError("Failed to load user games");

    } finally {
      setLoading(false);
    }
  }, []);

  return {
    userGames,
    loading,
    error,
  };
};