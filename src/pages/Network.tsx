import React, { useState } from 'react';
import { 
  Network as NetworkIcon, 
  Search, 
  Plus,
  Users,
  Building,
  ArrowUpRight,
  ChevronDown,
  Filter,
  Tag,
  Mail,
  ExternalLink, 
  MessageSquare,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Mock connections data
const connections = [
  {
    id: 'conn-1',
    name: '张三',
    nameEn: 'Zhang San',
    title: '高级投资经理',
    titleEn: 'Senior Investment Manager',
    company: 'Capital Ventures',
    tags: ['投资者', 'Investor'],
    email: 'zhang@capitalventures.com',
    lastContact: '2周前',
    lastContactEn: '2 weeks ago',
    strength: 'strong', // strong, medium, weak
    notes: '之前合作过NeuralFinance项目，反应积极',
    notesEn: 'Previously collaborated on NeuralFinance project, responded positively'
  },
  {
    id: 'conn-2',
    name: '李四',
    nameEn: 'Li Si',
    title: 'CEO',
    titleEn: 'CEO',
    company: 'TechFund',
    tags: ['投资者', 'Investor'],
    email: 'li@techfund.com',
    lastContact: '1个月前',
    lastContactEn: '1 month ago',
    strength: 'medium',
    notes: '对医疗科技领域有兴趣，可能适合MedVR项目',
    notesEn: 'Interested in healthcare tech, might be suitable for MedVR project'
  },
  {
    id: 'conn-3',
    name: '王五',
    nameEn: 'Wang Wu',
    title: '创始人',
    titleEn: 'Founder',
    company: 'DataInsights',
    tags: ['创业者', 'Entrepreneur'],
    email: 'wang@datainsights.com',
    lastContact: '3天前',
    lastContactEn: '3 days ago',
    strength: 'strong',
    notes: '正在寻找A轮融资，对人工智能有深入了解',
    notesEn: 'Looking for Series A funding, has deep knowledge in AI'
  },
  {
    id: 'conn-4',
    name: '赵六',
    nameEn: 'Zhao Liu',
    title: '合伙人',
    titleEn: 'Partner',
    company: 'Growth Capital',
    tags: ['投资者', 'Investor'],
    email: 'zhao@growthcapital.com',
    lastContact: '2个月前',
    lastContactEn: '2 months ago',
    strength: 'weak',
    notes: '会议上简短交流，对清洁技术感兴趣',
    notesEn: 'Brief interaction at a conference, interested in clean tech'
  },
  {
    id: 'conn-5',
    name: '钱七',
    nameEn: 'Qian Qi',
    title: 'CTO',
    titleEn: 'CTO',
    company: 'SecureTech',
    tags: ['技术专家', 'Technical Expert'],
    email: 'qian@securetech.com',
    lastContact: '1周前',
    lastContactEn: '1 week ago',
    strength: 'medium',
    notes: '可作为QuantumSecure项目的技术顾问',
    notesEn: 'Potential technical advisor for QuantumSecure project'
  },
  {
    id: 'conn-6',
    name: '孙八',
    nameEn: 'Sun Ba',
    title: '投资分析师',
    titleEn: 'Investment Analyst',
    company: 'Venture Partners',
    tags: ['投资者', 'Investor'],
    email: 'sun@venturepartners.com',
    lastContact: '5天前',
    lastContactEn: '5 days ago',
    strength: 'medium',
    notes: '对金融科技项目特别感兴趣',
    notesEn: 'Particularly interested in fintech projects'
  }
];

// Mock companies data
const companies = [
  {
    id: 'comp-1',
    name: 'Capital Ventures',
    type: '投资公司',
    typeEn: 'Investment Firm',
    industry: '风险投资',
    industryEn: 'Venture Capital',
    location: '北京',
    locationEn: 'Beijing',
    website: 'www.capitalventures.com',
    contacts: 2,
    deals: 3,
    lastInteraction: '2周前',
    lastInteractionEn: '2 weeks ago'
  },
  {
    id: 'comp-2',
    name: 'TechFund',
    type: '投资公司',
    typeEn: 'Investment Firm',
    industry: '风险投资',
    industryEn: 'Venture Capital',
    location: '上海',
    locationEn: 'Shanghai',
    website: 'www.techfund.com',
    contacts: 1,
    deals: 1,
    lastInteraction: '1个月前',
    lastInteractionEn: '1 month ago'
  },
  {
    id: 'comp-3',
    name: 'DataInsights',
    type: '初创公司',
    typeEn: 'Startup',
    industry: '数据分析',
    industryEn: 'Data Analytics',
    location: '深圳',
    locationEn: 'Shenzhen',
    website: 'www.datainsights.com',
    contacts: 1,
    deals: 0,
    lastInteraction: '3天前',
    lastInteractionEn: '3 days ago'
  },
  {
    id: 'comp-4',
    name: 'Growth Capital',
    type: '投资公司',
    typeEn: 'Investment Firm',
    industry: '增长股权',
    industryEn: 'Growth Equity',
    location: '纽约',
    locationEn: 'New York',
    website: 'www.growthcapital.com',
    contacts: 1,
    deals: 0,
    lastInteraction: '2个月前',
    lastInteractionEn: '2 months ago'
  }
];

// Network statistics
const networkStats = {
  totalConnections: connections.length,
  newConnectionsThisMonth: 3,
  totalCompanies: companies.length,
  activeConnections: 4, // Active in last 30 days
  totalDeals: companies.reduce((sum, company) => sum + company.deals, 0)
};

const Network: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'people' | 'companies'>('people');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Toggle filter selection
  const toggleFilter = (filter: string) => {
    if (filterType.includes(filter)) {
      setFilterType(filterType.filter(f => f !== filter));
    } else {
      setFilterType([...filterType, filter]);
    }
  };
  
  // Filter connections based on search and filters
  const filteredConnections = connections.filter(conn => {
    const matchesSearch = !searchTerm || 
      (language === 'zh' ? conn.name : conn.nameEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'zh' ? conn.title : conn.titleEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.company.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = filterType.length === 0 || 
      conn.tags.some(tag => filterType.includes(language === 'zh' ? tag : (tag === '投资者' ? 'Investor' : tag === '创业者' ? 'Entrepreneur' : tag === '技术专家' ? 'Technical Expert' : tag)));
      
    return matchesSearch && matchesFilter;
  });
  
  // Filter companies based on search
  const filteredCompanies = companies.filter(company => 
    !searchTerm || 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (language === 'zh' ? company.type : company.typeEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (language === 'zh' ? company.industry : company.industryEn).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get connection strength indicator
  const getStrengthIndicator = (strength: string) => {
    switch (strength) {
      case 'strong':
        return (
          <div className="flex items-center text-success-600">
            <div className="w-2 h-2 bg-success-600 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-success-600 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-success-600 rounded-full"></div>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center text-primary-600">
            <div className="w-2 h-2 bg-primary-600 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          </div>
        );
      case 'weak':
        return (
          <div className="flex items-center text-gray-500">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '人脉网络' : 'Network'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '管理您的专业人脉和公司关系' : 'Manage your professional connections and company relationships'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索人脉...' : 'Search network...'}
              className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} className="mr-1.5" />
            {language === 'zh' ? '添加联系人' : 'Add Contact'}
          </button>
        </div>
      </div>
      
      {/* Network statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '总人脉数量' : 'Total Connections'}
          </p>
          <p className="text-xl font-semibold text-primary-800">
            {networkStats.totalConnections}
          </p>
          <p className="text-xs text-success-600 mt-1">
            +{networkStats.newConnectionsThisMonth} {language === 'zh' ? '本月新增' : 'this month'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '活跃联系人' : 'Active Connections'}
          </p>
          <p className="text-xl font-semibold text-primary-800">
            {networkStats.activeConnections}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {language === 'zh' ? '过去30天内' : 'in last 30 days'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '公司数量' : 'Companies'}
          </p>
          <p className="text-xl font-semibold text-primary-800">
            {networkStats.totalCompanies}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '已促成交易' : 'Facilitated Deals'}
          </p>
          <p className="text-xl font-semibold text-primary-800">
            {networkStats.totalDeals}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '网络强度' : 'Network Strength'}
          </p>
          <div className="flex items-center mt-2">
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-primary-600 h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
            <span className="text-sm font-medium ml-2">65%</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('people')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'people'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={16} className="mr-1.5" />
              {language === 'zh' ? '人脉' : 'People'}
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'companies'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building size={16} className="mr-1.5" />
              {language === 'zh' ? '公司' : 'Companies'}
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Filter options */}
          <div className="mb-4 flex items-center">
            <div className="flex items-center mr-4">
              <button
                className="flex items-center text-sm text-gray-600 hover:text-primary-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
              >
                <Filter size={14} className="mr-1.5" />
                {language === 'zh' ? '筛选' : 'Filter'}
                <ChevronDown size={14} className="ml-1.5" />
              </button>
              
              {activeTab === 'people' && (
                <div className="flex items-center ml-2 space-x-2">
                  <button
                    onClick={() => toggleFilter(language === 'zh' ? '投资者' : 'Investor')}
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      filterType.includes(language === 'zh' ? '投资者' : 'Investor')
                        ? 'bg-primary-100 text-primary-800 border border-primary-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <Tag size={10} className="inline mr-1" />
                    {language === 'zh' ? '投资者' : 'Investor'}
                  </button>
                  <button
                    onClick={() => toggleFilter(language === 'zh' ? '创业者' : 'Entrepreneur')}
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      filterType.includes(language === 'zh' ? '创业者' : 'Entrepreneur')
                        ? 'bg-primary-100 text-primary-800 border border-primary-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <Tag size={10} className="inline mr-1" />
                    {language === 'zh' ? '创业者' : 'Entrepreneur'}
                  </button>
                  <button
                    onClick={() => toggleFilter(language === 'zh' ? '技术专家' : 'Technical Expert')}
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      filterType.includes(language === 'zh' ? '技术专家' : 'Technical Expert')
                        ? 'bg-primary-100 text-primary-800 border border-primary-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <Tag size={10} className="inline mr-1" />
                    {language === 'zh' ? '技术专家' : 'Technical Expert'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* People Tab */}
          {activeTab === 'people' && (
            filteredConnections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.map(connection => (
                  <div 
                    key={connection.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium text-lg mr-3 flex-shrink-0">
                        {language === 'zh' 
                          ? connection.name.charAt(0) 
                          : connection.nameEn.charAt(0)
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-primary-800">
                              {language === 'zh' ? connection.name : connection.nameEn}
                            </h3>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {language === 'zh' ? connection.title : connection.titleEn} @ {connection.company}
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            {getStrengthIndicator(connection.strength)}
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {connection.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {language === 'zh' 
                                ? tag 
                                : tag === '投资者' ? 'Investor' :
                                  tag === '创业者' ? 'Entrepreneur' :
                                  tag === '技术专家' ? 'Technical Expert' : tag
                              }
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {language === 'zh' 
                              ? `上次联系：${connection.lastContact}` 
                              : `Last contact: ${connection.lastContactEn}`
                            }
                          </div>
                          <div className="flex space-x-1">
                            <button title={language === 'zh' ? '发送邮件' : 'Send Email'} className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
                              <Mail size={14} />
                            </button>
                            <button title={language === 'zh' ? '发送消息' : 'Send Message'} className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
                              <MessageSquare size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection notes */}
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
                      {language === 'zh' ? connection.notes : connection.notesEn}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">
                  {language === 'zh' ? '未找到匹配的联系人' : 'No matching contacts found'}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {language === 'zh' ? '尝试调整搜索条件或添加新联系人' : 'Try adjusting your search or add new contacts'}
                </p>
              </div>
            )
          )}
          
          {/* Companies Tab */}
          {activeTab === 'companies' && (
            filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompanies.map(company => (
                  <div 
                    key={company.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-medium text-lg mr-3 flex-shrink-0">
                        <Building size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-primary-800">{company.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600">
                            {language === 'zh' ? company.type : company.typeEn}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">
                            {language === 'zh' ? company.industry : company.industryEn}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">{language === 'zh' ? '联系人' : 'Contacts'}</p>
                            <p className="text-sm font-medium">{company.contacts}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{language === 'zh' ? '交易' : 'Deals'}</p>
                            <p className="text-sm font-medium">{company.deals}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{language === 'zh' ? '位置' : 'Location'}</p>
                            <p className="text-sm font-medium">
                              {language === 'zh' ? company.location : company.locationEn}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <a 
                            href={`https://${company.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-800 flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={12} className="mr-1" />
                            {company.website}
                          </a>
                          <div className="text-xs text-gray-500">
                            {language === 'zh' 
                              ? `上次互动：${company.lastInteraction}` 
                              : `Last interaction: ${company.lastInteractionEn}`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">
                  {language === 'zh' ? '未找到匹配的公司' : 'No matching companies found'}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {language === 'zh' ? '尝试调整搜索条件或添加新公司' : 'Try adjusting your search or add new companies'}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      
      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-fade-in animate-slide-in">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">
                {language === 'zh' ? '添加新联系人' : 'Add New Contact'}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '姓名' : 'Name'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入联系人姓名' : 'Enter contact name'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '职位' : 'Title'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入职位' : 'Enter title'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '公司' : 'Company'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入公司名称' : 'Enter company name'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '电子邮件' : 'Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入电子邮件地址' : 'Enter email address'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '标签' : 'Tags'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="px-2 py-1 bg-primary-50 text-primary-700 border border-primary-100 rounded-full text-xs flex items-center hover:bg-primary-100"
                    >
                      {language === 'zh' ? '投资者' : 'Investor'}
                      <Plus size={12} className="ml-1" />
                    </button>
                    <button 
                      className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs flex items-center hover:bg-gray-200"
                    >
                      {language === 'zh' ? '创业者' : 'Entrepreneur'}
                      <Plus size={12} className="ml-1" />
                    </button>
                    <button 
                      className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs flex items-center hover:bg-gray-200"
                    >
                      {language === 'zh' ? '技术专家' : 'Technical Expert'}
                      <Plus size={12} className="ml-1" />
                    </button>
                    <button 
                      className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs flex items-center hover:bg-gray-200"
                    >
                      <Plus size={12} className="mr-1" />
                      {language === 'zh' ? '添加标签' : 'Add tag'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '备注' : 'Notes'}
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder={language === 'zh' ? '输入有关此联系人的备注' : 'Enter notes about this contact'}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {language === 'zh' ? '取消' : 'Cancel'}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  {language === 'zh' ? '添加' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Network;