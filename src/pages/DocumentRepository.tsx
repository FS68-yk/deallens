import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  FileText, Search, Filter, ArrowDown, ArrowUp, Clock, 
  Upload, FolderPlus, ChevronDown, Download, MoreHorizontal 
} from 'lucide-react';
import { format } from 'date-fns';

const DocumentRepository: React.FC = () => {
  const { projects } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'name' | 'uploadDate'>('uploadDate');
  const [fileTypeFilter, setFileTypeFilter] = useState<string[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Extract all documents from all projects
  const allDocuments = projects.flatMap(project => 
    project.documents.map(doc => ({
      ...doc,
      projectId: project.id,
      projectName: project.name
    }))
  );

  const toggleSort = (field: 'name' | 'uploadDate') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleFileTypeFilter = (type: string) => {
    setFileTypeFilter(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const fileTypes = [
    { label: 'PDF', value: 'pdf', icon: <FileText size={14} className="text-error-500 mr-1.5" /> },
    { label: 'Word', value: 'word', icon: <FileText size={14} className="text-blue-500 mr-1.5" /> },
    { label: 'Excel', value: 'excel', icon: <FileText size={14} className="text-green-600 mr-1.5" /> },
    { label: 'PowerPoint', value: 'powerpoint', icon: <FileText size={14} className="text-orange-500 mr-1.5" /> },
    { label: 'Images', value: 'image', icon: <FileText size={14} className="text-purple-500 mr-1.5" /> },
  ];

  const filteredDocuments = allDocuments
    .filter(doc => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          doc.name.toLowerCase().includes(searchLower) ||
          doc.projectName.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(doc => {
      // Apply file type filter
      if (fileTypeFilter.length === 0) return true;
      return fileTypeFilter.some(type => doc.type.toLowerCase().includes(type));
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'uploadDate') {
        return sortOrder === 'asc' 
          ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime() 
          : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      return 0;
    });

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <FileText size={20} className="text-error-500" />;
    } else if (type.includes('image')) {
      return <FileText size={20} className="text-purple-500" />;
    } else if (type.includes('spreadsheet') || type.includes('excel')) {
      return <FileText size={20} className="text-green-600" />;
    } else if (type.includes('presentation') || type.includes('powerpoint')) {
      return <FileText size={20} className="text-orange-500" />;
    } else if (type.includes('word') || type.includes('document')) {
      return <FileText size={20} className="text-blue-500" />;
    } else {
      return <FileText size={20} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">文档存储库</h1>
          <p className="text-gray-500 mt-1">管理和组织所有项目文档</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            <FolderPlus size={16} className="mr-1.5" />
            新建文件夹
          </button>
          <button className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Upload size={16} className="mr-1.5" />
            上传文件
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl shadow-2xl mb-6">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索文档..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded flex items-center"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <Filter size={16} className="mr-1" />
                筛选
                <ChevronDown size={14} className="ml-1" />
              </button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 glass-card rounded-2xl shadow-2xl py-3 w-48 z-10">
                  <div className="px-3 py-1 text-xs text-gray-500 font-medium">文件类型</div>
                  {fileTypes.map(type => (
                    <div key={type.value} className="px-3 py-1">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                          checked={fileTypeFilter.includes(type.value)}
                          onChange={() => toggleFileTypeFilter(type.value)}
                        />
                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                          {type.icon}
                          {type.label}
                        </span>
                      </label>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    className="px-3 py-1 text-sm text-primary-600 hover:text-primary-800 w-full text-left"
                    onClick={() => setFileTypeFilter([])}
                  >
                    清除筛选
                  </button>
                </div>
              )}
            </div>
            <button 
              className={`p-1.5 flex items-center text-sm ${sortField === 'name' ? 'text-primary-700 bg-gray-100' : 'text-gray-500 hover:text-primary-700 hover:bg-gray-100'} rounded`}
              onClick={() => toggleSort('name')}
            >
              名称
              {sortField === 'name' && (
                sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
              )}
            </button>
            <button 
              className={`p-1.5 flex items-center text-sm ${sortField === 'uploadDate' ? 'text-primary-700 bg-gray-100' : 'text-gray-500 hover:text-primary-700 hover:bg-gray-100'} rounded`}
              onClick={() => toggleSort('uploadDate')}
            >
              上传日期
              {sortField === 'uploadDate' && (
                sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
              )}
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文件名</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传日期</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-primary-800">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type.split('/').pop()?.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{doc.projectName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 flex items-center">
                      <Clock size={14} className="mr-1.5 text-gray-400" />
                      {format(new Date(doc.uploadDate), 'yyyy-MM-dd')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatFileSize(doc.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <button title="下载" className="p-1 rounded hover:bg-gray-100">
                        <Download size={16} className="text-primary-600" />
                      </button>
                      <button title="更多" className="p-1 rounded hover:bg-gray-100">
                        <MoreHorizontal size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">没有找到文档</p>
              <p className="text-sm text-gray-400">尝试调整搜索条件或上传新文档</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentRepository;