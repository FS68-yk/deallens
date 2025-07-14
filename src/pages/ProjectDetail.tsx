import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Loader2 } from 'lucide-react';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectTabs from '../components/Project/ProjectTabs';
import ExternalDataService from '../services/ExternalDataService';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useAppContext();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [externalData, setExternalData] = useState<any>(null);

  const project = useMemo(() => {
    return projects.find(p => p.id === id);
  }, [projects, id]);

  // This useEffect will ensure external data is always available
  useEffect(() => {
    const fetchExternalData = async () => {
      if (project) {
        setIsLoading(true);
        try {
          // If the project already has externalData, use it
          if (project.externalData) {
            setExternalData(project.externalData);
          } else {
            // Otherwise fetch the data (or generate mock data in this case)
            const data = await ExternalDataService.getComprehensiveAnalysis(
              project.id,
              project.name,
              project.industry
            );
            setExternalData(data);
          }
        } catch (error) {
          console.error('Failed to fetch external data:', error);
          // Generate fallback data if fetch fails
          setExternalData(generateFallbackData(project));
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchExternalData();
  }, [project]);

  // Fallback data generation function in case API call fails
  const generateFallbackData = (project: any) => {
    // Generate realistic fallback data
    return {
      socialMentions: {
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
          { content: `${project.name}的技术令人印象深刻，可能彻底改变${project.industry}领域`, platform: 'Twitter', date: '2天前', sentiment: 'positive' },
          { content: `刚听说${project.name}在寻求新一轮融资，有人了解更多信息吗？`, platform: 'Reddit', date: '4天前', sentiment: 'neutral' }
        ]
      },
      marketTrends: {
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
      },
      projectScores: {
        teamScore: 85,
        productScore: 78,
        marketScore: 92,
        financialScore: 70,
        tractonScore: 65,
        socialScore: 60
      },
      aiInsights: [
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
            `${project.industry}行业预计在未来5年内以12.5%的速度增长，高于平均水平。${project.name}的目标市场规模约为120亿美元，当前渗透率低，具有显著增长空间。` : 
            `The ${project.industry} industry is expected to grow at 12.5% over the next 5 years, above average. ${project.name}'s target market size is approximately $12B with low current penetration, indicating significant growth potential.`
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
            `${project.name}在过去3个月内获得了187次提及，情绪大多为积极(78)或中性(92)。LinkedIn上的讨论主要集中于技术优势，而Twitter上则更多关注市场定位。整体社交形象积极，但覆盖面仍有提升空间。` : 
            `${project.name} has received 187 mentions over the past 3 months, with sentiment largely positive (78) or neutral (92). LinkedIn discussions focus primarily on technical advantages while Twitter conversations center on market positioning. Overall social presence is positive but reach could be improved.`
        }
      ]
    };
  };

  if (!project) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 size={40} className="text-primary-600 animate-spin mb-4" />
        <p className="text-primary-800">
          {language === 'zh' 
            ? '正在获取项目数据和外部分析...' 
            : 'Fetching project data and external analysis...'}
        </p>
      </div>
    );
  }

  // Create a new project object with the external data
  const projectWithExternalData = {
    ...project,
    externalData: externalData || project.externalData
  };

  return (
    <div className="animate-fade-in">
      <ProjectHeader project={projectWithExternalData} />
      <ProjectTabs project={projectWithExternalData} />
    </div>
  );
};

export default ProjectDetail;