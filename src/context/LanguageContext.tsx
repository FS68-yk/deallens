import React, { createContext, useContext, useState, ReactNode } from 'react';
import { zhCN } from '../i18n/zh-CN';
import { enUS } from '../i18n/en-US';

// 支持的语言
export type Language = 'zh' | 'en';

// 语言数据类型
export type TranslationData = {
  [key: string]: string | TranslationData;
};

// 语言上下文类型
interface LanguageContextType {
  language: Language;
  translations: TranslationData;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

// 创建上下文
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 提供语言的 Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// 语言数据字典
const translations = {
  zh: zhCN,
  en: enUS,
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 默认使用中文
  const [language, setLanguage] = useState<Language>('zh');
  
  // 获取当前语言的翻译
  const currentTranslations = translations[language];
  
  // 获取翻译的函数
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value for key "${key}" is not a string:`, value);
      return key;
    }
    
    // Replace parameters if they exist
    if (params) {
      return Object.keys(params).reduce((str, param) => {
        return str.replace(`{${param}}`, params[param].toString());
      }, value);
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      translations: currentTranslations, 
      setLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};