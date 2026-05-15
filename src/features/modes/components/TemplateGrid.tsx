// components/TemplateGrid.tsx
import React from 'react';
import { Template } from '../../../shared/types/types';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  favoriteTemplates: string[];
  onFavorite: (TemplateId: string) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  favoriteTemplates,
  onFavorite,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {templates.map(template => (
      <TemplateCard
        key={template.id}
        template={template}
        onFavorite={onFavorite}
      />
    ))}
  </div>
);

export default TemplateGrid;
