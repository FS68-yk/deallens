import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import DealLensLogo from './DealLensLogo';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BarChart, 
  Users, 
  Settings, 
  LogOut,
  Inbox,
  BrainCircuit,
  Globe,
  Database,
  TrendingUp,
  Building,
  MessageSquare,
  Mail,
  Search,
  Tag as TagsIcon,
  Network,
  Compass,
  UploadCloud
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Main navigation items
  const mainNavItems = [
    { id: 'dashboard', name: t('common.dashboard'), path: '/', icon: <LayoutDashboard size={20} /> },
    { id: 'dealflow', name: t('common.dealFlow'), path: '/dealflow', icon: <Briefcase size={20} /> },
    { id: 'projects', name: t('common.projects'), path: '/projects', icon: <Building size={20} /> },
  ];

  // Document related navigation
  const docNavItems = [
    { id: 'documents', name: t('common.documentRepository'), path: '/documents', icon: <FileText size={20} /> },
    { id: 'inbox', name: t('common.smartInbox'), path: '/inbox', icon: <Inbox size={20} /> },
    { id: 'email', name: t('common.emailCollection'), path: '/email', icon: <Mail size={20} /> },
    { id: 'upload', name: t('common.upload'), path: '/upload', icon: <UploadCloud size={20} /> },
  ];

  // Intelligence related navigation
  const intelligenceNavItems = [
    { id: 'intelligence', name: t('common.marketIntelligence'), path: '/intelligence', icon: <BrainCircuit size={20} /> },
    { id: 'research', name: t('common.companyResearch'), path: '/research', icon: <Search size={20} /> },
    { id: 'webdata', name: t('common.webData'), path: '/webdata', icon: <Globe size={20} /> },
    { id: 'pipeline', name: t('common.pipeline'), path: '/pipeline', icon: <Database size={20} /> },
  ];

  // Analytics related navigation
  const analyticsNavItems = [
    { id: 'analytics', name: t('common.insightsDashboard'), path: '/analytics', icon: <BarChart size={20} /> },
    { id: 'performance', name: t('common.performance'), path: '/performance', icon: <TrendingUp size={20} /> },
    { id: 'portfolio', name: t('common.portfolio'), path: '/portfolio', icon: <Briefcase size={20} /> },
    { id: 'comparison', name: t('common.comparisonMatrix'), path: '/comparison', icon: <Compass size={20} /> },
  ];

  // Team related navigation
  const teamNavItems = [
    { id: 'team', name: t('common.team'), path: '/team', icon: <Users size={20} /> },
    { id: 'collaboration', name: t('common.collaboration'), path: '/collaboration', icon: <MessageSquare size={20} /> },
    { id: 'network', name: t('common.network'), path: '/network', icon: <Network size={20} /> },
    { id: 'tags', name: t('common.tagsAndLabels'), path: '/tags', icon: <TagsIcon size={20} /> },
  ];

  // Function to render navigation section
  const renderNavSection = (title: string, items: any[]) => (
    <div className={`mt-3 ${collapsed ? '' : 'px-2'}`}>
      {!collapsed && (
        <h3 className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2 px-2">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className={`flex items-center py-2 ${collapsed ? 'justify-center px-0' : 'px-3 rounded-md'} ${
                isActive(item.path)
                  ? 'glass-card text-white shadow-lg border border-white/20'
                  : 'text-white/90 hover:bg-white/15 hover:text-white border border-transparent hover:border-white/10'
              } transition-all duration-300 ease-in-out`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3 text-sm whitespace-nowrap">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Clickable Logo */}
      <div className="flex items-center h-12 border-b border-primary-700 py-3">
        {onToggleCollapse ? (
          <button
            onClick={onToggleCollapse}
            className={`hidden md:flex items-center w-full transition-all duration-300 hover:bg-white/5 rounded-lg ${
              collapsed ? 'justify-center' : 'px-3 ml-0.5'
            }`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <div className="text-white">
                <DealLensLogo size="small" variant="monochrome" showText={false} />
              </div>
            ) : (
              <div className="flex items-center">
                <DealLensLogo size="small" variant="monochrome" showText={true} />
              </div>
            )}
          </button>
        ) : (
          <div className={collapsed ? "text-white flex justify-center w-full" : "flex items-center px-3 ml-0.5"}>
            <DealLensLogo size="small" variant="monochrome" showText={!collapsed} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {renderNavSection(collapsed ? '' : t('common.dashboard'), mainNavItems)}
        {renderNavSection(collapsed ? '' : t('common.documents'), docNavItems)}
        {renderNavSection(collapsed ? '' : t('common.intelligence'), intelligenceNavItems)}
        {renderNavSection(collapsed ? '' : t('common.analytics'), analyticsNavItems)}
        {renderNavSection(collapsed ? '' : t('common.team'), teamNavItems)}
      </div>

      {/* Bottom section */}
      <div className="p-2 border-t border-primary-700">
        <ul className="space-y-1">
          <li>
            <Link
              to="/settings"
              className={`flex items-center px-3 py-2 text-primary-100 hover:bg-primary-700/50 transition-colors duration-150 ease-in-out rounded-md ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <Settings size={20} />
              {!collapsed && <span className="ml-3">{t('common.settings')}</span>}
            </Link>
          </li>
          <li>
            <button
              className={`flex w-full items-center px-3 py-2 text-primary-100 hover:bg-primary-700/50 transition-colors duration-150 ease-in-out rounded-md ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-3">{t('common.logout')}</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;