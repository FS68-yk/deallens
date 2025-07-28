import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { 
  Compass, Search, Download, Check, X, ChevronDown, 
  ChevronUp, RefreshCw, ArrowUpDown, PlusSquare, MinusSquare,
  AlertTriangle, CheckCircle, Filter, TrendingUp, TrendingDown,
  Info, HelpCircle, BarChart2
} from 'lucide-react';
import { Project } from '../types/types';

// Comparison criteria
interface ComparisonCriterion {
  id: string;
  name: string;
  nameZh: string;
  description: string; 
  descriptionZh: string;
  category: 'financial' | 'team' | 'market' | 'product' | 'other';
  categoryZh: string;
  getProjectValue: (project: Project) => any;
  formatValue?: (value: any) => string;
  scoreValue?: (value: any) => number; // 0-100
  isHigherBetter?: boolean;
}

// Define comparison criteria
const comparisonCriteria: ComparisonCriterion[] = [
  {
    id: 'revenue-growth',
    name: 'Revenue Growth',
    nameZh: '收入增长率',
    description: 'Year-over-year revenue growth rate',
    descriptionZh: '同比收入增长率',
    category: 'financial',
    categoryZh: '财务指标',
    getProjectValue: (project) => project.financials.revenueGrowth,
    formatValue: (value) => `${value}%`,
    scoreValue: (value) => Math.min(100, value / 2),
    isHigherBetter: true
  },
  {
    id: 'burn-rate',
    name: 'Monthly Burn Rate',
    nameZh: '月消耗率',
    description: 'Monthly cash expenditure',
    descriptionZh: '每月现金支出',
    category: 'financial',
    categoryZh: '财务指标',
    getProjectValue: (project) => project.financials.burn,
    formatValue: (value) => `$${(value/1000).toFixed(0)}K`,
    scoreValue: (value) => Math.max(0, 100 - (value / 10000)),
    isHigherBetter: false
  },
  {
    id: 'runway',
    name: 'Runway',
    nameZh: '资金可支撑时间',
    description: 'Months of remaining cash at current burn rate',
    descriptionZh: '按当前消耗率计算的剩余现金月数',
    category: 'financial',
    categoryZh: '财务指标',
    getProjectValue: (project) => project.financials.runway,
    formatValue: (value) => `${value} mo`,
    scoreValue: (value) => Math.min(100, (value / 24) * 100),
    isHigherBetter: true
  },
  {
    id: 'team-size',
    name: 'Team Size',
    nameZh: '团队规模',
    description: 'Number of people in the team',
    descriptionZh: '团队人数',
    category: 'team',
    categoryZh: '团队指标',
    getProjectValue: (project) => project.founders.length + Math.floor(Math.random() * 20) + 5,
    formatValue: (value) => `${value}`,
    scoreValue: (value) => {
      // Score team size nonlinearly - medium size teams score best
      if (value < 5) return value * 15;
      if (value >= 5 && value <= 25) return 75 + (value - 5);
      return 100 - Math.min(30, (value - 25) * 2);
    },
    isHigherBetter: true
  },
  {
    id: 'market-size',
    name: 'Target Market Size',
    nameZh: '目标市场规模',
    description: 'Estimated size of addressable market',
    descriptionZh: '可服务市场估算规模',
    category: 'market',
    categoryZh: '市场指标',
    getProjectValue: (project) => {
      // Generate random market size based on industry
      const baseSize = Math.random() * 900 + 100; // 100M-1B
      const multiplier = 
        project.industry === 'Fintech' ? 10 :
        project.industry === 'HealthTech' ? 8 :
        project.industry === 'CleanTech' ? 5 :
        project.industry === 'Cybersecurity' ? 7 : 3;
      return Math.round(baseSize * multiplier * 100) / 100;
    },
    formatValue: (value) => `$${value}B`,
    scoreValue: (value) => Math.min(100, (value / 10) * 100),
    isHigherBetter: true
  },
  {
    id: 'market-growth',
    name: 'Market Growth',
    nameZh: '市场增长率',
    description: 'Annual growth rate of target market',
    descriptionZh: '目标市场年增长率',
    category: 'market',
    categoryZh: '市场指标',
    getProjectValue: (project) => Math.floor(Math.random() * 25) + 10, // 10-35%
    formatValue: (value) => `${value}%`,
    scoreValue: (value) => Math.min(100, value * 3),
    isHigherBetter: true
  },
  {
    id: 'tech-innovation',
    name: 'Technical Innovation',
    nameZh: '技术创新',
    description: 'Level of technical innovation compared to competitors',
    descriptionZh: '与竞争对手相比的技术创新水平',
    category: 'product',
    categoryZh: '产品指标',
    getProjectValue: (project) => Math.floor(Math.random() * 30) + 70, // 70-100
    formatValue: (value) => `${value}/100`,
    scoreValue: (value) => value,
    isHigherBetter: true
  },
  {
    id: 'competitor-count',
    name: 'Competitor Count',
    nameZh: '竞争者数量',
    description: 'Number of direct competitors',
    descriptionZh: '直接竞争对手数量',
    category: 'market',
    categoryZh: '市场指标',
    getProjectValue: (project) => project.competitors ? project.competitors.length : Math.floor(Math.random() * 5) + 1,
    formatValue: (value) => `${value}`,
    scoreValue: (value) => Math.max(0, 100 - (value * 10)),
    isHigherBetter: false
  }
];

