import React, { useState } from 'react';
import { 
  Globe, Search, Plus, RotateCcw, Filter, FilePlus, 
  FileSpreadsheet, FileText, ChevronDown, Calendar, 
  Newspaper, Link, RefreshCw, AlertCircle, ChevronRight 
} from 'lucide-react';
import { format } from 'date-fns';

// Mock data sources
const dataSources = [
  {
    id: 'source-1',
    name: 'TechCrunch投资新闻',
    type: 'news',
    url: 'https://techcrunch.com',
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    articles: 287,
    frequency: 'daily'
  },
  {
    id: 'source-2',
    name: 'AI行业报告',
    type: 'report',
    url: 'https://ai-industry-reports.com',
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    articles: 42,
    frequency: 'weekly'
  },
  {
    id: 'source-3',
    name: 'Crunchbase企业数据',
    type: 'database',
    url: 'https://crunchbase.com',
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    articles: 1243,
    frequency: 'daily'
  },
  {
    id: 'source-4',
    name: 'FinTech Insider博客',
    type: 'blog',
    url: 'https://fintechinsider.co',
    lastUpdated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'error',
    articles: 156,
    frequency: 'weekly'
  }
];

// Mock collected data
const collectedData = [
  {
    id: 'data-1',
    title: 'NeuralFinance完成1300万美元A轮融资',
    source: 'TechCrunch投资新闻',
    sourceUrl: 'https://techcrunch.com',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'news',
    relevance: 'high',
    tags: ['AI', 'Fintech', 'Series A']
  },
  {
    id: 'data-2',
    title: '2025年人工智能市场趋势报告',
    source: 'AI行业报告',
    sourceUrl: 'https://ai-industry-reports.com',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'report',
    relevance: 'medium',
    tags: ['Market Analysis', 'AI', 'Trends']
  },
  {
    id: 'data-3',
    title: 'Quantum Secure完成5000万美元B轮融资',
    source: 'Crunchbase企业数据',
    sourceUrl: 'https://crunchbase.com',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'data',
    relevance: 'high',
    tags: ['Cybersecurity', 'Series B']
  },
  {
    id: 'data-4',
    title: '金融科技领域初创企业增长放缓',
    source: 'FinTech Insider博客',
    sourceUrl: 'https://fintechinsider.co',
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'blog',
    relevance: 'medium',
    tags: ['Fintech', 'Market Analysis']
  },
  {
    id: 'data-5',
    title: 'AgriSense获得300万美元种子轮投资',
    source: 'TechCrunch投资新闻',
    sourceUrl: 'https://techcrunch.com',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'news',
    relevance: 'medium',
    tags: ['AgTech', 'Seed Funding']
  }
];

