import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  BarChart, Calendar, Filter, Download, RefreshCw, TrendingUp, 
  TrendingDown, DollarSign, Target, Users, PieChart, Activity,
  ChevronDown, ChevronRight, ArrowUpRight
} from 'lucide-react';
import AIPortfolioAnalyzer from '../components/AIChat/AIPortfolioAnalyzer';

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [showFilters, setShowFilters] = useState(false);
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate data loading when time range changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRange]);
  
  // Mock data
  const performanceData = {
    invested: language === 'zh' ? '¥35M' : '$35M',
    invested_change: '+12%',
    valuationGrowth: '1.8x',
    valuationGrowth_change: '+0.3x',
    returns: language === 'zh' ? '¥8.4M' : '$8.4M',
    returns_change: '+22%',
    activeDeals: 12,
    activeDeals_change: '+3'
  };
  
  // Monthly deal activity
  const dealActivityData = [
    { month: language === 'zh' ? '1月' : 'Jan', value: 3 },
    { month: language === 'zh' ? '2月' : 'Feb', value: 5 },
    { month: language === 'zh' ? '3月' : 'Mar', value: 2 },
    { month: language === 'zh' ? '4月' : 'Apr', value: 6 },
    { month: language === 'zh' ? '5月' : 'May', value: 4 },
    { month: language === 'zh' ? '6月' : 'Jun', value: 7 }
  ];
  
  // Top performing deals
  const topDeals = [
    { name: 'NeuralFinance', sector: language === 'zh' ? '金融科技' : 'Fintech', roi: '2.4x', growth: '+140%' },
    { name: 'QuantumSecure', sector: language === 'zh' ? '网络安全' : 'Cybersecurity', roi: '1.8x', growth: '+80%' },
    { name: 'MedVR', sector: language === 'zh' ? '医疗科技' : 'HealthTech', roi: '2.1x', growth: '+110%' }
  ];
  
  // Portfolio allocation
  const portfolioAllocation = [
    { sector: language === 'zh' ? '金融科技' : 'Fintech', percentage: 32, color: 'bg-blue-500' },
    { sector: language === 'zh' ? '医疗科技' : 'HealthTech', percentage: 24, color: 'bg-green-500' },
    { sector: language === 'zh' ? '网络安全' : 'Cybersecurity', percentage: 18, color: 'bg-purple-500' },
    { sector: language === 'zh' ? '清洁技术' : 'CleanTech', percentage: 14, color: 'bg-yellow-500' },
    { sector: language === 'zh' ? '农业科技' : 'AgTech', percentage: 12, color: 'bg-pink-500' }
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '业绩仪表盘' : 'Performance Dashboard'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '投资组合和业绩分析' : 'Portfolio and performance analysis'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex rounded-md shadow-sm">
            <button
              className={`px-3 py-1.5 text-sm ${timeRange === 'month' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors rounded-l-md border border-gray-300`}
              onClick={() => setTimeRange('month')}
            >
              {language === 'zh' ? '月度' : 'Month'}
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${timeRange === 'quarter' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors border-t border-b border-gray-300`}
              onClick={() => setTimeRange('quarter')}
            >
              {language === 'zh' ? '季度' : 'Quarter'}
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${timeRange === 'year' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors rounded-r-md border border-gray-300`}
              onClick={() => setTimeRange('year')}
            >
              {language === 'zh' ? '年度' : 'Year'}
            </button>
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
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '行业' : 'Industry'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">
                  {language === 'zh' ? '所有行业' : 'All Industries'}
                </option>
                <option value="fintech">
                  {language === 'zh' ? '金融科技' : 'Fintech'}
                </option>
                <option value="healthtech">
                  {language === 'zh' ? '医疗科技' : 'HealthTech'}
                </option>
                <option value="cleantech">
                  {language === 'zh' ? '清洁技术' : 'CleanTech'}
                </option>
                <option value="cybersecurity">
                  {language === 'zh' ? '网络安全' : 'Cybersecurity'}
                </option>
                <option value="agtech">
                  {language === 'zh' ? '农业科技' : 'AgTech'}
                </option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '投资阶段' : 'Investment Stage'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">
                  {language === 'zh' ? '所有阶段' : 'All Stages'}
                </option>
                <option value="seed">
                  {language === 'zh' ? '种子轮' : 'Seed'}
                </option>
                <option value="series-a">
                  {language === 'zh' ? 'A轮' : 'Series A'}
                </option>
                <option value="series-b">
                  {language === 'zh' ? 'B轮' : 'Series B'}
                </option>
                <option value="growth">
                  {language === 'zh' ? '增长期' : 'Growth'}
                </option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '投资金额' : 'Investment Amount'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">
                  {language === 'zh' ? '所有金额' : 'All Amounts'}
                </option>
                <option value="under-1m">
                  {language === 'zh' ? '小于100万' : 'Under $1M'}
                </option>
                <option value="1m-5m">
                  {language === 'zh' ? '100万-500万' : '$1M-$5M'}
                </option>
                <option value="5m-10m">
                  {language === 'zh' ? '500万-1000万' : '$5M-$10M'}
                </option>
                <option value="over-10m">
                  {language === 'zh' ? '超过1000万' : 'Over $10M'}
                </option>
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
      
      {/* Main Dashboard Layout - AI Portfolio Analyzer added */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (8/12) for regular content */}
        <div className="col-span-12 lg:col-span-8">
          {/* 关键指标 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500 text-sm flex items-center">
                  <DollarSign size={16} className="mr-1.5" />
                  {language === 'zh' ? '已投资总额' : 'Total Invested'}
                </div>
                <div className={`flex items-center text-xs ${performanceData.invested_change.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                  {performanceData.invested_change.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                  {performanceData.invested_change}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-800">
                {performanceData.invested}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500 text-sm flex items-center">
                  <Target size={16} className="mr-1.5" />
                  {language === 'zh' ? '估值增长' : 'Valuation Growth'}
                </div>
                <div className={`flex items-center text-xs ${performanceData.valuationGrowth_change.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                  {performanceData.valuationGrowth_change.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                  {performanceData.valuationGrowth_change}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-800">
                {performanceData.valuationGrowth}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500 text-sm flex items-center">
                  <BarChart size={16} className="mr-1.5" />
                  {language === 'zh' ? '已实现回报' : 'Realized Returns'}
                </div>
                <div className={`flex items-center text-xs ${performanceData.returns_change.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                  {performanceData.returns_change.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                  {performanceData.returns_change}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-800">
                {performanceData.returns}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500 text-sm flex items-center">
                  <Activity size={16} className="mr-1.5" />
                  {language === 'zh' ? '活跃项目' : 'Active Projects'}
                </div>
                <div className={`flex items-center text-xs ${performanceData.activeDeals_change.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                  {performanceData.activeDeals_change.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                  {performanceData.activeDeals_change}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-800">
                {performanceData.activeDeals}
              </div>
            </div>
          </div>
          
          {/* 投资活动图表 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-medium text-primary-800">
                {language === 'zh' ? '投资活动' : 'Investment Activity'}
              </h2>
              <button className="flex items-center text-sm text-gray-600">
                {language === 'zh' ? '按时间' : 'By Time'}
                <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
            <div className="p-4">
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-end justify-between px-6">
                  {dealActivityData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-12 bg-primary-600 rounded-t transition-all duration-500" 
                        style={{ height: `${item.value * 30}px` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <div>
                  <div className="text-sm text-gray-500">
                    {language === 'zh' ? '平均每月投资' : 'Avg. Monthly Investment'}
                  </div>
                  <div className="text-lg font-semibold text-primary-800">
                    {language === 'zh' ? '¥5.8M' : '$5.8M'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {language === 'zh' ? '项目转化率' : 'Deal Conversion Rate'}
                  </div>
                  <div className="text-lg font-semibold text-success-600">18.5%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {language === 'zh' ? '平均决策时间' : 'Avg. Decision Time'}
                  </div>
                  <div className="text-lg font-semibold text-primary-800">
                    {language === 'zh' ? '42天' : '42 days'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 表现最好的投资和风险分析 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-medium text-primary-800">
                  {language === 'zh' ? '表现最佳项目' : 'Top Performing Deals'}
                </h2>
                <button className="text-sm text-primary-600 hover:text-primary-800">
                  {language === 'zh' ? '查看全部' : 'View All'}
                </button>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        {language === 'zh' ? '项目' : 'Project'}
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        {language === 'zh' ? '行业' : 'Sector'}
                      </th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">ROI</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        {language === 'zh' ? '增长' : 'Growth'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topDeals.map((deal, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-primary-800">{deal.name}</td>
                        <td className="py-3 text-sm text-gray-600">{deal.sector}</td>
                        <td className="py-3 text-sm text-right font-medium text-success-600">{deal.roi}</td>
                        <td className="py-3 text-sm text-right text-success-600 flex items-center justify-end">
                          <ArrowUpRight size={14} className="mr-1" />
                          {deal.growth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      {language === 'zh' ? '投资组合平均回报率' : 'Portfolio Average ROI'}
                    </div>
                    <div className="text-sm font-semibold text-success-600">1.6x</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium text-primary-800">
                  {language === 'zh' ? '风险分析' : 'Risk Analysis'}
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'zh' ? '投资集中度' : 'Investment Concentration'}
                    </div>
                    <div className="text-lg font-semibold text-primary-800">
                      {language === 'zh' ? '中等' : 'Medium'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'zh' ? '市场波动敏感度' : 'Market Volatility Sensitivity'}
                    </div>
                    <div className="text-lg font-semibold text-primary-800">
                      {language === 'zh' ? '低' : 'Low'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'zh' ? '流动性风险' : 'Liquidity Risk'}
                    </div>
                    <div className="text-lg font-semibold text-primary-800">
                      {language === 'zh' ? '中高' : 'Medium-High'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'zh' ? '整体投资风险' : 'Overall Investment Risk'}
                    </div>
                    <div className="text-lg font-semibold text-primary-800">
                      {language === 'zh' ? '中等' : 'Medium'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '55%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {language === 'zh' ? '风险缓解建议' : 'Risk Mitigation Recommendations'}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-primary-600 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {language === 'zh' 
                          ? '考虑增加医疗科技和清洁技术领域的投资，以提高多元化程度' 
                          : 'Consider increasing investments in HealthTech and CleanTech to improve diversification'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-primary-600 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {language === 'zh' 
                          ? '关注流动性较高的后期项目，降低总体流动性风险' 
                          : 'Focus on later-stage projects with higher liquidity to reduce overall liquidity risk'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-primary-600 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {language === 'zh' 
                          ? '建立更严格的尽职调查流程，特别是针对新兴行业的项目' 
                          : 'Establish more rigorous due diligence processes, especially for projects in emerging industries'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* 行业分配 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-medium text-primary-800">
                {language === 'zh' ? '行业分配' : 'Industry Allocation'}
              </h2>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="relative h-40 flex items-center justify-center">
                      {/* Simplified chart representation */}
                      <div className="w-32 h-32 rounded-full border-8 border-blue-500 relative">
                        <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-green-500 -ml-px transform -rotate-90 origin-bottom-left rounded-tr-full"></div>
                        <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-purple-500 -ml-px transform rotate-0 origin-bottom-left rounded-tr-full"></div>
                        <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-yellow-500 -ml-px transform rotate-90 origin-bottom-left rounded-tr-full" style={{clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'}}></div>
                        <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-pink-500 -ml-px transform rotate-135 origin-bottom-left rounded-tr-full" style={{clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)'}}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      {portfolioAllocation.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                          <div className="flex-1 text-sm text-gray-700">{item.sector}</div>
                          <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      {language === 'zh' ? '行业多元化分析' : 'Industry Diversification Analysis'}
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {language === 'zh'
                          ? '当前投资组合在金融科技领域占比较高(32%)，但整体多元化程度良好。'
                          : 'Current portfolio has high allocation to Fintech (32%) but overall diversification is good.'}
                      </p>
                      
                      <div className="bg-primary-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-primary-800 mb-1">
                          {language === 'zh' ? '相关性分析' : 'Correlation Analysis'}
                        </h4>
                        <p className="text-xs text-gray-700">
                          {language === 'zh'
                            ? '医疗科技与金融科技的市场相关性较低，有助于减少整体波动性。考虑增加清洁技术配置以进一步提高多元化程度。'
                            : 'HealthTech has low market correlation with Fintech, helping to reduce overall volatility. Consider increasing CleanTech allocation to further improve diversification.'}
                        </p>
                      </div>
                      
                      <div className="bg-success-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-success-800 mb-1">
                          {language === 'zh' ? '行业增长展望' : 'Industry Growth Outlook'}
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">
                                {language === 'zh' ? '金融科技' : 'Fintech'}
                              </span>
                              <span className="text-success-600">+18%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-success-500 h-1.5 rounded-full" style={{width: '70%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">
                                {language === 'zh' ? '医疗科技' : 'HealthTech'}
                              </span>
                              <span className="text-success-600">+24%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-success-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">
                                {language === 'zh' ? '清洁技术' : 'CleanTech'}
                              </span>
                              <span className="text-success-600">+32%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-success-500 h-1.5 rounded-full" style={{width: '95%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column (4/12) for AI analytics */}
        <div className="col-span-12 lg:col-span-4">
          {/* AI Portfolio Analyzer */}
          <AIPortfolioAnalyzer />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;