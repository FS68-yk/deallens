import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../../types/types';
import { Send, BrainCircuit, ChevronDown, RefreshCw, Download, User, Bot, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ChatWithDataInterfaceProps {
  project: Project;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// 示例问题建议
const sampleQuestions = [
  {
    zh: `分析${Math.random() > 0.5 ? 'NeuralFinance' : 'QuantumSecure'}的主要风险因素是什么？`,
    en: `What are the main risk factors for ${Math.random() > 0.5 ? 'NeuralFinance' : 'QuantumSecure'}?`
  },
  {
    zh: '根据社交媒体分析，这个项目的市场接受度如何？',
    en: 'Based on social media analysis, what is the market acceptance of this project?'
  },
  {
    zh: '与行业基准相比，这个项目的估值合理吗？',
    en: 'Is the valuation of this project reasonable compared to industry benchmarks?'
  },
  {
    zh: '创始团队的背景分析和优势在哪里？',
    en: 'What is the analysis of the founding team\'s background and strengths?'
  }
];

// 模拟数据源列表
const dataSources = [
  { id: 'internal', name: { zh: '内部文档', en: 'Internal Documents' }, enabled: true },
  { id: 'pitchbook', name: { zh: 'PitchBook', en: 'PitchBook' }, enabled: true },
  { id: 'crunchbase', name: { zh: 'Crunchbase', en: 'Crunchbase' }, enabled: true },
  { id: 'social', name: { zh: '社交媒体', en: 'Social Media' }, enabled: true },
  { id: 'news', name: { zh: '新闻文章', en: 'News Articles' }, enabled: true },
  { id: 'echoalpha', name: { zh: 'EchoAlpha', en: 'EchoAlpha' }, enabled: false },
];

const ChatWithDataInterface: React.FC<ChatWithDataInterfaceProps> = ({ project }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'zh' 
        ? `👋 你好！我是 DealLens AI 助手。我可以帮助你深入分析 ${project.name}，回答关于项目的问题，并提供数据驱动的见解。你可以问我关于团队、财务、市场和竞争格局的问题，我会基于内部文档和外部数据源为你提供答案。` 
        : `👋 Hello! I'm the DealLens AI assistant. I can help you deep-dive into ${project.name}, answer questions about the project, and provide data-driven insights. You can ask me about the team, financials, market, and competitive landscape, and I'll provide answers based on internal documents and external data sources.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDataSources, setShowDataSources] = useState(false);
  const [activeSources, setActiveSources] = useState(dataSources.filter(source => source.enabled).map(source => source.id));
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // 处理按键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 模拟AI回复生成
  const generateAIResponse = (question: string) => {
    const responses = {
      riskFactors: {
        zh: `根据分析，${project.name}的主要风险因素包括：\n\n1. **市场竞争风险**：${project.competitors ? project.competitors.join('、') : '主要竞争对手'}正在积极扩展市场份额。\n2. **融资风险**：当前的燃烧率(${(project.financials.burn/1000).toFixed(1)}k/月)意味着如果没有额外融资，资金可支撑${project.financials.runway}个月。\n3. **技术风险**：随着AI技术快速发展，需要持续投入研发以保持技术优势。\n4. **监管风险**：${project.industry}行业的监管环境正在变化，可能影响产品部署和市场扩张。\n\n建议制定详细的风险缓解计划，特别关注降低燃烧率和加快客户获取策略。`,
        en: `Based on analysis, the main risk factors for ${project.name} include:\n\n1. **Market competition risk**: ${project.competitors ? project.competitors.join(', ') : 'Major competitors'} are actively expanding market share.\n2. **Funding risk**: Current burn rate ($${(project.financials.burn/1000).toFixed(1)}k/month) means runway of ${project.financials.runway} months without additional funding.\n3. **Technology risk**: Continuous R&D investment needed to maintain technological edge as AI rapidly evolves.\n4. **Regulatory risk**: The regulatory environment in the ${project.industry} sector is changing, potentially impacting product deployment and market expansion.\n\nRecommend developing a detailed risk mitigation plan, with particular focus on reducing burn rate and accelerating customer acquisition.`
      },
      marketAcceptance: {
        zh: `社交媒体分析显示${project.name}的市场接受度总体良好。在过去3个月中，我们跟踪了约187次提及，其中41.7%情绪积极，49.2%中性，只有9.1%负面。\n\nLinkedIn上的讨论主要集中在技术创新方面，专业人士对${project.name}的算法表现出浓厚兴趣。Twitter上的对话更多关注市场应用和潜在影响。\n\n值得注意的是，几位行业KOL（包括Tech Insider和Venture Weekly）对该项目持积极态度，这对提高市场认可度有重要影响。\n\n建议：利用现有的积极情绪，增加内容营销力度，特别是针对技术决策者的专业内容。`,
        en: `Social media analysis shows overall positive market acceptance for ${project.name}. Over the past 3 months, we've tracked approximately 187 mentions with 41.7% positive sentiment, 49.2% neutral, and only 9.1% negative.\n\nDiscussions on LinkedIn focus primarily on technical innovation, with professionals showing strong interest in ${project.name}'s algorithms. Twitter conversations center more on market applications and potential impact.\n\nNotably, several industry KOLs (including Tech Insider and Venture Weekly) have positive attitudes toward the project, which significantly influences market acceptance.\n\nRecommendation: Leverage existing positive sentiment by increasing content marketing efforts, especially professional content targeting technical decision-makers.`
      },
      valuation: {
        zh: `根据我们的分析，${project.name}当前估值${project.valuation}在${project.industry}行业处于${Math.random() > 0.5 ? '合理' : '稍高'}水平。\n\n对比同行业同阶段公司：\n- 平均估值倍数：${Math.floor(Math.random() * 3) + 5}x ARR\n- ${project.name}估值倍数：${Math.floor(Math.random() * 4) + 6}x ARR\n\n考虑${project.name}${Math.round(project.financials.revenueGrowth)}%的年增长率(行业平均为${Math.round(project.financials.revenueGrowth * 0.7)}%)，这个溢价是有一定支撑的。\n\n然而，当前的燃烧率较高，若不能在未来6-12个月内提高收入或降低成本，可能面临估值调整压力。`,
        en: `Based on our analysis, ${project.name}'s current valuation of ${project.valuation} is ${Math.random() > 0.5 ? 'reasonable' : 'slightly high'} for the ${project.industry} sector.\n\nCompared to peers at the same stage:\n- Average valuation multiple: ${Math.floor(Math.random() * 3) + 5}x ARR\n- ${project.name}'s valuation multiple: ${Math.floor(Math.random() * 4) + 6}x ARR\n\nConsidering ${project.name}'s ${Math.round(project.financials.revenueGrowth)}% annual growth (industry average is ${Math.round(project.financials.revenueGrowth * 0.7)}%), this premium has some justification.\n\nHowever, the current burn rate is high, and without revenue improvements or cost reductions in the next 6-12 months, the company may face valuation pressure.`
      },
      teamAnalysis: {
        zh: `创始团队分析：\n\n${project.founders.map((founder, idx) => `${idx+1}. **${founder.name}** (${founder.role}): ${founder.background}`).join('\n')}\n\n团队优势：\n- 行业经验丰富，平均${Math.floor(Math.random() * 5) + 5}年${project.industry}领域经验\n- 技术与商业背景结合，${project.founders.length > 1 ? '互补技能组合' : '全面技能'}\n- 之前创业/管理经验${Math.random() > 0.5 ? '丰富' : '适中'}\n\n潜在改进空间：\n- ${Math.random() > 0.5 ? '可考虑增强市场营销专业知识' : '可增加技术开发团队深度'}\n- 随着公司增长，建议招募具有规模化经验的高管\n\n总体评估：团队实力位于同行业同阶段创业公司前${Math.floor(Math.random() * 15) + 10}%`,
        en: `Founding team analysis:\n\n${project.founders.map((founder, idx) => `${idx+1}. **${founder.name}** (${founder.role}): ${founder.background}`).join('\n')}\n\nTeam strengths:\n- Rich industry experience, averaging ${Math.floor(Math.random() * 5) + 5} years in the ${project.industry} sector\n- Combination of technical and business backgrounds, ${project.founders.length > 1 ? 'complementary skill sets' : 'comprehensive skills'}\n- Previous entrepreneurial/management experience is ${Math.random() > 0.5 ? 'extensive' : 'moderate'}\n\nPotential improvement areas:\n- ${Math.random() > 0.5 ? 'Consider strengthening marketing expertise' : 'Could increase technical development team depth'}\n- As the company grows, recommend recruiting executives with scaling experience\n\nOverall assessment: Team strength ranks in the top ${Math.floor(Math.random() * 15) + 10}% of startups at the same stage in this industry`
      }
    };

    // 简单的问题匹配逻辑
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('风险') || lowerQuestion.includes('risk')) {
      return language === 'zh' ? responses.riskFactors.zh : responses.riskFactors.en;
    } else if (lowerQuestion.includes('市场') || lowerQuestion.includes('接受') || lowerQuestion.includes('market') || lowerQuestion.includes('acceptance')) {
      return language === 'zh' ? responses.marketAcceptance.zh : responses.marketAcceptance.en;
    } else if (lowerQuestion.includes('估值') || lowerQuestion.includes('valuation')) {
      return language === 'zh' ? responses.valuation.zh : responses.valuation.en;
    } else if (lowerQuestion.includes('团队') || lowerQuestion.includes('创始') || lowerQuestion.includes('team') || lowerQuestion.includes('founder')) {
      return language === 'zh' ? responses.teamAnalysis.zh : responses.teamAnalysis.en;
    }

    // 默认回复
    return language === 'zh' 
      ? `感谢您的问题。基于对${project.name}的分析和当前市场趋势，我能够提供一些见解。\n\n您的问题涉及到了${project.industry}行业的特定情况。要更详细地回答，我需要进一步分析项目文档和外部数据。\n\n您是否有更具体的问题，例如关于团队背景、财务指标、市场定位或竞争格局的问题？我可以提供更有针对性的分析。`
      : `Thank you for your question. Based on the analysis of ${project.name} and current market trends, I can provide some insights.\n\nYour question relates to specific aspects of the ${project.industry} industry. For a more detailed answer, I would need to further analyze project documents and external data.\n\nDo you have more specific questions about team background, financial metrics, market positioning, or competitive landscape? I can provide more targeted analysis.`;
  };

  // 切换数据源
  const toggleDataSource = (sourceId: string) => {
    if (activeSources.includes(sourceId)) {
      setActiveSources(prev => prev.filter(id => id !== sourceId));
    } else {
      setActiveSources(prev => [...prev, sourceId]);
    }
  };

  // 使用示例问题
  const useExampleQuestion = (index: number) => {
    setInput(language === 'zh' ? sampleQuestions[index].zh : sampleQuestions[index].en);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <BrainCircuit size={18} className="text-primary-600 mr-2" />
          <h3 className="font-semibold text-primary-800">
            {language === 'zh' ? '智能对话' : 'AI Chat'}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDataSources(!showDataSources)}
            className={`p-1.5 rounded hover:bg-gray-100 ${showDataSources ? 'text-primary-600 bg-gray-100' : 'text-gray-500'}`}
            title={language === 'zh' ? '数据来源' : 'Data Sources'}
          >
            <Filter size={16} />
          </button>
          <button
            className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded"
            title={language === 'zh' ? '下载对话' : 'Download Conversation'}
          >
            <Download size={16} />
          </button>
          <button
            className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded"
            title={language === 'zh' ? '重置对话' : 'Reset Conversation'}
            onClick={() => setMessages([messages[0]])}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      
      {showDataSources && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            <div className="text-xs font-medium text-gray-700 flex items-center mr-2">
              {language === 'zh' ? '数据来源:' : 'Data Sources:'}
            </div>
            {dataSources.map((source) => (
              <button
                key={source.id}
                className={`text-xs px-2 py-1 rounded-full flex items-center ${
                  activeSources.includes(source.id) 
                    ? 'bg-primary-100 text-primary-800 border border-primary-300' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                onClick={() => toggleDataSource(source.id)}
              >
                {source.name[language as 'zh' | 'en']}
                {!source.enabled && <span className="ml-1 text-xs text-warning-600">PRO</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col h-[600px]">
        {/* 消息区域 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.role === 'user' ? (
                      <>
                        <User size={14} className="mr-1" />
                        <span className="text-xs font-medium">
                          {language === 'zh' ? '你' : 'You'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Bot size={14} className="mr-1" />
                        <span className="text-xs font-medium">DealLens AI</span>
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Bot size={14} className="mr-1" />
                    <span className="text-xs font-medium">DealLens AI</span>
                  </div>
                  <div className="flex space-x-1 items-center h-6">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* 示例问题 */}
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <p className="text-xs text-gray-500 mb-2">
            {language === 'zh' ? '你可以尝试问:' : 'Try asking:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => useExampleQuestion(idx)}
                className="text-xs bg-white border border-gray-200 hover:border-primary-300 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                {language === 'zh' ? question.zh : question.en}
              </button>
            ))}
          </div>
        </div>
        
        {/* 输入区域 */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-end">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder={language === 'zh' ? '输入你的问题...' : 'Type your question...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
              />
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-gray-500">
                  {language === 'zh' 
                    ? '提示: 你可以询问项目的具体方面，如风险分析、竞争格局等。' 
                    : 'Tip: You can ask about specific aspects of the project, such as risk analysis, competitive landscape, etc.'}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'zh' ? 'Enter 发送, Shift+Enter 换行' : 'Enter to send, Shift+Enter for new line'}
                </div>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className={`ml-3 p-3 rounded-full flex-shrink-0 ${
                !input.trim() || isTyping
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              } transition-colors`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithDataInterface;