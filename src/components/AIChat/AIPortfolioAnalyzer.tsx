import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle, 
  PieChart, BarChart2, DollarSign, ArrowRight, RefreshCw 
} from 'lucide-react';

const AIPortfolioAnalyzer: React.FC = () => {
  const { language } = useLanguage();
  const { projects } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Portfolio distribution by industry
  const [industryDistribution, setIndustryDistribution] = useState<{industry: string, percentage: number, count: number}[]>([]);
  
  // Portfolio risk analysis
  const [riskAnalysis, setRiskAnalysis] = useState({
    diversificationScore: 0,
    concentrationRisk: 0,
    liquidityRisk: 0,
    marketTrend: 0,
    overallRisk: 0
  });
  
  // Stage distribution
  const [stageDistribution, setStageDistribution] = useState<{stage: string, count: number, percentage: number}[]>([]);
  
  // Performance indicators
  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalValuation: 0,
    averageGrowth: 0,
    projectedReturn: 0,
    healthScore: 0
  });
  
  useEffect(() => {
    const analyzePortfolio = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate industry distribution
      const industries: Record<string, number> = {};
      projects.forEach(project => {
        industries[project.industry] = (industries[project.industry] || 0) + 1;
      });
      
      const industryDist = Object.entries(industries).map(([industry, count]) => ({
        industry,
        count,
        percentage: Math.round((count / projects.length) * 100)
      }));
      
      // Calculate stage distribution
      const stages: Record<string, number> = {};
      projects.forEach(project => {
        stages[project.stage] = (stages[project.stage] || 0) + 1;
      });
      
      const stageDist = Object.entries(stages).map(([stage, count]) => ({
        stage,
        count,
        percentage: Math.round((count / projects.length) * 100)
      }));
      
      // Calculate performance metrics
      // This is simplified for demo - in a real app, would use actual valuation figures
      const totalValuationEstimate = projects.reduce((sum, project) => {
        // Extract the numeric range from valuation strings like "$25-50M"
        const valMatch = project.valuation.match(/\$(\d+)-(\d+)M/);
        if (valMatch && valMatch.length >= 3) {
          const avgVal = (parseInt(valMatch[1]) + parseInt(valMatch[2])) / 2;
          return sum + avgVal * 1000000;
        }
        return sum;
      }, 0);
      
      const avgGrowth = projects.reduce((sum, project) => sum + (project.financials.revenueGrowth || 0), 0) / projects.length;
      
      // Set the calculated values
      setIndustryDistribution(industryDist);
      setStageDistribution(stageDist);
      
      setRiskAnalysis({
        diversificationScore: calculateDiversificationScore(industryDist),
        concentrationRisk: calculateConcentrationRisk(industryDist),
        liquidityRisk: Math.floor(Math.random() * 30) + 40, // 40-70
        marketTrend: Math.floor(Math.random() * 40) + 60, // 60-100
        overallRisk: Math.floor(Math.random() * 20) + 50 // 50-70
      });
      
      setPerformanceMetrics({
        totalValuation: totalValuationEstimate,
        averageGrowth: avgGrowth,
        projectedReturn: Math.floor(Math.random() * 100) + 150, // 150-250% 
        healthScore: Math.floor(Math.random() * 20) + 70 // 70-90
      });
      
      setLastUpdated(new Date());
      setIsLoading(false);
    };
    
    analyzePortfolio();
  }, [projects]);
  
  // Helper function to calculate diversification score
  const calculateDiversificationScore = (industries: {industry: string, percentage: number}[]): number => {
    if (industries.length <= 1) return 30; // Low diversification
    if (industries.length === 2) return 50; // Moderate
    if (industries.length >= 5) return 90; // High diversification
    return 70; // Good diversification
  };
  
  // Helper function to calculate concentration risk
  const calculateConcentrationRisk = (industries: {industry: string, percentage: number}[]): number => {
    const maxPercentage = Math.max(...industries.map(i => i.percentage));
    if (maxPercentage > 60) return 80; // High risk
    if (maxPercentage > 40) return 60; // Medium risk
    return 30; // Low risk
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center h-72">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-2"></div>
          <p className="text-gray-500 text-sm">
            {language === 'zh' ? '正在生成投资组合分析...' : 'Generating portfolio analysis...'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-primary-800">
          {language === 'zh' ? 'AI 投资组合分析' : 'AI Portfolio Analysis'}
        </h3>
        <div className="flex items-center text-xs text-gray-500">
          <span>{language === 'zh' ? '更新于:' : 'Updated:'} {lastUpdated.toLocaleTimeString()}</span>
          <button className="ml-2 p-1 text-gray-400 hover:text-primary-600 rounded hover:bg-gray-100">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
      
      {/* Performance metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">
            {language === 'zh' ? '估计总估值' : 'Est. Total Valuation'}
          </div>
          <div className="text-lg font-semibold text-primary-800">
            ${(performanceMetrics.totalValuation / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">
            {language === 'zh' ? '平均增长率' : 'Avg. Growth Rate'}
          </div>
          <div className="text-lg font-semibold text-success-600">
            {performanceMetrics.averageGrowth.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">
            {language === 'zh' ? '预计回报(3年)' : 'Proj. Return (3Y)'}
          </div>
          <div className="text-lg font-semibold text-primary-800">
            {performanceMetrics.projectedReturn}%
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">
            {language === 'zh' ? '投资组合健康度' : 'Portfolio Health'}
          </div>
          <div className="flex items-center">
            <span className="text-lg font-semibold text-primary-800">
              {performanceMetrics.healthScore}/100
            </span>
            {performanceMetrics.healthScore >= 70 ? 
              <CheckCircle size={14} className="ml-1.5 text-success-600" /> : 
              <AlertCircle size={14} className="ml-1.5 text-warning-600" />
            }
          </div>
        </div>
      </div>
      
      {/* Industry Distribution */}
      <div className="border-t border-gray-100">
        <div className="p-4">
          <h4 className="font-medium text-sm text-gray-700 mb-3">
            {language === 'zh' ? '行业分布' : 'Industry Distribution'}
          </h4>
          <div className="space-y-3">
            {industryDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' :
                  index === 3 ? 'bg-orange-500' :
                  'bg-pink-500'
                }`}></div>
                <div className="flex-1 text-sm text-gray-700 flex items-center justify-between">
                  <span>{item.industry}</span>
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Risk Analysis */}
      <div className="border-t border-gray-100">
        <div className="p-4">
          <h4 className="font-medium text-sm text-gray-700 mb-3">
            {language === 'zh' ? '风险分析' : 'Risk Analysis'}
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-700">
                  {language === 'zh' ? '多元化程度' : 'Diversification'}
                </span>
                <div className="flex items-center">
                  {riskAnalysis.diversificationScore >= 70 ? 
                    <TrendingUp size={12} className="text-success-600 mr-1" /> : 
                    <TrendingDown size={12} className="text-error-600 mr-1" />
                  }
                  <span className={riskAnalysis.diversificationScore >= 70 ? 'text-success-600' : 'text-error-600'}>
                    {riskAnalysis.diversificationScore}/100
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full">
                <div 
                  className={`h-1.5 rounded-full ${riskAnalysis.diversificationScore >= 70 ? 'bg-success-500' : 'bg-warning-500'}`} 
                  style={{width: `${riskAnalysis.diversificationScore}%`}}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-700">
                  {language === 'zh' ? '集中度风险' : 'Concentration Risk'}
                </span>
                <div className="flex items-center">
                  {riskAnalysis.concentrationRisk <= 40 ? 
                    <TrendingDown size={12} className="text-success-600 mr-1" /> : 
                    <TrendingUp size={12} className="text-error-600 mr-1" />
                  }
                  <span className={riskAnalysis.concentrationRisk <= 40 ? 'text-success-600' : 'text-error-600'}>
                    {riskAnalysis.concentrationRisk}/100
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full">
                <div 
                  className={`h-1.5 rounded-full ${riskAnalysis.concentrationRisk <= 40 ? 'bg-success-500' : 'bg-error-500'}`} 
                  style={{width: `${riskAnalysis.concentrationRisk}%`}}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-700">
                  {language === 'zh' ? '整体风险评估' : 'Overall Risk Assessment'}
                </span>
                <div className="flex items-center">
                  {riskAnalysis.overallRisk <= 60 ? 
                    <CheckCircle size={12} className="text-success-600 mr-1" /> : 
                    <AlertCircle size={12} className="text-warning-600 mr-1" />
                  }
                  <span className={riskAnalysis.overallRisk <= 60 ? 'text-success-600' : 'text-warning-600'}>
                    {riskAnalysis.overallRisk}/100
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full">
                <div 
                  className={`h-1.5 rounded-full ${
                    riskAnalysis.overallRisk <= 40 ? 'bg-success-500' : 
                    riskAnalysis.overallRisk <= 70 ? 'bg-warning-500' : 
                    'bg-error-500'
                  }`} 
                  style={{width: `${riskAnalysis.overallRisk}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="p-4">
          <h4 className="font-medium text-sm text-gray-700 mb-2">
            {language === 'zh' ? 'AI 建议' : 'AI Recommendations'}
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                <BarChart2 size={12} />
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' 
                  ? '考虑增加医疗科技领域的配置以提高多元化程度' 
                  : 'Consider increasing allocation to HealthTech to improve diversification'}
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                <PieChart size={12} />
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' 
                  ? '优化后期阶段和早期项目的平衡，建议增加A轮项目比例' 
                  : 'Optimize balance between late and early stage - consider more Series A investments'}
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                <DollarSign size={12} />
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' 
                  ? '关注现有项目的后续融资机会，特别是NeuralFinance的下一轮' 
                  : 'Monitor follow-on funding opportunities in existing investments, especially NeuralFinance\'s next round'}
              </p>
            </li>
          </ul>
          
          <div className="mt-3 text-center">
            <button className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center mx-auto">
              {language === 'zh' ? '查看详细投资组合分析' : 'View Detailed Portfolio Analysis'}
              <ArrowRight size={12} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPortfolioAnalyzer;