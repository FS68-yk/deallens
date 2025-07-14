import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  HelpCircle,
  Save,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Mock tags data
const mockTags = [
  {
    id: 'tag-1',
    name: 'AI',
    nameZh: 'AI',
    color: 'blue',
    description: 'Artificial intelligence projects',
    descriptionZh: '人工智能项目',
    usageCount: 12,
    category: 'technology',
    categoryZh: '技术',
    createdAt: '2023-11-15'
  },
  {
    id: 'tag-2',
    name: 'Fintech',
    nameZh: '金融科技',
    color: 'green',
    description: 'Financial technology projects',
    descriptionZh: '金融科技项目',
    usageCount: 8,
    category: 'industry',
    categoryZh: '行业',
    createdAt: '2023-11-20'
  },
  {
    id: 'tag-3',
    name: 'High Priority',
    nameZh: '高优先级',
    color: 'red',
    description: 'Projects needing immediate attention',
    descriptionZh: '需要立即关注的项目',
    usageCount: 3,
    category: 'status',
    categoryZh: '状态',
    createdAt: '2023-12-05'
  },
  {
    id: 'tag-4',
    name: 'Due Diligence',
    nameZh: '尽职调查',
    color: 'yellow',
    description: 'Projects in due diligence phase',
    descriptionZh: '处于尽职调查阶段的项目',
    usageCount: 5,
    category: 'phase',
    categoryZh: '阶段',
    createdAt: '2023-12-10'
  },
  {
    id: 'tag-5',
    name: 'Seed',
    nameZh: '种子轮',
    color: 'purple',
    description: 'Seed stage investments',
    descriptionZh: '种子轮投资',
    usageCount: 10,
    category: 'investment_stage',
    categoryZh: '投资阶段',
    createdAt: '2023-11-25'
  },
  {
    id: 'tag-6',
    name: 'Series A',
    nameZh: 'A轮',
    color: 'purple',
    description: 'Series A stage investments',
    descriptionZh: 'A轮投资',
    usageCount: 7,
    category: 'investment_stage',
    categoryZh: '投资阶段',
    createdAt: '2023-11-25'
  },
  {
    id: 'tag-7',
    name: 'Series B',
    nameZh: 'B轮',
    color: 'purple',
    description: 'Series B stage investments',
    descriptionZh: 'B轮投资',
    usageCount: 4,
    category: 'investment_stage',
    categoryZh: '投资阶段',
    createdAt: '2023-11-26'
  },
  {
    id: 'tag-8',
    name: 'SaaS',
    nameZh: 'SaaS',
    color: 'blue',
    description: 'Software as a Service business model',
    descriptionZh: '软件即服务商业模式',
    usageCount: 9,
    category: 'business_model',
    categoryZh: '商业模式',
    createdAt: '2023-12-01'
  },
  {
    id: 'tag-9',
    name: 'B2B',
    nameZh: 'B2B',
    color: 'blue',
    description: 'Business to business',
    descriptionZh: '企业对企业',
    usageCount: 11,
    category: 'business_model',
    categoryZh: '商业模式',
    createdAt: '2023-12-01'
  },
  {
    id: 'tag-10',
    name: 'Blockchain',
    nameZh: '区块链',
    color: 'orange',
    description: 'Blockchain technology projects',
    descriptionZh: '区块链技术项目',
    usageCount: 6,
    category: 'technology',
    categoryZh: '技术',
    createdAt: '2023-12-15'
  }
];

// Mock projects using tags
const taggedProjects = [
  {
    tagId: 'tag-1',
    projects: ['NeuralFinance', 'QuantumSecure', 'MedVR']
  },
  {
    tagId: 'tag-2',
    projects: ['NeuralFinance', 'GreenChain']
  },
  {
    tagId: 'tag-3',
    projects: ['NeuralFinance']
  },
  {
    tagId: 'tag-4',
    projects: ['GreenChain', 'AgriSense']
  },
  {
    tagId: 'tag-5',
    projects: ['AgriSense', 'GreenChain']
  },
  {
    tagId: 'tag-6',
    projects: ['NeuralFinance', 'QuantumSecure']
  },
  {
    tagId: 'tag-7',
    projects: ['MedVR']
  },
  {
    tagId: 'tag-8',
    projects: ['NeuralFinance', 'QuantumSecure', 'MedVR']
  },
  {
    tagId: 'tag-9',
    projects: ['NeuralFinance', 'QuantumSecure', 'MedVR', 'GreenChain']
  },
  {
    tagId: 'tag-10',
    projects: ['GreenChain']
  }
];

// Tag categories
const tagCategories = [
  { id: 'all', name: 'All Tags', nameZh: '所有标签' },
  { id: 'technology', name: 'Technology', nameZh: '技术' },
  { id: 'industry', name: 'Industry', nameZh: '行业' },
  { id: 'status', name: 'Status', nameZh: '状态' },
  { id: 'phase', name: 'Phase', nameZh: '阶段' },
  { id: 'investment_stage', name: 'Investment Stage', nameZh: '投资阶段' },
  { id: 'business_model', name: 'Business Model', nameZh: '商业模式' }
];

// Tag colors
const tagColors = [
  { id: 'blue', name: 'Blue', nameZh: '蓝色', class: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'green', name: 'Green', nameZh: '绿色', class: 'bg-green-100 text-green-800 border-green-300' },
  { id: 'red', name: 'Red', nameZh: '红色', class: 'bg-red-100 text-red-800 border-red-300' },
  { id: 'yellow', name: 'Yellow', nameZh: '黄色', class: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { id: 'purple', name: 'Purple', nameZh: '紫色', class: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'orange', name: 'Orange', nameZh: '橙色', class: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'teal', name: 'Teal', nameZh: '蓝绿色', class: 'bg-teal-100 text-teal-800 border-teal-300' },
  { id: 'indigo', name: 'Indigo', nameZh: '靛蓝色', class: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { id: 'gray', name: 'Gray', nameZh: '灰色', class: 'bg-gray-100 text-gray-800 border-gray-300' }
];

const Tags: React.FC = () => {
  const { language } = useLanguage();
  const [tags, setTags] = useState(mockTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  
  // New tag form state
  const [newTag, setNewTag] = useState({
    name: '',
    nameZh: '',
    color: 'blue',
    description: '',
    descriptionZh: '',
    category: 'technology'
  });
  
  // Filter tags based on search and category
  const filteredTags = tags.filter(tag => {
    // Apply search filter
    const matchesSearch = !searchTerm || 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tag.nameZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'zh' ? tag.categoryZh : tag.category).toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    const matchesCategory = selectedCategory === 'all' || tag.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Find projects for a tag
  const getProjectsForTag = (tagId: string) => {
    const found = taggedProjects.find(tp => tp.tagId === tagId);
    return found ? found.projects : [];
  };
  
  // Get color class for a tag
  const getTagColorClass = (color: string) => {
    const found = tagColors.find(tc => tc.id === color);
    return found ? found.class : 'bg-gray-100 text-gray-800 border-gray-300';
  };
  
  // Handle creating a new tag
  const handleCreateTag = () => {
    // Simulated tag creation
    const newTagObj = {
      id: `tag-${tags.length + 1}`,
      name: newTag.name,
      nameZh: newTag.nameZh || newTag.name,
      color: newTag.color,
      description: newTag.description,
      descriptionZh: newTag.descriptionZh || newTag.description,
      usageCount: 0,
      category: newTag.category,
      categoryZh: tagCategories.find(c => c.id === newTag.category)?.nameZh || '其他',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTags([...tags, newTagObj]);
    setShowCreateModal(false);
    
    // Reset form
    setNewTag({
      name: '',
      nameZh: '',
      color: 'blue',
      description: '',
      descriptionZh: '',
      category: 'technology'
    });
  };
  
  // Delete a tag
  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };
  
  // Start editing a tag
  const handleStartEditTag = (tagId: string) => {
    setEditingTagId(tagId);
  };
  
  // Cancel editing a tag
  const handleCancelEditTag = () => {
    setEditingTagId(null);
  };
  
  // Save edited tag
  const handleSaveEditTag = (tagId: string, updatedName: string, updatedNameZh: string) => {
    if (!updatedName.trim()) return;
    
    setTags(tags.map(tag => 
      tag.id === tagId ? 
        {...tag, name: updatedName, nameZh: updatedNameZh || updatedName} : 
        tag
    ));
    
    setEditingTagId(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '标签管理' : 'Tags & Labels'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '管理用于项目分类的标签和标记' : 'Manage tags and labels used for project classification'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索标签...' : 'Search tags...'}
              className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} className="mr-1.5" />
            {language === 'zh' ? '创建标签' : 'Create Tag'}
          </button>
        </div>
      </div>
      
      {/* Tag categories */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '标签分类' : 'Tag Categories'}
          </h2>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {tagCategories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1.5 rounded-md text-sm ${
                selectedCategory === category.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {language === 'zh' ? category.nameZh : category.name}
              {category.id === 'all' ? 
                ` (${tags.length})` : 
                ` (${tags.filter(tag => tag.category === category.id).length})`
              }
            </button>
          ))}
        </div>
      </div>
      
      {/* Tags list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '标签' : 'Tags'}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
              <Filter size={16} />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded flex items-center">
              <ArrowUpDown size={16} />
            </button>
          </div>
        </div>
        
        {filteredTags.length === 0 ? (
          <div className="py-12 text-center">
            <Tag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              {language === 'zh' ? '没有找到标签' : 'No tags found'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {language === 'zh' ? '尝试调整搜索条件或创建新标签' : 'Try adjusting your search or create a new tag'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    {language === 'zh' ? '标签名称' : 'Tag Name'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    {language === 'zh' ? '分类' : 'Category'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                    {language === 'zh' ? '描述' : 'Description'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '使用次数' : 'Usage'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '操作' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTagId === tag.id ? (
                        <div className="flex space-x-2">
                          <input 
                            type="text"
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-24"
                            defaultValue={language === 'zh' ? tag.nameZh : tag.name}
                            autoFocus
                            placeholder={language === 'zh' ? '标签名称' : 'Tag name'}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const inputElem = e.target as HTMLInputElement;
                                handleSaveEditTag(tag.id, inputElem.value, inputElem.value);
                              }
                              if (e.key === 'Escape') {
                                handleCancelEditTag();
                              }
                            }}
                          />
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => {
                                const inputElem = document.querySelector('input') as HTMLInputElement;
                                handleSaveEditTag(tag.id, inputElem.value, inputElem.value);
                              }}
                              className="p-1 text-success-600 hover:text-success-800 rounded"
                            >
                              <Save size={14} />
                            </button>
                            <button 
                              onClick={handleCancelEditTag}
                              className="p-1 text-gray-500 hover:text-gray-700 rounded"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTagColorClass(tag.color)}`}>
                            {language === 'zh' ? tag.nameZh : tag.name}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {language === 'zh' ? tag.categoryZh : tag.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {language === 'zh' ? tag.descriptionZh : tag.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tag.usageCount}</div>
                      <div className="text-xs text-gray-500">
                        {getProjectsForTag(tag.id).length > 0 ? (
                          <>
                            {language === 'zh' ? '项目: ' : 'Projects: '}
                            {getProjectsForTag(tag.id).slice(0, 2).join(', ')}
                            {getProjectsForTag(tag.id).length > 2 && '...'}
                          </>
                        ) : (
                          language === 'zh' ? '未使用' : 'Not used'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleStartEditTag(tag.id)}
                          className="p-1.5 text-primary-600 hover:text-primary-900 hover:bg-gray-100 rounded"
                          title={language === 'zh' ? '编辑' : 'Edit'}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTag(tag.id)}
                          className="p-1.5 text-gray-400 hover:text-error-600 hover:bg-gray-100 rounded"
                          title={language === 'zh' ? '删除' : 'Delete'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Create Tag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-fade-in animate-slide-in">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">
                {language === 'zh' ? '创建新标签' : 'Create New Tag'}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '标签名称 (英文)' : 'Tag Name (English)'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入英文名称' : 'Enter tag name in English'}
                    value={newTag.name}
                    onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                  />
                </div>
                
                {language === 'zh' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      标签名称 (中文)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="输入中文名称"
                      value={newTag.nameZh}
                      onChange={(e) => setNewTag({...newTag, nameZh: e.target.value})}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '标签颜色' : 'Tag Color'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {tagColors.map(color => (
                      <button
                        key={color.id}
                        type="button"
                        className={`inline-flex items-center justify-center py-2 px-3 border rounded-md text-sm ${
                          newTag.color === color.id
                            ? `${color.class} border-2`
                            : `${color.class} opacity-60 hover:opacity-100`
                        }`}
                        onClick={() => setNewTag({...newTag, color: color.id})}
                      >
                        {language === 'zh' ? color.nameZh : color.name}
                        {newTag.color === color.id && (
                          <CheckCircle size={14} className="ml-1.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '分类' : 'Category'}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={newTag.category}
                    onChange={(e) => setNewTag({...newTag, category: e.target.value})}
                  >
                    {tagCategories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>
                        {language === 'zh' ? category.nameZh : category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '描述 (英文)' : 'Description (English)'}
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={2}
                    placeholder={language === 'zh' ? '输入标签描述 (英文)' : 'Enter tag description'}
                    value={newTag.description}
                    onChange={(e) => setNewTag({...newTag, description: e.target.value})}
                  ></textarea>
                </div>
                
                {language === 'zh' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      描述 (中文)
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={2}
                      placeholder="输入标签描述 (中文)"
                      value={newTag.descriptionZh}
                      onChange={(e) => setNewTag({...newTag, descriptionZh: e.target.value})}
                    ></textarea>
                  </div>
                )}
              </div>
              
              <div className="mt-4 bg-gray-50 rounded-md p-3 text-xs flex items-start">
                <HelpCircle size={14} className="text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-gray-600">
                  {language === 'zh' 
                    ? '标签将用于组织和筛选项目。您可以将多个标签应用于一个项目，也可以根据标签创建自定义视图。' 
                    : 'Tags will be used to organize and filter projects. You can apply multiple tags to a project and create custom views based on tags.'}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {language === 'zh' ? '取消' : 'Cancel'}
                </button>
                <button
                  onClick={handleCreateTag}
                  disabled={!newTag.name.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    newTag.name.trim() 
                      ? 'bg-primary-600 hover:bg-primary-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  {language === 'zh' ? '创建' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;