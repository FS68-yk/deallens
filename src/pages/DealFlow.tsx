import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Filter, ArrowUp, ArrowDown, ChevronRight, CalendarClock, Briefcase, Users, BarChart, Plus } from 'lucide-react';
import { format } from 'date-fns';

const DealFlow: React.FC = () => {
  const { projects } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'name' | 'updatedAt' | 'stage'>('updatedAt');
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

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

  // Randomly assign projects to deal stages for demo
  const getProjectsByStage = (stageId: string) => {
    return filteredProjects.filter((_, index) => {
      const hash = (index + stageId.length) % dealStages.length;
      return hash === dealStages.findIndex(s => s.id === stageId);
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-800">投资项目流程</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索项目..."
              className="px-3 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="absolute right-0 top-0 bottom-0 px-3 text-gray-400 hover:text-primary-600"
              onClick={() => setSearchTerm('')}
            >
              {searchTerm && '×'}
            </button>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Filter size={18} className="text-gray-600" />
          </button>
          <button className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={16} className="mr-1.5" />
            新项目
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
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
              <p className="text-sm font-medium text-gray-700 mb-2">按阶段筛选</p>
              <div className="space-y-2">
                {stages.map(stage => (
                  <label key={stage} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      checked={selectedStages.includes(stage)}
                      onChange={() => toggleStageFilter(stage)}
                    />
                    <span className="ml-2 text-sm text-gray-600">{stage}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">排序方式</p>
              <div className="space-y-2">
                <button 
                  className={`flex items-center py-1 text-sm ${sortField === 'name' ? 'text-primary-700 font-medium' : 'text-gray-600'}`}
                  onClick={() => toggleSort('name')}
                >
                  项目名称
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
                <button 
                  className={`flex items-center py-1 text-sm ${sortField === 'updatedAt' ? 'text-primary-700 font-medium' : 'text-gray-600'}`}
                  onClick={() => toggleSort('updatedAt')}
                >
                  更新日期
                  {sortField === 'updatedAt' && (
                    sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
                <button 
                  className={`flex items-center py-1 text-sm ${sortField === 'stage' ? 'text-primary-700 font-medium' : 'text-gray-600'}`}
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
              <p className="text-sm font-medium text-gray-700 mb-2">快速视图</p>
              <div className="space-y-2">
                <button className="flex items-center py-1 text-sm text-gray-600 hover:text-primary-700">
                  <CalendarClock size={14} className="mr-1.5" />
                  最近更新
                </button>
                <button className="flex items-center py-1 text-sm text-gray-600 hover:text-primary-700">
                  <Users size={14} className="mr-1.5" />
                  我的负责项目
                </button>
                <button className="flex items-center py-1 text-sm text-gray-600 hover:text-primary-700">
                  <BarChart size={14} className="mr-1.5" />
                  高增长项目
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 流程视图选择器 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex border-b border-gray-200">
          <button className="flex items-center px-4 py-2 border-b-2 border-primary-600 text-primary-700 font-medium">
            <Briefcase size={16} className="mr-1.5" />
            看板视图
          </button>
          <button className="flex items-center px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
            <ChevronRight size={16} className="mr-1.5" />
            列表视图
          </button>
        </div>
      </div>

      {/* 看板视图 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {dealStages.map(stage => (
          <div key={stage.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className={`${stage.color} px-4 py-3`}>
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{stage.name}</h3>
                <span className="text-xs font-medium bg-white bg-opacity-70 rounded-full px-2 py-0.5">
                  {getProjectsByStage(stage.id).length}
                </span>
              </div>
            </div>
            <div className="p-2 h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin">
              {getProjectsByStage(stage.id).map(project => (
                <div 
                  key={project.id}
                  className="p-3 mb-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 cursor-pointer transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-center mb-2">
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        alt={`${project.name} logo`} 
                        className="w-8 h-8 object-cover rounded-md mr-2"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold mr-2">
                        {project.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-primary-800 line-clamp-1">{project.name}</h4>
                      <p className="text-xs text-gray-500">{project.industry}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {project.description}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="px-1.5 py-0.5 bg-primary-50 text-primary-700 rounded-full">
                      {project.stage}
                    </span>
                    <span className="text-gray-500">
                      {format(new Date(project.updatedAt), 'MM/dd')}
                    </span>
                  </div>
                </div>
              ))}
              {getProjectsByStage(stage.id).length === 0 && (
                <div className="py-8 px-3 text-center text-gray-400 text-sm">
                  此阶段暂无项目
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealFlow;