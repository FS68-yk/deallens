import React from 'react';
import { Project } from '../../types/types';
import { format } from 'date-fns';
import { ArrowLeft, Globe, MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  const { t, language } = useLanguage();
  
  return (
    <div className="glass-card rounded-2xl shadow-2xl mb-6 overflow-hidden">
      {/* Header with background and logo */}
      <div className="h-48 bg-gradient-to-r from-blue-600/30 to-purple-600/30 relative backdrop-blur-sm">
        <div className="absolute inset-0 p-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-accent-100 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>{t('project.backToDashboard')}</span>
          </Link>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-white text-primary-600 flex items-center justify-center text-2xl font-bold shadow-md">
                  {project.name.charAt(0)}
                </div>
              )}
              <div className="ml-5">
                <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                <div className="flex items-center mt-1 text-white/80">
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                    {project.industry}
                  </span>
                  {project.website && (
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center ml-4 hover:text-white"
                    >
                      <Globe size={14} className="mr-1" />
                      <span>{project.website.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                  {project.location && (
                    <div className="flex items-center ml-4">
                      <MapPin size={14} className="mr-1" />
                      <span>{project.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
                {t('project.trackDeal')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key metrics section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        <div className="flex flex-col">
          <span className="text-sm text-white/70 flex items-center">
            <Calendar size={14} className="mr-1.5" />
            {t('project.lastUpdated')}
          </span>
          <span className="text-white font-medium mt-1">
            {format(new Date(project.updatedAt), language === 'zh' ? 'yyyy年MM月dd日' : 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-white/70 flex items-center">
            <DollarSign size={14} className="mr-1.5" />
            {t('project.valuation')}
          </span>
          <span className="text-white font-medium mt-1">{project.valuation}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-white/70">{t('project.stage')}</span>
          <span className="text-white font-medium mt-1">{project.stage}</span>
        </div>
        
        {project.financials.revenueGrowth > 0 && (
          <div className="flex flex-col">
            <span className="text-sm text-white/70 flex items-center">
              <TrendingUp size={14} className="mr-1.5" />
              {t('project.revenueGrowth')}
            </span>
            <span className="text-green-400 font-medium mt-1">
              {project.financials.revenueGrowth}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHeader;