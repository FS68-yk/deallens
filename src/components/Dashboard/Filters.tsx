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
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-3 sm:p-4 border-b border-gray-100 flex justify-between items-center">
        <button 
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="flex items-center text-primary-800 font-medium hover:text-primary-700"
        >
          <Filter size={16} className="mr-2" />
          {t('common.filters')}
          {totalActiveFilters > 0 && (
            <span className="ml-2 bg-primary-100 text-primary-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
            className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
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