import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Lightbulb, TrendingUp, ArrowRight, BrainCircuit, Target, BarChart2, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AIGlobalInsights: React.FC = () => {
  const { language } = useLanguage();
  const { projects } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState<any[]>([]);
  
  // Simulate loading insights
  useEffect(() => {
    const loadInsights = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate insights based on portfolio data
      const generatedInsights = [
        {
          id: 'insight-1',
          type: 'opportunity',
          title: language === 'zh' ? '投资机会检测' : 'Investment Opportunity Detected',
          content: language === 'zh' 
            ? `${projects[2].name}在${projects[2].industry}领域展现出超出预期的增长潜力，由于其最近的技术突破和市场反馈积极。建议重点关注。` 
            : `${projects[2].name} is showing above-expected growth potential in the ${projects[2].industry} space due to recent technical breakthroughs and positive market feedback. Worth prioritizing.`,
          score: 87,
          icon: <Target size={18} className="text-primary-600" />
        },
        {
          id: 'insight-2',
          type: 'trend',
          title: language === 'zh' ? '行业趋势警报' : 'Industry Trend Alert',
          content: language === 'zh' 
            ? '人工智能和可持续能源交叉领域正在出现新的投资趋势，预计未来18个月内将增长32%。建议探索相关投资机会。' 
            : 'Emerging investment trend in the intersection of AI and sustainable energy, projected to grow 32% over the next 18 months. Consider exploring opportunities in this space.',
          score: 81,
          icon: <TrendingUp size={18} className="text-success-600" />
        },
        {
          id: 'insight-3',
          type: 'risk',
          title: language === 'zh' ? '投资组合风险分析' : 'Portfolio Risk Analysis',
          content: language === 'zh' 
            ? '当前投资组合在金融科技领域集中度高(42%)，建议分散投资到其他快速增长行业以降低相关性风险。' 
            : 'Current portfolio shows high concentration in fintech (42%). Consider diversifying into other fast-growing sectors to reduce correlation risk.',
          score: 73,
          icon: <BarChart2 size={18} className="text-warning-600" />
        },
        {
          id: 'insight-4',
          type: 'prediction',
          title: language === 'zh' ? '市场预测' : 'Market Prediction',
          content: language === 'zh' 
            ? 'AI分析预测HealthTech行业在未来6个月内将经历融资增长，这可能影响您投资组合中的MedVR估值。' 
            : 'AI analysis predicts a funding surge in HealthTech over the next 6 months, which may impact valuation for MedVR in your portfolio.',
          score: 78,
          icon: <Zap size={18} className="text-accent-400" />
        }
      ];
      
      setInsights(generatedInsights);
      setIsLoading(false);
    };
    
    loadInsights();
  }, [projects, language]);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center h-48">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-2"></div>
          <p className="text-gray-500 text-sm">
            {language === 'zh' ? '正在生成智能洞察...' : 'Generating insights...'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <BrainCircuit size={18} className="text-primary-600 mr-2" />
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? 'AI 全局智能洞察' : 'AI Global Insights'}
          </h3>
        </div>
        <span className="text-xs bg-success-100 text-success-800 px-2 py-0.5 rounded-full">
          {language === 'zh' ? '实时' : 'Live'}
        </span>
      </div>
      
      <div>
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 flex-shrink-0">
                {insight.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-primary-800">{insight.title}</h4>
                  <div className="text-xs font-semibold bg-primary-50 text-primary-700 rounded-full px-1.5 py-0.5">
                    {insight.score}/100
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{insight.content}</p>
                
                {insight.type === 'opportunity' && (
                  <div className="flex justify-end">
                    <button className="text-xs text-primary-600 hover:text-primary-800 flex items-center">
                      {language === 'zh' ? '详细分析' : 'Detailed Analysis'}
                      <ArrowRight size={12} className="ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-100 p-3 bg-gray-50">
        <button className="w-full text-sm text-primary-600 hover:text-primary-800 flex items-center justify-center">
          <Lightbulb size={14} className="mr-1.5" />
          {language === 'zh' ? '查看所有智能洞察' : 'View All Insights'}
        </button>
      </div>
    </div>
  );
};

export default AIGlobalInsights;