import React from "react";
import { GiButtonFinger } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface AITemplateCardProps {
  id: string;
  name: string;
  model: string;
  image?: string; // optional placeholder if not provided
}


const AITemplateCard: React.FC<AITemplateCardProps> = ({
  id,
  name,
  model,
  image = "/placeholder.png",
  
}) => {
  const navigate = useNavigate();
  return (
    <div 
    onClick = {() => navigate(`/ai-template/${id}`)}
      className="cursor-pointer min-w-[260px] max-w-[260px] bg-white rounded-lg shadow-md p-3 flex items-center gap-3 snap-start hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 rounded-lg object-cover bg-gray-200"
      />

      <div className="flex flex-col">
        <p className="font-semibold text-gray-800 truncate">{name}</p>
        <span className="text-gray-500 text-sm">{model}</span>
      </div>
    </div>
  );
};

export default AITemplateCard;
