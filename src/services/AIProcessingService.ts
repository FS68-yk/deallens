import { Document, Project } from '../types/types';

// 创建一个模拟延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 文本分析结果
interface TextAnalysisResult {
  entities: {
    organizations: string[];
    people: string[];
    locations: string[];
    technologies: string[];
  };
  keywords: string[];
  summary: string;
  sentiment: number; // -1 to 1, negative to positive
  keyInsights: string[];
  financialMetrics?: {
    revenue?: number;
    growth?: number;
    burn?: number;
    runway?: number;
  };
}

// 多文档分析结果
interface MultiDocumentAnalysisResult {
  projectName: string;
  industry: string;
  stage: string;
  description: string;
  founders: {
    name: string;
    role: string;
    background?: string;
  }[];
  financials: {
    revenue?: number;
    revenueGrowth?: number;
    burn?: number;
    runway?: number;
    profitMargin?: number;
    cashPosition?: number;
  };
  market: {
    size?: number;
    growth?: number;
    targetSegments?: string[];
    geographicFocus?: string[];
  };
  competition: {
    directCompetitors: string[];
    indirectCompetitors: string[];
    competitiveAdvantage: string;
  };
  keyRisks: string[];
  keySellPoints: string[];
  investmentRecommendation?: {
    score: number; // 0-100
    recommendation: 'Pass' | 'Consider' | 'Interesting' | 'Pursue' | 'High Priority';
    reasoning: string;
  }
}

class AIProcessingService {
  // 模拟处理单个文档
  static async processDocument(document: Document): Promise<TextAnalysisResult> {
    // 模拟处理时间
    await delay(1500);
    
    // 这里在真实环境中会调用AI服务，如OpenAI API来处理文档
    // 但我们这里只返回模拟数据
    
    // 根据文档类型生成不同的模拟结果
    let result: TextAnalysisResult = {
      entities: {
        organizations: ['TechCorp', 'GlobalFinance', 'InvestorGroup'],
        people: ['John Smith', 'Jane Doe', 'Robert Johnson'],
        locations: ['San Francisco', 'New York', 'London'],
        technologies: ['AI', 'Machine Learning', 'Blockchain']
      },
      keywords: ['investment', 'technology', 'startup', 'funding', 'growth'],
      summary: 'This document outlines a startup investment opportunity in the tech sector with significant growth potential.',
      sentiment: 0.65,
      keyInsights: [
        'Company has demonstrated 120% YoY growth',
        'Proprietary technology with 2 pending patents',
        'Experienced founding team from Fortune 500 companies',
        'Currently raising Series A funding'
      ]
    };
    
    if (document.type.includes('spreadsheet') || document.name.includes('Financial')) {
      result.financialMetrics = {
        revenue: Math.random() * 5000000,
        growth: Math.random() * 150,
        burn: Math.random() * 300000,
        runway: Math.floor(Math.random() * 18) + 6
      };
      
      result.keyInsights = [
        'Monthly recurring revenue growing at 15% MoM',
        'Customer acquisition cost decreasing by 20% over last quarter',
        'Gross margin of 72% exceeds industry average',
        'Current burn rate sustainable for 14 months'
      ];
    }
    
    if (document.name.includes('Pitch') || document.name.includes('Deck')) {
      result.keyInsights = [
        'Company targeting $120B global market',
        'Management team from Google, Microsoft and Amazon',
        'Early customers include 2 Fortune 500 companies',
        'Seeking $5M in Series A funding at $25M valuation'
      ];
    }
    
    return result;
  }
  
