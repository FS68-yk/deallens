import React, { useState } from 'react';
import { 
  Search, Building, ChevronDown, ArrowRight, Globe, Users, 
  DollarSign, TrendingUp, Briefcase, MapPin, AlertTriangle,
  FileText, BarChart, PieChart
} from 'lucide-react';

const CompanyResearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  
  // Example company data that would be returned from the API
  const exampleCompanyData = {
    name: 'NeuralFinance AI',
    logo: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'NeuralFinance AI 是一家领先的金融科技公司，专注于利用人工智能和机器学习为机构投资者提供先进的金融分析工具。该公司的专有算法可以处理大量非结构化财务数据，提取关键洞察，并预测市场趋势，帮助投资者做出更明智的决策。',
    website: 'https://neuralfinance.ai',
    founded: '2021',
    headquarters: '旧金山，加利福尼亚',
    employees: '50-100',
    funding: {
      total: '$15M',
      rounds: [
        { round: 'Seed', date: '2021-03', amount: '$2M', investors: ['Tech Ventures', 'Angel Capital'] },
        { round: 'Series A', date: '2022-06', amount: '$13M', investors: ['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator'] }
      ]
    },
    financials: {
      revenue: '$4.5M (估计)',
      growth: '120% YoY',
      burn: '$350K/月',
      runway: '18个月'
    },
    products: [
      { name: 'FinanceGPT', description: '金融专用大语言模型' },
      { name: 'MarketSense', description: '实时市场情绪分析工具' },
      { name: 'DocAnalyzer', description: '自动财务文档分析平台' }
    ],
    competitors: [
      'Bloomberg Terminal',
      'FactSet',
      'S&P Capital IQ',
      'AlphaSense'
    ],
    news: [
      { title: 'NeuralFinance完成1300万美元A轮融资', source: 'TechCrunch', date: '2022-06-15' },
      { title: '金融AI创企NeuralFinance扩展企业客户群', source: 'Forbes', date: '2023-01-10' },
      { title: 'NeuralFinance推出新一代市场预测工具', source: 'Wall Street Journal', date: '2023-05-22' }
    ],
    keyMetrics: {
      customers: '150+',
      retention: '92%',
      marketShare: '4.5%',
      partnerships: '12家金融机构'
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setSearchResults([
        { id: 1, name: 'NeuralFinance AI', description: '人工智能驱动的金融分析平台', type: 'Fintech', location: '美国' },
        { id: 2, name: 'NeuralFinance Solutions', description: '数据驱动的投资管理工具', type: 'Financial Services', location: '美国' },
        { id: 3, name: 'Neural Financial Technologies', description: '机器学习金融软件开发', type: 'Technology', location: '英国' }
      ]);
      setIsSearching(false);
    }, 1000);
  };
  
  const handleCompanySelect = (company: any) => {
    setSelectedCompany(exampleCompanyData);
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">企业研究</h1>
          <p className="text-gray-500 mt-1">深入了解公司、创始人和市场</p>
        </div>
      </div>
      
      {!selectedCompany && (
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Building size={56} className="mx-auto text-primary-600 mb-3" />
            <h2 className="text-xl font-bold text-primary-800 mb-2">公司研究与尽职调查</h2>
            <p className="text-gray-600">
              搜索任何公司以获取详细信息、财务数据、竞争情报和市场定位
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="输入公司名称、网站或创始人..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white rounded-md px-4 py-1.5 hover:bg-primary-700 transition-colors"
              >
                搜索
              </button>
            </div>
          </form>
          
          {isSearching && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
              <p className="text-gray-600">正在搜索公司信息...</p>
            </div>
          )}
          
          {searchResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-primary-800 mb-3">搜索结果</h3>
              <div className="space-y-2">
                {searchResults.map(company => (
                  <div 
                    key={company.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => handleCompanySelect(company)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-primary-700">{company.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{company.description}</p>
                        <div className="flex items-center mt-1.5">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{company.type}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {company.location}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-12 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">热门搜索</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors">
                OpenAI
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors">
                Anthropic
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors">
                Databricks
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors">
                Stripe
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors">
                Scale AI
              </button>
            </div>
          </div>
        </div>
      )}
      
      {selectedCompany && (
        <div>
          {/* 公司概览 */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700"></div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-md text-sm backdrop-blur-sm transition-colors"
                >
                  新搜索
                </button>
              </div>
              <div className="flex items-end absolute bottom-0 left-6 transform translate-y-1/2">
                <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                  {selectedCompany.logo ? (
                    <img 
                      src={selectedCompany.logo} 
                      alt={`${selectedCompany.name} logo`} 
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <Building size={40} className="text-primary-600" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-16 px-6 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-primary-800">{selectedCompany.name}</h2>
                  <div className="flex items-center mt-2">
                    <a 
                      href={selectedCompany.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                    >
                      <Globe size={14} className="mr-1.5" />
                      {selectedCompany.website}
                    </a>
                    <span className="mx-3 text-gray-300">|</span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <MapPin size={14} className="mr-1.5" />
                      {selectedCompany.headquarters}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                    <Briefcase size={14} className="mr-1.5" />
                    添加到项目
                  </button>
                  <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <FileText size={14} className="mr-1.5" />
                    生成报告
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mt-6 leading-relaxed">
                {selectedCompany.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div>
                  <p className="text-sm text-gray-500">成立时间</p>
                  <p className="text-lg font-medium text-primary-800">{selectedCompany.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">员工数量</p>
                  <p className="text-lg font-medium text-primary-800">{selectedCompany.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">总融资</p>
                  <p className="text-lg font-medium text-primary-800">{selectedCompany.funding.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">最新轮次</p>
                  <p className="text-lg font-medium text-primary-800">{selectedCompany.funding.rounds[selectedCompany.funding.rounds.length - 1].round}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 财务和融资信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">融资历史</h3>
              </div>
              <div className="p-5">
                <div className="space-y-6">
                  {selectedCompany.funding.rounds.map((round: any, idx: number) => (
                    <div key={idx} className="relative pl-6 pb-6 last:pb-0 before:absolute before:left-0 before:top-1 before:bottom-0 before:w-px before:bg-primary-200">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary-600 z-10"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-primary-700">{round.round} ({round.date})</h4>
                          <p className="text-sm text-gray-600 mt-1">投资方: {round.investors.join(', ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary-800">{round.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">财务指标</h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">年收入</p>
                      <p className="font-medium text-primary-800">{selectedCompany.financials.revenue}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">增长率</p>
                      <p className="font-medium text-success-600">{selectedCompany.financials.growth}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">每月消耗</p>
                      <p className="font-medium text-error-600">{selectedCompany.financials.burn}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">资金可支撑</p>
                      <p className="font-medium text-primary-800">{selectedCompany.financials.runway}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-warning-50 border border-warning-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <AlertTriangle size={16} className="text-warning-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-warning-800">
                      财务数据基于公开信息和算法估算，可能与实际情况有所差异。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 产品和竞争对手 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">产品与服务</h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {selectedCompany.products.map((product: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-primary-700">{product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">竞争对手</h3>
              </div>
              <div className="p-5">
                <div className="space-y-2">
                  {selectedCompany.competitors.map((competitor: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{competitor}</span>
                      <button className="text-xs text-primary-600 hover:text-primary-800">
                        查看详情
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">关键指标</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">客户数量</p>
                    <p className="text-xl font-semibold text-primary-800">{selectedCompany.keyMetrics.customers}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">留存率</p>
                    <p className="text-xl font-semibold text-success-600">{selectedCompany.keyMetrics.retention}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">市场份额</p>
                    <p className="text-xl font-semibold text-primary-800">{selectedCompany.keyMetrics.marketShare}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">合作伙伴</p>
                    <p className="text-xl font-semibold text-primary-800">{selectedCompany.keyMetrics.partnerships}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 新闻与市场定位 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">最新新闻</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {selectedCompany.news.map((item: any, idx: number) => (
                  <div key={idx} className="p-5 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-primary-700">{item.title}</h4>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span>{item.source}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-primary-800">市场定位</h3>
              </div>
              <div className="p-5">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="flex items-center justify-center flex-col">
                    <BarChart size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">市场定位图表</p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">市场定位</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>起步期</span>
                      <span>成长期</span>
                      <span>成熟期</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">产品成熟度</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">竞争强度</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-warning-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">增长潜力</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyResearch;