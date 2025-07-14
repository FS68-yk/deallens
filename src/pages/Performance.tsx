import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { 
  TrendingUp, TrendingDown, Filter, ChevronDown, Calendar, 
  RefreshCw, Download, BarChart2, PieChart, ArrowRight, 
  DollarSign, Percent, Clock, Briefcase, Target, AlertTriangle
} from 'lucide-react';

const Performance: React.FC = () => {
  const { language } = useLanguage();
  const { projects } = useAppContext();
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [timeRange]);
  
  // Mock performance data
  const performanceData = {
    irr: '18.2%',
    tvpi: '1.8x',
    rvpi: '1.3x',
    dpi: '0.5x',
    unrealizedGains: '¥85M',
    realizedGains: '¥32M',
    topPerformers: [
      { name: 'NeuralFinance', roi: '2.3x', growth: '+130%' },
      { name: 'MedVR', roi: '2.1x', growth: '+110%' },
      { name: 'QuantumSecure', roi: '1.7x', growth: '+70%' }
    ],
    underperformers: [
      { name: 'AgriSense', roi: '0.9x', performance: '-10%' }
    ],
    monthlyReturns: [
      { month: language === 'zh' ? '1月' : 'Jan', value: 2.3 },
      { month: language === 'zh' ? '2月' : 'Feb', value: -1.1 },
      { month: language === 'zh' ? '3月' : 'Mar', value: 3.5 },
      { month: language === 'zh' ? '4月' : 'Apr', value: 1.8 },
      { month: language === 'zh' ? '5月' : 'May', value: -0.5 },
      { month: language === 'zh' ? '6月' : 'Jun', value: 4.2 }
    ]
  };
  
  // Industry performance benchmarks
  const benchmarkData = {
    overall: {
      portfolio: 18.2,
      industry: 12.5,
      difference: 5.7
    },
    byIndustry: [
      { industry: 'Fintech', portfolio: 23.5, benchmark: 15.2, difference: 8.3 },
      { industry: 'HealthTech', portfolio: 21.0, benchmark: 18.7, difference: 2.3 },
      { industry: 'CleanTech', portfolio: 10.5, benchmark: 14.2, difference: -3.7 },
      { industry: 'Cybersecurity', portfolio: 17.8, benchmark: 13.1, difference: 4.7 }
    ]
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '绩效分析' : 'Performance Analysis'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '投资回报和业绩表现分析' : 'Investment returns and performance metrics'}
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
      
      {/* Optional filters panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '日期范围' : 'Date Range'}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '行业' : 'Industry'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">{language === 'zh' ? '所有行业' : 'All Industries'}</option>
                <option value="fintech">{language === 'zh' ? '金融科技' : 'Fintech'}</option>
                <option value="healthtech">{language === 'zh' ? '医疗科技' : 'HealthTech'}</option>
                <option value="cleantech">{language === 'zh' ? '清洁科技' : 'CleanTech'}</option>
                <option value="cybersecurity">{language === 'zh' ? '网络安全' : 'Cybersecurity'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '投资阶段' : 'Investment Stage'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">{language === 'zh' ? '所有阶段' : 'All Stages'}</option>
                <option value="seed">{language === 'zh' ? '种子轮' : 'Seed'}</option>
                <option value="series-a">{language === 'zh' ? 'A轮' : 'Series A'}</option>
                <option value="series-b">{language === 'zh' ? 'B轮' : 'Series B'}</option>
                <option value="series-c">{language === 'zh' ? 'C轮' : 'Series C+'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '项目状态' : 'Project Status'}
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">{language === 'zh' ? '所有状态' : 'All Statuses'}</option>
                <option value="active">{language === 'zh' ? '活跃' : 'Active'}</option>
                <option value="exited">{language === 'zh' ? '已退出' : 'Exited'}</option>
                <option value="partially-exited">{language === 'zh' ? '部分退出' : 'Partially Exited'}</option>
                <option value="written-off">{language === 'zh' ? '已减记' : 'Written Off'}</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button className="text-sm text-primary-600 hover:text-primary-800">
              {language === 'zh' ? '重置筛选' : 'Reset Filters'}
            </button>
          </div>
        </div>
      )}
      
      {/* Key Metrics Section */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-3"></div>
            <p className="text-gray-500">
              {language === 'zh' ? '加载绩效指标...' : 'Loading performance metrics...'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-5 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">
                {language === 'zh' ? '内部收益率 (IRR)' : 'IRR'}
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-800 mr-2">{performanceData.irr}</span>
                <span className="text-sm bg-success-100 text-success-800 px-1.5 py-0.5 rounded-full flex items-center">
                  <TrendingUp size={12} className="mr-0.5" />
                  +5.7%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">
                TVPI
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-800 mr-2">{performanceData.tvpi}</span>
                <span className="text-sm bg-success-100 text-success-800 px-1.5 py-0.5 rounded-full flex items-center">
                  <TrendingUp size={12} className="mr-0.5" />
                  +0.2x
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">
                RVPI
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-800">{performanceData.rvpi}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">
                DPI
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-800">{performanceData.dpi}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">
                {language === 'zh' ? '未实现收益' : 'Unrealized Gains'}
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-800">{performanceData.unrealizedGains}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">
                {language === 'zh' ? '已实现收益' : 'Realized Gains'}
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-800">{performanceData.realizedGains}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly returns chart */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '月度收益' : 'Monthly Returns'}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">{language === 'zh' ? '平均月回报率' : 'Avg. Monthly Return'}:</span>
              <span className="font-medium text-success-600">1.7%</span>
            </div>
          </div>
          <div className="p-5">
            {/* Simple bar chart representing monthly returns */}
            <div className="h-64 flex items-end space-x-6 mb-2">
              {performanceData.monthlyReturns.map((month, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t ${month.value >= 0 ? 'bg-success-500' : 'bg-error-500'}`}
                    style={{height: `${Math.abs(month.value) * 10}%`}}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-1">
              {performanceData.monthlyReturns.map((month, i) => (
                <div key={i} className="text-xs text-gray-500 flex flex-col items-center">
                  <span>{month.month}</span>
                  <span className={month.value >= 0 ? 'text-success-600' : 'text-error-600'}>
                    {month.value > 0 ? '+' : ''}{month.value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'zh' ? '波动率 (标准差)' : 'Volatility (Std Dev)'}
                </span>
                <span className="text-sm font-medium">2.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'zh' ? '夏普比率' : 'Sharpe Ratio'}
                </span>
                <span className="text-sm font-medium">1.8</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Top performers */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">
              {language === 'zh' ? '投资表现概览' : 'Investment Performance Overview'}
            </h2>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '表现最佳投资' : 'Top Performers'}
            </h3>
            <div className="space-y-2 mb-6">
              {performanceData.topPerformers.map((performer, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-success-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">{performer.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-success-700 mr-2">{performer.roi}</span>
                    <span className="text-xs bg-success-100 text-success-800 px-1.5 py-0.5 rounded-full flex items-center">
                      {performer.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '表现欠佳投资' : 'Underperformers'}
            </h3>
            <div className="space-y-2 mb-6">
              {performanceData.underperformers.map((performer, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-error-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">{performer.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-error-700 mr-2">{performer.roi}</span>
                    <span className="text-xs bg-error-100 text-error-800 px-1.5 py-0.5 rounded-full flex items-center">
                      {performer.performance}
                    </span>
                  </div>
                </div>
              ))}
              {performanceData.underperformers.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-2">
                  {language === 'zh' ? '没有表现欠佳的投资' : 'No underperforming investments'}
                </div>
              )}
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '关键观察指标' : 'Key Metrics to Watch'}
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start">
                  <Target size={12} className="mt-0.5 mr-1.5 text-primary-600 flex-shrink-0" />
                  <span>
                    {language === 'zh' 
                      ? 'GreenChain的收入增长率正在上升，可能很快成为表现最佳者' 
                      : 'GreenChain revenue growth rate is increasing, may soon become a top performer'}
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={12} className="mt-0.5 mr-1.5 text-warning-600 flex-shrink-0" />
                  <span>
                    {language === 'zh' 
                      ? '注意QuantumSecure的现金消耗率上升' 
                      : 'Watch increasing burn rate at QuantumSecure'}
                  </span>
                </li>
                <li className="flex items-start">
                  <TrendingUp size={12} className="mt-0.5 mr-1.5 text-success-600 flex-shrink-0" />
                  <span>
                    {language === 'zh' 
                      ? '总体组合IRR高于行业基准5.7%' 
                      : 'Overall portfolio IRR is 5.7% above industry benchmark'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benchmarking Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '行业基准比较' : 'Industry Benchmark Comparison'}
          </h2>
        </div>
        <div className="p-5">
          <div className="flex justify-center items-center mb-6">
            <div className="w-full max-w-lg">
              <div className="flex items-center mb-3">
                <div className="text-sm text-gray-700 mr-2 w-28">
                  {language === 'zh' ? '您的投资组合' : 'Your Portfolio'}:
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-600 h-3 rounded-full" style={{width: `${benchmarkData.overall.portfolio}%`}}></div>
                </div>
                <div className="text-sm font-medium ml-2 w-16 text-right">
                  {benchmarkData.overall.portfolio}%
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="text-sm text-gray-700 mr-2 w-28">
                  {language === 'zh' ? '行业平均水平' : 'Industry Average'}:
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-500 h-3 rounded-full" style={{width: `${benchmarkData.overall.industry}%`}}></div>
                </div>
                <div className="text-sm font-medium ml-2 w-16 text-right">
                  {benchmarkData.overall.industry}%
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-sm text-gray-700 mr-2 w-28">
                  {language === 'zh' ? '超额收益' : 'Outperformance'}:
                </div>
                <div className="text-sm font-medium ml-2 text-success-600">
                  +{benchmarkData.overall.difference}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              {language === 'zh' ? '按行业细分表现' : 'Performance by Industry Segment'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benchmarkData.byIndustry.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">{item.industry}</h4>
                  
                  <div className="flex items-center mb-1.5">
                    <div className="text-xs text-gray-500 mr-2 w-24">
                      {language === 'zh' ? '您的投资' : 'Your Portfolio'}:
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{width: `${item.portfolio}%`}}></div>
                    </div>
                    <div className="text-xs font-medium ml-2 w-12 text-right">
                      {item.portfolio}%
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-1.5">
                    <div className="text-xs text-gray-500 mr-2 w-24">
                      {language === 'zh' ? '基准' : 'Benchmark'}:
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{width: `${item.benchmark}%`}}></div>
                    </div>
                    <div className="text-xs font-medium ml-2 w-12 text-right">
                      {item.benchmark}%
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-xs text-gray-500 mr-2 w-24">
                      {language === 'zh' ? '差异' : 'Difference'}:
                    </div>
                    <div className={`text-xs font-medium ${item.difference >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                      {item.difference > 0 ? '+' : ''}{item.difference}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance Attribution */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '业绩归因分析' : 'Performance Attribution'}
          </h2>
          <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
            {language === 'zh' ? '查看详细分析' : 'View Detailed Analysis'}
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <DollarSign size={16} className="text-primary-600 mr-1.5" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'zh' ? '估值变化' : 'Valuation Changes'}
                  </span>
                </div>
                <span className="text-success-600 font-medium">+12.3%</span>
              </div>
              <p className="text-xs text-gray-600">
                {language === 'zh' 
                  ? '主要由NeuralFinance和MedVR的估值上升驱动' 
                  : 'Primarily driven by increased valuations of NeuralFinance and MedVR'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Percent size={16} className="text-primary-600 mr-1.5" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'zh' ? '收入增长' : 'Revenue Growth'}
                  </span>
                </div>
                <span className="text-success-600 font-medium">+9.8%</span>
              </div>
              <p className="text-xs text-gray-600">
                {language === 'zh' 
                  ? '所有项目的平均收入增长为92%' 
                  : 'Average revenue growth across all projects is 92%'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Clock size={16} className="text-primary-600 mr-1.5" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'zh' ? '持有时间' : 'Holding Period'}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">1.8 {language === 'zh' ? '年' : 'years'}</span>
              </div>
              <p className="text-xs text-gray-600">
                {language === 'zh' 
                  ? '投资组合的加权平均持有期' 
                  : 'Weighted average holding period for the portfolio'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Briefcase size={16} className="text-primary-600 mr-1.5" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'zh' ? '后续投资' : 'Follow-on Investments'}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">¥28M</span>
              </div>
              <p className="text-xs text-gray-600">
                {language === 'zh' 
                  ? '对现有项目的追加投资总额' 
                  : 'Total additional capital deployed to existing investments'}
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {language === 'zh' ? '业绩影响因素' : 'Performance Impact Factors'}
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {language === 'zh' ? '市场选择' : 'Market Selection'}
                  </span>
                  <span className="text-sm text-success-600 font-medium">+6.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{width: '62%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {language === 'zh' ? '项目选择' : 'Project Selection'}
                  </span>
                  <span className="text-sm text-success-600 font-medium">+8.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {language === 'zh' ? '估值协商' : 'Valuation Negotiation'}
                  </span>
                  <span className="text-sm text-success-600 font-medium">+3.4%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{width: '34%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {language === 'zh' ? '投资时机' : 'Investment Timing'}
                  </span>
                  <span className="text-sm text-error-600 font-medium">-1.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-error-500 h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '绩效优化建议' : 'Performance Optimization Recommendations'}
          </h2>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <BarChart2 size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800 mb-1">
                    {language === 'zh' ? '投资分配优化' : 'Portfolio Allocation Optimization'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {language === 'zh' 
                      ? '考虑增加医疗科技领域的配置，因其表现持续超越市场基准。减少清洁技术领域的新增投资，直到该行业动态改善。' 
                      : 'Consider increasing allocation to HealthTech sector, which has consistently outperformed benchmarks. Reduce new investments in CleanTech until sector dynamics improve.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <RefreshCw size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800 mb-1">
                    {language === 'zh' ? '投资周期管理' : 'Investment Cycle Management'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {language === 'zh' 
                      ? '缩短尽职调查时间可能会提高投资时机选择。数据显示，延迟决策导致平均1.2%的性能损失。' 
                      : 'Reducing due diligence time may improve investment timing. Data shows delayed decision-making has resulted in an average 1.2% performance loss.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <PieChart size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800 mb-1">
                    {language === 'zh' ? '退出策略规划' : 'Exit Strategy Planning'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {language === 'zh' 
                      ? 'NeuralFinance正接近最佳退出窗口。考虑在未来6-9个月内与创始人讨论潜在的退出机会，以最大化回报。' 
                      : 'NeuralFinance is approaching optimal exit window. Consider discussing potential exit opportunities with founders within next 6-9 months to maximize returns.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;