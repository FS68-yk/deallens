import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Mail, 
  Phone, 
  Search, 
  MoreHorizontal, 
  Filter,
  Star,
  MessageSquare,
  UserPlus,
  Building,
  UserCheck,
  XCircle,
  Edit,
  ArrowUpDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Mock team member data
const teamMembers = [
  {
    id: 'team-1',
    name: '张经理',
    nameEn: 'Zhang Manager',
    role: '投资总监',
    roleEn: 'Investment Director',
    avatar: null, // Use initial instead
    email: 'zhang@deallens.ai',
    phone: '+86 138 0000 1111',
    department: '投资部',
    departmentEn: 'Investment Department',
    activeDeals: 8,
    completedDeals: 12,
    joiningDate: '2021-06-15'
  },
  {
    id: 'team-2',
    name: '李分析师',
    nameEn: 'Li Analyst',
    role: '高级分析师',
    roleEn: 'Senior Analyst',
    avatar: null,
    email: 'li@deallens.ai',
    phone: '+86 139 0000 2222',
    department: '投资部',
    departmentEn: 'Investment Department',
    activeDeals: 5,
    completedDeals: 7,
    joiningDate: '2022-02-10'
  },
  {
    id: 'team-3',
    name: '王助理',
    nameEn: 'Wang Assistant',
    role: '投资助理',
    roleEn: 'Investment Assistant',
    avatar: null,
    email: 'wang@deallens.ai',
    phone: '+86 137 0000 3333',
    department: '投资部',
    departmentEn: 'Investment Department',
    activeDeals: 3,
    completedDeals: 2,
    joiningDate: '2023-04-22'
  },
  {
    id: 'team-4',
    name: '刘合伙人',
    nameEn: 'Liu Partner',
    role: '合伙人',
    roleEn: 'Partner',
    avatar: null,
    email: 'liu@deallens.ai',
    phone: '+86 136 0000 4444',
    department: '管理层',
    departmentEn: 'Management',
    activeDeals: 6,
    completedDeals: 25,
    joiningDate: '2020-01-05'
  },
  {
    id: 'team-5',
    name: '赵研究员',
    nameEn: 'Zhao Researcher',
    role: '研究员',
    roleEn: 'Researcher',
    avatar: null,
    email: 'zhao@deallens.ai',
    phone: '+86 135 0000 5555',
    department: '研究部',
    departmentEn: 'Research Department',
    activeDeals: 0,
    completedDeals: 0,
    joiningDate: '2023-09-01'
  },
  {
    id: 'team-6',
    name: '陈法务',
    nameEn: 'Chen Legal',
    role: '法务专员',
    roleEn: 'Legal Specialist',
    avatar: null,
    email: 'chen@deallens.ai',
    phone: '+86 134 0000 6666',
    department: '法务部',
    departmentEn: 'Legal Department',
    activeDeals: 4,
    completedDeals: 9,
    joiningDate: '2022-04-15'
  }
];

// Mock team performance data
const performanceData = {
  activeDeals: 26,
  completedDeals: 55,
  totalInvestment: '¥420M',
  averageCycleTime: '68天', // 68 days
  conversionRate: '23%',
  teamGrowth: '+33%'
};

// Mock department structure
const departments = [
  { 
    name: '投资部', 
    nameEn: 'Investment Department',
    members: 8,
    lead: '刘合伙人' 
  },
  { 
    name: '研究部', 
    nameEn: 'Research Department',
    members: 5,
    lead: '陈研究总监' 
  },
  { 
    name: '法务部', 
    nameEn: 'Legal Department',
    members: 3,
    lead: '王法律总监' 
  },
  { 
    name: '财务部', 
    nameEn: 'Finance Department',
    members: 4,
    lead: '李财务总监' 
  },
  { 
    name: '行政部', 
    nameEn: 'Administration',
    members: 2,
    lead: '张行政总监' 
  }
];

