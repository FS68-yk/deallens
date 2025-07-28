import React, { useState } from 'react';
import { 
  Database, Search, Filter, BarChart2, PieChart, ArrowDownUp,
  Calendar, Users, MapPin, Building, ChevronDown, RefreshCw, Download 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Pipeline: React.FC = () => {
  const { projects } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [showFilters, setShowFilters] = useState(false);
  
  // Derived metrics (in a real app, these would come from an API)
  const dealsInPipeline = projects.length;
  const totalDealValue = '¥120M';  // This would be calculated from actual deal values
  const avgDealSize = '¥24M';     // This would be calculated from actual deal sizes
  const conversionRate = '18%';   // This would be calculated from historical data
  
  // Industry distribution
  const industryData = [
    { name: 'Fintech', count: 1, color: 'bg-blue-500' },
    { name: 'HealthTech', count: 1, color: 'bg-green-500' },
    { name: 'CleanTech', count: 1, color: 'bg-purple-500' },
    { name: 'Cybersecurity', count: 1, color: 'bg-orange-500' },
    { name: 'AgTech', count: 1, color: 'bg-pink-500' }
  ];
  
  const totalIndustryCount = industryData.reduce((acc, curr) => acc + curr.count, 0);
  
  // Stage distribution
  const stageData = [
    { name: 'Initial Screening', count: 2, color: 'bg-gray-400' },
    { name: 'Due Diligence', count: 1, color: 'bg-yellow-500' },
    { name: 'Negotiation', count: 1, color: 'bg-red-500' },
    { name: 'Closing', count: 1, color: 'bg-green-600' }
  ];
  
  // Geographic distribution
  const regionData = [
    { name: '北京', count: 1, percentage: '20%' },
    { name: '上海', count: 1, percentage: '20%' },
    { name: '深圳', count: 1, percentage: '20%' },
    { name: '美国', count: 2, percentage: '40%' }
  ];
  
  // Deal pipeline forecast by month
  const forecastData = [
    { month: '1月', screening: 4, evaluation: 2, closing: 1 },
    { month: '2月', screening: 6, evaluation: 3, closing: 2 },
    { month: '3月', screening: 5, evaluation: 4, closing: 1 },
    { month: '4月', screening: 7, evaluation: 3, closing: 2 },
    { month: '5月', screening: 8, evaluation: 5, closing: 3 },
    { month: '6月', screening: 10, evaluation: 6, closing: 4 }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">投资管道分析</h1>
          <p className="text-gray-500 mt-1">监控和分析投资项目流程</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索项目或趋势..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
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
      
      {showFilters && (
        <div className="glass-card rounded-2xl shadow-2xl p-6 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
              <div className="flex rounded-md shadow-sm">
                <button
                  className={`px-3 py-1.5 text-sm ${timeRange === 'month' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors rounded-l-md`}
                  onClick={() => setTimeRange('month')}
                >
                  月度
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${timeRange === 'quarter' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
                  onClick={() => setTimeRange('quarter')}
                >
                  季度
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${timeRange === 'year' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors rounded-r-md`}
                  onClick={() => setTimeRange('year')}
                >
                  年度
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">行业</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">所有行业</option>
                <option value="fintech">金融科技</option>
                <option value="healthtech">医疗科技</option>
                <option value="cleantech">清洁技术</option>
                <option value="cybersecurity">网络安全</option>
                <option value="agtech">农业科技</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">阶段</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                <option value="">所有阶段</option>
                <option value="seed">种子轮</option>
                <option value="series-a">A轮</option>
                <option value="series-b">B轮</option>
                <option value="growth">增长期</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button className="text-sm text-primary-600 hover:text-primary-800">
              重置筛选
            </button>
          </div>
        </div>
      )}
      
      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm flex items-center">
              <Database size={16} className="mr-1.5" />
              管道中的项目
            </div>
            <span className="px-2 py-0.5 bg-success-100 text-success-800 rounded-full text-xs">活跃</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-primary-800">{dealsInPipeline}</span>
            <span className="text-sm text-gray-500 ml-2">个项目</span>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm flex items-center">
              <BarChart2 size={16} className="mr-1.5" />
              总投资金额
            </div>
            <span className="px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full text-xs">估计</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-primary-800">{totalDealValue}</span>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm flex items-center">
              <ArrowDownUp size={16} className="mr-1.5" />
              平均项目规模
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-primary-800">{avgDealSize}</span>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm flex items-center">
              <PieChart size={16} className="mr-1.5" />
              转化率
            </div>
            <button className="text-xs text-primary-600 hover:text-primary-800">查看详情</button>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-primary-800">{conversionRate}</span>
          </div>
        </div>
      </div>
      
      {/* 分布图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-medium text-primary-800">行业分布</h2>
            <button className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="p-4">
            <div className="relative h-48 flex items-center justify-center mb-4">
              <div className="flex flex-wrap justify-center items-center absolute">
                {/* 这里在实际应用中应该使用图表库如Chart.js或Recharts */}
                <div className="text-center">
                  <PieChart size={120} className="text-gray-300" />
                  <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                    {totalIndustryCount}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {industryData.map((industry, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${industry.color} mr-2`}></div>
                  <div className="flex-1 text-sm text-gray-700">{industry.name}</div>
                  <div className="text-sm font-medium text-gray-900">{industry.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-medium text-primary-800">地域分布</h2>
            <div className="flex items-center text-sm text-gray-600">
              <button className="flex items-center">
                按数量
                <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="relative h-48 flex items-center justify-center mb-4">
              {/* 这里在实际应用中应该使用MapChart组件 */}
              <div className="text-center">
                <MapPin size={120} className="text-gray-300 mx-auto" />
                <p className="text-sm text-gray-500 mt-2">地域分布图</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {regionData.map((region, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <div className="text-sm text-gray-700">{region.name}</div>
                  <div className="text-sm font-medium text-gray-900">{region.percentage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 更多分析图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-medium text-primary-800">投资管道预测</h2>
            <button className="flex items-center text-xs text-primary-600 hover:text-primary-800">
              查看完整报告
            </button>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-center justify-center">
              {/* 这里在实际应用中应该使用图表库如Chart.js或Recharts */}
              <div className="w-full px-4">
                <div className="flex justify-between items-end h-40 mb-2">
                  {forecastData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-end space-y-1 w-1/6">
                      <div className="w-full bg-green-500 rounded-t" style={{height: `${item.closing * 5}px`}}></div>
                      <div className="w-full bg-yellow-500" style={{height: `${item.evaluation * 5}px`}}></div>
                      <div className="w-full bg-blue-500" style={{height: `${item.screening * 5}px`}}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {forecastData.map((item, index) => (
                    <div key={index} className="text-xs text-gray-500 w-1/6 text-center">
                      {item.month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-600">初筛</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-600">评估</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-600">成交</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-primary-800">阶段分布</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {stageData.map((stage, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-700">{stage.name}</div>
                    <div className="text-sm font-medium text-gray-900">{stage.count}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${stage.color} h-2 rounded-full`} 
                      style={{width: `${(stage.count / dealsInPipeline) * 100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">投资决策时间</h3>
                <span className="text-xs text-gray-500">平均值</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-600">初筛到评估</div>
                    <div className="text-xs font-medium text-gray-800">14 天</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-600">评估到尽调</div>
                    <div className="text-xs font-medium text-gray-800">28 天</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-600">尽调到成交</div>
                    <div className="text-xs font-medium text-gray-800">35 天</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 团队绩效 */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium text-primary-800">团队绩效</h2>
          <button className="text-sm text-primary-600 hover:text-primary-800">
            查看详细分析
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  团队成员
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  负责项目
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  评估中
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  尽调中
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  成交
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  转化率
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <Users size={14} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">张经理</div>
                      <div className="text-xs text-gray-500">投资总监</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600 font-medium">22%</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <Users size={14} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">李分析师</div>
                      <div className="text-xs text-gray-500">高级分析师</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600 font-medium">25%</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <Users size={14} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">王助理</div>
                      <div className="text-xs text-gray-500">投资助理</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-warning-600 font-medium">10%</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;