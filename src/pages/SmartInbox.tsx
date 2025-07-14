import React, { useState } from 'react';
import { Inbox, Search, Star, Clock, CalendarCheck, CheckCircle, AlertCircle as CircleAlert, FileText, FileImage, FileSpreadsheet, Trash2, ArchiveIcon, MailQuestion, Tags } from 'lucide-react';
import { format } from 'date-fns';

// Mock inbox data
const inboxItems = [
  {
    id: 'msg-1',
    type: 'email',
    subject: 'GreenChain 投资机会',
    sender: 'daniel.park@greenchain.io',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    attachments: [
      { name: 'GreenChain_Pitch_Deck.pdf', type: 'pdf', size: 2400000 },
      { name: 'Financial_Projections.xlsx', type: 'spreadsheet', size: 350000 }
    ],
    project: 'GreenChain',
    status: 'unread',
    isStarred: true,
    preview: '您好，感谢您对我们项目的兴趣。附件是我们的融资计划和财务预测...'
  },
  {
    id: 'msg-2',
    type: 'document',
    subject: 'QuantumSecure 安全白皮书',
    sender: 'AI 处理',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [
      { name: 'Security_Whitepaper.pdf', type: 'pdf', size: 1800000 }
    ],
    project: 'QuantumSecure',
    status: 'processed',
    isStarred: false,
    preview: 'AI 已分析此文档并提取了关键信息。点击查看分析结果。'
  },
  {
    id: 'msg-3',
    type: 'email',
    subject: '医疗科技项目寻求融资',
    sender: 'emily.johnson@medvr.health',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [
      { name: 'MedVR_Executive_Summary.pdf', type: 'pdf', size: 1200000 },
      { name: 'Product_Images.zip', type: 'image', size: 8500000 }
    ],
    project: 'MedVR',
    status: 'read',
    isStarred: true,
    preview: '我们是一家专注于医疗培训的VR初创公司，目前正在寻求A轮融资...'
  },
  {
    id: 'msg-4',
    type: 'meeting',
    subject: '与NeuralFinance团队会议记录',
    sender: '会议转录',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [
      { name: 'Meeting_Transcript.pdf', type: 'pdf', size: 450000 },
      { name: 'Action_Items.docx', type: 'document', size: 180000 }
    ],
    project: 'NeuralFinance',
    status: 'flagged',
    isStarred: false,
    preview: '讨论了市场拓展计划和下一轮融资战略。关键行动项：评估竞争格局，完成财务模型...'
  },
  {
    id: 'msg-5',
    type: 'document',
    subject: 'AgriSense 市场分析报告',
    sender: 'AI 处理',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [
      { name: 'Market_Analysis.pdf', type: 'pdf', size: 3600000 }
    ],
    project: 'AgriSense',
    status: 'processed',
    isStarred: false,
    preview: 'AI 已分析此文档并提取了关键市场数据。农业技术市场预计将在未来5年内增长32%...'
  }
];

