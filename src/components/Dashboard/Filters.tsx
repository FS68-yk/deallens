import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { filterGroups } from '../../data/mockData';
import { ChevronDown, X, Filter } from 'lucide-react';

const Filters: React.FC = () => {
  const { activeFilters, toggleFilter, clearFilters } = useAppContext();
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Industry', 'Stage', 'Valuation']);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  return (
    <div className="glass-card rounded-2xl shadow-2xl">
      <div className="p-4 sm:p-5 border-b border-white/20 flex justify-between items-center">
        <button 
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="flex items-center text-white font-medium hover:text-white/80 transition-colors duration-200"
        >
          <Filter size={16} className="mr-2" />
          {t('common.filters')}
          {totalActiveFilters > 0 && (
            <span className="ml-2 glass text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {totalActiveFilters}
            </span>
          )}
          <ChevronDown 
            size={16} 
            className={`ml-2 transition-transform ${isFilterPanelOpen ? 'transform rotate-180' : ''}`} 
          />
        </button>
        
        {totalActiveFilters > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-white/80 hover:text-white flex items-center transition-colors duration-200"
          >
            <X size={14} className="mr-1" />
            {t('common.clearAll')}
          </button>
        )}
      </div>

      {isFilterPanelOpen && (
        <div className="p-3 sm:p-4 animate-fade-in">
          <div className="space-y-4 sm:space-y-5">
            {filterGroups.map((group) => (
              <div key={group.title} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <button
                  className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-2"
                  onClick={() => toggleSection(group.title)}
                >
                  <span>{t(`common.${group.type}Filter`)}</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      expandedSections.includes(group.title) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSections.includes(group.title) && (
                  <div className="space-y-2 pl-1 animate-fade-in">
                    {group.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                            checked={activeFilters[group.type].includes(option.value)}
                            onChange={() => toggleFilter(group.type, option.value)}
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {option.label}
                            <span className="text-gray-400 ml-1">({option.count})</span>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;