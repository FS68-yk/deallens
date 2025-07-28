import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Bell, Upload, Plus, Settings, User, LogOut, CheckCircle, MessageSquare } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import DealLensLogo from './DealLensLogo';

interface NavbarProps {
  isMobile?: boolean;
  toggleMobileMenu?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile = false, toggleMobileMenu }) => {
  const { searchTerm, setSearchTerm, projects } = useAppContext();
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['AI startup', 'fintech', 'healthcare']);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Search filtering logic
  const filteredProjects = React.useMemo(() => {
    if (!searchTerm.trim()) return [];
    return projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 5); // Limit to 5 results
  }, [projects, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [searchTerm, ...prev.filter(item => item !== searchTerm)].slice(0, 5);
        return newHistory;
      });
      // Navigate to search results or DealFlow with filter
      navigate(`/dealflow?search=${encodeURIComponent(searchTerm)}`);
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchTerm.length > 0 || searchHistory.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const handleHistoryClick = (historyItem: string) => {
    setSearchTerm(historyItem);
    navigate(`/dealflow?search=${encodeURIComponent(historyItem)}`);
    setShowSearchResults(false);
  };

  const navigateToUpload = useCallback(() => {
    navigate('/upload');
  }, [navigate]);

  // Mock notifications data
  const notificationsList = [
    {
      id: 'notif-1',
      title: language === 'zh' ? 'NeuralFinance添加了新文档' : 'New document added to NeuralFinance',
      time: language === 'zh' ? '10分钟前' : '10 minutes ago',
      read: false,
      type: 'document'
    },
    {
      id: 'notif-2',
      title: language === 'zh' ? 'MedVR项目状态已更新' : 'MedVR project status updated',
      time: language === 'zh' ? '2小时前' : '2 hours ago',
      read: false,
      type: 'update'
    },
    {
      id: 'notif-3',
      title: language === 'zh' ? 'QuantumSecure投资委员会会议明天举行' : 'QuantumSecure investment committee meeting tomorrow',
      time: language === 'zh' ? '1天前' : '1 day ago',
      read: false,
      type: 'meeting'
    },
    {
      id: 'notif-4',
      title: language === 'zh' ? 'GreenChain发送了新的融资材料' : 'GreenChain sent new funding materials',
      time: language === 'zh' ? '3天前' : '3 days ago',
      read: true,
      type: 'document'
    }
  ];
  
  // Mock user profile data
  const userProfile = {
    name: language === 'zh' ? '张经理' : 'John Doe',
    role: language === 'zh' ? '投资总监' : 'Investment Director',
    email: 'john@deallens.ai',
    avatar: 'JD' // initials
  };

  const markAllAsRead = () => {
    // Mark all notifications as read
    setNotifications(0);
  };

  // Handle the creation of a new project
  const handleNewProject = () => {
    // Logic to create a new project would go here
    setShowNewProjectModal(false);
  };
  
  const closeMenusOnOutsideClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-dropdown]') && !target.closest('[data-search-dropdown]')) {
      setShowNotifications(false);
      setShowUserMenu(false);
      setShowSearchResults(false);
    }
  }, []);

  // Add event listener for outside clicks
  React.useEffect(() => {
    if (showNotifications || showUserMenu || showSearchResults) {
      document.addEventListener('click', closeMenusOnOutsideClick);
    }
    
    return () => {
      document.removeEventListener('click', closeMenusOnOutsideClick);
    };
  }, [showNotifications, showUserMenu, showSearchResults, closeMenusOnOutsideClick]);

  return (
    <header className="glass-navbar z-30 w-full sticky top-0 shadow-lg">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3">
        {/* Logo/Brand for mobile */}
        {isMobile && (
          <div className="flex items-center ml-10">
            <DealLensLogo size="small" variant="default" showText={true} />
          </div>
        )}
        
        {/* Search - hide on small mobile, show as icon only on medium mobile */}
        <div className={`${isMobile ? 'hidden sm:block flex-grow max-w-xs mx-auto' : 'flex-1 max-w-2xl'} relative`} data-search-dropdown>
          <form onSubmit={handleSearch} className="relative">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 z-10"
            />
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索项目、公司、创始人...' : 'Search projects, companies, founders...'}
              className="w-full glass pl-9 pr-4 py-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onFocus={handleSearchFocus}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            />
          </form>
          
          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl shadow-2xl border border-white/20 max-h-96 overflow-y-auto z-50">
              {/* Search Results */}
              {filteredProjects.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-medium text-white/70 mb-2 px-2">
                    {language === 'zh' ? '项目' : 'Projects'}
                  </div>
                  {filteredProjects.map(project => (
                    <div
                      key={project.id}
                      className="flex items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      {project.logo ? (
                        <img 
                          src={project.logo} 
                          alt={`${project.name} logo`} 
                          className="w-8 h-8 object-cover rounded-md mr-3 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                          {project.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{project.name}</div>
                        <div className="text-xs text-white/70 truncate">{project.industry}</div>
                      </div>
                      <div className="text-xs text-white/60 ml-2">{project.stage}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Search History */}
              {searchTerm.length === 0 && searchHistory.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <div className="text-xs font-medium text-white/70 mb-2 px-2">
                    {language === 'zh' ? '最近搜索' : 'Recent Searches'}
                  </div>
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleHistoryClick(item)}
                    >
                      <Search size={14} className="text-white/60 mr-3" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results */}
              {searchTerm.length > 0 && filteredProjects.length === 0 && (
                <div className="p-4 text-center text-white/60 text-sm">
                  {language === 'zh' ? '未找到相关项目' : 'No projects found'}
                </div>
              )}
              
              {/* Search All Results Link */}
              {searchTerm.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <button
                    onClick={handleSearch}
                    className="w-full text-left p-2 hover:bg-white/10 rounded-lg transition-colors text-sm text-white/80"
                  >
                    {language === 'zh' ? `搜索所有 "${searchTerm}" 相关结果` : `Search all "${searchTerm}" results`}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          {/* Language toggle - hide on small screens */}
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          
          {/* Upload button - show icon only on mobile */}
          <button
            onClick={navigateToUpload}
            className={`
              glass hover:glass-card text-white rounded-xl transition-all duration-300 shadow-lg border border-white/20 hover:border-white/30
              ${isMobile ? 'p-2 sm:p-2.5' : 'inline-flex items-center px-4 py-2.5 text-sm font-medium'}
            `}
            aria-label={t('common.upload')}
          >
            <Upload size={isMobile ? 16 : 16} className={isMobile ? '' : 'mr-2'} />
            {!isMobile && t('common.upload')}
          </button>

          {/* New Deal button - hide on very small screens */}
          <button
            onClick={() => setShowNewProjectModal(true)}
            className={`
              glass hover:glass-card text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg border border-white/20 hover:border-white/30
              ${isMobile ? 'hidden sm:inline-flex p-2 sm:p-2.5' : 'inline-flex items-center px-4 py-2.5'}
            `}
          >
            <Plus size={isMobile ? 16 : 16} className={isMobile && !isMobile ? '' : 'mr-1.5'} />
            {(!isMobile || (isMobile && window.innerWidth > 380)) && t('common.newDeal')}
          </button>

          {/* Notifications */}
          <div className="relative" data-dropdown="notifications">
            <button
              className="p-2 rounded-full glass hover:glass-card transition-all duration-300 text-white border border-white/20 hover:border-white/30"
              aria-label="Notifications"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
            >
              <Bell size={18} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-xs text-white">
                  {notifications}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className={`
                absolute mt-2 glass-card rounded-2xl shadow-2xl z-10 animate-fade-in
                ${isMobile ? 'right-0 w-[calc(100vw-24px)] max-w-sm' : 'right-0 w-80'}
              `}>
                <div className="p-4 border-b border-white/20 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white">
                    {language === 'zh' ? '通知' : 'Notifications'}
                  </h3>
                  {notifications > 0 && (
                    <button 
                      className="text-xs text-white/80 hover:text-white transition-colors duration-200"
                      onClick={markAllAsRead}
                    >
                      {language === 'zh' ? '标记全部已读' : 'Mark all as read'}
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {notificationsList.length === 0 ? (
                    <div className="p-4 text-center text-white/70 text-sm">
                      {language === 'zh' ? '没有新通知' : 'No new notifications'}
                    </div>
                  ) : (
                    notificationsList.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-200 ${notification.read ? 'opacity-75' : ''}`}
                        onClick={() => {
                          // Mark as read and handle notification click
                          if (!notification.read) {
                            setNotifications(prev => Math.max(0, prev - 1));
                          }
                        }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5 mr-3">
                            {notification.type === 'document' ? (
                              <div className="bg-blue-500/20 p-1.5 rounded-full">
                                <CheckCircle size={16} className="text-blue-300" />
                              </div>
                            ) : notification.type === 'update' ? (
                              <div className="bg-green-500/20 p-1.5 rounded-full">
                                <MessageSquare size={16} className="text-green-300" />
                              </div>
                            ) : (
                              <div className="bg-yellow-500/20 p-1.5 rounded-full">
                                <Bell size={16} className="text-yellow-300" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white">{notification.title}</p>
                            <p className="text-xs text-white/60 mt-0.5">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="ml-2 mt-1 flex-shrink-0">
                              <span className="w-2 h-2 bg-white rounded-full block"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-white/20 text-center">
                  <button className="text-xs text-white/80 hover:text-white transition-colors duration-200">
                    {language === 'zh' ? '查看所有通知' : 'View all notifications'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" data-dropdown="userMenu">
            <button 
              className="h-9 w-9 rounded-full glass hover:glass-card text-white flex items-center justify-center font-medium transition-all duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
            >
              {userProfile.avatar}
            </button>
            
            {showUserMenu && (
              <div className={`
                absolute mt-2 glass-card rounded-2xl shadow-2xl z-10 animate-fade-in
                ${isMobile ? 'right-0 w-[calc(100vw-24px)] max-w-sm' : 'right-0 w-64'}
              `}>
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full glass text-white flex items-center justify-center font-medium mr-3">
                      {userProfile.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{userProfile.name}</h3>
                      <p className="text-xs text-white/70">{userProfile.email}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button 
                    className="px-4 py-3 text-sm text-white hover:bg-white/10 w-full text-left flex items-center transition-all duration-200 rounded-lg mx-2"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings size={16} className="mr-3 text-white/70" />
                    {language === 'zh' ? '设置' : 'Settings'}
                  </button>
                  <button 
                    className="px-4 py-3 text-sm text-white hover:bg-white/10 w-full text-left flex items-center transition-all duration-200 rounded-lg mx-2"
                  >
                    <User size={16} className="mr-3 text-white/70" />
                    {language === 'zh' ? '个人资料' : 'Profile'}
                  </button>
                  <button 
                    className="px-4 py-3 text-sm text-white hover:bg-white/10 w-full text-left flex items-center transition-all duration-200 rounded-lg mx-2"
                  >
                    <LogOut size={16} className="mr-3 text-white/70" />
                    {language === 'zh' ? '退出登录' : 'Logout'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl animate-slide-in">
            <h2 className="text-xl font-bold text-primary-800 p-4 border-b border-gray-200">
              {language === 'zh' ? '创建新项目' : 'Create New Project'}
            </h2>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '项目名称' : 'Project Name'}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={language === 'zh' ? '输入项目名称' : 'Enter project name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '行业' : 'Industry'}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">{language === 'zh' ? '选择行业' : 'Select industry'}</option>
                  <option value="Fintech">{language === 'zh' ? '金融科技' : 'Fintech'}</option>
                  <option value="HealthTech">{language === 'zh' ? '医疗科技' : 'HealthTech'}</option>
                  <option value="CleanTech">{language === 'zh' ? '清洁技术' : 'CleanTech'}</option>
                  <option value="Cybersecurity">{language === 'zh' ? '网络安全' : 'Cybersecurity'}</option>
                  <option value="AgTech">{language === 'zh' ? '农业科技' : 'AgTech'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '阶段' : 'Stage'}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">{language === 'zh' ? '选择阶段' : 'Select stage'}</option>
                  <option value="Seed">{language === 'zh' ? '种子轮' : 'Seed'}</option>
                  <option value="Series A">{language === 'zh' ? 'A轮' : 'Series A'}</option>
                  <option value="Series B">{language === 'zh' ? 'B轮' : 'Series B'}</option>
                  <option value="Series C">{language === 'zh' ? 'C轮' : 'Series C'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '估值' : 'Valuation'}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">{language === 'zh' ? '选择估值范围' : 'Select valuation range'}</option>
                  <option value="$1-5M">{language === 'zh' ? '¥1-5M' : '$1-5M'}</option>
                  <option value="$5-10M">{language === 'zh' ? '¥5-10M' : '$5-10M'}</option>
                  <option value="$10-25M">{language === 'zh' ? '¥10-25M' : '$10-25M'}</option>
                  <option value="$25-50M">{language === 'zh' ? '¥25-50M' : '$25-50M'}</option>
                  <option value="$50-100M">{language === 'zh' ? '¥50-100M' : '$50-100M'}</option>
                  <option value="$100-250M">{language === 'zh' ? '¥100-250M' : '$100-250M'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '简要描述' : 'Brief Description'}
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder={language === 'zh' ? '项目简介...' : 'Project description...'}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleNewProject}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {language === 'zh' ? '创建项目' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Memoize the Navbar to prevent unnecessary re-renders
export default memo(Navbar);