  // 模拟处理多个文档并生成项目分析
  static async processProjectDocuments(
    project: Project, 
    documents: Document[]
  ): Promise<MultiDocumentAnalysisResult> {
    // 模拟处理时间
    await delay(3000);
    
    // 基于项目数据创建一个分析结果
    const analysisResult: MultiDocumentAnalysisResult = {
      projectName: project.name,
      industry: project.industry,
      stage: project.stage,
      description: project.description,
      founders: project.founders.map(f => ({
        name: f.name,
        role: f.role,
        background: f.background
      })),
      financials: {
        revenueGrowth: project.financials.revenueGrowth,
        burn: project.financials.burn,
        runway: project.financials.runway,
        profitMargin: Math.random() * 30 - 15, // -15% to +15%
        cashPosition: project.financials.burn * Math.floor(Math.random() * 10) + 5 // 5-15 months of burn
      },
      market: {
        size: Math.floor(Math.random() * 100 + 50) * 1000000000, // $50B-$150B
        growth: Math.floor(Math.random() * 15) + 10, // 10%-25%
        targetSegments: ['Enterprise', 'Mid-market', 'SMB'],
        geographicFocus: ['North America', 'Europe', 'Asia Pacific']
      },
      competition: {
        directCompetitors: project.competitors || ['Competitor A', 'Competitor B'],
        indirectCompetitors: ['Alternative Solution X', 'Legacy Provider Y'],
        competitiveAdvantage: 'Proprietary machine learning algorithms and superior user experience'
      },
      keyRisks: [
        'Regulatory changes affecting data privacy',
        'Intensifying competition from well-funded startups',
        'Technical execution challenges in scaling the platform',
        'Customer acquisition costs may increase as market matures'
      ],
      keySellPoints: [
        'Industry-leading technology with proven results',
        'Strong founding team with domain expertise',
        'Rapid revenue growth exceeding market average',
        'Clear path to profitability within 24 months'
      ],
      investmentRecommendation: {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        recommendation: 'Pursue',
        reasoning: 'Strong team, growing market, and defensible technology create an attractive investment opportunity despite some execution risks.'
      }
    };
    
    return analysisResult;
  }
  
  // 模拟处理会议记录
  static async processMeetingTranscript(transcript: string): Promise<any> {
    await delay(2000);
    
    return {
      topics: ['Product Roadmap', 'Funding Strategy', 'Market Expansion'],
      keyDiscussionPoints: [
        'Team plans to launch new features in Q3',
        'Targeting $8M Series A at $40M valuation',
        'Expansion into European market planned for next year',
        'Concerns about increasing customer acquisition costs'
      ],
      actionItems: [
        'Follow up on technical due diligence questions',
        'Introduce team to potential strategic investors',
        'Review competitive analysis report',
        'Schedule product demo with technical team'
      ],
      sentiment: {
        overall: 0.7, // Positive
        topics: {
          'Product': 0.8,
          'Team': 0.85,
          'Market': 0.65,
          'Competition': 0.4,
          'Financials': 0.6
        }
      },
      participantEngagement: {
        'CEO': 35,
        'CTO': 28,
        'Investor': 25,
        'Advisor': 12
      }
    };
  }
  
  // 模拟从外部新闻和文章中提取信息
  static async analyzeExternalContent(
    companyName: string,
    industry: string
  ): Promise<any> {
    await delay(2500);
    
    return {
      newsMentions: Math.floor(Math.random() * 50) + 10,
      averageSentiment: (Math.random() * 0.6) + 0.2, // 0.2 to 0.8 (mostly positive)
      recentNews: [
        {
          title: `${companyName} Announces New Strategic Partnership`,
          source: 'TechCrunch',
          date: '2 weeks ago',
          url: 'https://techcrunch.com/example',
          sentiment: 0.75
        },
        {
          title: `Industry Analysis: The Future of ${industry}`,
          source: 'Forbes',
          date: '1 month ago',
          url: 'https://forbes.com/example',
          sentiment: 0.6
        }
      ],
      industryTrends: [
        {
          trend: 'Increasing adoption of AI solutions',
          relevance: 'High',
          sentiment: 0.8
        },
        {
          trend: 'Growing regulatory scrutiny',
          relevance: 'Medium',
          sentiment: -0.2
        },
        {
          trend: 'Shift towards subscription-based models',
          relevance: 'High',
          sentiment: 0.5
        }
      ]
    };
  }
}

export default AIProcessingService;