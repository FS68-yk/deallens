import React from 'react';
import { Founder } from '../../types/types';
import { User, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FoundersInfoProps {
  founders: Founder[];
}

const FoundersInfo: React.FC<FoundersInfoProps> = ({ founders }) => {
  const { t, language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-primary-800">{t('project.foundingTeam')}</h2>
        <p className="text-gray-500 text-sm mt-1">{t('project.keyPeopleBehind')}</p>
      </div>

      <div className="p-6">
        {founders.length === 0 ? (
          <p className="text-center text-gray-500">{t('project.noFounderInfo')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:border-primary-200 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <User size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-primary-800">{founder.name}</h3>
                    <p className="text-sm text-primary-600 mb-2">{founder.role}</p>
                    <p className="text-sm text-gray-600 mb-3">{founder.background}</p>
                    
                    {founder.linkedIn && (
                      <a 
                        href={founder.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                      >
                        <Linkedin size={14} className="mr-1.5" />
                        {language === 'zh' ? 'LinkedIn 档案' : 'LinkedIn Profile'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundersInfo;