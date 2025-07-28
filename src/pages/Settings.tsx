import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Lock, Database, Globe, 
  Zap, Share2, Users, Trash2, HelpCircle, Save, ChevronRight,
  CheckCircle, X, BarChart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notification, setNotification] = useState<{ show: boolean, message: string, type: 'success' | 'error' } | null>(null);
  const { t, language } = useLanguage();
  
  const handleSave = () => {
    setNotification({
      show: true,
      message: language === 'zh' ? '设置已成功保存' : 'Settings saved successfully',
      type: 'success'
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Profile form state
  const [profile, setProfile] = useState({
    name: language === 'zh' ? '张经理' : 'John Manager',
    email: 'manager@deallens.com',
    role: language === 'zh' ? '投资总监' : 'Investment Director',
    phone: '+86 123 4567 8910',
    language: language === 'zh' ? 'zh_CN' : 'en_US'
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newProjectAlert: true,
    documentUpdates: true,
    weeklyReport: true,
    marketUpdates: false
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30'
  });
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('settings.personalInfo')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.name')}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.email')}
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.role')}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.phone')}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('settings.preferences')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('common.language')}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={profile.language}
                    onChange={(e) => setProfile({...profile, language: e.target.value})}
                  >
                    <option value="zh_CN">{t('common.chinese')}</option>
                    <option value="en_US">{t('common.english')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.timezone')}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Asia/Shanghai">(GMT+08:00) {language === 'zh' ? '北京，上海' : 'Beijing, Shanghai'}</option>
                    <option value="America/New_York">(GMT-05:00) {language === 'zh' ? '纽约' : 'New York'}</option>
                    <option value="Europe/London">(GMT+00:00) {language === 'zh' ? '伦敦' : 'London'}</option>
                    <option value="Asia/Tokyo">(GMT+09:00) {language === 'zh' ? '东京' : 'Tokyo'}</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('settings.defaultDashboard')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <Zap size={24} className="text-primary-600" />
                      </div>
                    </div>
                    <h3 className="font-medium text-center text-primary-800">{t('settings.projectOverview')}</h3>
                  </div>
                  <div className="border border-primary-300 bg-primary-50 rounded-lg p-4 cursor-pointer transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                        <BarChart size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="font-medium text-center text-primary-800">{t('settings.investmentAnalysis')}</h3>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <Database size={24} className="text-primary-600" />
                      </div>
                    </div>
                    <h3 className="font-medium text-center text-primary-800">{t('settings.projectPipeline')}</h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                onClick={handleSave}
              >
                <Save size={16} className="inline-block mr-2" />
                {t('common.save')}
              </button>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('settings.notificationSettings')}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">{t('settings.enableEmailNotifications')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('settings.receiveAllNotifications')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notificationSettings.emailNotifications}
                    onChange={() => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: !notificationSettings.emailNotifications
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">{t('settings.projectNotifications')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{t('settings.newProjectAlerts')}</h4>
                      <p className="text-xs text-gray-500">{t('settings.notifyNewProjects')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.newProjectAlert}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          newProjectAlert: !notificationSettings.newProjectAlert
                        })}
                      />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{t('settings.documentUpdates')}</h4>
                      <p className="text-xs text-gray-500">{t('settings.notifyDocumentUpdates')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.documentUpdates}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          documentUpdates: !notificationSettings.documentUpdates
                        })}
                      />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">{t('settings.reportsAndMarketUpdates')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{t('settings.weeklyReports')}</h4>
                      <p className="text-xs text-gray-500">{t('settings.receiveWeeklyOverview')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.weeklyReport}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          weeklyReport: !notificationSettings.weeklyReport
                        })}
                      />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{t('settings.marketUpdates')}</h4>
                      <p className="text-xs text-gray-500">{t('settings.receiveMarketUpdates')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.marketUpdates}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          marketUpdates: !notificationSettings.marketUpdates
                        })}
                      />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                onClick={handleSave}
              >
                <Save size={16} className="inline-block mr-2" />
                {t('common.save')}
              </button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('settings.securitySettings')}</h2>
            
            <div className="space-y-6 mb-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">{t('settings.accountSecurity')}</h3>
                
                <div className="space-y-4">
                  <div>
                    <button className="w-full flex items-center justify-between text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">{t('settings.changePassword')}</h4>
                        <p className="text-xs text-gray-500">{t('settings.lastUpdated3MonthsAgo')}</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{t('settings.twoFactorAuth')}</h4>
                      <p className="text-xs text-gray-500">{t('settings.enhanceAccountSecurity')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={securitySettings.twoFactorAuth}
                        onChange={() => setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: !securitySettings.twoFactorAuth
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{t('settings.loginAlerts')}</h4>
                      <p className="text-xs text-gray-500">{t('settings.notifyNewDeviceLogin')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={securitySettings.loginAlerts}
                        onChange={() => setSecuritySettings({
                          ...securitySettings,
                          loginAlerts: !securitySettings.loginAlerts
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">{t('settings.sessionSettings')}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.sessionTimeout')}
                  </label>
                  <select
                    className="w-full md:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: e.target.value
                    })}
                  >
                    <option value="15">15 {t('settings.minutes')}</option>
                    <option value="30">30 {t('settings.minutes')}</option>
                    <option value="60">60 {t('settings.minutes')}</option>
                    <option value="120">120 {t('settings.minutes')}</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('settings.autoLogoutTime')}
                  </p>
                </div>
                
                <div className="mt-4">
                  <button className="px-3 py-1 text-sm text-primary-600 hover:text-primary-800 border border-primary-600 hover:border-primary-800 rounded transition-colors">
                    {t('settings.logoutAllDevices')}
                  </button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800">{t('settings.recentDeviceActivity')}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-3">
                  {t('settings.recentLoginDevices')}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <User size={16} className="text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Mac - Chrome</div>
                        <div className="text-xs text-gray-500">{language === 'zh' ? '上海, 中国 • 现在' : 'Shanghai, China • Now'}</div>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {t('settings.currentDevice')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">iPhone - Safari</div>
                        <div className="text-xs text-gray-500">{language === 'zh' ? '上海, 中国 • 1天前' : 'Shanghai, China • 1 day ago'}</div>
                      </div>
                    </div>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      {t('settings.logout')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                onClick={handleSave}
              >
                <Save size={16} className="inline-block mr-2" />
                {t('common.save')}
              </button>
            </div>
          </div>
        );
        
      default:
        return (
          <div>
            <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('common.settings')}</h2>
            <p>{t('settings.selectCategory')}</p>
          </div>
        );
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-800">{t('common.settings')}</h1>
      </div>
      
      {notification && (
        <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
          notification.type === 'success' ? 'bg-success-50 text-success-800' : 'bg-error-50 text-error-800'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircle size={18} className="text-success-600 mr-2" />
            ) : (
              <X size={18} className="text-error-600 mr-2" />
            )}
            {notification.message}
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 左侧导航 */}
        <div className="md:col-span-1">
          <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">{t('common.settings')}</h2>
            </div>
            <div className="p-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  activeTab === 'profile' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={16} className="mr-3" />
                {t('settings.profile')}
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  activeTab === 'notifications' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell size={16} className="mr-3" />
                {t('settings.notifications')}
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  activeTab === 'security' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Lock size={16} className="mr-3" />
                {t('settings.security')}
              </button>
              <button 
                className="w-full flex items-center text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Database size={16} className="mr-3" />
                {t('settings.dataPrivacy')}
              </button>
              <button 
                className="w-full flex items-center text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Globe size={16} className="mr-3" />
                {t('settings.languageRegion')}
              </button>
              <button 
                className="w-full flex items-center text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Share2 size={16} className="mr-3" />
                {t('settings.sharingIntegration')}
              </button>
              <button 
                className="w-full flex items-center text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Users size={16} className="mr-3" />
                {t('common.team')}
              </button>
              <button 
                className="w-full flex items-center text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Zap size={16} className="mr-3" />
                {t('settings.performance')}
              </button>
            </div>
            
            <div className="p-4 border-t border-gray-100 mt-4">
              <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <HelpCircle size={16} className="mr-3" />
                {t('settings.helpAndSupport')}
              </button>
              <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-error-600 hover:bg-error-50">
                <Trash2 size={16} className="mr-3" />
                {t('settings.deleteAccount')}
              </button>
            </div>
          </div>
        </div>
        
        {/* 右侧内容 */}
        <div className="md:col-span-3">
          <div className="glass-card rounded-2xl shadow-2xl p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;