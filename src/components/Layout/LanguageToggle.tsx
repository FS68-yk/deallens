import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };
  
  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150 ease-in-out flex items-center"
      aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Globe size={20} className="text-gray-600 mr-2" />
      <span className="text-sm text-gray-600">
        {language === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  );
};

export default LanguageToggle;