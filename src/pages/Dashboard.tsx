import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  TrendingUp, 
  Star, 
  Clock, 
  BarChart3, 
  Users, 
  Target,
  Activity,
  ExternalLink
} from 'lucide-react';
import AIGlobalInsights from '../components/AIChat/AIGlobalInsights';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const Dashboard: React.FC = () => {
  const { projects } = useAppContext();
  const navigate = useNavigate();

  // 计算投资组合统计数据
  const portfolioStats = useMemo(() => {
    const now = new Date();
    const thisMonth = { start: startOfMonth(now), end: endOfMonth(now) };
    const last30Days = subDays(now, 30);
    
    // 本月新增项目
    const newThisMonth = projects.filter(p => 
      isWithinInterval(new Date(p.createdAt || p.updatedAt), thisMonth)
    );
    
    // 最近更新的项目
    const recentlyUpdated = projects.filter(p => 
      new Date(p.updatedAt) >= last30Days
    ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    // 重点关注项目（高估值或关键阶段）
    const keyProjects = projects.filter(p => 
      p.stage === 'Series A' || p.stage === 'Series B' || 
      (p.valuation && (p.valuation.includes('100M') || p.valuation.includes('50M')))
    );
    
    // 按阶段分组
    const stageDistribution = projects.reduce((acc, p) => {
      acc[p.stage] = (acc[p.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // 按行业分组
    const industryDistribution = projects.reduce((acc, p) => {
      acc[p.industry] = (acc[p.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: projects.length,
      newThisMonth: newThisMonth.length,
      recentlyUpdated: recentlyUpdated.slice(0, 5),
      keyProjects: keyProjects.slice(0, 6),
      stageDistribution,
      industryDistribution,
      activeDeals: projects.filter(p => ['Due Diligence', 'Term Sheet', 'Closing'].includes(p.stage)).length
    };
  }, [projects]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">投资管理仪表盘</h1>
        <div className="text-sm text-white/70">
          {format(new Date(), 'yyyy年MM月dd日')}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button 
          onClick={() => navigate('/projects')}
          className="glass-card rounded-xl p-3 sm:p-4 hover:glass-card-hover transition-all duration-300 text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs sm:text-sm">项目总数</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{portfolioStats.total}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-1 sm:mt-2 text-xs text-white/60 group-hover:text-white/80 transition-colors">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">查看所有项目</span>
            <span className="sm:hidden">查看</span>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/projects?filter=new')}
          className="glass-card rounded-xl p-3 sm:p-4 hover:glass-card-hover transition-all duration-300 text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs sm:text-sm">本月新增</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{portfolioStats.newThisMonth}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-1 sm:mt-2 text-xs text-white/60 group-hover:text-white/80 transition-colors">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">查看新增项目</span>
            <span className="sm:hidden">查看</span>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/dealflow')}
          className="glass-card rounded-xl p-3 sm:p-4 hover:glass-card-hover transition-all duration-300 text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs sm:text-sm">活跃交易</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{portfolioStats.activeDeals}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>
          </div>
          <div className="flex items-center mt-1 sm:mt-2 text-xs text-white/60 group-hover:text-white/80 transition-colors">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">查看交易流程</span>
            <span className="sm:hidden">查看</span>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/projects?filter=key')}
          className="glass-card rounded-xl p-3 sm:p-4 hover:glass-card-hover transition-all duration-300 text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs sm:text-sm">重点关注</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{portfolioStats.keyProjects.length}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-1 sm:mt-2 text-xs text-white/60 group-hover:text-white/80 transition-colors">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">查看重点项目</span>
            <span className="sm:hidden">查看</span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-2">
                  <Clock className="w-5 h-5 text-blue-300" />
                </div>
                最近更新项目
              </h2>
              <span className="text-xs text-white/60">过去30天</span>
            </div>
            <div className="space-y-3">
              {portfolioStats.recentlyUpdated.map((project) => (
                <button 
                  key={project.id} 
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="w-full flex items-center p-3 rounded-lg bg-white/8 hover:bg-white/15 transition-all duration-300 text-left group border border-white/10 hover:border-white/20 shadow-sm hover:shadow-md"
                >
                  {project.logo ? (
                    <img src={project.logo} alt={project.name} className="w-10 h-10 rounded-lg mr-3" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold mr-3">
                      {project.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">{project.name}</h3>
                    <p className="text-white/70 text-sm">{project.industry} • {project.stage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">{project.valuation}</p>
                    <p className="text-white/60 text-xs">{format(new Date(project.updatedAt), 'MM/dd')}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mr-2">
                  <Star className="w-5 h-5 text-purple-300" />
                </div>
                重点关注项目
              </h2>
              <span className="text-xs text-white/60">高估值 • 关键阶段</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioStats.keyProjects.map((project) => (
                <button 
                  key={project.id} 
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="p-4 rounded-lg bg-white/8 hover:bg-white/15 transition-all duration-300 border border-white/15 hover:border-white/25 text-left group w-full shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    {project.logo ? (
                      <img src={project.logo} alt={project.name} className="w-8 h-8 rounded-md mr-3" />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center text-white text-sm font-bold mr-3">
                        {project.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">{project.name}</h3>
                      <p className="text-white/70 text-xs">{project.industry}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                      {project.stage}
                    </span>
                    <span className="text-white/80 text-sm font-medium">{project.valuation}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Stage Distribution */}
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <button 
              onClick={() => navigate('/portfolio')}
              className="w-full text-left group mb-4"
            >
              <h2 className="text-lg font-semibold text-white flex items-center group-hover:text-blue-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-2">
                  <BarChart3 className="w-5 h-5 text-green-300" />
                </div>
                投资阶段分布
                <ExternalLink className="w-4 h-4 ml-auto text-white/40 group-hover:text-white/70 transition-colors" />
              </h2>
            </button>
            <div className="space-y-3">
              {Object.entries(portfolioStats.stageDistribution).map(([stage, count]) => (
                <button 
                  key={stage} 
                  onClick={() => navigate(`/dealflow?stage=${encodeURIComponent(stage)}`)}
                  className="w-full flex justify-between items-center hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300 group border border-transparent hover:border-white/20"
                >
                  <span className="text-white/80 text-sm group-hover:text-white transition-colors">{stage}</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-white/20 rounded-full mr-2">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        style={{ width: `${(count / portfolioStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-medium text-sm w-6">{count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Industry Distribution */}
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <button 
              onClick={() => navigate('/market-intelligence')}
              className="w-full text-left group mb-4"
            >
              <h2 className="text-lg font-semibold text-white flex items-center group-hover:text-blue-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center mr-2">
                  <Users className="w-5 h-5 text-orange-300" />
                </div>
                行业分布
                <ExternalLink className="w-4 h-4 ml-auto text-white/40 group-hover:text-white/70 transition-colors" />
              </h2>
            </button>
            <div className="space-y-3">
              {Object.entries(portfolioStats.industryDistribution).slice(0, 5).map(([industry, count]) => (
                <button 
                  key={industry} 
                  onClick={() => navigate(`/projects?industry=${encodeURIComponent(industry)}`)}
                  className="w-full flex justify-between items-center hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300 group border border-transparent hover:border-white/20"
                >
                  <span className="text-white/80 text-sm group-hover:text-white transition-colors">{industry}</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-white/20 rounded-full mr-2">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        style={{ width: `${(count / portfolioStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-medium text-sm w-6">{count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <AIGlobalInsights />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;