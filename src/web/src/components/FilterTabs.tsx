import React from 'react';
import { LayoutGrid, Circle, CheckCircle2 } from 'lucide-react';

export type FilterType = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all' as FilterType, label: 'Hepsi', icon: LayoutGrid },
    { id: 'active' as FilterType, label: 'Devam Eden', icon: Circle },
    { id: 'completed' as FilterType, label: 'Tamamlanan', icon: CheckCircle2 },
  ];

  return (
    <div className="filter-tabs">
      {filters.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`filter-tab ${activeFilter === id ? 'active' : ''}`}
          onClick={() => onFilterChange(id)}
        >
          <Icon size={16} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
