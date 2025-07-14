import React, { useState } from 'react';
import { Project } from '../../types/types';
import { BrainCircuit, ExternalLink, TrendingUp, AlertTriangle, Check, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import HexagonChart from './HexagonChart';

interface AIAnalysisPanelProps {
  project: Project;
  compact?: boolean;
  setActiveTab?: (tab: string) => void;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ project, compact = false, setActiveTab }) => {
  const { language } = useLanguage();
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [showScoreExplanations, setShowScoreExplanations] = useState<boolean>(false);

  // Generate external data if not available in the project
  const externalData = project.externalData || generateDefaultExternalData(project);

  // Ensure projectScores is always defined
  const projectScores = externalData?.projectScores || {
    teamScore: 85,
    productScore: 78,
    marketScore: 92,
    financialScore: 70,
    tractonScore: 65,
    socialScore: 60
  };

  // Ensure aiInsights is always defined
  const aiInsights = externalData?.aiInsights || generateDefaultAIInsights(project);
  
  // Score explanations
  const scoreExplanations = {
    teamScore: {
      zh: `团队评分 ${projectScores.teamScore}%：基于创始人背景、行业经验、过往成就和团队完整性。${project.name}的团队在${project.industry}行业有深厚背景，但可能需要在某些关键职能上加强。`,
      en: `Team Score ${projectScores.teamScore}%: Based on founder background, industry experience, past achievements, and team completeness. ${project.name}'s team has strong ${project.industry} industry background but may need strengthening in certain key functions.`
    },
    productScore: {
      zh: `产品评分 ${projectScores.productScore}%：评估产品技术创新性、市场契合度、用户体验和知识产权保护。产品在技术方面表现出色，但用户体验仍有改进空间。`,
      en: `Product Score ${projectScores.productScore}%: Evaluates product technical innovation, market fit, user experience, and IP protection. The product excels technically but has room for improvement in user experience.`
    },
    marketScore: {
      zh: `市场评分 ${projectScores.marketScore}%：分析目标市场规模、增长率、进入壁垒和市场动态。${project.industry}市场增长迅速，项目定位良好，具有显著机会。`,
      en: `Market Score ${projectScores.marketScore}%: Analyzes target market size, growth rate, entry barriers, and market dynamics. The ${project.industry} market is growing rapidly with good positioning and significant opportunity.`
    },
    financialScore: {
      zh: `财务评分 ${projectScores.financialScore}%：基于收入增长、盈利能力、燃烧率、现金流和预测准确性。项目显示强劲增长，但需关注燃烧率控制。`,
      en: `Financial Score ${projectScores.financialScore}%: Based on revenue growth, profitability, burn rate, cash flow, and forecast accuracy. Shows strong growth but needs attention to burn rate control.`
    },
    tractionScore: {
      zh: `增长牵引力 ${projectScores.tractonScore}%：衡量客户获取、保留率、收入增长和市场验证。客户保留率良好，但获客成本高于行业平均。`,
      en: `Traction Score ${projectScores.tractonScore}%: Measures customer acquisition, retention rates, revenue growth, and market validation. Good retention rates but higher than average customer acquisition costs.`
    },
    socialScore: {
      zh: `社交影响力 ${projectScores.socialScore}%：评估社交媒体存在感、行业影响力、媒体覆盖和品牌认知。需要增强社交媒体战略和行业影响力。`,
      en: `Social Score ${projectScores.socialScore}%: Evaluates social media presence, industry influence, media coverage, and brand awareness. Needs enhancement in social media strategy and industry influence.`
    }
  };

  // 计算平均分
  const calculateAverageScore = () => {
    const scores = projectScores;
    
    const total = scores.teamScore + scores.productScore + scores.marketScore + 
                  scores.financialScore + scores.tractonScore + scores.socialScore;
    return Math.round(total / 6);
  };
  
  // 获取投资建议
  const getInvestmentRecommendation = () => {
    const avgScore = calculateAverageScore();
    
    if (avgScore >= 85) {
      return language === 'zh' ? '高优先级' : 'High Priority';
    } else if (avgScore >= 75) {
      return language === 'zh' ? '积极考虑' : 'Actively Consider';
    } else if (avgScore >= 65) {
      return language === 'zh' ? '值得关注' : 'Interesting';
    } else if (avgScore >= 55) {
      return language === 'zh' ? '进一步评估' : 'Further Evaluation';
    } else {
      return language === 'zh' ? '暂时观望' : 'Wait and See';
    }
  };

  // Generate default social mentions data if missing
  function generateDefaultSocialMentions(project: Project) {
    return {
      total: 187,
      sentiment: {
        positive: 78,
        neutral: 92,
        negative: 17
      },
      sources: {
        twitter: 68,
        linkedin: 52,
        reddit: 45,
        other: 22
      },
      keyInfluencers: [
        { name: 'Tech Insider', platform: 'Twitter', sentiment: 'positive', followers: '243K' },
        { name: 'Venture Weekly', platform: 'LinkedIn', sentiment: 'neutral', followers: '126K' },
        { name: 'r/startups', platform: 'Reddit', sentiment: 'positive', followers: '980K' }
      ],
      recentMentions: [
        { content: language === 'zh' ? `${project.name}的技术令人印象深刻，可能彻底改变${project.industry}领域` : `${project.name}'s technology is impressive, could be a game-changer in the ${project.industry} industry`, platform: 'Twitter', date: '2天前', sentiment: 'positive' },
        { content: language === 'zh' ? `刚听说${project.name}在寻求新一轮融资，有人了解更多信息吗？` : `Just heard ${project.name} is looking for a new round of funding, anyone know more?`, platform: 'Reddit', date: '4天前', sentiment: 'neutral' }
      ]
    };
  }

  // Generate default market trends data if missing
  function generateDefaultMarketTrends(project: Project) {
    return {
      industryGrowth: `${(Math.random() * 15 + 8).toFixed(1)}%`,
      keyTrends: [
        { trend: language === 'zh' ? '增强隐私的AI' : 'Privacy-enhanced AI', relevance: 'high' },
        { trend: language === 'zh' ? '实时分析' : 'Real-time analytics', relevance: 'high' },
        { trend: language === 'zh' ? '云原生架构' : 'Cloud-native architecture', relevance: 'medium' }
      ],
      risks: [
        { risk: language === 'zh' ? '法规变化' : 'Regulatory changes', impact: 'medium' },
        { risk: language === 'zh' ? '大型科技公司进入市场' : 'Big tech market entry', impact: 'high' }
      ]
    };
  }

  // Generate default AI insights
  function generateDefaultAIInsights(project: Project) {
    return [
      {
        id: 'insight-1',
        title: language === 'zh' ? '团队分析' : 'Team Analysis',
        content: language === 'zh' ? 
          `${project.founders?.[0]?.name || 'The founding team'} 和团队在${project.industry}领域拥有丰富经验，此前的职业背景增加了成功的可能性。团队缺乏资深营销专业人员可能会在产品推广阶段面临挑战。` : 
          `${project.founders?.[0]?.name || 'The founding team'} and the team have strong experience in ${project.industry}, with professional backgrounds that increase likelihood of success. Team lacks senior marketing expertise which may pose challenges in growth stage.`
      },
      {
        id: 'insight-2',
        title: language === 'zh' ? '市场机会' : 'Market Opportunity',
        content: language === 'zh' ? 
          `${project.industry}行业预计在未来5年内以${externalData?.marketTrends?.industryGrowth || '12.5%'}的速度增长，高于平均水平。${project.name}的目标市场规模约为120亿美元，当前渗透率低，具有显著增长空间。` : 
          `The ${project.industry} industry is expected to grow at ${externalData?.marketTrends?.industryGrowth || '12.5%'} over the next 5 years, above average. ${project.name}'s target market size is approximately $12B with low current penetration, indicating significant growth potential.`
      },
      {
        id: 'insight-3',
        title: language === 'zh' ? '竞争定位' : 'Competitive Positioning',
        content: language === 'zh' ? 
          `在${project.competitors ? project.competitors.length : 3}个主要竞争对手中，${project.name}在技术创新方面处于领先地位，但在市场份额方面落后于${project.competitors?.[0] ? project.competitors[0] : '主要竞争对手'}。产品差异化主要体现在专有算法和数据处理能力上。` : 
          `Among ${project.competitors ? project.competitors.length : 3} main competitors, ${project.name} leads in technological innovation but lags behind ${project.competitors?.[0] ? project.competitors[0] : 'major competitors'} in market share. Product differentiation is primarily in proprietary algorithms and data processing capabilities.`
      },
      {
        id: 'insight-4',
        title: language === 'zh' ? '财务预测' : 'Financial Projections',
        content: language === 'zh' ? 
          `基于当前的增长率${project.financials?.revenueGrowth || 0}%，${project.name}预计将在24个月内达到盈亏平衡。当前的燃烧率${project.financials?.burn || 0}美元/月高于行业平均水平，但考虑到增长速度，这是可接受的。建议在未来12个月内优化成本结构。` : 
          `Based on the current growth rate of ${project.financials?.revenueGrowth || 0}%, ${project.name} is projected to reach break-even within 24 months. Current burn rate of $${project.financials?.burn || 0} per month is higher than industry average, but acceptable given the growth rate. Recommend cost structure optimization in the next 12 months.`
      },
      {
        id: 'insight-5',
        title: language === 'zh' ? '社交媒体分析' : 'Social Media Analysis',
        content: language === 'zh' ? 
          `${project.name}在过去3个月内获得了${externalData?.socialMentions?.total || 185}次提及，情绪大多为积极(${externalData?.socialMentions?.sentiment?.positive || 78})或中性(${externalData?.socialMentions?.sentiment?.neutral || 92})。LinkedIn上的讨论主要集中于技术优势，而Twitter上则更多关注市场定位。整体社交形象积极，但覆盖面仍有提升空间。` : 
          `${project.name} has received ${externalData?.socialMentions?.total || 185} mentions over the past 3 months, with sentiment largely positive (${externalData?.socialMentions?.sentiment?.positive || 78}) or neutral (${externalData?.socialMentions?.sentiment?.neutral || 92}). LinkedIn discussions focus primarily on technical advantages while Twitter conversations center on market positioning. Overall social presence is positive but reach could be improved.`
      }
    ];
  }

  // Generate complete default external data
  function generateDefaultExternalData(project: Project) {
    const defaultExternalData = {
      socialMentions: generateDefaultSocialMentions(project),
      competitors: {
        main: project.competitors || [],
        emerging: ['NewFinTech', 'AIBridge', 'DataWise'],
        marketPositioning: 'mid-high',
        competitiveAdvantage: language === 'zh' ? '专有机器学习算法和企业客户基础' : 'Proprietary machine learning algorithms and enterprise client base'
      },
      marketTrends: generateDefaultMarketTrends(project),
      projectScores: {
        teamScore: 85,
        productScore: 78,
        marketScore: 92,
        financialScore: 70,
        tractonScore: 65,
        socialScore: 60
      },
      aiInsights: generateDefaultAIInsights(project)
    };
    
    return defaultExternalData;
  }

  // 紧凑视图 (用于概览页面)
  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <BrainCircuit size={18} className="text-primary-600 mr-2" />
            <h3 className="font-semibold text-primary-800">
              {language === 'zh' ? 'AI 智能分析' : 'AI Analysis'}
            </h3>
          </div>
          <button 
            onClick={() => setShowScoreExplanations(!showScoreExplanations)}
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            {showScoreExplanations ? 
              (language === 'zh' ? '隐藏评分解释' : 'Hide Score Details') : 
              (language === 'zh' ? '查看评分解释' : 'View Score Details')}
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 左侧：小型六边形图表 */}
            <div className="md:col-span-1">
              <div className="w-full mx-auto">
                <HexagonChart data={projectScores} />
              </div>
            </div>
            
            {/* 右侧：关键分析和结论 */}
            <div className="md:col-span-2">
              <div className="text-sm text-gray-700 mb-3">
                <p>
                  {language === 'zh' 
                    ? `基于对${project.documents?.length || 0}份文档和外部数据的分析，AI对${project.name}的关键评估：` 
                    : `Based on analysis of ${project.documents?.length || 0} documents and external data, AI key assessment of ${project.name}:`}
                </p>
              </div>
              
              {/* 关键优势和问题 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-green-800 mb-1">
                    {language === 'zh' ? '主要优势' : 'Key Strengths'}
                  </h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <Check size={12} className="text-green-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{language === 'zh' ? `强大的${project.industry}行业经验团队` : `Strong team with ${project.industry} industry experience`}</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={12} className="text-green-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{language === 'zh' ? '产品技术创新领先同侪' : 'Product technology innovation leads peers'}</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={12} className="text-green-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{language === 'zh' ? '目标市场增长率高' : 'High growth rate in target market'}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">
                    {language === 'zh' ? '关注事项' : 'Areas of Attention'}
                  </h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <AlertTriangle size={12} className="text-yellow-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{language === 'zh' ? '燃烧率高于行业平均' : 'Burn rate above industry average'}</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle size={12} className="text-yellow-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{language === 'zh' ? '社交媒体影响力有限' : 'Limited social media influence'}</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle size={12} className="text-yellow-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{language === 'zh' ? '竞争格局正在加剧' : 'Intensifying competitive landscape'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* 查看详细分析按钮 */}
              <div className="flex justify-between items-center mt-4">
                <button 
                  onClick={() => setActiveTab && setActiveTab('ai_analysis')}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                >
                  {language === 'zh' ? '查看完整AI分析报告' : 'View Full AI Analysis Report'}
                  <ChevronRight size={16} className="ml-1" />
                </button>
                
                <div className="text-xs text-gray-500">
                  {language === 'zh' ? '更新于：今天' : 'Updated: Today'}
                </div>
              </div>
            </div>
          </div>
          
          {/* 评分解释 (可切换显示) */}
          {showScoreExplanations && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '多维评分解释' : 'Dimension Score Explanation'}
              </h4>
              <div className="space-y-3">
                <div className="text-xs text-gray-700">
                  {language === 'zh' ? scoreExplanations.teamScore.zh : scoreExplanations.teamScore.en}
                </div>
                <div className="text-xs text-gray-700">
                  {language === 'zh' ? scoreExplanations.productScore.zh : scoreExplanations.productScore.en}
                </div>
                <div className="text-xs text-gray-700">
                  {language === 'zh' ? scoreExplanations.marketScore.zh : scoreExplanations.marketScore.en}
                </div>
                <div className="text-xs text-gray-700">
                  {language === 'zh' ? scoreExplanations.financialScore.zh : scoreExplanations.financialScore.en}
                </div>
                {/* 其他维度可以通过"查看完整分析"按钮查看 */}
                <div className="text-center mt-1">
                  <button 
                    onClick={() => setActiveTab && setActiveTab('ai_analysis')}
                    className="text-xs text-primary-600 hover:text-primary-800"
                  >
                    {language === 'zh' ? '查看所有维度详细分析 →' : 'See detailed analysis of all dimensions →'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 完整视图 (AI分析标签页)
  return (
    <div className="space-y-6">
      {/* 六边形图表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? '多维投资评分' : 'Multi-Dimensional Investment Score'}
          </h3>
        </div>
        <HexagonChart data={projectScores} />
      </div>
      
      {/* 评分解释面板 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <Sparkles size={18} className="text-primary-600 mr-2" />
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? '维度评分解释' : 'Dimension Score Explanation'}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary-200 transition-colors">
              <h4 className="font-medium text-primary-700 mb-1">{language === 'zh' ? '团队能力' : 'Team Capability'}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{width: `${projectScores.teamScore}%`}}></div>
                </div>
                <span className="text-sm font-medium">{projectScores.teamScore}%</span>
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' ? scoreExplanations.teamScore.zh : scoreExplanations.teamScore.en}
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary-200 transition-colors">
              <h4 className="font-medium text-primary-700 mb-1">{language === 'zh' ? '产品/技术' : 'Product/Technology'}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{width: `${projectScores.productScore}%`}}></div>
                </div>
                <span className="text-sm font-medium">{projectScores.productScore}%</span>
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' ? scoreExplanations.productScore.zh : scoreExplanations.productScore.en}
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary-200 transition-colors">
              <h4 className="font-medium text-primary-700 mb-1">{language === 'zh' ? '市场潜力' : 'Market Potential'}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{width: `${projectScores.marketScore}%`}}></div>
                </div>
                <span className="text-sm font-medium text-success-600">{projectScores.marketScore}%</span>
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' ? scoreExplanations.marketScore.zh : scoreExplanations.marketScore.en}
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary-200 transition-colors">
              <h4 className="font-medium text-primary-700 mb-1">{language === 'zh' ? '财务健康' : 'Financial Health'}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{width: `${projectScores.financialScore}%`}}></div>
                </div>
                <span className="text-sm font-medium">{projectScores.financialScore}%</span>
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' ? scoreExplanations.financialScore.zh : scoreExplanations.financialScore.en}
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary-200 transition-colors">
              <h4 className="font-medium text-primary-700 mb-1">{language === 'zh' ? '增长牵引力' : 'Growth Traction'}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{width: `${projectScores.tractonScore}%`}}></div>
                </div>
                <span className="text-sm font-medium">{projectScores.tractonScore}%</span>
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' ? scoreExplanations.tractionScore.zh : scoreExplanations.tractionScore.en}
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary-200 transition-colors">
              <h4 className="font-medium text-primary-700 mb-1">{language === 'zh' ? '社交影响力' : 'Social Presence'}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-warning-500 h-2 rounded-full" style={{width: `${projectScores.socialScore}%`}}></div>
                </div>
                <span className="text-sm font-medium text-warning-600">{projectScores.socialScore}%</span>
              </div>
              <p className="text-xs text-gray-700">
                {language === 'zh' ? scoreExplanations.socialScore.zh : scoreExplanations.socialScore.en}
              </p>
            </div>
          </div>
          
          {/* 投资建议 */}
          <div className="mt-6 bg-primary-50 border border-primary-100 rounded-lg p-4">
            <h4 className="font-medium text-primary-800 mb-2">
              {language === 'zh' ? '投资建议总结' : 'Investment Recommendation Summary'}
            </h4>
            <div className="flex items-center mb-3">
              <div className="text-2xl font-bold text-primary-700 mr-3">{calculateAverageScore()}%</div>
              <div className="text-lg font-semibold text-primary-800">{getInvestmentRecommendation()}</div>
            </div>
            <p className="text-sm text-gray-700">
              {language === 'zh' ? 
                `${project.name}展现出强劲的${project.industry}市场潜力，团队背景扎实，技术创新领先。燃烧率和社交媒体影响力是需要关注的方面。总体而言，该项目适合${calculateAverageScore() >= 75 ? '投资组合优先考虑' : '进一步深入评估'}。` : 
                `${project.name} demonstrates strong potential in the ${project.industry} market with solid team background and leading technical innovation. Burn rate and social media presence are areas needing attention. Overall, this project is ${calculateAverageScore() >= 75 ? 'a priority consideration for your portfolio' : 'worthy of further in-depth evaluation'}.`}
            </p>
          </div>
        </div>
      </div>
      
      {/* AI 洞察 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <BrainCircuit size={18} className="text-primary-600 mr-2" />
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? 'AI 洞察与分析' : 'AI Insights & Analysis'}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="text-sm text-gray-700 mb-4">
            {language === 'zh' 
              ? `基于${project.documents?.length || 0}份文档和外部数据源的综合分析，以下是关于${project.name}的关键洞察：` 
              : `Based on the analysis of ${project.documents?.length || 0} documents and external data sources, here are key insights about ${project.name}:`}
          </div>
          
          <div className="space-y-3">
            {aiInsights.map((insight: any) => (
              <div 
                key={insight.id}
                className={`border rounded-lg overflow-hidden ${
                  activeInsight === insight.id ? 'border-primary-300 bg-primary-50' : 'border-gray-200 hover:border-primary-300'
                } transition-colors`}
              >
                <div 
                  className="p-3 flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveInsight(activeInsight === insight.id ? null : insight.id)}
                >
                  <div className="flex items-center">
                    <Sparkles size={16} className="text-primary-600 mr-2" />
                    <h4 className="font-medium text-primary-700">{insight.title}</h4>
                  </div>
                  <div className="text-primary-600">
                    {activeInsight === insight.id ? (
                      <div className="p-1 rounded-full bg-primary-100">
                        <TrendingUp size={16} />
                      </div>
                    ) : (
                      <ExternalLink size={16} />
                    )}
                  </div>
                </div>
                
                {activeInsight === insight.id && (
                  <div className="p-3 pt-1 border-t border-primary-200 text-sm text-gray-700 bg-primary-50/50">
                    {insight.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* 数据来源说明 */}
          <div className="flex items-start bg-gray-50 p-3 rounded-lg mt-4">
            <AlertTriangle size={16} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              {language === 'zh' 
                ? `数据来源：内部文档分析、PitchBook、Crunchbase、社交媒体（X、LinkedIn、Reddit）以及新闻文章。分析准确性取决于数据质量和完整性。` 
                : `Data sources: Internal document analysis, PitchBook, Crunchbase, social media (X, LinkedIn, Reddit), and news articles. Analysis accuracy depends on data quality and completeness.`}
            </p>
          </div>
        </div>
      </div>
      
      {/* 社交媒体分析 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? '社交媒体与外部数据分析' : 'Social Media & External Data Analysis'}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-700">
                  {language === 'zh' ? '社交提及总数' : 'Total Social Mentions'}
                </div>
                <div className="text-sm font-medium text-primary-800">{externalData.socialMentions.total || 187}</div>
              </div>
              <div className="flex space-x-1">
                <div className="h-2 bg-success-500 rounded-l" style={{ width: `${(externalData.socialMentions.sentiment.positive || 78) / (externalData.socialMentions.total || 187) * 100}%` }}></div>
                <div className="h-2 bg-gray-300" style={{ width: `${(externalData.socialMentions.sentiment.neutral || 92) / (externalData.socialMentions.total || 187) * 100}%` }}></div>
                <div className="h-2 bg-error-500 rounded-r" style={{ width: `${(externalData.socialMentions.sentiment.negative || 17) / (externalData.socialMentions.total || 187) * 100}%` }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{language === 'zh' ? '积极' : 'Positive'}</span>
                <span>{language === 'zh' ? '中性' : 'Neutral'}</span>
                <span>{language === 'zh' ? '消极' : 'Negative'}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-700 mb-1">
                {language === 'zh' ? '平台分布' : 'Platform Distribution'}
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Twitter (X)</span>
                    <span className="text-xs font-medium">{externalData.socialMentions.sources.twitter || 68}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(externalData.socialMentions.sources.twitter || 68) / (externalData.socialMentions.total || 187) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">LinkedIn</span>
                    <span className="text-xs font-medium">{externalData.socialMentions.sources.linkedin || 52}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                    <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: `${(externalData.socialMentions.sources.linkedin || 52) / (externalData.socialMentions.total || 187) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Reddit</span>
                    <span className="text-xs font-medium">{externalData.socialMentions.sources.reddit || 45}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(externalData.socialMentions.sources.reddit || 45) / (externalData.socialMentions.total || 187) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-700 mb-1">
                {language === 'zh' ? '行业趋势一致性' : 'Industry Trend Alignment'}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500">{language === 'zh' ? '低' : 'Low'}</div>
                  <div className="h-8 w-8 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500">{language === 'zh' ? '中' : 'Medium'}</div>
                  <div className="h-8 w-8 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-success-600">{language === 'zh' ? '高' : 'High'}</div>
                  <div className="h-10 w-10 bg-success-100 border-2 border-success-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-success-600" />
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">
                {language === 'zh' 
                  ? `${project.name}与当前${project.industry}行业趋势高度一致` 
                  : `${project.name} is highly aligned with current ${project.industry} industry trends`}
              </div>
            </div>
          </div>
          
          {/* 最近提及 */}
          <div className="mt-6">
            <h4 className="font-medium text-sm text-gray-700 mb-3">
              {language === 'zh' ? '最近社交媒体提及' : 'Recent Social Media Mentions'}
            </h4>
            <div className="space-y-3">
              {externalData.socialMentions.recentMentions.map((mention: any, idx: number) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{mention.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className={`w-2 h-2 rounded-full ${mention.sentiment === 'positive' ? 'bg-success-500' : mention.sentiment === 'negative' ? 'bg-error-500' : 'bg-gray-400'} mr-1.5`}></span>
                      {mention.platform}
                    </div>
                    <div className="text-xs text-gray-500">{mention.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* KOL 影响力 */}
          <div className="mt-6">
            <h4 className="font-medium text-sm text-gray-700 mb-3">
              {language === 'zh' ? '关键意见领袖 (KOL) 提及' : 'Key Opinion Leader Mentions'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {externalData.socialMentions.keyInfluencers.map((influencer: any, idx: number) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-sm text-primary-700">{influencer.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-600">{influencer.platform}</div>
                    <div className="text-xs text-gray-600">{influencer.followers} {language === 'zh' ? '粉丝' : 'followers'}</div>
                  </div>
                  <div className={`mt-2 text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                    influencer.sentiment === 'positive' ? 'bg-success-100 text-success-700' : 
                    influencer.sentiment === 'negative' ? 'bg-error-100 text-error-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {influencer.sentiment === 'positive' ? (language === 'zh' ? '积极评价' : 'Positive') : 
                     influencer.sentiment === 'negative' ? (language === 'zh' ? '负面评价' : 'Negative') : 
                     (language === 'zh' ? '中立评价' : 'Neutral')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 市场趋势分析 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? '市场趋势分析' : 'Market Trend Analysis'}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm text-gray-700">
                {language === 'zh' ? `${project.industry}行业增长预期` : `${project.industry} Industry Growth Forecast`}
              </div>
              <div className="text-2xl font-semibold text-primary-800 mt-1">
                {externalData.marketTrends.industryGrowth || '14.5%'} <span className="text-success-600 text-sm">↑</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {language === 'zh' ? '数据来源: EchoAlpha, Pitchbook' : 'Data source: EchoAlpha, Pitchbook'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">
                {language === 'zh' ? '关键趋势影响' : 'Key Trend Impact'}
              </h4>
              <div className="space-y-3">
                {externalData.marketTrends.keyTrends.map((trend: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm text-primary-700">{trend.trend}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        trend.relevance === 'high' ? 'bg-success-100 text-success-700' :
                        trend.relevance === 'medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {trend.relevance === 'high' ? (language === 'zh' ? '高相关' : 'High Relevance') :
                         trend.relevance === 'medium' ? (language === 'zh' ? '中相关' : 'Medium Relevance') :
                         (language === 'zh' ? '低相关' : 'Low Relevance')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">
                {language === 'zh' ? '潜在风险因素' : 'Potential Risk Factors'}
              </h4>
              <div className="space-y-3">
                {externalData.marketTrends.risks.map((risk: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm text-primary-700">{risk.risk}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        risk.impact === 'high' ? 'bg-error-100 text-error-700' :
                        risk.impact === 'medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {risk.impact === 'high' ? (language === 'zh' ? '高影响' : 'High Impact') :
                         risk.impact === 'medium' ? (language === 'zh' ? '中影响' : 'Medium Impact') :
                         (language === 'zh' ? '低影响' : 'Low Impact')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mt-4">
                <h5 className="text-sm font-medium text-gray-700">
                  {language === 'zh' ? '创始人信任度分析' : 'Founder Credibility Analysis'}
                </h5>
                <div className="mt-2 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full w-[85%]"></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">85%</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {language === 'zh' 
                    ? `基于LinkedIn资料验证、历史业绩和外部社交提及分析` 
                    : `Based on LinkedIn profile verification, historical performance, and external social mention analysis`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 新闻与媒体覆盖 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? '新闻与媒体覆盖' : 'News & Media Coverage'}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="text-sm text-gray-700 mb-4">
            {language === 'zh' 
              ? `AI 从新闻源和媒体出版物中提取${project.name}的关键信息` 
              : `AI-extracted key information about ${project.name} from news sources and media publications`}
          </div>
          
          <div className="space-y-3">
            <div className="flex p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <span className="font-bold text-gray-400 text-xs">NEWS</span>
              </div>
              <div>
                <h4 className="font-medium text-primary-700">
                  {language === 'zh' 
                    ? `${project.name}宣布与主要金融机构达成合作伙伴关系` 
                    : `${project.name} Announces Partnership with Major Financial Institutions`}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {language === 'zh' 
                    ? `这种合作关系将允许金融机构利用${project.name}的AI技术来增强他们的分析能力...` 
                    : `The partnership will allow financial institutions to leverage ${project.name}'s AI technology to enhance their analytical capabilities...`}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="font-semibold">TechCrunch</span>
                  <span className="mx-1">•</span>
                  <span>3 {language === 'zh' ? '周前' : 'weeks ago'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <span className="font-bold text-gray-400 text-xs">BLOG</span>
              </div>
              <div>
                <h4 className="font-medium text-primary-700">
                  {language === 'zh' 
                    ? `${project.industry}领域的颠覆者：${project.name}的崛起` 
                    : `Disruptors in ${project.industry}: The Rise of ${project.name}`}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {language === 'zh' 
                    ? `随着人工智能的进步，初创公司正在重新定义我们思考金融数据的方式...` 
                    : `With advancements in AI, startups are redefining how we think about financial data...`}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="font-semibold">VentureBeat</span>
                  <span className="mx-1">•</span>
                  <span>1 {language === 'zh' ? '月前' : 'month ago'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              {language === 'zh' ? '查看所有媒体报道' : 'View all media coverage'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;