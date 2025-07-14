import React, { useState } from 'react';
import { Project } from '../../types/types';
import { FileText, Users, BarChart3, Building, BrainCircuit, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '../../context/LanguageContext';
import DocumentsList from './DocumentsList';
import FoundersInfo from './FoundersInfo';
import AIAnalysisPanel from './AIAnalysisPanel';
import ChatWithDataInterface from './ChatWithDataInterface';

interface ProjectTabsProps {
  project: Project;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { t, language } = useLanguage();

  const tabs = [
    { id: 'overview', label: t('project.overview'), icon: <FileText size={16} /> },
    { id: 'team', label: t('project.team'), icon: <Users size={16} /> },
    { id: 'financials', label: t('project.financials'), icon: <BarChart3 size={16} /> },
    { id: 'competitors', label: t('project.competitors'), icon: <Building size={16} /> },
    { id: 'ai_analysis', label: language === 'zh' ? 'AI 智能分析' : 'AI Analysis', icon: <BrainCircuit size={16} /> },
    { id: 'chat', label: language === 'zh' ? '智能对话' : 'AI Chat', icon: <MessageSquare size={16} /> }
  ];

  return (
    <div>
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-1 py-3 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('project.projectOverview')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium text-primary-700 mb-2">{t('project.tags')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 概览页面中嵌入简洁版AI分析面板 */}
            <AIAnalysisPanel project={project} compact={true} setActiveTab={setActiveTab} />

            <DocumentsList documents={project.documents} />
          </div>
        )}

        {activeTab === 'team' && (
          <FoundersInfo founders={project.founders} />
        )}

        {activeTab === 'financials' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('project.financialInformation')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">{t('project.revenueGrowth')}</div>
                  <div className={`text-xl font-semibold ${project.financials.revenueGrowth > 0 ? 'text-success-600' : 'text-gray-800'}`}>
                    {project.financials.revenueGrowth}%
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">{t('project.monthlyBurn')}</div>
                  <div className="text-xl font-semibold text-error-600">
                    ${(project.financials.burn / 1000).toFixed(1)}k
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">{t('project.runway')}</div>
                  <div className="text-xl font-semibold text-primary-700">
                    {project.financials.runway} {language === 'zh' ? '个月' : 'months'}
                  </div>
                </div>
              </div>
              
              {project.financials.previousRound.date && (
                <div className="mt-8">
                  <h3 className="text-md font-medium text-primary-700 mb-3">{t('project.previousFundingRound')}</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{t('project.date')}</div>
                        <div className="font-medium">
                          {format(new Date(project.financials.previousRound.date), language === 'zh' ? 'yyyy年MM月dd日' : 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{t('project.amount')}</div>
                        <div className="font-medium">
                          ${(project.financials.previousRound.amount / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{t('project.valuation')}</div>
                        <div className="font-medium">
                          ${(project.financials.previousRound.valuation / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 mb-2">{t('project.investors')}</div>
                      <div className="flex flex-wrap gap-2">
                        {project.financials.previousRound.investors.map((investor, index) => (
                          <span 
                            key={index}
                            className="bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-sm"
                          >
                            {investor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'competitors' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('project.competitiveLandscape')}</h2>
              
              {project.competitors && project.competitors.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    {t('project.keyCompetitors', { industry: project.industry, name: project.name })}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.competitors.map((competitor, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
                        <h3 className="font-medium text-primary-700">{competitor}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {language === 'zh' ? '竞争对手' : 'Competitor'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">{t('project.noCompetitorInfo')}</p>
              )}
            </div>
          </div>
        )}

        {/* 完整的 AI 分析面板 */}
        {activeTab === 'ai_analysis' && (
          <AIAnalysisPanel project={project} compact={false} />
        )}
        
        {/* 智能对话接口 */}
        {activeTab === 'chat' && (
          <ChatWithDataInterface project={project} />
        )}
      </div>
    </div>
  );
};

export default ProjectTabs;