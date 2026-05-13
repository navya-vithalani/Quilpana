import React, { useState } from 'react';
import { Game, VoteStatus } from '../types/types';
import { UpArrowIcon, DownArrowIcon, HeartIcon } from './Icons';
import { useNavigate } from 'react-router-dom';
import { useToast } from './system/Toast';

interface GameCardProps {
  game: Game;
  voteStatus: VoteStatus;
  isFavorite: boolean;
  onVote: (gameId: string, voteType: 'up' | 'down') => void;
  onFavorite: (gameId: string) => void;
  upvotesLeft: number;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const GameCard: React.FC<GameCardProps> = React.memo(
  ({ game, voteStatus, isFavorite, onVote, onFavorite, upvotesLeft }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const lowerType = game.category.toLowerCase();
    const [sharing, setSharing] = useState(false);

    const handleShare = async (e: React.MouseEvent) => {
      e.stopPropagation();
      setSharing(true);
      const gameUrl = `${window.location.origin}/player/${game.id}`;
      
      try {
        if (navigator.share) {
          await navigator.share({
            title: game.name,
            text: game.description,
            url: gameUrl,
          });
          toast.success('Game shared!');
        } else {
          await navigator.clipboard.writeText(gameUrl);
          toast.success('Game link copied to clipboard!');
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          // Fallback to clipboard if share fails
          try {
            await navigator.clipboard.writeText(gameUrl);
            toast.success('Game link copied to clipboard!');
          } catch (clipboardErr) {
            toast.error('Failed to share game');
          }
        }
      } finally {
        setSharing(false);
      }
    };

    // Vote displays
    const displayUpvotes = game.upvotes + (voteStatus === VoteStatus.Up ? 1 : 0);
    const displayDownvotes = game.downvotes + (voteStatus === VoteStatus.Down ? 1 : 0);
    const CATEGORY_DISPLAY: Record<string, string> = {
  skill: 'Brain Teasers',   // or whatever you want to call it later
  play: 'Casual Fun',
  default: 'Default Game',
};


    // UI Styling Based on Category
    const CATEGORY_STYLES: Record<string, { bg: string; border?: string; star?: boolean }> = {
  play: { bg: 'orange-500', border: 'border-4 border-orange-500' },
  skill: { bg: 'green-800', border: 'border-4 border-green-800 shadow-[0_0_10px_2px_rgba(0,128,0,0.7)]  hover:shadow-[0_0_14px_3px_rgba(0,200,0,1)]', star: true },
  default: { bg: 'blue-500'},
};

const { bg,  border, star: hasStar } = CATEGORY_STYLES[lowerType] || CATEGORY_STYLES.default;
const starElement = hasStar ? (
  <div className="absolute top-2 right-2 text-white rounded-full p-1 shadow-lg">⭐</div>
) : null;

    return (
      <div
        className={`bg-white rounded-xl overflow-hidden shadow-md
        hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
        flex flex-col group ${border}`}
      >
        <div className="relative" onClick={() => navigate(`/player/${game.id}`)}>
          <img
            className="w-full h-48 object-cover"
            src={game.thumbnailUrl}
            alt={game.name}
          />
    {starElement}
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="text-white text-center text-sm">{game.description}</p>
            {starElement}
          </div>
        </div>
       

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-1 truncate text-gray-900">{game.name}</h3>
           {game.category.toLowerCase() !== "default" &&(
                      <p className="text-gray-500 text-sm mb-4">by {game.creator}</p> )}

          <div className="mt-auto pt-2">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-white text-xs bg-${bg}`}>
                {CATEGORY_DISPLAY[game.category.toLowerCase()] || game.category}
              </span>

              <span>{formatDate(game.createdAt)}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 py-2">
            {game.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs font-semibold rounded-full  text-gray-700">
                {tag}
              </span>
            ))}
          </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                {/* Upvote */}
                {game.category.toLowerCase() !== 'default' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onVote(game.id, "up");
                  }}
                  className={`flex items-center space-x-1 transition-colors duration-200
                  ${voteStatus === VoteStatus.Up ? `text-green-500` : "text-gray-500"}
                  hover:text-green-400`}
                >
                  <UpArrowIcon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{displayUpvotes}</span>
                </button>
                )}
                
                {game.category.toLowerCase() !== 'default' && (
                /* Downvote */
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVote(game.id, "down");
                  }}
                  className={`flex items-center space-x-1 transition-colors duration-200
                  ${voteStatus === VoteStatus.Down ? "text-red-500" : "text-gray-500 hover:text-red-400"}`}
                >
                  <DownArrowIcon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{displayDownvotes}</span>
                </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {/* Share */}
                <button
                  onClick={handleShare}
                  disabled={sharing}
                  className="transition-colors duration-200 text-gray-400 hover:text-blue-500 disabled:opacity-50"
                  title="Share game"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>

                {/* Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(game.id);
                  }}
                  className={`transition-colors duration-200
                  ${isFavorite ? `text-purple-500` : "text-gray-400 hover:text-purple-400"}`}
                >
                  <HeartIcon className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default GameCard;