const WebData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'sources' | 'data'>('data');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
  };
  
  const toggleTypeFilter = (type: string) => {
    setTypeFilter(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const filteredData = collectedData.filter(item => {
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.source.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply type filter
    if (typeFilter.length > 0) {
      return typeFilter.includes(item.type);
    }
    
    return true;
  });
  
  const getSourceStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-success-100 text-success-800 text-xs px-2 py-0.5 rounded-full">活跃</span>;
      case 'error':
        return <span className="bg-error-100 text-error-800 text-xs px-2 py-0.5 rounded-full">错误</span>;
      default:
        return null;
    }
  };
  
  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <Newspaper size={16} className="text-blue-600" />;
      case 'report':
        return <FileText size={16} className="text-green-600" />;
      case 'data':
        return <FileSpreadsheet size={16} className="text-purple-600" />;
      case 'blog':
        return <FileText size={16} className="text-orange-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };
  
  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">高相关</span>;
      case 'medium':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">中相关</span>;
      case 'low':
        return <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">低相关</span>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">网络数据</h1>
          <p className="text-gray-500 mt-1">收集和监控网络上的关键投资信息</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索数据..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={() => setShowAddSourceModal(true)}
            className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} className="mr-1.5" />
            添加数据源
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'data' 
                ? 'border-primary-600 text-primary-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('data')}
          >
            收集的数据
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'sources' 
                ? 'border-primary-600 text-primary-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('sources')}
          >
            数据源
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center text-gray-600 hover:text-primary-700 hover:bg-gray-100 rounded p-1.5"
            >
              <Filter size={16} className="mr-1.5" />
              筛选
              <ChevronDown size={14} className="ml-1" />
            </button>
            
            {showFilterMenu && (
              <div className="absolute mt-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3 w-56">
                <p className="text-xs text-gray-500 font-medium mb-2">按类型筛选</p>
                
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                      checked={typeFilter.includes('news')}
                      onChange={() => toggleTypeFilter('news')}
                    />
                    <span className="ml-2 text-sm text-gray-700">新闻</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                      checked={typeFilter.includes('report')}
                      onChange={() => toggleTypeFilter('report')}
                    />
                    <span className="ml-2 text-sm text-gray-700">报告</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                      checked={typeFilter.includes('data')}
                      onChange={() => toggleTypeFilter('data')}
                    />
                    <span className="ml-2 text-sm text-gray-700">数据</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                      checked={typeFilter.includes('blog')}
                      onChange={() => toggleTypeFilter('blog')}
                    />
                    <span className="ml-2 text-sm text-gray-700">博客</span>
                  </label>
                </div>
                
                <div className="border-t border-gray-100 mt-3 pt-2">
                  <button 
                    className="text-xs text-primary-600 hover:text-primary-800"
                    onClick={() => setTypeFilter([])}
                  >
                    清除筛选
                  </button>
                </div>
              </div>
            )}
            
            {typeFilter.length > 0 && (
              <div className="ml-2 flex items-center">
                <span className="text-xs text-gray-500">已筛选:</span>
                <div className="flex space-x-1 ml-1">
                  {typeFilter.map(type => (
                    <span 
                      key={type} 
                      className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full"
                    >
                      {type === 'news' ? '新闻' : 
                       type === 'report' ? '报告' : 
                       type === 'data' ? '数据' : '博客'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button className="flex items-center text-gray-600 hover:text-primary-700 hover:bg-gray-100 rounded p-1.5">
            <RotateCcw size={16} className="mr-1.5" />
            刷新
          </button>
        </div>
        
        {activeTab === 'data' && (
          <div className="divide-y divide-gray-100">
            {filteredData.length === 0 ? (
              <div className="py-16 text-center">
                <Globe size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">没有找到数据</p>
                <p className="text-sm text-gray-400 mt-1">尝试添加新的数据源或修改筛选条件</p>
              </div>
            ) : (
              filteredData.map(item => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      {getDataTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-primary-800">{item.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <a 
                              href={item.sourceUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-primary-700"
                            >
                              {item.source}
                            </a>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {format(new Date(item.date), 'yyyy-MM-dd')}
                            </span>
                          </div>
                        </div>
                        <div>
                          {getRelevanceBadge(item.relevance)}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'sources' && (
          <div className="divide-y divide-gray-100">
            {dataSources.length === 0 ? (
              <div className="py-16 text-center">
                <Globe size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">没有设置数据源</p>
                <p className="text-sm text-gray-400 mt-1">点击"添加数据源"开始收集数据</p>
              </div>
            ) : (
              dataSources.map(source => (
                <div key={source.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                        <Globe size={20} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-primary-800">{source.name}</h3>
                          <div className="ml-2">
                            {getSourceStatusBadge(source.status)}
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-primary-700"
                          >
                            <Link size={14} className="mr-1" />
                            {source.url}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {source.articles} 条数据
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center justify-end">
                        <RefreshCw size={12} className="mr-1" />
                        {source.frequency === 'daily' ? '每日更新' : '每周更新'}
                      </div>
                    </div>
                  </div>
                  
                  {source.status === 'error' && (
                    <div className="mt-3 bg-error-50 border border-error-200 rounded-lg p-2.5">
                      <div className="flex items-start">
                        <AlertCircle size={14} className="text-error-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-error-800">连接错误</p>
                          <p className="text-xs text-error-700 mt-0.5">
                            无法从此源获取数据。请检查URL或访问权限。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-center">
                    <button className="text-xs text-primary-600 hover:text-primary-800 flex items-center">
                      查看数据
                      <ChevronRight size={12} className="ml-1" />
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button className="text-xs text-primary-600 hover:text-primary-800">
                      编辑设置
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button className="text-xs text-error-600 hover:text-error-800">
                      删除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* 添加数据源弹窗 */}
      {showAddSourceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-fade-in animate-slide-in">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">添加新数据源</h2>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  数据源名称
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="例如：TechCrunch投资新闻"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  数据类型
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="news">新闻</option>
                  <option value="report">报告</option>
                  <option value="database">数据库</option>
                  <option value="blog">博客</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  更新频率
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="daily">每日</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    自动分类和标记数据
                  </span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddSourceModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowAddSourceModal(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  添加数据源
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebData;