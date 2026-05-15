import React from 'react';
import { Template } from '../../../shared/types/types';
import { HeartIcon } from '../../../shared/ui/Icons';
import { useNavigate } from 'react-router-dom';

interface TemplateCardProps {
  template: Template;
  isFavorite: boolean;
  onFavorite: (templateId: string) => void;
  upvotesLeft: number;
  usageCount: number;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const TemplateCard: React.FC<TemplateCardProps> = React.memo(
  ({ template, voteStatus, isFavorite, onVote, onFavorite, upvotesLeft, usageCount }) => {
    const navigate = useNavigate();
    const lowerType = template.category.toLowerCase();

    // Vote displays
    const CATEGORY_DISPLAY: Record<string, string> = {
  user: 'Brain Teasers',   // or whatever you want to call it later
  other: 'Casual Fun',
  default: 'Default Template',
};


    // UI Styling Based on Category
    const CATEGORY_STYLES: Record<string, { bg: string; border?: string }> = {
  user: { bg: 'teal-400', border: 'border-4 border-teal-400' },
  other: { bg: 'green-800', border: 'border-4 '},
  default: { bg: 'blue-500'},
};

const { bg,  border} = CATEGORY_STYLES[lowerType] || CATEGORY_STYLES.default;

    return (
      <div
        className={`bg-white rounded-xl overflow-hidden shadow-md
        hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
        flex flex-col group ${border}`}
      >
        <div className="relative" onClick={() => navigate(`/player/${template.id}`)}>
          <img
            className="w-full h-48 object-cover"
            src={template.thumbnailUrl}
            alt={template.name}
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="text-white text-center text-sm">{template.description}</p>
            
          </div>
        </div>
       

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-1 truncate text-gray-900">{template.name}</h3>
           {template.category.toLowerCase() !== "default" &&(
                      <p className="text-gray-500 text-sm mb-4">by {template.creator}</p> )}

          <div className="mt-auto pt-2">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-white text-xs bg-${bg}`}>
                {CATEGORY_DISPLAY[template.category.toLowerCase()] || template.category}
              </span>

              <span>{formatDate(template.createdAt)}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 py-2">
            {template.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs font-semibold rounded-full  text-gray-700">
                {tag}
              </span>
            ))}
          </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">used by {usageCount}</span>
                </div>

              {/* Favorite */}
              <button
                onClick={() => onFavorite(template.id)}
                className={`transition-colors duration-200
                ${isFavorite ? `text-purple-500` : "text-gray-400 hover:text-purple-400"}`}
              >
                <HeartIcon className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } );  

export default TemplateCard;
