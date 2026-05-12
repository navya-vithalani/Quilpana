import React, { useState, useMemo, useCallback } from "react";
import { Template } from "../types/types"; // adjust types
import TemplateGrid from "../components/TemplateGrid"; // reuse if templates are similar
import SearchSortFilter from "../components/SearchSortFilter";
import AITemplateCard from "../components/AITemplateCard";
import Carousel from "../components/Carousel";
import { aiTemplates } from "../constants"; // sample AI templates data
import { FaInfoCircle } from "react-icons/fa";

interface CreatorPageProps {
  templates: Template[];
  favoriteGames: string[];
  onFavorite: (templateId: string) => void;
}

const CreatorPage: React.FC<CreatorPageProps> = ({
  templates = [],
  favoriteGames,
  onFavorite,
}) => {
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templates);

  const categoryOptions = useMemo(
    () => Array.from(new Set(templates.map(t => t.category))),
    [templates]
  );

  const creatorOptions = useMemo(
    () => Array.from(new Set(templates.map(t => t.creator))),
    [templates]
  );

 const sortOptions = useMemo<
  {
    label: string;
    key: keyof Template;
    order: "asc" | "desc";
  }[]
>(
  () => [
    {
      label: "Popularity",
      key: "usageCount",
      order: "desc",
    },
    {
      label: "Newest",
      key: "createdAt",
      order: "desc",
    },
    {
      label: "Alphabetical",
      key: "id",
      order: "asc",
    },
  ],
  []
);

  const filterOptions = useMemo<
  {
    label: string;
    key: keyof Template;
    values: string[];
  }[]
>(
    () => [
      {
        label: "Category",
        key: "category",
        values: Array.from(new Set(templates.map(t => t.category))),
      },
      {
        label: "Tags",
        key: "tags",
        values: [
          "#Puzzle","#Multiplayer","#Strategy","#Adventure","#Casual",
          "#Arcade","#Educational","#Action","#RPG","#Simulation"
        ],
      },
    ],
    [templates]
  );

  const handleChange = useCallback((filtered: Template[]) => {
    setFilteredTemplates(filtered);
  }, []);

  return (
    <div className="animate-fade-in c-background min-h-screen p-6">
       
       <h3 className="text-xl font-semibold text-center ">Enhance your creations with AI</h3>
<div className="flex justify-end mb-4">
      <button
        onClick={() =>(alert("AI Templates help you make advanced predictive games using a diverse range of models."))}
        className="bg-right p-2 bg-gray-500 rounded-full hover:bg-gray-700 transition"
      >
        <FaInfoCircle  />
      </button>
      </div>
      
<Carousel cardWidth={280}>
  {aiTemplates.map(t => (
    <AITemplateCard
      key={t.id}
      id={t.id}
      name={t.name}
      model={t.model}
      image={t.image}
    />
  ))}
</Carousel>

<h2 className="text-xl font-semibold mt-6 text-center">Explore Templates</h2>
<p className="text-gray-800 mb-4 text-center">Premade UI and game logic, alter easily to  meet your needs.</p>
      <SearchSortFilter<Template>
        items={templates}
        searchKey="id"
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        onChange={handleChange}
      />

      <TemplateGrid
        templates={filteredTemplates}
        favoriteTemplates={favoriteGames}
        onFavorite={onFavorite}
      />
    </div>

    
  );
};

export default CreatorPage;
