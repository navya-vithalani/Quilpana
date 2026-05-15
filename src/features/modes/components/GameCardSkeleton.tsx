import React from 'react';

const GameCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
        
        {/* Creator skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        
        {/* Category and date skeleton */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-5 bg-gray-300 rounded-full w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
        </div>
        
        {/* Actions skeleton */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;

