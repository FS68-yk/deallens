import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { 
  Briefcase, Filter, Calendar, Download, Search, PieChart, 
  BarChart2, ArrowUpRight, ArrowDownRight, Clock, AlertTriangle,
  TrendingUp, Zap, DollarSign, CheckCircle, ChevronRight
} from 'lucide-react';
import { Project } from '../types/types';

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const { projects } = useAppContext();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter projects by search term
  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.industry.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower)
    );
  });
  
  // Calculate portfolio statistics
  const portfolioStats = {
    totalInvestment: filteredProjects.reduce((sum, project) => {
      // Extract numeric value from valuation string and calculate rough investment
      const match = project.valuation.match(/\$(\d+)-(\d+)M/);
      if (match) {
        const avgValuation = (parseInt(match[1]) + parseInt(match[2])) / 2;
        // Assume investment is roughly 20% of valuation for a simplified model
        return sum + (avgValuation * 0.2);
      }
      return sum;
    }, 0),
    
    totalProjects: filteredProjects.length,
    
    avgProjectGrowth: filteredProjects.reduce((sum, project) => 
      sum + project.financials.revenueGrowth, 0) / filteredProjects.length,
    
    industryDistribution: filteredProjects.reduce((acc, project) => {
      acc[project.industry] = (acc[project.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    stageDistribution: filteredProjects.reduce((acc, project) => {
      acc[project.stage] = (acc[project.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
  
  // Calculate project health scores (for demo)
  const getProjectHealthScore = (project: Project): {score: number, status: 'healthy' | 'warning' | 'critical'} => {
    // Higher growth, higher score
    const growthScore = Math.min(100, project.financials.revenueGrowth) / 2;
    
    // Higher runway, higher score (max 24 months)
    const runwayScore = Math.min(24, project.financials.runway) * 2;
    
    // Lower burn rate relative to valuation, higher score
    const burnScore = 25 - Math.min(25, project.financials.burn / 20000);
    
    const totalScore = Math.round(growthScore + runwayScore + burnScore);
    
    let status: 'healthy' | 'warning' | 'critical';
    if (totalScore >= 75) status = 'healthy';
    else if (totalScore >= 50) status = 'warning';
    else status = 'critical';
    
    return { score: totalScore, status };
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '投资组合' : 'Portfolio'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '分析您的投资分布和表现' : 'Analyze your investment allocation and performance'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索项目...' : 'Search projects...'}
              className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 border ${showFilters ? 'border-primary-500 text-primary-600 bg-primary-50' : 'border-gray-300 text-gray-600'} rounded-lg hover:bg-gray-100 transition-colors`}
          >
            <Filter size={18} />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <Download size={18} />
          </button>
        </div>
      </div>
      
      {/* Optional filters */}
      {showFilters && (
        <div className="glass-card rounded-2xl shadow-2xl p-6 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '投资阶段' : 'Investment Stage'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">{language === 'zh' ? '所有阶段' : 'All Stages'}</option>
                <option value="seed">{language === 'zh' ? '种子轮' : 'Seed'}</option>
                <option value="series-a">{language === 'zh' ? 'A轮' : 'Series A'}</option>
                <option value="series-b">{language === 'zh' ? 'B轮' : 'Series B'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '行业' : 'Industry'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">{language === 'zh' ? '所有行业' : 'All Industries'}</option>
                <option value="fintech">{language === 'zh' ? '金融科技' : 'Fintech'}</option>
                <option value="healthtech">{language === 'zh' ? '医疗科技' : 'HealthTech'}</option>
                <option value="cleantech">{language === 'zh' ? '清洁技术' : 'CleanTech'}</option>
                <option value="cybersecurity">{language === 'zh' ? '网络安全' : 'Cybersecurity'}</option>
                <option value="agtech">{language === 'zh' ? '农业科技' : 'AgTech'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '投资日期' : 'Investment Date'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder={language === 'zh' ? '选择日期范围' : 'Select date range'}
                />
                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button className="text-sm text-primary-600 hover:text-primary-800">
              {language === 'zh' ? '重置筛选' : 'Reset Filters'}
            </button>
          </div>
        </div>
      )}
      
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '总投资额' : 'Total Investment'}
          </p>
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-primary-800">
              {language === 'zh' ? '¥' : '$'}{Math.round(portfolioStats.totalInvestment)}M
            </span>
            <span className="ml-2 text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
              {filteredProjects.length} {language === 'zh' ? '项目' : 'projects'}
            </span>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '估值增长' : 'Valuation Growth'}
          </p>
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-success-600">1.8x</span>
            <span className="ml-2 text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp size={10} className="mr-1" />
              +14%
            </span>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '平均增长率' : 'Avg. Growth Rate'}
          </p>
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-primary-800">
              {Math.round(portfolioStats.avgProjectGrowth)}%
            </span>
            <span className="ml-2 text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded-full">
              YoY
            </span>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '平均持有期' : 'Avg. Holding Period'}
          </p>
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-primary-800">1.4</span>
            <span className="ml-1 text-xl text-primary-800">
              {language === 'zh' ? '年' : 'years'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Portfolio Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Industry Distribution */}
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '行业分布' : 'Industry Distribution'}
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center h-48 mb-4">
              <PieChart size={120} className="text-gray-400" />
            </div>
            
            <div className="space-y-2">
              {Object.entries(portfolioStats.industryDistribution).map(([industry, count], i) => {
                const percentage = Math.round((count / portfolioStats.totalProjects) * 100);
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
                return (
                  <div key={industry} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]} mr-2`}></div>
                    <div className="flex-1 text-sm text-gray-700">{industry}</div>
                    <div className="text-sm text-gray-900">
                      {percentage}% ({count})
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center text-xs text-gray-600">
                <AlertTriangle size={12} className="mr-1.5 text-warning-500" />
                {language === 'zh' 
                  ? '金融科技集中度较高 (30%)，考虑拓展其他行业投资' 
                  : 'High concentration in Fintech (30%), consider diversifying into other industries'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stage Distribution */}
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '阶段分布' : 'Stage Distribution'}
            </h2>
          </div>
          <div className="p-4">
            <div className="h-48 relative">
              {/* Simple bar chart for stage distribution */}
              <div className="absolute inset-0 flex items-end pb-10">
                {Object.entries(portfolioStats.stageDistribution).map(([stage, count], i) => {
                  const percentage = Math.round((count / portfolioStats.totalProjects) * 100);
                  return (
                    <div key={stage} className="flex-1 flex flex-col items-center justify-end mr-2 last:mr-0">
                      <div 
                        className="w-full bg-primary-600 rounded-t transition-all duration-500"
                        style={{ height: `${percentage * 2}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              
              {/* X axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                {Object.entries(portfolioStats.stageDistribution).map(([stage, _], i) => (
                  <div key={stage} className="text-xs text-gray-500">
                    {stage}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-2 space-y-2">
              {Object.entries(portfolioStats.stageDistribution).map(([stage, count], i) => {
                const percentage = Math.round((count / portfolioStats.totalProjects) * 100);
                return (
                  <div key={stage} className="flex justify-between text-sm">
                    <span className="text-gray-700">{stage}</span>
                    <span className="text-gray-900 font-medium">{count} ({percentage}%)</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center text-xs text-gray-600">
                <Zap size={12} className="mr-1.5 text-primary-600" />
                {language === 'zh' 
                  ? '投资组合阶段平衡，与投资策略保持一致' 
                  : 'Portfolio stage balance is aligned with investment strategy'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Runway Analysis */}
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '资金可持续性分析' : 'Runway Analysis'}
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-3 mb-6">
              {filteredProjects.map(project => {
                const isLowRunway = project.financials.runway <= 6;
                return (
                  <div key={project.id} className="flex items-center">
                    <div className="w-24 truncate text-sm text-gray-700">{project.name}</div>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            project.financials.runway > 12 ? 'bg-success-500' :
                            project.financials.runway > 6 ? 'bg-warning-500' :
                            'bg-error-500'
                          }`} 
                          style={{width: `${Math.min(100, (project.financials.runway / 24) * 100)}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${isLowRunway ? 'text-error-600' : 'text-gray-700'}`}>
                      {project.financials.runway} {language === 'zh' ? '个月' : 'months'}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '资金状况概览' : 'Funding Status Overview'}
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-success-100 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">{language === 'zh' ? '健康' : 'Healthy'}</p>
                  <p className="text-lg font-semibold text-success-700">
                    {filteredProjects.filter(p => p.financials.runway > 12).length}
                  </p>
                  <p className="text-xs text-success-600">&gt;12 {language === 'zh' ? '个月' : 'months'}</p>
                </div>
                <div className="bg-warning-100 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">{language === 'zh' ? '需关注' : 'Watch'}</p>
                  <p className="text-lg font-semibold text-warning-700">
                    {filteredProjects.filter(p => p.financials.runway <= 12 && p.financials.runway > 6).length}
                  </p>
                  <p className="text-xs text-warning-600">6-12 {language === 'zh' ? '个月' : 'months'}</p>
                </div>
                <div className="bg-error-100 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">{language === 'zh' ? '紧急' : 'Critical'}</p>
                  <p className="text-lg font-semibold text-error-700">
                    {filteredProjects.filter(p => p.financials.runway <= 6).length}
                  </p>
                  <p className="text-xs text-error-600">&lt;6 {language === 'zh' ? '个月' : 'months'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects with Health Score */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '项目健康度' : 'Project Health'}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded ${viewMode === 'cards' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
              title={language === 'zh' ? '卡片视图' : 'Card View'}
            >
              <BarChart2 size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
              title={language === 'zh' ? '表格视图' : 'Table View'}
            >
              <Briefcase size={16} />
            </button>
          </div>
        </div>
        
        {viewMode === 'cards' ? (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => {
              const healthScore = getProjectHealthScore(project);
              return (
                <div 
                  key={project.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="h-2 w-full bg-gray-100">
                    <div 
                      className={`h-2 ${
                        healthScore.status === 'healthy' ? 'bg-success-500' :
                        healthScore.status === 'warning' ? 'bg-warning-500' :
                        'bg-error-500'
                      }`} 
                      style={{width: `${healthScore.score}%`}}
                    ></div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-primary-800 mb-1">{project.name}</h3>
                        <div className="flex items-center">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-800">
                            {project.industry}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-800 ml-1">
                            {project.stage}
                          </span>
                        </div>
                      </div>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                        healthScore.status === 'healthy' ? 'bg-success-100 text-success-800' :
                        healthScore.status === 'warning' ? 'bg-warning-100 text-warning-800' :
                        'bg-error-100 text-error-800'
                      }`}>
                        {healthScore.score}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500 mb-0.5">
                          {language === 'zh' ? '增长率' : 'Growth Rate'}
                        </p>
                        <p className="text-sm font-medium text-success-600">
                          {project.financials.revenueGrowth}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500 mb-0.5">
                          {language === 'zh' ? '月消耗' : 'Monthly Burn'}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          ${(project.financials.burn/1000).toFixed(0)}K
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500 mb-0.5">
                          {language === 'zh' ? '资金可支撑' : 'Runway'}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {project.financials.runway} {language === 'zh' ? '个月' : 'mo'}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500 mb-0.5">
                          {language === 'zh' ? '估值' : 'Valuation'}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {project.valuation}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {language === 'zh' ? '持有' : 'Holding'}: 1.2 {language === 'zh' ? '年' : 'years'}
                      </div>
                      <button className="text-xs text-primary-600 hover:text-primary-800 flex items-center">
                        {language === 'zh' ? '查看详情' : 'Details'}
                        <ChevronRight size={12} className="ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '项目' : 'Project'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '行业/阶段' : 'Industry/Stage'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '健康评分' : 'Health Score'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '增长率' : 'Growth Rate'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '月消耗/资金可支撑' : 'Burn/Runway'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '估值' : 'Valuation'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map(project => {
                  const healthScore = getProjectHealthScore(project);
                  return (
                    <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {project.logo ? (
                              <img className="h-10 w-10 rounded-md object-cover" src={project.logo} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center text-lg font-bold">
                                {project.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-primary-800">{project.name}</div>
                            <div className="text-xs text-gray-500">{project.founders[0]?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{project.industry}</div>
                          <div className="text-xs text-gray-500">{project.stage}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              healthScore.status === 'healthy' ? 'bg-success-100 text-success-800' :
                              healthScore.status === 'warning' ? 'bg-warning-100 text-warning-800' :
                              'bg-error-100 text-error-800'
                            }`}
                          >
                            {healthScore.score}%
                          </div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                healthScore.status === 'healthy' ? 'bg-success-500' :
                                healthScore.status === 'warning' ? 'bg-warning-500' :
                                'bg-error-500'
                              }`}
                              style={{width: `${healthScore.score}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-success-600 flex items-center">
                          <ArrowUpRight size={14} className="mr-1" />
                          {project.financials.revenueGrowth}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${(project.financials.burn/1000).toFixed(0)}K / mo</div>
                        <div className={`text-xs ${project.financials.runway <= 6 ? 'text-error-600' : 'text-gray-500'}`}>
                          {project.financials.runway} {language === 'zh' ? '个月可支撑' : 'months runway'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.valuation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Portfolio Insights */}
      <div className="mt-6 glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '投资组合洞察' : 'Portfolio Insights'}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-1.5 rounded-full mr-3">
                  <BarChart2 size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-800 mb-1">
                    {language === 'zh' ? '多元化分析' : 'Diversification Analysis'}
                  </h3>
                  <p className="text-xs text-gray-700">
                    {language === 'zh' 
                      ? `投资组合集中于${Object.keys(portfolioStats.industryDistribution).length}个不同行业，行业间相关性较低，有助于降低风险。`
                      : `Portfolio is spread across ${Object.keys(portfolioStats.industryDistribution).length} different industries with low inter-industry correlation, helping to reduce risk.`
                    }
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {language === 'zh'
                      ? '建议：考虑增加清洁技术领域的配置，以进一步减少行业相关性。'
                      : 'Recommendation: Consider increasing allocation to CleanTech to further reduce industry correlation.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-1.5 rounded-full mr-3">
                  <Clock size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-800 mb-1">
                    {language === 'zh' ? '资金规划' : 'Runway Planning'}
                  </h3>
                  <p className="text-xs text-gray-700">
                    {language === 'zh'
                      ? `${filteredProjects.filter(p => p.financials.runway <= 6).length}个项目在未来6个月内需要筹集额外资金，总计估计需要¥20M。`
                      : `${filteredProjects.filter(p => p.financials.runway <= 6).length} projects will need to raise additional funding within 6 months, with an estimated total need of $20M.`
                    }
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {language === 'zh'
                      ? '建议：为AgriSense准备后续投资计划，最迟于3个月内开始流程。'
                      : 'Recommendation: Prepare follow-on investment plan for AgriSense, starting the process no later than 3 months from now.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-1.5 rounded-full mr-3">
                  <DollarSign size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-800 mb-1">
                    {language === 'zh' ? '退出机会' : 'Exit Opportunities'}
                  </h3>
                  <p className="text-xs text-gray-700">
                    {language === 'zh'
                      ? 'NeuralFinance和MedVR可能在未来12-18个月内出现有利的退出窗口，基于当前增长轨迹和行业动态。'
                      : 'NeuralFinance and MedVR may present favorable exit windows within the next 12-18 months based on current growth trajectories and industry dynamics.'}
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {language === 'zh'
                      ? '建议：开始准备这些项目的潜在退出战略，并与创始人讨论时间安排。'
                      : 'Recommendation: Start preparing potential exit strategies for these projects and discuss timing with founders.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {language === 'zh' ? '投资组合总体健康度' : 'Overall Portfolio Health'}
            </h3>
            <div className="flex items-center mb-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-4">
                <div className="bg-success-500 h-2.5 rounded-full" style={{width: '78%'}}></div>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-success-600 mr-1.5" />
                <span className="font-medium text-gray-900">78%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'zh'
                ? '您的投资组合总体状况良好，大部分项目表现符合或超出预期。重点关注资金可支撑时间较短的项目。'
                : 'Your portfolio is in good health overall, with most investments performing at or above expectations. Pay close attention to projects with shorter runways.'}
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                  <TrendingUp size={12} className="text-success-600 mr-1" />
                  {language === 'zh' ? '表现最佳' : 'Top Performing'}
                </h4>
                <p className="text-sm font-medium text-primary-700">
                  {filteredProjects.sort((a, b) => b.financials.revenueGrowth - a.financials.revenueGrowth)[0]?.name}
                </p>
                <p className="text-xs text-success-600">+{filteredProjects.sort((a, b) => b.financials.revenueGrowth - a.financials.revenueGrowth)[0]?.financials.revenueGrowth}% YoY</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                  <AlertTriangle size={12} className="text-warning-600 mr-1" />
                  {language === 'zh' ? '需关注' : 'Needs Attention'}
                </h4>
                <p className="text-sm font-medium text-primary-700">
                  {filteredProjects.sort((a, b) => a.financials.runway - b.financials.runway)[0]?.name}
                </p>
                <p className="text-xs text-warning-600">
                  {filteredProjects.sort((a, b) => a.financials.runway - b.financials.runway)[0]?.financials.runway} {language === 'zh' ? '个月可支撑' : 'mo runway'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                  <ArrowUpRight size={12} className="text-primary-600 mr-1" />
                  {language === 'zh' ? '增长潜力' : 'Growth Potential'}
                </h4>
                <p className="text-sm font-medium text-primary-700">
                  {filteredProjects.sort((a, b) => {
                    // Simple growth potential calculation - more runway and higher growth rate
                    const aPotential = (a.financials.revenueGrowth * 0.7) + (a.financials.runway * 2);
                    const bPotential = (b.financials.revenueGrowth * 0.7) + (b.financials.runway * 2);
                    return bPotential - aPotential;
                  })[0]?.name}
                </p>
                <p className="text-xs text-primary-600">
                  {language === 'zh' ? '可能快速发展' : 'Poised for rapid growth'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;