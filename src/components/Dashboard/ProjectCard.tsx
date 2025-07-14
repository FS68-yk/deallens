import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types/types';
import { Calendar, FileText, Briefcase, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  // Generate background style based on industry
  const getCardBackground = (industry: string) => {
    const backgrounds = {
      Fintech: "bg-gradient-to-r from-blue-600 to-indigo-700",
      CleanTech: "bg-gradient-to-r from-green-600 to-emerald-700",
      HealthTech: "bg-gradient-to-r from-teal-600 to-cyan-700",
      Cybersecurity: "bg-gradient-to-r from-purple-600 to-indigo-700",
      AgTech: "bg-gradient-to-r from-lime-600 to-green-700",
      default: "bg-gradient-to-r from-primary-600 to-primary-700"
    };
    
    return backgrounds[industry as keyof typeof backgrounds] || backgrounds.default;
  };

  // Get overlay pattern based on industry
  const getOverlayPattern = (industry: string) => {
    switch(industry) {
      case 'Fintech':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" 
                 style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
            </div>
          </div>
        );
      case 'CleanTech':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" 
                 style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }}>
            </div>
          </div>
        );
      case 'HealthTech':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full"
                 style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(255,255,255,0.12) 2px, transparent 0), radial-gradient(circle at 25px 25px, rgba(255,255,255,0.12) 2px, transparent 0)', backgroundSize: '30px 30px' }}>
            </div>
          </div>
        );
      case 'Cybersecurity':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px)' }}>
            </div>
          </div>
        );
      case 'AgTech':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" 
                 style={{ backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full"
                 style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }}>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden card-shadow cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Logo/Header area with enhanced background */}
        <div className={`h-24 sm:h-32 ${getCardBackground(project.industry)} relative overflow-hidden flex items-center justify-center`}>
          {/* Overlay pattern */}
          {getOverlayPattern(project.industry)}
          
          {/* Animated subtle gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
          
          {/* Logo */}
          {project.logo ? (
            <img 
              src={project.logo} 
              alt={`${project.name} logo`} 
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-white shadow-md relative z-10"
              loading="lazy"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-primary-600 flex items-center justify-center text-xl font-bold shadow-md relative z-10">
              {project.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Industry badge */}
        <div className="absolute top-3 right-3 bg-white/90 text-primary-600 px-2 py-1 rounded text-xs font-medium shadow-sm">
          {project.industry}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-primary-800 line-clamp-1">{project.name}</h3>
        
        <div className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4">
          {project.description}
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Briefcase size={14} className="mr-1.5 text-primary-500 flex-shrink-0" />
            <span className="truncate">{project.stage}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <DollarSign size={14} className="mr-1.5 text-accent-500 flex-shrink-0" />
            <span className="truncate">{project.valuation}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <FileText size={14} className="mr-1.5 text-secondary-500 flex-shrink-0" />
            <span className="truncate">{project.documents.length} {t('project.documents').toLowerCase()}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Calendar size={14} className="mr-1.5 text-gray-500 flex-shrink-0" />
            <span className="truncate">{format(new Date(project.updatedAt), language === 'zh' ? 'MM月dd日' : 'MMM d')}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs truncate"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;