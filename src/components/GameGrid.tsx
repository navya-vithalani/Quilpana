// components/GameGrid.tsx
import React from 'react';
import { Game, UserVotes, VoteStatus } from '../types/types';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  userVotes: UserVotes;
  favoriteGames: string[];
  onVote: (gameId: string, voteType: 'up' | 'down') => void;
  onFavorite: (gameId: string) => void;
  upvotesLeft: number;
}

const GameGrid: React.FC<GameGridProps> = ({
  games,
  userVotes,
  favoriteGames,
  onVote,
  onFavorite,
  upvotesLeft
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {games.map(game => (
      <GameCard
        key={game.id}
        game={game}
        voteStatus={userVotes[game.id] || VoteStatus.None}
        isFavorite={favoriteGames.includes(game.id)}
        onVote={onVote}
        onFavorite={onFavorite}
        upvotesLeft={upvotesLeft}
      />
    ))}
  </div>
);

export default GameGrid;