const SmartInbox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const filteredItems = inboxItems.filter(item => {
    let match = true;
    
    // Apply status filter
    if (filterStatus) {
      match = match && item.status === filterStatus;
    }
    
    // Apply type filter
    if (filterType) {
      match = match && item.type === filterType;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      match = match && (
        item.subject.toLowerCase().includes(searchLower) ||
        item.sender.toLowerCase().includes(searchLower) ||
        item.project.toLowerCase().includes(searchLower) ||
        item.preview.toLowerCase().includes(searchLower)
      );
    }
    
    return match;
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'email': return <Inbox size={16} className="text-primary-600" />;
      case 'document': return <FileText size={16} className="text-blue-600" />;
      case 'meeting': return <CalendarCheck size={16} className="text-green-600" />;
      default: return <MailQuestion size={16} className="text-gray-500" />;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <CircleAlert size={16} className="text-warning-500" />;
      case 'read': return <CheckCircle size={16} className="text-gray-400" />;
      case 'processed': return <CheckCircle size={16} className="text-success-500" />;
      case 'flagged': return <Tags size={16} className="text-error-500" />;
      default: return null;
    }
  };
  
  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText size={14} className="text-error-500 mr-1" />;
      case 'image': return <FileImage size={14} className="text-purple-500 mr-1" />;
      case 'spreadsheet': return <FileSpreadsheet size={14} className="text-green-600 mr-1" />;
      default: return <FileText size={14} className="text-gray-500 mr-1" />;
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
          <h1 className="text-2xl font-bold text-primary-800">智能收件箱</h1>
          <p className="text-gray-500 mt-1">自动整理和处理的投资文档和通信</p>
        </div>
        <div className="relative">
          <form onSubmit={handleSearch}>
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索收件箱..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 左侧菜单 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">文件夹</h2>
            </div>
            <div className="p-2">
              <button 
                onClick={() => { setFilterStatus(null); setFilterType(null); }}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  !filterStatus && !filterType ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Inbox size={16} className="mr-2" />
                所有收件（{inboxItems.length}）
              </button>
              <button 
                onClick={() => { setFilterStatus('unread'); setFilterType(null); }}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  filterStatus === 'unread' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CircleAlert size={16} className="mr-2 text-warning-500" />
                未读（{inboxItems.filter(item => item.status === 'unread').length}）
              </button>
              <button 
                onClick={() => { setFilterStatus(null); setFilterType('email'); }}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  filterType === 'email' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Inbox size={16} className="mr-2 text-primary-600" />
                邮件
              </button>
              <button 
                onClick={() => { setFilterStatus(null); setFilterType('document'); }}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  filterType === 'document' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={16} className="mr-2 text-blue-600" />
                文档
              </button>
              <button 
                onClick={() => { setFilterStatus(null); setFilterType('meeting'); }}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  filterType === 'meeting' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CalendarCheck size={16} className="mr-2 text-green-600" />
                会议
              </button>
              <button 
                onClick={() => { setFilterStatus('flagged'); setFilterType(null); }}
                className={`w-full flex items-center text-left px-3 py-2 rounded-md ${
                  filterStatus === 'flagged' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Tags size={16} className="mr-2 text-error-500" />
                标记项目
              </button>
            </div>
          </div>
        </div>

        {/* 收件箱列表 */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="selectAll"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={toggleSelectAll}
                  />
                </div>
                {selectedItems.length > 0 && (
                  <>
                    <button className="p-1 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
                      <ArchiveIcon size={16} title="归档所选" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-error-600 hover:bg-gray-100 rounded">
                      <Trash2 size={16} title="删除所选" />
                    </button>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-500">
                显示 {filteredItems.length} 项结果
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center">
                  <Inbox size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">无消息</p>
                  <p className="text-sm text-gray-400 mt-1">您的收件箱是空的或者没有匹配的项目</p>
                </div>
              ) : (
                filteredItems.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1 mr-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            {getItemIcon(item.type)}
                            <div className="text-sm font-medium text-primary-800 ml-2 flex items-center">
                              {item.subject}
                              {getStatusIcon(item.status) && (
                                <span className="ml-2">{getStatusIcon(item.status)}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-yellow-400">
                              <Star size={16} className={item.isStarred ? "fill-yellow-400 text-yellow-400" : ""} />
                            </button>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {format(new Date(item.date), 'MM/dd HH:mm')}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.type === 'email' && (
                            <span className="font-medium">{item.sender}</span>
                          )}
                          {item.type === 'document' && (
                            <span className="font-medium text-blue-600">文档处理</span>
                          )}
                          {item.type === 'meeting' && (
                            <span className="font-medium text-green-600">会议记录</span>
                          )}
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="text-primary-600">{item.project}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.preview}
                        </p>
                        {item.attachments.length > 0 && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-2">
                              {item.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                  {getAttachmentIcon(attachment.type)}
                                  {attachment.name.length > 20 
                                    ? attachment.name.substring(0, 18) + '...' 
                                    : attachment.name}
                                  <span className="text-gray-500 ml-1">({formatFileSize(attachment.size)})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInbox;