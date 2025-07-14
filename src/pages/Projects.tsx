import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Plus, Search, Filter, ArrowDown, ArrowUp, 
  Calendar, DollarSign, Users, FileText, Star, StarOff 
} from 'lucide-react';
import { format } from 'date-fns';

const Projects: React.FC = () => {
  const { projects } = useAppContext();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'name' | 'updatedAt'>('updatedAt');
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');
  const [starredProjects, setStarredProjects] = useState<string[]>([]);

  const toggleSort = (field: 'name' | 'updatedAt') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleStarred = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const filteredProjects = projects
    .filter(project => {
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
      }
      return 0;
    });

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-800">{t('common.projects')}</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索项目...' : 'Search projects...'}
              className="px-3 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={16} className="mr-1.5" />
            {language === 'zh' ? '新项目' : 'New Project'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              className={`text-sm font-medium ${viewType === 'list' ? 'text-primary-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setViewType('list')}
            >
              {language === 'zh' ? '列表视图' : 'List View'}
            </button>
            <button 
              className={`text-sm font-medium ${viewType === 'grid' ? 'text-primary-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setViewType('grid')}
            >
              {language === 'zh' ? '卡片视图' : 'Card View'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
              <Filter size={16} />
            </button>
            <button 
              className={`p-1.5 flex items-center text-sm ${sortField === 'name' ? 'text-primary-700 bg-gray-100' : 'text-gray-500 hover:text-primary-700 hover:bg-gray-100'} rounded`}
              onClick={() => toggleSort('name')}
            >
              {language === 'zh' ? '名称' : 'Name'}
              {sortField === 'name' && (
                sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
              )}
            </button>
            <button 
              className={`p-1.5 flex items-center text-sm ${sortField === 'updatedAt' ? 'text-primary-700 bg-gray-100' : 'text-gray-500 hover:text-primary-700 hover:bg-gray-100'} rounded`}
              onClick={() => toggleSort('updatedAt')}
            >
              {language === 'zh' ? '更新日期' : 'Update Date'}
              {sortField === 'updatedAt' && (
                sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
              )}
            </button>
          </div>
        </div>

        {viewType === 'list' ? (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '项目' : 'Project'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '行业' : 'Industry'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '阶段' : 'Stage'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '估值' : 'Valuation'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '文档' : 'Documents'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '更新日期' : 'Update Date'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={(e) => toggleStarred(project.id, e)}
                        className="text-gray-400 hover:text-yellow-400"
                      >
                        {starredProjects.includes(project.id) ? (
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff size={16} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {project.logo ? (
                            <img className="h-10 w-10 rounded-md object-cover" src={project.logo} alt="" />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center text-lg font-bold">
                              {project.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary-800">{project.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{project.description.substring(0, 50)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                        {project.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{project.stage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{project.valuation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.documents.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(project.updatedAt), 'yyyy-MM-dd')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="h-24 bg-gradient-to-r from-primary-600 to-primary-700 relative">
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={(e) => toggleStarred(project.id, e)}
                      className="text-white hover:text-yellow-400"
                    >
                      {starredProjects.includes(project.id) ? (
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff size={18} />
                      )}
                    </button>
                  </div>
                  {project.logo ? (
                    <img 
                      src={project.logo} 
                      alt={`${project.name} logo`} 
                      className="w-16 h-16 object-cover rounded-lg border-2 border-white absolute bottom-0 left-4 transform translate-y-1/2"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white text-primary-600 flex items-center justify-center text-xl font-bold absolute bottom-0 left-4 transform translate-y-1/2 border-2 border-white">
                      {project.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="pt-10 px-4 pb-4">
                  <h3 className="text-lg font-semibold text-primary-800 mb-1">{project.name}</h3>
                  <p className="text-gray-500 text-sm">{project.industry}</p>
                  
                  <p className="text-sm text-gray-600 mt-3 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={14} className="mr-1.5 text-gray-400" />
                      <span>{format(new Date(project.updatedAt), 'yyyy-MM-dd')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={14} className="mr-1.5 text-gray-400" />
                      <span>{project.valuation}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={14} className="mr-1.5 text-gray-400" />
                      <span>
                        {project.founders.length} {language === 'zh' ? '位创始人' : 'founders'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FileText size={14} className="mr-1.5 text-gray-400" />
                      <span>
                        {project.documents.length} {language === 'zh' ? '个文档' : 'documents'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;