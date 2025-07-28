import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Filter, ArrowUp, ArrowDown, ChevronRight, CalendarClock, Briefcase, Users, BarChart, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DealFlow: React.FC = () => {
  const { projects } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'name' | 'updatedAt' | 'stage'>('updatedAt');
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Handle URL search parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
      // Clear the URL parameter after setting the search term
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('search');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const toggleSort = (field: 'name' | 'updatedAt' | 'stage') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleStageFilter = (stage: string) => {
    setSelectedStages(prev => 
      prev.includes(stage) 
        ? prev.filter(s => s !== stage) 
        : [...prev, stage]
    );
  };

  const stages = [...new Set(projects.map(project => project.stage))];

  const filteredProjects = projects
    .filter(project => {
      // Apply stage filters if any are selected
      if (selectedStages.length > 0 && !selectedStages.includes(project.stage)) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.industry.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'updatedAt') {
        return sortOrder === 'asc' 
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime() 
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortField === 'stage') {
        const stageOrder = ['Seed', 'Series A', 'Series B', 'Series C+'];
        const aIndex = stageOrder.indexOf(a.stage);
        const bIndex = stageOrder.indexOf(b.stage);
        return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
      }
      return 0;
    });

  // Deal stages for the kanban columns
  const dealStages = [
    { id: 'screening', name: '初筛', color: 'bg-gray-100' },
    { id: 'evaluation', name: '评估', color: 'bg-blue-100' },
    { id: 'meeting', name: '会议', color: 'bg-yellow-100' },
    { id: 'duediligence', name: '尽调', color: 'bg-orange-100' },
    { id: 'negotiation', name: '谈判', color: 'bg-purple-100' },
    { id: 'closing', name: '成交', color: 'bg-green-100' }
  ];

  // Create sorted projects for list view
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const direction = sortOrder === 'asc' ? 1 : -1;
    
    if (sortField === 'name') {
      return a.name.localeCompare(b.name) * direction;
    } else if (sortField === 'updatedAt') {
      return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * direction;
    } else if (sortField === 'stage') {
      return a.stage.localeCompare(b.stage) * direction;
    }
    return 0;
  });

  // Randomly assign projects to deal stages for demo
  const getProjectsByStage = (stageId: string) => {
    return filteredProjects.filter((_, index) => {
      const hash = (index + stageId.length) % dealStages.length;
      return hash === dealStages.findIndex(s => s.id === stageId);
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-3">
        <h1 className="text-2xl font-bold text-white">投资项目流程</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索项目..."
              className="glass px-3 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="absolute right-0 top-0 bottom-0 px-3 text-white/70 hover:text-white"
              onClick={() => setSearchTerm('')}
            >
              {searchTerm && '×'}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="glass p-2 rounded-lg hover:glass-card transition-all duration-300 text-white"
            >
              <Filter size={18} />
            </button>
            <button className="flex items-center bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300">
              <Plus size={16} className="mr-1.5" />
              新项目
            </button>
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="glass-card rounded-2xl shadow-2xl p-4 mb-3 sm:mb-4 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-primary-800">筛选与排序</h3>
            <button 
              className="text-sm text-primary-600 hover:text-primary-800"
              onClick={() => setSelectedStages([])}
            >
              清除筛选
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-white mb-2">按阶段筛选</p>
              <div className="space-y-2">
                {stages.map(stage => (
                  <label key={stage} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded border-white/30 focus:ring-white/30"
                      checked={selectedStages.includes(stage)}
                      onChange={() => toggleStageFilter(stage)}
                    />
                    <span className="ml-2 text-sm text-white/90">{stage}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-2">排序方式</p>
              <div className="space-y-2">
                <button 
                  className={`flex items-center py-1 text-sm ${sortField === 'name' ? 'text-blue-200 font-medium' : 'text-white/80'} hover:text-white transition-colors`}
                  onClick={() => toggleSort('name')}
                >
                  项目名称
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
                <button 
                  className={`flex items-center py-1 text-sm ${sortField === 'updatedAt' ? 'text-blue-200 font-medium' : 'text-white/80'} hover:text-white transition-colors`}
                  onClick={() => toggleSort('updatedAt')}
                >
                  更新日期
                  {sortField === 'updatedAt' && (
                    sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
                <button 
                  className={`flex items-center py-1 text-sm ${sortField === 'stage' ? 'text-blue-200 font-medium' : 'text-white/80'} hover:text-white transition-colors`}
                  onClick={() => toggleSort('stage')}
                >
                  投资阶段
                  {sortField === 'stage' && (
                    sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-2">快速视图</p>
              <div className="space-y-2">
                <button className="flex items-center py-1.5 px-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-transparent hover:border-white/20">
                  <CalendarClock size={14} className="mr-1.5" />
                  最近更新
                </button>
                <button className="flex items-center py-1.5 px-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-transparent hover:border-white/20">
                  <Users size={14} className="mr-1.5" />
                  我的负责项目
                </button>
                <button className="flex items-center py-1.5 px-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-transparent hover:border-white/20">
                  <BarChart size={14} className="mr-1.5" />
                  高增长项目
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 流程视图选择器 */}
      <div className="glass-card rounded-2xl shadow-2xl p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex border-b border-white/20">
          <button 
            onClick={() => setViewMode('kanban')}
            className={`flex items-center px-4 py-2 border-b-2 transition-colors ${
              viewMode === 'kanban' 
                ? 'border-blue-400 text-white font-medium' 
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Briefcase size={16} className="mr-1.5" />
            看板视图
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 border-b-2 transition-colors ${
              viewMode === 'list' 
                ? 'border-blue-400 text-white font-medium' 
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <ChevronRight size={16} className="mr-1.5" />
            列表视图
          </button>
        </div>
      </div>

      {/* 看板视图 */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 overflow-x-auto">
          {/* 移动端水平滚动提示 */}
          <div className="col-span-full sm:hidden text-center text-white/60 text-xs mb-1">
            👈 左右滑动查看所有阶段
          </div>
          {dealStages.map(stage => (
            <div key={stage.id} className="glass-card rounded-2xl shadow-2xl overflow-hidden">
              <div className={`${stage.color} px-3 py-2`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">{stage.name}</h3>
                  <span className="text-xs font-medium bg-white/90 text-gray-800 rounded-full px-2 py-0.5 shadow-sm">
                    {getProjectsByStage(stage.id).length}
                  </span>
                </div>
              </div>
              <div className="p-2 h-[calc(100vh-220px)] sm:h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin">
                {getProjectsByStage(stage.id).map(project => (
                  <div 
                    key={project.id}
                    className="glass p-3 mb-2 rounded-lg border border-white/20 hover:border-white/40 cursor-pointer transition-all duration-300 hover:glass-card"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <div className="flex items-center mb-2">
                      {project.logo ? (
                        <img 
                          src={project.logo} 
                          alt={`${project.name} logo`} 
                          className="w-8 h-8 object-cover rounded-md mr-2 shadow-sm"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center text-xs font-bold mr-2 backdrop-blur-sm">
                          {project.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-white line-clamp-1 mb-0.5">{project.name}</h4>
                        <p className="text-xs text-white/80">{project.industry}</p>
                      </div>
                    </div>
                    <div className="text-xs text-white/90 line-clamp-2 mb-2 leading-snug">
                      {project.description}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                        {project.stage}
                      </span>
                      <span className="text-white/70">
                        {format(new Date(project.updatedAt), 'MM/dd')}
                      </span>
                    </div>
                  </div>
                ))}
                {getProjectsByStage(stage.id).length === 0 && (
                  <div className="py-4 px-2 text-center text-white/60 text-xs">
                    此阶段暂无项目
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 列表视图 */}
      {viewMode === 'list' && (
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          {/* 移动端卡片式列表 */}
          <div className="block sm:hidden">
            <div className="p-3 border-b border-white/20">
              <h3 className="text-sm font-medium text-white">项目列表 ({sortedProjects.length})</h3>
            </div>
            <div className="divide-y divide-white/10">
              {sortedProjects.map(project => (
                <div key={project.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
                  <div className="flex items-start space-x-3">
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        alt={`${project.name} logo`} 
                        className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {project.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-white truncate">{project.name}</h4>
                        <span className="text-xs text-white/70 ml-2">
                          {format(new Date(project.updatedAt), 'MM/dd')}
                        </span>
                      </div>
                      <p className="text-xs text-white/80 mb-2">{project.industry}</p>
                      <p className="text-xs text-white/70 line-clamp-2 mb-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/20 text-white">
                          {project.stage}
                        </span>
                        <span className="text-xs text-white/60">{project.valuation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 桌面端表格式列表 */}
          <div className="hidden sm:block">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      项目
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      行业
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      阶段
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      估值
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      更新时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {sortedProjects.map(project => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {project.logo ? (
                            <img 
                              src={project.logo} 
                              alt={`${project.name} logo`} 
                              className="w-8 h-8 object-cover rounded-md mr-3"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center text-xs font-bold mr-3">
                              {project.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-white">{project.name}</div>
                            <div className="text-xs text-white/70 line-clamp-1">{project.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-white/80">{project.industry}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-white/20 text-white">
                          {project.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-white/80">{project.valuation}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-white/70">
                          {format(new Date(project.updatedAt), 'yyyy/MM/dd')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-300 hover:text-blue-200 transition-colors mr-3">
                          查看
                        </button>
                        <button className="text-white/60 hover:text-white/80 transition-colors">
                          编辑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {sortedProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-white/60 text-sm">暂无项目数据</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DealFlow;