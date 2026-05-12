import React from "react";

interface ReviewCardProps {
  user: string;
  review: string;
  date: string;
  rating?: number; // default 5 stars if not provided
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  user,
  review,
  date,
  rating = 5,
}) => {
  return (
    <div className="min-w-[320px] max-w-[320px] bg-white rounded-xl shadow-lg p-6 flex flex-col snap-start">
      {/* User */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {user[0].toUpperCase()}
        </div>
        <p className="font-semibold text-gray-800">{user}</p>
      </div>

      {/* Stars */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.947a1 1 0 00-.364-1.118L2.049 9.374c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.947z" />
          </svg>
        ))}
      </div>

      {/* Review text */}
      <p className="text-gray-700 flex-grow mb-4">{review}</p>

      {/* Date */}
      <p className="text-gray-400 text-sm text-right">{date}</p>
    </div>
  );
};

export default ReviewCard;
