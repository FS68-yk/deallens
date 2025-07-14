import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Plus, 
  Clock,
  Search,
  MoreHorizontal,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Clock8
} from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

// Mock discussion data
const discussions = [
  {
    id: 'disc-1',
    title: 'NeuralFinance投资尽调讨论',
    titleEn: 'NeuralFinance Investment Due Diligence Discussion',
    project: 'NeuralFinance',
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    participants: ['张经理', '李分析师', '陈法务'],
    messages: 28,
    unread: 3,
    status: 'active'
  },
  {
    id: 'disc-2',
    title: 'GreenChain估值模型讨论',
    titleEn: 'GreenChain Valuation Model Discussion',
    project: 'GreenChain',
    lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    participants: ['刘合伙人', '李分析师', '王助理'],
    messages: 42,
    unread: 0,
    status: 'active'
  },
  {
    id: 'disc-3',
    title: 'MedVR产品演示后续',
    titleEn: 'MedVR Product Demo Follow-up',
    project: 'MedVR',
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    participants: ['张经理', '赵研究员'],
    messages: 15,
    unread: 0,
    status: 'active'
  },
  {
    id: 'disc-4',
    title: 'QuantumSecure技术评估',
    titleEn: 'QuantumSecure Technical Evaluation',
    project: 'QuantumSecure',
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    participants: ['李分析师', '陈法务', '技术顾问'],
    messages: 36,
    unread: 0,
    status: 'archived'
  }
];

// Mock task data
const tasks = [
  {
    id: 'task-1',
    title: 'NeuralFinance财务模型审核',
    titleEn: 'Review NeuralFinance Financial Model',
    project: 'NeuralFinance',
    assignee: '李分析师',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: 'task-2',
    title: 'GreenChain法律文件准备',
    titleEn: 'Prepare GreenChain Legal Documents',
    project: 'GreenChain',
    assignee: '陈法务',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'task-3',
    title: 'MedVR竞品分析报告',
    titleEn: 'Complete MedVR Competitive Analysis',
    project: 'MedVR',
    assignee: '赵研究员',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: 'task-4',
    title: 'AgriSense创始人背景调查',
    titleEn: 'AgriSense Founder Background Check',
    project: 'AgriSense',
    assignee: '王助理',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'overdue',
    priority: 'medium'
  },
  {
    id: 'task-5',
    title: 'QuantumSecure投资备忘录定稿',
    titleEn: 'Finalize QuantumSecure Investment Memo',
    project: 'QuantumSecure',
    assignee: '张经理',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    priority: 'medium'
  }
];

// Mock upcoming meetings
const meetings = [
  {
    id: 'meet-1',
    title: 'NeuralFinance投资委员会会议',
    titleEn: 'NeuralFinance Investment Committee Meeting',
    project: 'NeuralFinance',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    time: '10:00-11:30',
    participants: ['张经理', '李分析师', '刘合伙人', '投资委员会成员'],
    location: '会议室A / Zoom',
    status: 'scheduled'
  },
  {
    id: 'meet-2',
    title: 'GreenChain创始人访谈',
    titleEn: 'GreenChain Founder Interview',
    project: 'GreenChain',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    time: '15:00-16:00',
    participants: ['张经理', '李分析师'],
    location: 'Zoom',
    status: 'scheduled'
  },
  {
    id: 'meet-3',
    title: 'MedVR产品演示会议',
    titleEn: 'MedVR Product Demo Session',
    project: 'MedVR',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    time: '11:00-12:30',
    participants: ['张经理', '赵研究员', '技术顾问'],
    location: '会议室B / Zoom',
    status: 'scheduled'
  }
];