const Team: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort members
  const filteredMembers = teamMembers
    .filter(member => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const name = language === 'zh' ? member.name : member.nameEn;
        const role = language === 'zh' ? member.role : member.roleEn;
        const department = language === 'zh' ? member.department : member.departmentEn;
        
        return name.toLowerCase().includes(searchLower) ||
               role.toLowerCase().includes(searchLower) ||
               department.toLowerCase().includes(searchLower) ||
               member.email.toLowerCase().includes(searchLower);
      }
      
      // Apply department filter
      if (filterDepartment) {
        return language === 'zh' 
          ? member.department === filterDepartment
          : member.departmentEn === filterDepartment;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      let valueA, valueB;
      
      switch (sortField) {
        case 'name':
          valueA = language === 'zh' ? a.name : a.nameEn;
          valueB = language === 'zh' ? b.name : b.nameEn;
          break;
        case 'role':
          valueA = language === 'zh' ? a.role : a.roleEn;
          valueB = language === 'zh' ? b.role : b.roleEn;
          break;
        case 'department':
          valueA = language === 'zh' ? a.department : a.departmentEn;
          valueB = language === 'zh' ? b.department : b.departmentEn;
          break;
        case 'activeDeals':
          valueA = a.activeDeals;
          valueB = b.activeDeals;
          break;
        default:
          valueA = language === 'zh' ? a.name : a.nameEn;
          valueB = language === 'zh' ? b.name : b.nameEn;
      }
      
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '团队管理' : 'Team Management'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '管理和协调您的投资团队' : 'Manage and coordinate your investment team'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} className="mr-1.5" />
            {language === 'zh' ? '添加团队成员' : 'Add Team Member'}
          </button>
        </div>
      </div>
      
      {/* Team performance metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
        <div className="glass-card rounded-2xl shadow-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '团队规模' : 'Team Size'}
          </p>
          <p className="text-xl font-semibold text-primary-800">{teamMembers.length}</p>
          <p className="text-xs text-success-600 mt-1">
            {performanceData.teamGrowth} {language === 'zh' ? '年增长' : 'YoY'}
          </p>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '活跃项目' : 'Active Deals'}
          </p>
          <p className="text-xl font-semibold text-primary-800">{performanceData.activeDeals}</p>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '已完成项目' : 'Completed Deals'}
          </p>
          <p className="text-xl font-semibold text-primary-800">{performanceData.completedDeals}</p>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '总投资额' : 'Total Investment'}
          </p>
          <p className="text-xl font-semibold text-primary-800">{performanceData.totalInvestment}</p>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '平均决策周期' : 'Avg. Cycle Time'}
          </p>
          <p className="text-xl font-semibold text-primary-800">{performanceData.averageCycleTime}</p>
        </div>
        
        <div className="glass-card rounded-2xl shadow-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">
            {language === 'zh' ? '投资转化率' : 'Conversion Rate'}
          </p>
          <p className="text-xl font-semibold text-success-600">{performanceData.conversionRate}</p>
        </div>
      </div>
      
      {/* Department quick view */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '部门概览' : 'Department Overview'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-x divide-gray-100">
          {departments.map((dept, idx) => (
            <div 
              key={idx} 
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setFilterDepartment(language === 'zh' ? dept.name : dept.nameEn)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-2">
                  <Building size={20} />
                </div>
                <h3 className="font-medium text-primary-800">
                  {language === 'zh' ? dept.name : dept.nameEn}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {dept.members} {language === 'zh' ? '名成员' : 'members'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {language === 'zh' ? '负责人' : 'Lead'}: {dept.lead}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Team members list */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium text-primary-800">
            {language === 'zh' ? '团队成员' : 'Team Members'}
          </h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索成员...' : 'Search members...'}
                className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
              <Filter size={16} />
            </button>
          </div>
        </div>
        
        {/* Filter chips */}
        {filterDepartment && (
          <div className="p-2 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">
                {language === 'zh' ? '筛选条件：' : 'Filters:'}
              </span>
              <div className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs flex items-center">
                {filterDepartment}
                <button 
                  onClick={() => setFilterDepartment('')}
                  className="ml-1 text-primary-500 hover:text-primary-700"
                >
                  <XCircle size={12} />
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('name')}
                  >
                    {language === 'zh' ? '姓名' : 'Name'}
                    {sortField === 'name' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('role')}
                  >
                    {language === 'zh' ? '职位' : 'Role'}
                    {sortField === 'role' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('department')}
                  >
                    {language === 'zh' ? '部门' : 'Department'}
                    {sortField === 'department' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'zh' ? '联系方式' : 'Contact'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('activeDeals')}
                  >
                    {language === 'zh' ? '活跃项目' : 'Active Deals'}
                    {sortField === 'activeDeals' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'zh' ? '操作' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
                        {language === 'zh' 
                          ? member.name.charAt(0) 
                          : member.nameEn.charAt(0)
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {language === 'zh' ? member.name : member.nameEn}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {language === 'zh' ? member.role : member.roleEn}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {language === 'zh' ? member.department : member.departmentEn}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <Mail size={14} className="mr-1.5 text-gray-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1.5 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{member.activeDeals}</div>
                    <div className="text-xs text-gray-500">
                      {language === 'zh' ? '已完成: ' : 'Completed: '}{member.completedDeals}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900" title={language === 'zh' ? '查看详情' : 'View Details'}>
                        <UserCheck size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" title={language === 'zh' ? '发送消息' : 'Send Message'}>
                        <MessageSquare size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" title={language === 'zh' ? '编辑' : 'Edit'}>
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title={language === 'zh' ? '更多' : 'More'}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredMembers.length === 0 && (
            <div className="py-8 text-center">
              <Users size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">
                {language === 'zh' ? '未找到匹配的团队成员' : 'No matching team members found'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {language === 'zh' ? '尝试调整搜索条件' : 'Try adjusting your search criteria'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Team Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="glass-card rounded-2xl shadow-2xl w-full max-w-md animate-fade-in animate-slide-in">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">
                {language === 'zh' ? '添加团队成员' : 'Add Team Member'}
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
                    placeholder={language === 'zh' ? '输入姓名' : 'Enter name'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '职位' : 'Role'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入职位' : 'Enter role'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '部门' : 'Department'}
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">{language === 'zh' ? '选择部门' : 'Select department'}</option>
                    {departments.map((dept, idx) => (
                      <option key={idx} value={language === 'zh' ? dept.name : dept.nameEn}>
                        {language === 'zh' ? dept.name : dept.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '电子邮件' : 'Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入电子邮件' : 'Enter email'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '电话' : 'Phone'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={language === 'zh' ? '输入电话号码' : 'Enter phone number'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '权限级别' : 'Permission Level'}
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="member">{language === 'zh' ? '团队成员' : 'Team Member'}</option>
                    <option value="manager">{language === 'zh' ? '团队经理' : 'Team Manager'}</option>
                    <option value="admin">{language === 'zh' ? '管理员' : 'Administrator'}</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {language === 'zh' ? '取消' : 'Cancel'}
                </button>
                <button
                  onClick={() => setShowAddMemberModal(false)}
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

export default Team;