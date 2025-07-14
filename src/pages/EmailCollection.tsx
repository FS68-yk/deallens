import React, { useState } from 'react';
import { 
  Mail, Copy, RefreshCw, Clipboard, Check, Plus, Trash2,
  AlertCircle, MailCheck, MailWarning, Settings, Clock, FileText 
} from 'lucide-react';
import { format } from 'date-fns';

// Mock email collection data
const emailAddresses = [
  {
    id: 'email-1',
    address: 'neuralsystems-2025@deallens.ai',
    label: 'NeuralFinance',
    created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    docsReceived: 8,
    status: 'active',
  },
  {
    id: 'email-2',
    address: 'greenchain-eco@deallens.ai',
    label: 'GreenChain',
    created: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    docsReceived: 3,
    status: 'active',
  },
  {
    id: 'email-3',
    address: 'quantum-secure@deallens.ai',
    label: 'QuantumSecure',
    created: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    docsReceived: 6,
    status: 'inactive',
  }
];

const recentActivity = [
  {
    id: 'activity-1',
    email: 'neuralsystems-2025@deallens.ai',
    action: '收到文档',
    details: 'Financial_Projections_Q2.xlsx',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'success',
  },
  {
    id: 'activity-2',
    email: 'neuralsystems-2025@deallens.ai',
    action: '收到文档',
    details: 'Investor_Update_May.pdf',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000).toISOString(),
    status: 'success',
  },
  {
    id: 'activity-3',
    email: 'greenchain-eco@deallens.ai',
    action: '处理错误',
    details: '无法解析附件内容',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'error',
  },
  {
    id: 'activity-4',
    email: 'quantum-secure@deallens.ai',
    action: '收到文档',
    details: 'Product_Roadmap.pdf',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'success',
  }
];

const EmailCollection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [newAddressLabel, setNewAddressLabel] = useState('');
  
  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  };
  
  const generateEmailAddress = () => {
    if (!newAddressLabel.trim()) return;
    
    // Here you would normally make an API call to generate an email
    console.log(`Generating email for: ${newAddressLabel}`);
    setNewAddressModal(false);
    setNewAddressLabel('');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-success-100 text-success-800 text-xs px-2 py-0.5 rounded-full">活跃</span>;
      case 'inactive':
        return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">不活跃</span>;
      default:
        return null;
    }
  };
  
  const getActivityIcon = (status: string, action: string) => {
    if (status === 'error') {
      return <AlertCircle size={16} className="text-error-500" />;
    }
    
    if (action === '收到文档') {
      return <FileText size={16} className="text-primary-600" />;
    }
    
    return <MailCheck size={16} className="text-success-600" />;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">邮件收集</h1>
          <p className="text-gray-500 mt-1">通过专用邮箱自动收集投资材料</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setNewAddressModal(true)}
            className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} className="mr-1.5" />
            创建邮箱
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <Settings size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 邮箱列表 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-medium text-primary-800">收集邮箱</h2>
              <button className="p-1.5 text-gray-500 hover:text-primary-700 hover:bg-gray-100 rounded">
                <RefreshCw size={16} />
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {emailAddresses.map(email => (
                <div key={email.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h3 className="font-medium text-primary-800">{email.label}</h3>
                          <div className="ml-2">
                            {getStatusBadge(email.status)}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-600 font-mono">{email.address}</p>
                          <button 
                            onClick={() => copyToClipboard(email.address)}
                            className="ml-2 p-1 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded"
                          >
                            {copied === email.address ? (
                              <Check size={14} className="text-success-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 flex items-center justify-end mb-1">
                        <FileText size={14} className="mr-1.5 text-gray-400" />
                        已收集 {email.docsReceived} 个文档
                      </div>
                      <div className="text-xs text-gray-500 flex items-center justify-end">
                        <Clock size={12} className="mr-1.5" />
                        最近活动 {format(new Date(email.lastActivity), 'yyyy-MM-dd')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-2">
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors">
                      查看文档
                    </button>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors">
                      查看活动
                    </button>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors">
                      设置
                    </button>
                    <button className="text-xs bg-gray-100 hover:bg-error-100 text-error-700 hover:text-error-800 px-2 py-1 rounded transition-colors ml-auto">
                      <Trash2 size={12} className="inline-block mr-1 align-text-bottom" />
                      删除
                    </button>
                  </div>
                </div>
              ))}
              
              {emailAddresses.length === 0 && (
                <div className="py-12 text-center">
                  <Mail size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">没有收集邮箱</p>
                  <p className="text-sm text-gray-400 mt-1">点击"创建邮箱"开始收集投资材料</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 最近活动 */}
        <div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">最近活动</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentActivity.map(activity => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.status, activity.action)}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">{activity.action}</span>
                        {activity.status === 'error' && (
                          <span className="ml-2 bg-error-100 text-error-800 text-xs px-2 py-0.5 rounded-full">
                            错误
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {activity.details}
                      </p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500">
                          {activity.email}
                        </p>
                        <span className="mx-1.5 text-gray-300">•</span>
                        <p className="text-xs text-gray-500">
                          {format(new Date(activity.timestamp), 'yyyy-MM-dd HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentActivity.length === 0 && (
                <div className="py-8 text-center">
                  <MailWarning size={36} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">没有最近活动</p>
                </div>
              )}
            </div>
            
            {recentActivity.length > 0 && (
              <div className="p-3 border-t border-gray-100 text-center">
                <button className="text-sm text-primary-600 hover:text-primary-800">
                  查看全部活动
                </button>
              </div>
            )}
          </div>
          
          {/* 使用说明 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">如何使用</h2>
            </div>
            <div className="p-4">
              <ol className="text-sm text-gray-600 space-y-3 list-decimal list-inside">
                <li>创建专用的收集邮箱</li>
                <li>将邮箱地址发送给创始人或其他材料来源</li>
                <li>任何发送到这个地址的附件将自动处理并添加到您的项目库</li>
                <li>系统会自动提取关键信息并通知您</li>
              </ol>
              <div className="mt-4 bg-primary-50 text-primary-800 p-3 rounded-lg text-sm">
                <div className="flex items-start">
                  <Clipboard size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                  <p>
                    提示：您可以在邮件主题行中添加项目名称，以便自动将文档归类到正确的项目中。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 创建新邮箱弹窗 */}
      {newAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-fade-in animate-slide-in">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-primary-800">创建新收集邮箱</h2>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱标签（项目名称）
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="例如：NeuralFinance"
                value={newAddressLabel}
                onChange={(e) => setNewAddressLabel(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                这将用于生成邮箱地址和组织收到的文档
              </p>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  生成的邮箱将为
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 font-mono">
                  {newAddressLabel 
                    ? `${newAddressLabel.toLowerCase().replace(/\s+/g, '-')}@deallens.ai`
                    : 'project-xxx@deallens.ai'}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setNewAddressModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={generateEmailAddress}
                  disabled={!newAddressLabel.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    newAddressLabel.trim() 
                      ? 'bg-primary-600 hover:bg-primary-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  创建邮箱
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCollection;