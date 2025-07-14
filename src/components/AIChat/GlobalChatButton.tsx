import React, { useState } from 'react';
import { MessageSquare, X, Minimize, Maximize, BrainCircuit } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ChatWithDataInterface from '../Project/ChatWithDataInterface';

const GlobalChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { language } = useLanguage();
  
  // 创建一个模拟项目对象用于全局聊天，实际应用中这可能来自上下文或API
  const dummyProject = {
    id: 'global-chat',
    name: 'DealLens Assistant',
    industry: 'Investment',
    stage: '',
    valuation: '',
    description: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    founders: [],
    documents: [],
    tags: [],
    financials: {
      revenueGrowth: 0,
      burn: 0,
      runway: 0,
      previousRound: {
        date: null,
        amount: 0,
        valuation: 0,
        investors: [],
      },
    },
  };

  return (
    <>
      {/* 聊天按钮 - Make it responsive and adjust for mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2.5 shadow-lg transition-all duration-300 z-50"
          aria-label="Open AI Assistant"
        >
          <BrainCircuit size={22} />
        </button>
      )}

      {/* 聊天窗口 - Make it fully responsive */}
      {isOpen && (
        <div
          className={`
            fixed z-50 transition-all duration-300 bg-white rounded-lg shadow-xl
            ${isMinimized ? 'h-12 bottom-4 right-4 w-64' : 'bottom-0 right-0 sm:bottom-4 sm:right-4'}
            ${isMinimized ? '' : 'sm:w-96 sm:h-[550px] w-full h-[90vh]'}
          `}
        >
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-primary-600 text-white rounded-t-lg">
            <div className="flex items-center">
              <BrainCircuit size={18} className="mr-2" />
              <span className="font-medium">
                {language === 'zh' ? 'DealLens 智能助手' : 'DealLens AI Assistant'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-primary-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="h-[calc(100%-48px)] overflow-hidden">
              <ChatWithDataInterface project={dummyProject} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GlobalChatButton;