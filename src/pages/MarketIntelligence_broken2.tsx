import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, TrendingUp, Search, BarChart, RefreshCw, Download, Filter } from 'lucide-react';
import { newsApiService, NewsArticle } from '../services/newsApiService';

const MarketIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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

  // 加载投资相关新闻
  const loadInvestmentNews = async () => {
    try {
      setNewsLoading(true);
      const news = await newsApiService.getInvestmentNews(10);
      setLatestNews(news);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load investment news:', error);
    } finally {
      setNewsLoading(false);
    }
  };

  // 加载科技新闻
  const loadTechNews = async () => {
    try {
      await newsApiService.getTechNews(5);
      // 暂时不使用科技新闻数据，后续可以扩展
    } catch (error) {
      console.error('Failed to load tech news:', error);
    }
  };

  useEffect(() => {
    loadInvestmentNews();
    loadTechNews();
  }, []);

  const refreshNews = () => {
    loadInvestmentNews();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {language === 'zh' ? '市场情报' : 'Market Intelligence'}
          </h1>
          <p className="text-white/60">
            {language === 'zh' ? '实时投资趋势分析和市场洞察' : 'Real-time investment trends and market insights'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索投资趋势...' : 'Search investment trends...'}
                className="w-64 pr-8 pl-3 py-1.5 text-sm glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e as React.FormEvent)}
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                type="submit"
              >
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-b border-white/20 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('trends')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'trends' ? 'border-primary-400 text-primary-400' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-2" />
              {language === 'zh' ? '趋势分析' : 'Trend Analysis'}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'news' ? 'border-primary-400 text-primary-400' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Globe size={16} className="mr-2" />
              {language === 'zh' ? '新闻资讯' : 'News & Insights'}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'insights' ? 'border-primary-400 text-primary-400' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <BarChart size={16} className="mr-2" />
              {language === 'zh' ? '市场洞察' : 'Market Insights'}
            </div>
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      )}

      {!isLoading && activeTab === 'trends' && (
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">
            {language === 'zh' ? '投资趋势分析' : 'Investment Trend Analysis'}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="glass px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white text-sm flex items-center">
              <Download size={14} className="mr-1" />
              {language === 'zh' ? '导出' : 'Export'}
            </button>
            <button className="glass px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white text-sm flex items-center">
              <Filter size={14} className="mr-1" />
              {language === 'zh' ? '筛选' : 'Filter'}
            </button>
          </div>
        </div>
      )}

      {!isLoading && activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl shadow-2xl overflow-hidden mb-6 border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h3 className="font-semibold text-white">
                  {language === 'zh' ? '投资趋势图表' : 'Investment Trend Chart'}
                </h3>
              </div>
              <div className="p-5">
                <div className="bg-white/10 rounded-lg min-h-[350px] border border-white/20 p-4">
                  <div className="w-full h-full relative">
                    {/* SVG Chart */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-white mb-2">
                        {language === 'zh' ? '全球投资分布热力图' : 'Global Investment Distribution Heat Map'}
                      </h4>
                    </div>
                    <svg viewBox="0 0 800 300" className="w-full h-[300px]">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line key={i} x1="60" y1={50 + i * 40} x2="740" y2={50 + i * 40} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      ))}
                      {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <line key={i} x1={60 + i * 113} y1="50" x2={60 + i * 113} y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      ))}
                      
                      {/* Y-axis labels */}
                      <text x="20" y="55" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">$500B</text>
                      <text x="20" y="95" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">$400B</text>
                      <text x="20" y="135" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">$300B</text>
                      <text x="20" y="175" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">$200B</text>
                      <text x="20" y="215" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">$100B</text>
                      <text x="35" y="255" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">$0</text>
                      
                      {/* X-axis labels */}
                      <text x="60" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2019</text>
                      <text x="173" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2020</text>
                      <text x="286" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2021</text>
                      <text x="399" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2022</text>
                      <text x="512" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2023</text>
                      <text x="625" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2024</text>
                      <text x="738" y="275" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="bold">2025</text>
                      
                      {/* Trend line */}
                      <path
                        d="M 60 180 Q 173 160 286 120 T 512 100 Q 625 90 738 85"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      
                      {/* Data points */}
                      {[
                        { x: 60, y: 180, value: '$280B' },
                        { x: 173, y: 160, value: '$320B' },
                        { x: 286, y: 120, value: '$420B' },
                        { x: 399, y: 110, value: '$450B' },
                        { x: 512, y: 100, value: '$480B' },
                        { x: 625, y: 90, value: '$510B' },
                        { x: 738, y: 85, value: '$530B' }
                      ].map((point, index) => (
                        <g key={index}>
                          <circle cx={point.x} cy={point.y} r="6" fill="#EF4444" stroke="white" strokeWidth="2" />
                          <text x={point.x} y={point.y - 15} fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="bold" textAnchor="middle">
                            {point.value}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20 mb-6">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '热门趋势' : 'Trending Topics'}
                </h2>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-white/20">
                  {trendingTopics.map((topic, index) => (
                    <li key={index} className="p-4 hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-white">
                            {language === 'zh' ? 
                              (topic.name === 'Artificial Intelligence' ? '人工智能' :
                              topic.name === 'Climate Tech' ? '气候科技' :
                              topic.name === 'Digital Health' ? '数字健康' :
                              topic.name === 'Crypto Infrastructure' ? '加密基础设施' :
                              topic.name === 'Supply Chain Optimization' ? '供应链优化' :
                              topic.name) : topic.name}
                          </h3>
                          <p className="text-xs text-white/60 mt-0.5">
                            {language === 'zh' ? 
                              (topic.category === 'Technology' ? '科技' :
                              topic.category === 'CleanTech' ? '清洁技术' :
                              topic.category === 'HealthTech' ? '健康科技' :
                              topic.category === 'Blockchain' ? '区块链' :
                              topic.category === 'Logistics' ? '物流' :
                              topic.category) : topic.category}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-green-400">{topic.growth}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && activeTab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20 flex justify-between items-center">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '最新投资资讯' : 'Latest Investment News'}
                </h2>
                <div className="flex items-center space-x-3">
                  {lastUpdated && (
                    <span className="text-xs text-white/60">
                      {language === 'zh' ? '更新时间: ' : 'Updated: '}
                      {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                  <button
                    onClick={refreshNews}
                    disabled={newsLoading}
                    className="glass px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white text-sm flex items-center disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={`mr-1 ${newsLoading ? 'animate-spin' : ''}`} />
                    {language === 'zh' ? '刷新' : 'Refresh'}
                  </button>
                </div>
              </div>
              <div className="divide-y divide-white/20">
                {latestNews.slice(0, 5).map((article) => (
                  <div key={article.id} className="p-4 hover:bg-white/10 transition-colors">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                      <h3 className="text-sm font-medium text-white hover:text-white/80 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-xs text-white/60">
                        <span className="font-medium">{article.source.name}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {newsApiService.formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '融资轮次' : 'Funding Rounds'}
                </h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {latestNews.slice(0, 3).map((article) => (
                    <div key={article.id} className="border-l-4 border-blue-400 pl-4">
                      <h4 className="text-sm font-medium text-white line-clamp-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-1">
                        {article.source.name} • {newsApiService.formatTimeAgo(article.publishedAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-5 border-b border-white/20">
              <h2 className="font-semibold text-white">
                {language === 'zh' ? 'AI 市场洞察' : 'AI Market Insights'}
              </h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {language === 'zh' ? '投资机会评分' : 'Investment Opportunity Score'}
                  </h3>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-green-400">8.7</div>
                    <div className="ml-2 text-xs text-white/60">/10</div>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {language === 'zh' ? '风险评估' : 'Risk Assessment'}
                  </h3>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {language === 'zh' ? '中等' : 'Medium'}
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {language === 'zh' ? '市场热度' : 'Market Heat'}
                  </h3>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-red-400">
                      {language === 'zh' ? '高' : 'High'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-5 border-b border-white/20">
              <h2 className="font-semibold text-white">
                {language === 'zh' ? '重点新闻' : 'Key News'}
              </h2>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-xs font-medium text-white/60 uppercase tracking-wider pb-2">
                        {language === 'zh' ? '标题' : 'Title'}
                      </th>
                      <th className="text-left text-xs font-medium text-white/60 uppercase tracking-wider pb-2">
                        {language === 'zh' ? '来源' : 'Source'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent divide-y divide-white/20">
                    {latestNews.slice(0, 3).map((article) => (
                      <tr key={article.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white line-clamp-1">
                            {article.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/60">
                            {article.source.name}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketIntelligence;
