import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, TrendingUp, Search, BarChart, RefreshCw, Download, Filter } from 'lucide-react';

const MarketIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const trendingTopics = [
    { name: 'Artificial Intelligence', growth: '+142%', category: 'Technology' },
    { name: 'Climate Tech', growth: '+87%', category: 'CleanTech' },
    { name: 'Digital Health', growth: '+63%', category: 'HealthTech' },
    { name: 'Crypto Infrastructure', growth: '+55%', category: 'Blockchain' },
    { name: 'Supply Chain Optimization', growth: '+48%', category: 'Logistics' }
  ];

  const recentNews = [
    { 
      title: 'Series C Round Raises $50M for AI Startup NeuralSystems',
      source: 'TechCrunch',
      date: '2 days ago',
      url: '#'
    },
    { 
      title: 'QuantumCompute Acquires DataMesh for $120M',
      source: 'Bloomberg',
      date: '3 days ago',
      url: '#'
    },
    { 
      title: 'Regulatory Changes Set to Impact Fintech Investments',
      source: 'Financial Times',
      date: '5 days ago',
      url: '#'
    },
    { 
      title: 'Climate Tech Investments Surge in Q2 2025',
      source: 'Reuters',
      date: '1 week ago',
      url: '#'
    }
  ];

  const fundingRounds = [
    { 
      company: 'GreenEnergy Solutions',
      round: 'Series B',
      amount: '$45M',
      investors: ['EcoVentures', 'Climate Capital', 'Green Growth Fund'],
      date: 'Apr 15, 2025'
    },
    { 
      company: 'MedTech Innovations',
      round: 'Series A',
      amount: '$28M',
      investors: ['HealthVentures', 'Medical Angels', 'BioCapital'],
      date: 'Apr 12, 2025'
    },
    { 
      company: 'SecureBlockchain',
      round: 'Seed',
      amount: '$8M',
      investors: ['Crypto Ventures', 'Blockchain Capital', 'Early Bets'],
      date: 'Apr 10, 2025'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">{t('common.marketIntelligence')}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? 
              '了解市场趋势和投资机会' : 
              'Stay updated with market trends and investment opportunities'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <RefreshCw size={16} className="text-gray-500" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Download size={16} className="text-gray-500" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索市场与趋势...' : 'Search markets & trends...'}
              className="w-64 pr-8 pl-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e as any)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={handleSearch}
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-6">
          <button
            className={`py-2.5 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'trends' 
                ? 'border-primary-600 text-primary-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('trends')}
          >
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-1.5" />
              {language === 'zh' ? '市场趋势' : 'Market Trends'}
            </div>
          </button>
          <button
            className={`py-2.5 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'news' 
                ? 'border-primary-600 text-primary-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('news')}
          >
            <div className="flex items-center">
              <Globe size={16} className="mr-1.5" />
              {language === 'zh' ? '行业新闻' : 'Industry News'}
            </div>
          </button>
          <button
            className={`py-2.5 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'funding' 
                ? 'border-primary-600 text-primary-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('funding')}
          >
            <div className="flex items-center">
              <BarChart size={16} className="mr-1.5" />
              {language === 'zh' ? '融资活动' : 'Funding Activity'}
            </div>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Trends tab content */}
      {!isLoading && activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-primary-800">
                  {language === 'zh' ? '投资趋势分析' : 'Investment Trend Analysis'}
                </h2>
              </div>
              <div className="p-5">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    {language === 'zh' ? '趋势图表将显示在这里' : 'Interactive trend chart would appear here'}
                  </p>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'zh' ? '总投资额' : 'Total Investment'}
                    </p>
                    <p className="text-xl font-semibold text-primary-800">$8.2B</p>
                    <p className="text-xs text-success-600 flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1" />
                      {language === 'zh' ? '较上季度+12%' : '+12% from last quarter'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'zh' ? '交易数量' : 'Deal Count'}
                    </p>
                    <p className="text-xl font-semibold text-primary-800">587</p>
                    <p className="text-xs text-error-600 flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1 transform rotate-180" />
                      {language === 'zh' ? '较上季度-5%' : '-5% from last quarter'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'zh' ? '平均交易规模' : 'Avg Deal Size'}
                    </p>
                    <p className="text-xl font-semibold text-primary-800">$14M</p>
                    <p className="text-xs text-success-600 flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1" />
                      {language === 'zh' ? '较上季度+18%' : '+18% from last quarter'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary-800">
                  {language === 'zh' ? '行业表现' : 'Sector Performance'}
                </h2>
                <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
                  <Filter size={14} className="mr-1" />
                  {language === 'zh' ? '筛选' : 'Filter'}
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'zh' ? '人工智能' : 'Artificial Intelligence'}
                      </span>
                      <span className="text-sm text-success-600">+32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'zh' ? '气候科技' : 'Climate Tech'}
                      </span>
                      <span className="text-sm text-success-600">+26%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-success-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'zh' ? '金融科技' : 'Fintech'}
                      </span>
                      <span className="text-sm text-error-600">-8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'zh' ? '数字健康' : 'Digital Health'}
                      </span>
                      <span className="text-sm text-success-600">+18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-secondary-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'zh' ? '企业软件服务' : 'Enterprise SaaS'}
                      </span>
                      <span className="text-sm text-success-600">+12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-accent-400 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-primary-800">
                  {language === 'zh' ? '热门话题' : 'Trending Topics'}
                </h2>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-gray-100">
                  {trendingTopics.map((topic, index) => (
                    <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">
                            {language === 'zh' ? 
                              (topic.name === 'Artificial Intelligence' ? '人工智能' :
                              topic.name === 'Climate Tech' ? '气候科技' :
                              topic.name === 'Digital Health' ? '数字健康' :
                              topic.name === 'Crypto Infrastructure' ? '加密基础设施' :
                              topic.name === 'Supply Chain Optimization' ? '供应链优化' :
                              topic.name) : topic.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {language === 'zh' ? 
                              (topic.category === 'Technology' ? '科技' :
                              topic.category === 'CleanTech' ? '清洁技术' :
                              topic.category === 'HealthTech' ? '健康科技' :
                              topic.category === 'Blockchain' ? '区块链' :
                              topic.category === 'Logistics' ? '物流' :
                              topic.category) : topic.category}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-success-600">{topic.growth}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-primary-800">
                  {language === 'zh' ? '地域洞察' : 'Geographic Insights'}
                </h2>
              </div>
              <div className="p-5">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">
                    {language === 'zh' ? '地区热力图将显示在这里' : 'Geographic heat map would appear here'}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? '北美' : 'North America'}
                    </span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? '亚太' : 'Asia Pacific'}
                    </span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? '欧洲' : 'Europe'}
                    </span>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? '其他地区' : 'Rest of World'}
                    </span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News tab content */}
      {!isLoading && activeTab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-primary-800">
                  {language === 'zh' ? '最新行业新闻' : 'Latest Industry News'}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentNews.map((item, index) => (
                  <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
                    <a href={item.url} className="block">
                      <h3 className="text-lg font-medium text-primary-700 hover:text-primary-800 mb-2">
                        {language === 'zh' ? 
                          (index === 0 ? 'AI创业公司NeuralSystems完成5000万美元C轮融资' :
                           index === 1 ? 'QuantumCompute以1.2亿美元收购DataMesh' :
                           index === 2 ? '监管变化将影响金融科技投资' :
                           index === 3 ? '2025年第二季度气候科技投资激增' :
                           item.title) : item.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">{item.source}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {language === 'zh' ? 
                            (item.date === '2 days ago' ? '2天前' :
                             item.date === '3 days ago' ? '3天前' :
                             item.date === '5 days ago' ? '5天前' :
                             item.date === '1 week ago' ? '1周前' :
                             item.date) : item.date}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-primary-800">
                  {language === 'zh' ? '新闻情感分析' : 'News Sentiment Analysis'}
                </h2>
              </div>
              <div className="p-5">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">
                    {language === 'zh' ? '情感分析图表将显示在这里' : 'Sentiment chart would appear here'}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-success-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'zh' ? '积极' : 'Positive'}
                    </p>
                    <p className="text-lg font-semibold text-success-700">65%</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'zh' ? '中性' : 'Neutral'}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">23%</p>
                  </div>
                  <div className="bg-error-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'zh' ? '消极' : 'Negative'}
                    </p>
                    <p className="text-lg font-semibold text-error-700">12%</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '热门提及实体' : 'Top Mentioned Entities'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {language === 'zh' ? '人工智能' : 'Artificial Intelligence'}
                    </span>
                    <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {language === 'zh' ? '监管变化' : 'Regulatory Changes'}
                    </span>
                    <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {language === 'zh' ? '市场扩张' : 'Market Expansion'}
                    </span>
                    <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {language === 'zh' ? '收购' : 'Acquisitions'}
                    </span>
                    <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {language === 'zh' ? '融资轮次' : 'Funding Rounds'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-primary-800">
                  {language === 'zh' ? '新闻来源' : 'News Sources'}
                </h2>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">TechCrunch</span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {language === 'zh' ? '24篇文章' : '24 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Bloomberg</span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {language === 'zh' ? '18篇文章' : '18 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Financial Times</span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {language === 'zh' ? '15篇文章' : '15 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Reuters</span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {language === 'zh' ? '12篇文章' : '12 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Wall Street Journal</span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {language === 'zh' ? '10篇文章' : '10 articles'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funding tab content */}
      {!isLoading && activeTab === 'funding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-primary-800">
                  {language === 'zh' ? '最近融资轮次' : 'Recent Funding Rounds'}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'zh' ? '公司' : 'Company'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'zh' ? '轮次' : 'Round'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'zh' ? '金额' : 'Amount'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'zh' ? '日期' : 'Date'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fundingRounds.map((round, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary-700">{round.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {language === 'zh' ? 
                              (round.round === 'Series B' ? 'B轮' :
                               round.round === 'Series A' ? 'A轮' :
                               round.round === 'Seed' ? '种子轮' :
                               round.round) : round.round}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {round.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {round.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 text-center">
                <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  {language === 'zh' ? '查看所有融资轮次' : 'View All Funding Rounds'}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-primary-800">
                  {language === 'zh' ? '按阶段划分的融资' : 'Funding by Stage'}
                </h2>
              </div>
              <div className="p-5">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">
                    {language === 'zh' ? '融资阶段图表将显示在这里' : 'Funding stage chart would appear here'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? '种子轮' : 'Seed'}
                    </span>
                    <span className="text-sm font-medium">27%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? 'A轮' : 'Series A'}
                    </span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? 'B轮' : 'Series B'}
                    </span>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {language === 'zh' ? 'C轮及以上' : 'Series C+'}
                    </span>
                    <span className="text-sm font-medium">17%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-primary-800">
                  {language === 'zh' ? '顶级投资者' : 'Top Investors'}
                </h2>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-gray-100">
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">Sequoia Capital</h3>
                        <p className="text-xs text-gray-500">
                          {language === 'zh' ? '2025年第二季度12笔交易' : '12 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">Andreessen Horowitz</h3>
                        <p className="text-xs text-gray-500">
                          {language === 'zh' ? '2025年第二季度10笔交易' : '10 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">Accel</h3>
                        <p className="text-xs text-gray-500">
                          {language === 'zh' ? '2025年第二季度8笔交易' : '8 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">Lightspeed Venture Partners</h3>
                        <p className="text-xs text-gray-500">
                          {language === 'zh' ? '2025年第二季度7笔交易' : '7 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">Founders Fund</h3>
                        <p className="text-xs text-gray-500">
                          {language === 'zh' ? '2025年第二季度6笔交易' : '6 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketIntelligence;