import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Game, UserVotes, VoteStatus } from "../../../types/types";
import ItemGrid from "../components/GameGrid";
import SearchSortFilter from "../components/SearchSortFilter";
import { useUserGames } from "../../../hooks/useUserGames";
import GameCardSkeleton from "../components/GameCardSkeleton";
import EmptyState from "../../../shared/ui/EmptyState";
import "../modes.css"

interface PlayerPageProps {
  games: Game[];
  userVotes: UserVotes;
  favoriteGames: string[];
  onVote: (gameId: string, voteType: "up" | "down") => void;
  onFavorite: (gameId: string) => void;
  upvotesLeft: number;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const PlayerPage: React.FC<PlayerPageProps> = ({
  games,
  userVotes,
  favoriteGames,
  onVote,
  onFavorite,
  upvotesLeft,
}) => {
  const { userGames, loading: loadingUserGames } = useUserGames();
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const navigate = useNavigate();

  // Combine default games with user-uploaded games
  const allGames = useMemo(() => {
    return [...games, ...userGames];
  }, [games, userGames]);

  useEffect(() => {
    setFilteredGames(allGames);
  }, [allGames]);

const sortOptions = useMemo<
  {
    label: string;
    key: keyof Game;
    order: "asc" | "desc";
  }[]
>(
  () => [
    { label: "Newest", key: "createdAt" as keyof Game, order: "desc" as const },
    { label: "Alphabetical", key: "id" as keyof Game, order: "asc" as const },
  ],
  []
);

const filterOptions = useMemo<
  {
    label: string;
    key: keyof Game;
    values: string[];
  }[]
>(() => [
  {
    label: "Category",
    key: "category" as keyof Game,
    values: Array.from(new Set(allGames.map(g => g.category))),
  },
  {
    label: "Creator",
    key: "creator" as keyof Game,
    values: Array.from(new Set(allGames.map(g => g.creator))),
  },
  {
    label: "Tags",
    key: "tags" as keyof Game,
    values: ["#Puzzle","#Multiplayer","#Strategy","#Adventure","#Casual","#Arcade","#Educational","#Action","#RPG","#Simulation"]
  },
], [allGames]);

const handleChange = useCallback((filtered: Game[]) => {
  setFilteredGames(filtered);
}, []);

const handleSurpriseMe = () => {
  if (allGames.length === 0) return;

  const randomGame =
    allGames[Math.floor(Math.random() * allGames.length)];
  navigate(`/game/${randomGame.id}`)
};


  return (
    
    <div className="animate-fade-in p-background page-container">


  <div className="flex flex-col gap-6 mb-10">

    <button
      onClick={handleSurpriseMe}
      className="surprise-button w-fit"
    >
      🎲 Surprise Me
    </button>

  </div>
      
      {loadingUserGames && allGames.length === games.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <SearchSortFilter<Game>
              items={allGames}
              searchKey="name"
              sortOptions={sortOptions}
              filterOptions={filterOptions}
              onChange={handleChange}
            />
            {filteredGames.length !== allGames.length && (
              <div className="text-sm text-gray-600 ml-4">
                Showing {filteredGames.length} of {allGames.length} games
              </div>
            )}
          </div>


          {filteredGames.length === 0 ? (
            <EmptyState
              title="No games found"
              message="Try adjusting your search or filters to find what you're looking for."
              icon="🎮"
            />
          ) : (
            <ItemGrid
              games={filteredGames}
              userVotes={userVotes}
              favoriteGames={favoriteGames}
              onVote={onVote}
              onFavorite={onFavorite}
              upvotesLeft={upvotesLeft}
            />
          )}
        </>
      )}
    </div>
  );
  

};


export default PlayerPage;
