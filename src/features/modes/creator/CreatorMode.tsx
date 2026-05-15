import React, { useState, useMemo, useCallback } from "react";
import { Template } from "../../../types/types"; // adjust types
import TemplateGrid from "../components/TemplateGrid"; // reuse if templates are similar
import SearchSortFilter from "../components/SearchSortFilter";
import "../modes.css"

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
    <div className="animate-fade-in c-background page-container">
            
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
