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

  // 初始化数据加载
  useEffect(() => {
    loadInvestmentNews();
    loadTechNews();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('common.marketIntelligence')}</h1>
          <p className="text-white/70 mt-1">
            {language === 'zh' ? 
              '了解市场趋势和投资机会' : 
              'Stay updated with market trends and investment opportunities'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg glass hover:glass-card transition-all duration-300 border border-white/20 hover:border-white/30">
            <RefreshCw size={16} className="text-white/80 hover:text-white" />
          </button>
          <button className="p-2 rounded-lg glass hover:glass-card transition-all duration-300 border border-white/20 hover:border-white/30">
            <Download size={16} className="text-white/80 hover:text-white" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索市场与趋势...' : 'Search markets & trends...'}
              className="w-64 pr-8 pl-3 py-1.5 text-sm glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e as any)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
              onClick={handleSearch}
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-white/20 mb-6">
        <div className="flex space-x-6">
          <button
            className={`py-2.5 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'trends' 
                ? 'border-white text-white' 
                : 'border-transparent text-white/60 hover:text-white/80'
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
                ? 'border-white text-white' 
                : 'border-transparent text-white/60 hover:text-white/80'
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
                ? 'border-white text-white' 
                : 'border-transparent text-white/60 hover:text-white/80'
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
      {(isLoading || newsLoading) && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* 数据更新时间显示 */}
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-white/60">
          {language === 'zh' ? '最后更新：' : 'Last updated: '}
          {lastUpdated?.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}
        </span>
        <button
          onClick={loadInvestmentNews}
          disabled={newsLoading}
          className="flex items-center px-3 py-1 text-sm text-white/70 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={`mr-1 ${newsLoading ? 'animate-spin' : ''}`} />
          {language === 'zh' ? '刷新' : 'Refresh'}
        </button>
      </div>

      {/* Trends tab content */}
      {!isLoading && activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl shadow-2xl overflow-hidden mb-6 border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="text-lg font-semibold text-white">
                  {language === 'zh' ? '投资趋势分析' : 'Investment Trend Analysis'}
                </h2>
              </div>
              <div className="p-5">
                <div className="bg-white/10 rounded-lg min-h-[350px] border border-white/20 p-4">
                  <div className="w-full h-full relative">
                    {/* Chart title */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-slate-100">
                        {language === 'zh' ? '投资趋势 (2024-2025)' : 'Investment Trends (2024-2025)'}
                      </h3>
                    </div>
                    
                    <svg className="w-full" height="280" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="60" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 60 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                        </pattern>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05"/>
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* Y-axis labels - clean and readable */}
                      <text x="20" y="35" fill="#F1F5F9" fontSize="16" fontWeight="600">$10B</text>
                      <text x="25" y="75" fill="#F1F5F9" fontSize="16" fontWeight="600">$8B</text>
                      <text x="25" y="115" fill="#F1F5F9" fontSize="16" fontWeight="600">$6B</text>
                      <text x="25" y="155" fill="#F1F5F9" fontSize="16" fontWeight="600">$4B</text>
                      <text x="25" y="195" fill="#F1F5F9" fontSize="16" fontWeight="600">$2B</text>
                      
                      {/* X-axis labels - clean and readable */}
                      <text x="100" y="250" fill="#F1F5F9" fontSize="16" fontWeight="600" textAnchor="middle">Q1</text>
                      <text x="200" y="250" fill="#F1F5F9" fontSize="16" fontWeight="600" textAnchor="middle">Q2</text>
                      <text x="300" y="250" fill="#F1F5F9" fontSize="16" fontWeight="600" textAnchor="middle">Q3</text>
                      <text x="400" y="250" fill="#F1F5F9" fontSize="16" fontWeight="600" textAnchor="middle">Q4</text>
                      <text x="500" y="250" fill="#F1F5F9" fontSize="16" fontWeight="600" textAnchor="middle">Q1</text>
                      
                      {/* Horizontal grid lines */}
                      <line x1="60" y1="40" x2="540" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="60" y1="80" x2="540" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="60" y1="120" x2="540" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="60" y1="160" x2="540" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="60" y1="200" x2="540" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      
                      {/* Area under curve */}
                      <path
                        d="M 100 170 L 200 140 L 300 120 L 400 100 L 500 80 L 500 210 L 100 210 Z"
                        fill="url(#gradient)"
                      />
                      
                      {/* Trend line with smooth curves */}
                      <path
                        d="M 100 170 Q 150 155 200 140 Q 250 130 300 120 Q 350 110 400 100 Q 450 90 500 80"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      
                      {/* Data points with hover effect */}
                      <circle cx="100" cy="170" r="6" fill="#1E40AF" stroke="#60A5FA" strokeWidth="3">
                        <title>Q1 2024: $3.2B</title>
                      </circle>
                      <circle cx="200" cy="140" r="6" fill="#1E40AF" stroke="#60A5FA" strokeWidth="3">
                        <title>Q2 2024: $4.8B</title>
                      </circle>
                      <circle cx="300" cy="120" r="6" fill="#1E40AF" stroke="#60A5FA" strokeWidth="3">
                        <title>Q3 2024: $6.1B</title>
                      </circle>
                      <circle cx="400" cy="100" r="6" fill="#1E40AF" stroke="#60A5FA" strokeWidth="3">
                        <title>Q4 2024: $7.5B</title>
                      </circle>
                      <circle cx="500" cy="80" r="7" fill="#059669" stroke="#34D399" strokeWidth="3">
                        <title>Q1 2025: $8.2B (预测)</title>
                      </circle>
                      
                      {/* Value labels on data points - clear and prominent */}
                      <text x="100" y="163" fill="#FEF3C7" fontSize="14" fontWeight="700" textAnchor="middle">$3.2B</text>
                      <text x="200" y="133" fill="#FEF3C7" fontSize="14" fontWeight="700" textAnchor="middle">$4.8B</text>
                      <text x="300" y="113" fill="#FEF3C7" fontSize="14" fontWeight="700" textAnchor="middle">$6.1B</text>
                      <text x="400" y="93" fill="#FEF3C7" fontSize="14" fontWeight="700" textAnchor="middle">$7.5B</text>
                      <text x="500" y="70" fill="#A7F3D0" fontSize="14" fontWeight="700" textAnchor="middle">$8.2B</text>
                    </svg>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                    <p className="text-xs text-white/60 mb-1">
                      {language === 'zh' ? '总投资额' : 'Total Investment'}
                    </p>
                    <p className="text-xl font-semibold text-white">$8.2B</p>
                    <p className="text-xs text-green-400 flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1" />
                      {language === 'zh' ? '较上季度+12%' : '+12% from last quarter'}
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                    <p className="text-xs text-white/60 mb-1">
                      {language === 'zh' ? '交易数量' : 'Deal Count'}
                    </p>
                    <p className="text-xl font-semibold text-white">587</p>
                    <p className="text-xs text-red-400 flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1 transform rotate-180" />
                      {language === 'zh' ? '较上季度-5%' : '-5% from last quarter'}
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                    <p className="text-xs text-white/60 mb-1">
                      {language === 'zh' ? '平均交易规模' : 'Avg Deal Size'}
                    </p>
                    <p className="text-xl font-semibold text-white">$14M</p>
                    <p className="text-xs text-green-400 flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1" />
                      {language === 'zh' ? '较上季度+18%' : '+18% from last quarter'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">
                  {language === 'zh' ? '行业表现' : 'Sector Performance'}
                </h2>
                <button className="text-sm text-white/80 hover:text-white flex items-center transition-colors duration-300">
                  <Filter size={14} className="mr-1" />
                  {language === 'zh' ? '筛选' : 'Filter'}
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {language === 'zh' ? '人工智能' : 'Artificial Intelligence'}
                      </span>
                      <span className="text-sm text-green-400">+32%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {language === 'zh' ? '气候科技' : 'Climate Tech'}
                      </span>
                      <span className="text-sm text-green-400">+26%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div className="bg-green-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {language === 'zh' ? '金融科技' : 'Fintech'}
                      </span>
                      <span className="text-sm text-red-400">-8%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {language === 'zh' ? '数字健康' : 'Digital Health'}
                      </span>
                      <span className="text-sm text-green-400">+18%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div className="bg-purple-400 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {language === 'zh' ? '企业软件服务' : 'Enterprise SaaS'}
                      </span>
                      <span className="text-sm text-green-400">+12%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass rounded-2xl shadow-2xl overflow-hidden mb-6 border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '热门话题' : 'Trending Topics'}
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
            
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '地域洞察' : 'Geographic Insights'}
                </h2>
              </div>
              <div className="p-5">
                <div className="bg-white/10 rounded-lg mb-4 min-h-[150px] border border-white/20 p-3">
                  <div className="w-full h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                      {/* Stylized, blob-like world map background based on user screenshot */}
                      <g fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                        <path d="M210,180 C150,180 130,120 190,100 C250,80 300,130 280,190 C260,250 270,180 210,180 Z" />
                        <path d="M420,160 C380,150 370,110 410,100 C450,90 480,120 470,160 C460,200 460,170 420,160 Z" />
                        <path d="M580,180 C530,170 520,120 580,110 C640,100 690,140 670,190 C650,240 630,190 580,180 Z" />
                        <path d="M440,280 C410,270 400,220 440,210 C480,200 510,240 490,280 C470,320 470,290 440,280 Z" />
                        <path d="M300,330 C270,320 260,270 300,260 C340,250 370,290 350,330 C330,370 330,340 300,330 Z" />
                        <path d="M660,340 C630,330 620,280 660,270 C700,260 730,300 710,340 C690,380 690,350 660,340 Z" />
                      </g>

                      {/* Investment data overlays, positioned on the new map */}
                      <g>
                        <circle cx="220" cy="150" r="45" fill="#60A5FA" opacity="0.5" />
                        <text x="220" y="145" fill="white" fontSize="20" textAnchor="middle" fontWeight="bold">42%</text>
                        <text x="220" y="165" fill="white" fontSize="12" textAnchor="middle" opacity="0.9">{language === 'zh' ? '北美' : 'North America'}</text>
                      </g>
                      <g>
                        <circle cx="430" cy="135" r="35" fill="#F59E0B" opacity="0.6" />
                        <text x="430" y="131" fill="white" fontSize="18" textAnchor="middle" fontWeight="bold">22%</text>
                        <text x="430" y="149" fill="white" fontSize="12" textAnchor="middle" opacity="0.9">{language === 'zh' ? '欧洲' : 'Europe'}</text>
                      </g>
                      <g>
                        <circle cx="610" cy="160" r="40" fill="#34D399" opacity="0.5" />
                        <text x="610" y="156" fill="white" fontSize="19" textAnchor="middle" fontWeight="bold">28%</text>
                        <text x="610" y="176" fill="white" fontSize="12" textAnchor="middle" opacity="0.9">{language === 'zh' ? '亚太' : 'Asia Pacific'}</text>
                      </g>
                      
                      <g>
                        <circle cx="310" cy="300" r="20" fill="#8B5CF6" opacity="0.6" />
                        <text x="310" y="304" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">2%</text>
                        <circle cx="450" cy="250" r="25" fill="#8B5CF6" opacity="0.6" />
                        <text x="450" y="254" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">4%</text>
                        <circle cx="680" cy="310" r="20" fill="#8B5CF6" opacity="0.6" />
                        <text x="680" y="314" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">2%</text>
                      </g>
                      
                      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4,3">
                        <path d="M265,155 Q340,125 400,135" />
                        <path d="M465,140 Q530,140 575,160" />
                        <path d="M240,185 Q340,220 430,245" />
                        <path d="M470,255 Q570,280 665,305" />
                        <path d="M240,170 Q270,230 300,290" />
                      </g>

                      <text x="20" y="30" fill="rgba(255,255,255,0.9)" fontSize="20" fontWeight="bold">
                        {language === 'zh' ? '全球投资分布热力图' : 'Global Investment Distribution Heat Map'}
                      </text>
                      <g transform="translate(20, 420)">
                        <text x="0" y="0" fill="rgba(255,255,255,0.7)" fontSize="14">
                          {language === 'zh' ? '投资强度:' : 'Investment Intensity:'}
                        </text>
                        <circle cx="120" cy="-5" r="6" fill="#60A5FA" />
                        <text x="132" y="0" fill="rgba(255,255,255,0.7)" fontSize="14">{language === 'zh' ? '高' : 'High'}</text>
                        <circle cx="180" cy="-5" r="6" fill="#34D399" />
                        <text x="192" y="0" fill="rgba(255,255,255,0.7)" fontSize="14">{language === 'zh' ? '中' : 'Med'}</text>
                        <circle cx="240" cy="-5" r="6" fill="#F59E0B" />
                        <text x="252" y="0" fill="rgba(255,255,255,0.7)" fontSize="14">{language === 'zh' ? '低' : 'Low'}</text>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? '北美' : 'North America'}
                    </span>
                    <span className="text-sm font-medium text-white">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? '亚太' : 'Asia Pacific'}
                    </span>
                    <span className="text-sm font-medium text-white">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? '欧洲' : 'Europe'}
                    </span>
                    <span className="text-sm font-medium text-white">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? '其他地区' : 'Rest of World'}
                    </span>
                    <span className="text-sm font-medium text-white">8%</span>
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
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="text-lg font-semibold text-white">
                  {language === 'zh' ? '最新行业新闻' : 'Latest Industry News'}
                </h2>
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
            <div className="glass rounded-2xl shadow-2xl overflow-hidden mb-6 border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '新闻情感分析' : 'News Sentiment Analysis'}
                </h2>
              </div>
              <div className="p-5">
                <div className="bg-white/10 rounded-lg mb-4 min-h-[120px] border border-white/20 p-3">
                  <div className="w-full h-full relative flex items-center justify-center">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      {/* Donut chart for sentiment analysis */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#34D399"
                        strokeWidth="10"
                        strokeDasharray="146 224"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="10"
                        strokeDasharray="51 224"
                        strokeDashoffset="-146"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="10"
                        strokeDasharray="27 224"
                        strokeDashoffset="-197"
                        transform="rotate(-90 50 50)"
                      />
                      
                      {/* Center text */}
                      <text x="50" y="46" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        {language === 'zh' ? '情感' : 'Sentiment'}
                      </text>
                      <text x="50" y="58" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8">
                        {language === 'zh' ? '分析' : 'Analysis'}
                      </text>
                    </svg>
                    
                    {/* Legend */}
                    <div className="absolute right-2 top-2 space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-white/70">{language === 'zh' ? '积极' : 'Positive'}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-white/40 rounded-full mr-1"></div>
                        <span className="text-white/70">{language === 'zh' ? '中性' : 'Neutral'}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
                        <span className="text-white/70">{language === 'zh' ? '消极' : 'Negative'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-green-500/20 p-3 rounded-lg text-center border border-green-400/30">
                    <p className="text-xs text-white/60 mb-1">
                      {language === 'zh' ? '积极' : 'Positive'}
                    </p>
                    <p className="text-lg font-semibold text-green-400">65%</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg text-center border border-white/20">
                    <p className="text-xs text-white/60 mb-1">
                      {language === 'zh' ? '中性' : 'Neutral'}
                    </p>
                    <p className="text-lg font-semibold text-white/80">23%</p>
                  </div>
                  <div className="bg-red-500/20 p-3 rounded-lg text-center border border-red-400/30">
                    <p className="text-xs text-white/60 mb-1">
                      {language === 'zh' ? '消极' : 'Negative'}
                    </p>
                    <p className="text-lg font-semibold text-red-400">12%</p>
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
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs border border-blue-400/30">
                      {language === 'zh' ? '监管变化' : 'Regulatory Changes'}
                    </span>
                    <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs border border-green-400/30">
                      {language === 'zh' ? '市场扩张' : 'Market Expansion'}
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs border border-purple-400/30">
                      {language === 'zh' ? '收购' : 'Acquisitions'}
                    </span>
                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full text-xs border border-yellow-400/30">
                      {language === 'zh' ? '融资轮次' : 'Funding Rounds'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '新闻来源' : 'News Sources'}
                </h2>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">TechCrunch</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                      {language === 'zh' ? '24篇文章' : '24 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Bloomberg</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                      {language === 'zh' ? '18篇文章' : '18 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Financial Times</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                      {language === 'zh' ? '15篇文章' : '15 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Reuters</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                      {language === 'zh' ? '12篇文章' : '12 articles'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Wall Street Journal</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
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
      {!(isLoading || newsLoading) && activeTab === 'funding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="text-lg font-semibold text-white">
                  {language === 'zh' ? '最近融资轮次' : 'Recent Funding Rounds'}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                        {language === 'zh' ? '公司' : 'Company'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                        {language === 'zh' ? '轮次' : 'Round'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                        {language === 'zh' ? '金额' : 'Amount'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                        {language === 'zh' ? '日期' : 'Date'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent divide-y divide-white/20">
                    {latestNews.slice(0, 3).map((article) => (
                      <tr key={article.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white line-clamp-1">
                            {article.title.split(' ')[0] || 'Company'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {article.title.includes('Series') ? 'Series A' : 
                             article.title.includes('IPO') ? 'IPO' : 
                             article.title.includes('Acquisition') ? 'Acquisition' : 'Funding'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          {/* 从标题中提取金额信息 */}
                          {(() => {
                            const match = article.title.match(/\$([0-9]+(?:\.[0-9]+)?[MBK]?)/i);
                            return match ? match[0] : 'N/A';
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {newsApiService.formatTimeAgo(article.publishedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-white/20 text-center">
                <button className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-300">
                  {language === 'zh' ? '查看所有融资轮次' : 'View All Funding Rounds'}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass rounded-2xl shadow-2xl overflow-hidden mb-6 border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '按阶段划分的融资' : 'Funding by Stage'}
                </h2>
              </div>
              <div className="p-5">
                <div className="bg-white/10 rounded-lg mb-4 min-h-[150px] border border-white/20 p-3">
                  <div className="w-full h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 250 120" preserveAspectRatio="xMidYMid meet">
                      {/* Bar chart for funding stages */}
                      
                      {/* Y-axis labels */}
                      <text x="5" y="15" fill="rgba(255,255,255,0.6)" fontSize="8">35%</text>
                      <text x="5" y="35" fill="rgba(255,255,255,0.6)" fontSize="8">25%</text>
                      <text x="5" y="55" fill="rgba(255,255,255,0.6)" fontSize="8">15%</text>
                      <text x="5" y="75" fill="rgba(255,255,255,0.6)" fontSize="8">5%</text>
                      
                      {/* Grid lines */}
                      <line x1="25" y1="10" x2="240" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="25" y1="30" x2="240" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="25" y1="50" x2="240" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="25" y1="70" x2="240" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      <line x1="25" y1="90" x2="240" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      
                      {/* Bars */}
                      {/* Seed - 27% */}
                      <rect x="35" y="58" width="30" height="32" fill="#60A5FA" rx="2"/>
                      <text x="50" y="105" fill="rgba(255,255,255,0.8)" fontSize="8" textAnchor="middle">
                        {language === 'zh' ? '种子轮' : 'Seed'}
                      </text>
                      <text x="50" y="52" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">27%</text>
                      
                      {/* Series A - 32% */}
                      <rect x="80" y="48" width="30" height="42" fill="#34D399" rx="2"/>
                      <text x="95" y="105" fill="rgba(255,255,255,0.8)" fontSize="8" textAnchor="middle">
                        {language === 'zh' ? 'A轮' : 'Series A'}
                      </text>
                      <text x="95" y="42" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">32%</text>
                      
                      {/* Series B - 24% */}
                      <rect x="125" y="62" width="30" height="28" fill="#F59E0B" rx="2"/>
                      <text x="140" y="105" fill="rgba(255,255,255,0.8)" fontSize="8" textAnchor="middle">
                        {language === 'zh' ? 'B轮' : 'Series B'}
                      </text>
                      <text x="140" y="56" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">24%</text>
                      
                      {/* Series C+ - 17% */}
                      <rect x="170" y="70" width="30" height="20" fill="#8B5CF6" rx="2"/>
                      <text x="185" y="105" fill="rgba(255,255,255,0.8)" fontSize="8" textAnchor="middle">
                        {language === 'zh' ? 'C轮+' : 'Series C+'}
                      </text>
                      <text x="185" y="64" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">17%</text>
                      
                      {/* Chart title */}
                      <text x="125" y="8" fill="rgba(255,255,255,0.8)" fontSize="9" textAnchor="middle" fontWeight="bold">
                        {language === 'zh' ? '融资阶段分布' : 'Funding Stage Distribution'}
                      </text>
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? '种子轮' : 'Seed'}
                    </span>
                    <span className="text-sm font-medium text-white">27%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? 'A轮' : 'Series A'}
                    </span>
                    <span className="text-sm font-medium text-white">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? 'B轮' : 'Series B'}
                    </span>
                    <span className="text-sm font-medium text-white">24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      {language === 'zh' ? 'C轮及以上' : 'Series C+'}
                    </span>
                    <span className="text-sm font-medium text-white">17%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-5 border-b border-white/20">
                <h2 className="font-semibold text-white">
                  {language === 'zh' ? '顶级投资者' : 'Top Investors'}
                </h2>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-white/20">
                  <li className="p-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-white">Sequoia Capital</h3>
                        <p className="text-xs text-white/60">
                          {language === 'zh' ? '2025年第二季度12笔交易' : '12 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-white">Andreessen Horowitz</h3>
                        <p className="text-xs text-white/60">
                          {language === 'zh' ? '2025年第二季度10笔交易' : '10 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-white">Accel</h3>
                        <p className="text-xs text-white/60">
                          {language === 'zh' ? '2025年第二季度8笔交易' : '8 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-white">Lightspeed Venture Partners</h3>
                        <p className="text-xs text-white/60">
                          {language === 'zh' ? '2025年第二季度7笔交易' : '7 deals in Q2 2025'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-white">Founders Fund</h3>
                        <p className="text-xs text-white/60">
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