const Collaboration: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter discussions based on search term
  const filteredDiscussions = discussions.filter(disc => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const title = language === 'zh' ? disc.title : disc.titleEn;
    return title.toLowerCase().includes(searchLower) || 
          disc.project.toLowerCase().includes(searchLower);
  });
  
  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const title = language === 'zh' ? task.title : task.titleEn;
    return title.toLowerCase().includes(searchLower) || 
          task.project.toLowerCase().includes(searchLower) ||
          task.assignee.toLowerCase().includes(searchLower);
  });
  
  // Filter meetings based on search term
  const filteredMeetings = meetings.filter(meet => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const title = language === 'zh' ? meet.title : meet.titleEn;
    return title.toLowerCase().includes(searchLower) || 
          meet.project.toLowerCase().includes(searchLower);
  });
  
  // Get task status element
  const getTaskStatusElement = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="flex items-center text-success-600 text-xs"><CheckCircle size={12} className="mr-1" />{language === 'zh' ? '已完成' : 'Completed'}</span>;
      case 'in_progress':
        return <span className="flex items-center text-primary-600 text-xs"><RefreshCw size={12} className="mr-1" />{language === 'zh' ? '进行中' : 'In Progress'}</span>;
      case 'pending':
        return <span className="flex items-center text-gray-500 text-xs"><Clock8 size={12} className="mr-1" />{language === 'zh' ? '待处理' : 'Pending'}</span>;
      case 'overdue':
        return <span className="flex items-center text-error-600 text-xs"><AlertCircle size={12} className="mr-1" />{language === 'zh' ? '已逾期' : 'Overdue'}</span>;
      default:
        return <span className="text-gray-500 text-xs">{status}</span>;
    }
  };
  
  // Get task priority element
  const getTaskPriorityElement = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-0.5 bg-error-100 text-error-800 rounded-full text-xs">{language === 'zh' ? '高' : 'High'}</span>;
      case 'medium':
        return <span className="px-2 py-0.5 bg-warning-100 text-warning-800 rounded-full text-xs">{language === 'zh' ? '中' : 'Medium'}</span>;
      case 'low':
        return <span className="px-2 py-0.5 bg-success-100 text-success-800 rounded-full text-xs">{language === 'zh' ? '低' : 'Low'}</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">{priority}</span>;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">
            {language === 'zh' ? '协作中心' : 'Collaboration Center'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh' ? '团队讨论、任务和会议管理' : 'Team discussions, tasks and meeting management'}
          </p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'zh' ? '搜索协作内容...' : 'Search collaborations...'}
            className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'discussions'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                {language === 'zh' ? '讨论' : 'Discussions'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'tasks'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <CheckSquare size={16} className="mr-2" />
                {language === 'zh' ? '任务' : 'Tasks'}
                <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-1.5 py-0.5 rounded-full">
                  {tasks.filter(t => t.status === 'overdue').length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'meetings'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {language === 'zh' ? '会议' : 'Meetings'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'documents'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <FileText size={16} className="mr-2" />
                {language === 'zh' ? '共享文档' : 'Shared Documents'}
              </div>
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-4">
          {/* Discussions Tab */}
          {activeTab === 'discussions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-primary-800">
                  {language === 'zh' ? '团队讨论' : 'Team Discussions'}
                </h2>
                <button className="flex items-center text-sm text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-md">
                  <Plus size={14} className="mr-1.5" />
                  {language === 'zh' ? '新建讨论' : 'New Discussion'}
                </button>
              </div>
              
              {filteredDiscussions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">{language === 'zh' ? '没有找到讨论' : 'No discussions found'}</p>
                  <p className="text-sm text-gray-400 mt-1">{language === 'zh' ? '尝试使用其他搜索条件' : 'Try a different search term'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDiscussions.map((discussion) => (
                    <div 
                      key={discussion.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-primary-800">
                              {language === 'zh' ? discussion.title : discussion.titleEn}
                            </h3>
                            {discussion.unread > 0 && (
                              <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-1.5 py-0.5 rounded-full">
                                {discussion.unread} {language === 'zh' ? '未读' : 'new'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-primary-600 mt-1">{discussion.project}</p>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm text-gray-500 flex items-center mr-3">
                            <MessageSquare size={14} className="mr-1" />
                            {discussion.messages}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock size={14} className="mr-1" />
                            {format(new Date(discussion.lastActivity), 'MM/dd HH:mm')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {discussion.participants.slice(0, 3).map((participant, idx) => (
                            <div 
                              key={idx} 
                              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700"
                              title={participant}
                            >
                              {participant.charAt(0)}
                            </div>
                          ))}
                          {discussion.participants.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                              +{discussion.participants.length - 3}
                            </div>
                          )}
                        </div>
                        <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
                          {language === 'zh' ? '查看讨论' : 'View Discussion'}
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-primary-800">
                  {language === 'zh' ? '团队任务' : 'Team Tasks'}
                </h2>
                <button className="flex items-center text-sm text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-md">
                  <Plus size={14} className="mr-1.5" />
                  {language === 'zh' ? '添加任务' : 'Add Task'}
                </button>
              </div>
              
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <CheckSquare size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">{language === 'zh' ? '没有找到任务' : 'No tasks found'}</p>
                  <p className="text-sm text-gray-400 mt-1">{language === 'zh' ? '尝试使用其他搜索条件' : 'Try a different search term'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`border rounded-lg p-4 transition-all cursor-pointer ${
                        task.status === 'completed' ? 'border-gray-200 bg-gray-50' : 
                        task.status === 'overdue' ? 'border-error-200 bg-error-50' :
                        'border-gray-200 hover:border-primary-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className={`font-medium ${
                              task.status === 'completed' ? 'text-gray-500 line-through' : 'text-primary-800'
                            }`}>
                              {language === 'zh' ? task.title : task.titleEn}
                            </h3>
                            <div className="ml-2">
                              {getTaskPriorityElement(task.priority)}
                            </div>
                          </div>
                          <p className="text-sm text-primary-600 mt-1">{task.project}</p>
                        </div>
                        <div>
                          {getTaskStatusElement(task.status)}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium mr-2">
                            {task.assignee.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-600">{task.assignee}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="text-sm text-gray-500 mr-3 flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span className={task.status === 'overdue' ? 'text-error-600' : ''}>
                              {format(new Date(task.dueDate), 'MM/dd')}
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Meetings Tab */}
          {activeTab === 'meetings' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-primary-800">
                  {language === 'zh' ? '即将进行的会议' : 'Upcoming Meetings'}
                </h2>
                <button className="flex items-center text-sm text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-md">
                  <Plus size={14} className="mr-1.5" />
                  {language === 'zh' ? '安排会议' : 'Schedule Meeting'}
                </button>
              </div>
              
              {filteredMeetings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">{language === 'zh' ? '没有找到会议' : 'No meetings found'}</p>
                  <p className="text-sm text-gray-400 mt-1">{language === 'zh' ? '尝试使用其他搜索条件' : 'Try a different search term'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMeetings.map((meeting) => (
                    <div 
                      key={meeting.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className="mr-4 flex-shrink-0 mt-1">
                          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-xs font-medium">
                              {format(new Date(meeting.date), 'MMM')}
                            </div>
                            <div className="text-lg font-bold leading-none">
                              {format(new Date(meeting.date), 'dd')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-primary-800">
                              {language === 'zh' ? meeting.title : meeting.titleEn}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {meeting.time}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-primary-600 mr-3">
                              {meeting.project}
                            </span>
                            <span className="text-sm text-gray-500">
                              {meeting.location}
                            </span>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {meeting.participants.slice(0, 3).map((participant, idx) => (
                                <div 
                                  key={idx} 
                                  className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700"
                                  title={participant}
                                >
                                  {participant.charAt(0)}
                                </div>
                              ))}
                              {meeting.participants.length > 3 && (
                                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                                  +{meeting.participants.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-sm text-primary-600 hover:text-primary-800 px-2 py-1 rounded hover:bg-primary-50">
                                {language === 'zh' ? '查看详情' : 'View Details'}
                              </button>
                              <button className="text-sm text-success-600 hover:text-success-800 px-2 py-1 rounded hover:bg-success-50">
                                {language === 'zh' ? '加入' : 'Join'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-primary-800">
                  {language === 'zh' ? '共享文档' : 'Shared Documents'}
                </h2>
                <button className="flex items-center text-sm text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-md">
                  <Plus size={14} className="mr-1.5" />
                  {language === 'zh' ? '上传文档' : 'Upload Document'}
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-10 text-center">
                <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '共享文档功能即将推出' : 'Shared Documents Coming Soon'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {language === 'zh' 
                    ? '我们正在开发协作文档功能，让您的团队可以共同编辑和审阅投资文件。敬请期待！' 
                    : 'We\'re working on collaborative document features that will allow your team to jointly edit and review investment files. Stay tuned!'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;