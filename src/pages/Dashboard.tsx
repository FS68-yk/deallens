import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from '../components/Dashboard/ProjectCard';
import Filters from '../components/Dashboard/Filters';
import { Filter } from 'lucide-react';
import AIGlobalInsights from '../components/AIChat/AIGlobalInsights';
import DealLensLogo from '../components/Layout/DealLensLogo';

const Dashboard: React.FC = () => {
  const { projects, activeFilters, searchTerm } = useAppContext();
  const { t } = useLanguage();

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // First apply search filter if any
      if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Then apply category filters
      if (activeFilters.industry.length > 0 && !activeFilters.industry.includes(project.industry)) {
        return false;
      }
      
      if (activeFilters.stage.length > 0 && !activeFilters.stage.includes(project.stage)) {
        return false;
      }
      
      if (activeFilters.valuation.length > 0 && !activeFilters.valuation.includes(project.valuation)) {
        return false;
      }
      
      return true;
    });
  }, [projects, activeFilters, searchTerm]);

  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-800">{t('common.investmentProjects')}</h1>
        <div className="text-sm text-gray-500">
          {t('common.projects_count', { count: filteredProjects.length })} {hasActiveFilters && t('common.projects_filtered')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters and Insights sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-6">
            {/* Filters with collapsible panel */}
            <Filters />
            
            {/* AI Global Insights component */}
            <div className="mt-6">
              <AIGlobalInsights />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <DealLensLogo size="large" variant="default" showText={false} />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">{t('common.noProjectsFound')}</h3>
              <p className="text-gray-500">
                {searchTerm ? t('common.tryAdjusting') : t('common.tryAdjusting')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;