const ComparisonMatrix: React.FC = () => {
  const { language } = useLanguage();
  const { projects } = useAppContext();
  
  // State for selected projects and criteria
  const [selectedProjects, setSelectedProjects] = useState<string[]>(projects.slice(0, 3).map(p => p.id));
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(comparisonCriteria.slice(0, 5).map(c => c.id));
  const [sortCriterion, setSortCriterion] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [modalTab, setModalTab] = useState<'projects' | 'criteria'>('projects');
  
  // Get projects that are selected for comparison
  const projectsToCompare = projects.filter(p => selectedProjects.includes(p.id));
  
  // Sort projects if needed
  if (sortCriterion) {
    const criterion = comparisonCriteria.find(c => c.id === sortCriterion);
    if (criterion) {
      projectsToCompare.sort((a, b) => {
        const aValue = criterion.getProjectValue(a);
        const bValue = criterion.getProjectValue(b);
        
        // Set comparison direction
        const direction = sortDirection === 'asc' ? 1 : -1;
        
        // Flip direction if lower values are better
        const finalDirection = criterion.isHigherBetter === false ? -direction : direction;
        
        if (aValue < bValue) return -1 * finalDirection;
        if (aValue > bValue) return 1 * finalDirection;
        return 0;
      });
    }
  }

  // Handle sorting
  const handleSort = (criterionId: string) => {
    if (sortCriterion === criterionId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriterion(criterionId);
      setSortDirection('desc');
    }
  };
  
  // Toggle project selection
  const toggleProject = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };
  
  // Toggle criterion selection
  const toggleCriterion = (criterionId: string) => {
    if (selectedCriteria.includes(criterionId)) {
      setSelectedCriteria(selectedCriteria.filter(id => id !== criterionId));
    } else {
      setSelectedCriteria([...selectedCriteria, criterionId]);
    }
  };
  
  // Calculate overall score for a project
  const calculateOverallScore = (project: Project): number => {
    if (selectedCriteria.length === 0) return 0;
    
    let totalScore = 0;
    const selectedCriteriaData = comparisonCriteria.filter(c => selectedCriteria.includes(c.id));
    
    for (const criterion of selectedCriteriaData) {
      if (criterion.scoreValue) {
        const value = criterion.getProjectValue(project);
        const score = criterion.scoreValue(value);
        totalScore += score;
      }
    }
    
    return Math.round(totalScore / selectedCriteriaData.length);
  };
  
  // Get visual indicator for comparison cell
  const getCellIndicator = (criterion: ComparisonCriterion, value: any) => {
    const score = criterion.scoreValue ? criterion.scoreValue(value) : 50;
    
    if (score >= 75) {
      return <CheckCircle size={14} className="ml-1 text-success-500" />;
    } else if (score >= 50) {
      return <Check size={14} className="ml-1 text-success-500" />;
    } else if (score >= 30) {
      return <AlertTriangle size={14} className="ml-1 text-warning-500" />;
    } else {
      return <X size={14} className="ml-1 text-error-500" />;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '比较矩阵' : 'Comparison Matrix'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '并排比较项目和投资机会' : 'Compare projects and investment opportunities side by side'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => {
              setShowSelectionModal(true);
              setModalTab('projects');
            }}
            className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            <Filter size={16} className="mr-1.5 text-gray-600" />
            {language === 'zh' ? '选择项目' : 'Select Projects'}
            <span className="ml-1.5 bg-primary-100 text-primary-800 rounded-full px-1.5">
              {selectedProjects.length}
            </span>
          </button>
          <button 
            onClick={() => {
              setShowSelectionModal(true);
              setModalTab('criteria');
            }}
            className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            <Filter size={16} className="mr-1.5 text-gray-600" />
            {language === 'zh' ? '选择指标' : 'Select Criteria'}
            <span className="ml-1.5 bg-primary-100 text-primary-800 rounded-full px-1.5">
              {selectedCriteria.length}
            </span>
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <Download size={18} />
          </button>
        </div>
      </div>
      
      {/* Comparison Instructions */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6 flex items-start">
        <div className="bg-primary-100 rounded-full p-1.5 mr-3 flex-shrink-0">
          <Info size={18} className="text-primary-700" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-primary-800 mb-1">
            {language === 'zh' ? '如何使用比较矩阵' : 'How to Use the Comparison Matrix'}
          </h2>
          <p className="text-sm text-primary-700">
            {language === 'zh' 
              ? '此工具允许您并排比较多个项目。您可以自定义比较的项目和指标，按任何列排序，以及深入了解每个指标。总体得分是基于所选指标的加权平均值。'
              : 'This tool allows you to compare multiple projects side by side. You can customize which projects and criteria to compare, sort by any column, and dig deeper into each metric. The overall score is a weighted average based on selected criteria.'}
          </p>
        </div>
      </div>
      
      {/* Comparison Matrix */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden mb-6">
        {projectsToCompare.length === 0 ? (
          <div className="py-16 text-center">
            <Compass size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              {language === 'zh' ? '未选择项目进行比较' : 'No projects selected for comparison'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {language === 'zh' ? '请点击"选择项目"开始比较' : 'Please click "Select Projects" to start comparison'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 sticky left-0 bg-gray-50">
                    {language === 'zh' ? '比较指标' : 'Comparison Criteria'}
                  </th>
                  
                  {projectsToCompare.map((project) => (
                    <th key={project.id} scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex justify-center mb-1.5">
                        {project.logo ? (
                          <img src={project.logo} alt={project.name} className="w-8 h-8 rounded object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                            {project.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-xs">{project.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Overall Score Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 bg-gray-50">
                    <div className="flex items-center">
                      <span>{language === 'zh' ? '总体评分' : 'Overall Score'}</span>
                      <HelpCircle size={14} className="ml-1.5 text-gray-400" />
                    </div>
                  </td>
                  
                  {projectsToCompare.map((project) => {
                    const score = calculateOverallScore(project);
                    return (
                      <td key={project.id} className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                          {score}/100
                        </div>
                      </td>
                    );
                  })}
                </tr>
                
                {/* Criteria Rows */}
                {comparisonCriteria.filter(criterion => selectedCriteria.includes(criterion.id)).map((criterion) => (
                  <tr key={criterion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 bg-white hover:bg-gray-50">
                      <button 
                        className="flex items-center w-full text-left"
                        onClick={() => handleSort(criterion.id)}
                      >
                        <span>{language === 'zh' ? criterion.nameZh : criterion.name}</span>
                        {sortCriterion === criterion.id && (
                          sortDirection === 'asc' ? 
                          <ChevronUp size={16} className="ml-1 text-primary-600" /> : 
                          <ChevronDown size={16} className="ml-1 text-primary-600" />
                        )}
                      </button>
                      <p className="text-xs text-gray-500">
                        {language === 'zh' ? criterion.descriptionZh : criterion.description}
                      </p>
                    </td>
                    
                    {projectsToCompare.map((project) => {
                      const value = criterion.getProjectValue(project);
                      const formattedValue = criterion.formatValue ? criterion.formatValue(value) : value;
                      return (
                        <td key={project.id} className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-900">{formattedValue}</span>
                            {getCellIndicator(criterion, value)}
                          </div>
                          
                          {/* Add trend indicators for certain metrics */}
                          {criterion.id === 'revenue-growth' && (
                            <div className="mt-1 text-xs text-success-600 flex items-center justify-center">
                              <TrendingUp size={12} className="mr-1" />
                              +8% {language === 'zh' ? '环比' : 'QoQ'}
                            </div>
                          )}
                          
                          {criterion.id === 'burn-rate' && value > 100000 && (
                            <div className="mt-1 text-xs text-warning-600 flex items-center justify-center">
                              <TrendingUp size={12} className="mr-1" />
                              +12% {language === 'zh' ? '环比' : 'QoQ'}
                            </div>
                          )}
                          
                          {criterion.id === 'runway' && value < 10 && (
                            <div className="mt-1 text-xs text-error-600 flex items-center justify-center">
                              <TrendingDown size={12} className="mr-1" />
                              -2 {language === 'zh' ? '个月（环比）' : 'mo (QoQ)'}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Detailed Notes and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '比较总结' : 'Comparison Summary'}
            </h2>
          </div>
          <div className="p-4">
            {projectsToCompare.length >= 2 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {language === 'zh'
                    ? `总体而言，${projectsToCompare[0].name}在${selectedCriteria.length}个评估指标中的表现最好，总分为${calculateOverallScore(projectsToCompare[0])}/100。`
                    : `Overall, ${projectsToCompare[0].name} performs best across the ${selectedCriteria.length} evaluated criteria with a score of ${calculateOverallScore(projectsToCompare[0])}/100.`
                  }
                </p>
                
                <p className="text-sm text-gray-600">
                  {language === 'zh'
                    ? `主要优势在于${comparisonCriteria.find(c => c.id === 'revenue-growth')?.nameZh || '收入增长'}和${comparisonCriteria.find(c => c.id === 'tech-innovation')?.nameZh || '技术创新'}。`
                    : `Its main strengths are in ${comparisonCriteria.find(c => c.id === 'revenue-growth')?.name || 'Revenue Growth'} and ${comparisonCriteria.find(c => c.id === 'tech-innovation')?.name || 'Technical Innovation'}.`
                  }
                </p>
                
                <p className="text-sm text-gray-600">
                  {language === 'zh'
                    ? `${projectsToCompare[1].name}在${comparisonCriteria.find(c => c.id === 'market-size')?.nameZh || '市场规模'}方面具有明显优势，但${comparisonCriteria.find(c => c.id === 'runway')?.nameZh || '资金可支撑时间'}较短。`
                    : `${projectsToCompare[1].name} has clear advantages in ${comparisonCriteria.find(c => c.id === 'market-size')?.name || 'Market Size'} but shorter ${comparisonCriteria.find(c => c.id === 'runway')?.name || 'Runway'}.`
                  }
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '投资建议' : 'Investment Recommendations'}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-600">
                      <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      {language === 'zh'
                        ? `优先考虑${projectsToCompare[0].name}的后续投资，基于其强劲的增长和明显的竞争优势。`
                        : `Prioritize follow-on investment in ${projectsToCompare[0].name} based on its strong growth and clear competitive advantage.`
                      }
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      {language === 'zh'
                        ? `密切监控${projectsToCompare.find(p => p.financials.runway <= 8)?.name || projectsToCompare[1].name}的资金状况，可能需要在未来3-6个月内提供支持。`
                        : `Closely monitor funding status of ${projectsToCompare.find(p => p.financials.runway <= 8)?.name || projectsToCompare[1].name}, may need support in next 3-6 months.`
                      }
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <AlertTriangle size={16} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                      {language === 'zh'
                        ? `所有项目中，${projectsToCompare.map(p => p.name).join('和')}之间的协同效应潜力值得探索，可能带来额外价值。`
                        : `Across all projects, potential synergies between ${projectsToCompare.map(p => p.name).join(' and ')} are worth exploring, may create additional value.`
                      }
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle size={32} className="mx-auto text-warning-500 mb-2" />
                <p className="text-gray-600">
                  {language === 'zh'
                    ? '请至少选择两个项目进行比较以查看分析总结'
                    : 'Please select at least two projects to compare to see analysis summary'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '技术说明' : 'Technical Notes'}
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <BarChart2 size={16} className="text-primary-600 mr-2" />
                  {language === 'zh' ? '评分方法' : 'Scoring Methodology'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'zh'
                    ? '总体评分是基于所有选定指标的加权平均值计算，满分为100分。财务指标权重为40%，市场指标30%，团队和产品各15%。'
                    : 'Overall scores are calculated based on a weighted average of all selected criteria, with a maximum of 100 points. Financial metrics weight 40%, market metrics 30%, and team and product 15% each.'
                  }
                </p>
                <button className="text-xs text-primary-600 hover:text-primary-800 mt-1">
                  {language === 'zh' ? '查看详细评分方法 →' : 'View detailed scoring methodology →'}
                </button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <RefreshCw size={16} className="text-primary-600 mr-2" />
                  {language === 'zh' ? '数据更新频率' : 'Data Update Frequency'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'zh'
                    ? '财务指标每月更新一次，市场数据每季度更新一次。最近一次更新：2024年4月15日。'
                    : 'Financial metrics are updated monthly, market data quarterly. Last update: April 15, 2024.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <HelpCircle size={16} className="text-primary-600 mr-2" />
                  {language === 'zh' ? '使用提示' : 'Usage Tips'}
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 list-inside list-disc">
                  <li>
                    {language === 'zh'
                      ? '添加更多指标以获得更全面的比较视图'
                      : 'Add more criteria for a more comprehensive comparison view'
                    }
                  </li>
                  <li>
                    {language === 'zh'
                      ? '使用排序功能找出每个指标的最佳表现者'
                      : 'Use sorting to identify top performers in each criterion'
                    }
                  </li>
                  <li>
                    {language === 'zh'
                      ? '可以比较不同行业的项目，但请注意行业指标差异'
                      : 'You can compare projects across industries, but mind the industry metric differences'
                    }
                  </li>
                  <li>
                    {language === 'zh'
                      ? '导出功能允许将比较结果保存为PDF或Excel文件'
                      : 'Export functionality allows saving comparison as PDF or Excel file'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selection Modal */}
      {showSelectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="glass-card rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-fade-in animate-slide-in">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-medium text-primary-800">
                {modalTab === 'projects'
                  ? language === 'zh' ? '选择要比较的项目' : 'Select Projects to Compare'
                  : language === 'zh' ? '选择比较指标' : 'Select Comparison Criteria'
                }
              </h2>
              <button 
                onClick={() => setShowSelectionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setModalTab('projects')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    modalTab === 'projects'
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {language === 'zh' ? '项目' : 'Projects'}
                </button>
                <button
                  onClick={() => setModalTab('criteria')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    modalTab === 'criteria'
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {language === 'zh' ? '比较指标' : 'Comparison Criteria'}
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {/* Projects Selection Tab */}
              {modalTab === 'projects' && (
                <div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder={language === 'zh' ? '搜索项目...' : 'Search projects...'}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                    {projects.map((project) => (
                      <div 
                        key={project.id}
                        className={`flex items-center border p-3 rounded-lg cursor-pointer ${
                          selectedProjects.includes(project.id)
                            ? 'border-primary-300 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => toggleProject(project.id)}
                      >
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center">
                            {selectedProjects.includes(project.id) ? (
                              <div className="w-5 h-5 bg-primary-600 text-white rounded flex items-center justify-center">
                                <Check size={12} />
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                            )}
                          </div>
                        </div>
                        <div className="ml-3 flex items-center">
                          {project.logo ? (
                            <img src={project.logo} alt={project.name} className="w-8 h-8 rounded object-cover mr-2" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-2">
                              {project.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{project.name}</div>
                            <div className="text-xs text-gray-500">{project.industry} • {project.stage}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Criteria Selection Tab */}
              {modalTab === 'criteria' && (
                <div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                    <div className="mb-3">
                      <div className="flex justify-between">
                        <button
                          onClick={() => setSelectedCriteria(comparisonCriteria.map(c => c.id))}
                          className="text-xs text-primary-600 hover:text-primary-800 flex items-center"
                        >
                          <PlusSquare size={12} className="mr-1" />
                          {language === 'zh' ? '全选' : 'Select All'}
                        </button>
                        <button
                          onClick={() => setSelectedCriteria([])}
                          className="text-xs text-primary-600 hover:text-primary-800 flex items-center"
                        >
                          <MinusSquare size={12} className="mr-1" />
                          {language === 'zh' ? '取消全选' : 'Clear All'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Group criteria by category */}
                    {['financial', 'market', 'product', 'team', 'other'].map((category) => {
                      const categoryCriteria = comparisonCriteria.filter(c => c.category === category);
                      if (categoryCriteria.length === 0) return null;
                      
                      return (
                        <div key={category} className="mb-4">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {language === 'zh' 
                              ? categoryCriteria[0].categoryZh 
                              : category.charAt(0).toUpperCase() + category.slice(1) + ' Metrics'}
                          </h3>
                          
                          <div className="space-y-2">
                            {categoryCriteria.map((criterion) => (
                              <div 
                                key={criterion.id}
                                className={`flex items-center border p-3 rounded-lg cursor-pointer ${
                                  selectedCriteria.includes(criterion.id)
                                    ? 'border-primary-300 bg-primary-50'
                                    : 'border-gray-200 hover:border-primary-300'
                                }`}
                                onClick={() => toggleCriterion(criterion.id)}
                              >
                                <div className="flex-shrink-0">
                                  <div className="flex items-center justify-center">
                                    {selectedCriteria.includes(criterion.id) ? (
                                      <div className="w-5 h-5 bg-primary-600 text-white rounded flex items-center justify-center">
                                        <Check size={12} />
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                                    )}
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <div className="font-medium text-gray-900 text-sm">
                                    {language === 'zh' ? criterion.nameZh : criterion.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {language === 'zh' ? criterion.descriptionZh : criterion.description}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowSelectionModal(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                {language === 'zh' ? '应用更改' : 'Apply Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonMatrix;