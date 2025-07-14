import axios from 'axios';

// 创建一个模拟延迟函数，用于模拟API调用
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 社交媒体分析数据结构
interface SocialMediaAnalysis {
  mentions: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  platforms: {
    twitter: number;
    linkedin: number;
    reddit: number;
    other: number;
  };
  keyInfluencers: Array<{
    name: string;
    platform: string;
    followers: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
  recentPosts: Array<{
    content: string;
    platform: string;
    date: string;
    engagement: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
}

// 市场数据结构
interface MarketData {
  industryGrowth: number;
  marketSize: number;
  keyTrends: Array<{
    name: string;
    growth: number;
    relevance: 'high' | 'medium' | 'low';
  }>;
  competitors: {
    direct: string[];
    indirect: string[];
    emerging: string[];
  };
}

// 项目评估数据结构
interface ProjectScores {
  teamScore: number;
  productScore: number;
  marketScore: number;
  financialScore: number;
  tractonScore: number;
  socialScore: number;
}

class ExternalDataService {
  // 模拟从EchoAlpha获取数据
  static async getEchoAlphaData(projectId: string): Promise<any> {
    // 在实际应用中，这会是一个真实的API调用
    await delay(1000);
    return {
      score: Math.floor(Math.random() * 30) + 70, // 70-100之间的随机分数
      insights: [
        "创始人团队有丰富的行业经验",
        "产品具有技术创新性",
        "市场增长潜力大",
        "竞争格局相对有利"
      ]
    };
  }
  
  // 模拟从PitchBook获取数据
  static async getPitchbookData(companyName: string): Promise<any> {
    await delay(1200);
    return {
      similarCompanies: [
        { name: "CompetitorA", fundingTotal: "$24M", foundedYear: 2020 },
        { name: "CompetitorB", fundingTotal: "$36M", foundedYear: 2019 },
        { name: "CompetitorC", fundingTotal: "$18M", foundedYear: 2021 }
      ],
      industryMetrics: {
        averageFunding: "$28.5M",
        averageValuation: "$85M",
        exitMultiple: "3.2x"
      }
    };
  }
  
  // 模拟从Crunchbase获取数据
  static async getCrunchbaseData(companyName: string): Promise<any> {
    await delay(800);
    return {
      investorInterest: "High",
      recentDeals: [
        { company: "Similar Startup A", amount: "$12M", stage: "Series A", date: "2024-02-15" },
        { company: "Similar Startup B", amount: "$28M", stage: "Series B", date: "2024-03-22" }
      ]
    };
  }
  
  // 模拟社交媒体分析
  static async getSocialMediaAnalysis(companyName: string): Promise<SocialMediaAnalysis> {
    await delay(1500);
    
    const totalMentions = Math.floor(Math.random() * 200) + 100;
    const positive = Math.floor(totalMentions * (Math.random() * 0.3 + 0.3)); // 30%-60%
    const negative = Math.floor(totalMentions * (Math.random() * 0.15 + 0.05)); // 5%-20%
    const neutral = totalMentions - positive - negative;
    
    return {
      mentions: totalMentions,
      sentiment: {
        positive: positive,
        neutral: neutral,
        negative: negative
      },
      platforms: {
        twitter: Math.floor(totalMentions * 0.4),
        linkedin: Math.floor(totalMentions * 0.3),
        reddit: Math.floor(totalMentions * 0.2),
        other: Math.floor(totalMentions * 0.1)
      },
      keyInfluencers: [
        {
          name: "Tech Influencer A",
          platform: "Twitter",
          followers: 245000,
          sentiment: "positive"
        },
        {
          name: "Industry Expert B",
          platform: "LinkedIn",
          followers: 120000,
          sentiment: "neutral"
        },
        {
          name: "Investment Analyst C",
          platform: "Twitter",
          followers: 180000,
          sentiment: "positive"
        }
      ],
      recentPosts: [
        {
          content: `Really impressed with the innovation at ${companyName}. Their approach to AI is groundbreaking.`,
          platform: "Twitter",
          date: "2 days ago",
          engagement: 126,
          sentiment: "positive"
        },
        {
          content: `Attended a demo by ${companyName} yesterday. Interesting tech but questions about market fit remain.`,
          platform: "LinkedIn",
          date: "1 week ago",
          engagement: 243,
          sentiment: "neutral"
        }
      ]
    };
  }
  
  // 模拟市场数据分析
  static async getMarketAnalysis(industry: string): Promise<MarketData> {
    await delay(1000);
    
    return {
      industryGrowth: Math.floor(Math.random() * 15) + 10, // 10%-25%
      marketSize: (Math.random() * 50 + 50) * 1000000000, // 50B-100B
      keyTrends: [
        {
          name: "AI Integration",
          growth: Math.floor(Math.random() * 20) + 40, // 40%-60%
          relevance: "high"
        },
        {
          name: "Cloud Migration",
          growth: Math.floor(Math.random() * 15) + 25, // 25%-40%
          relevance: "medium"
        },
        {
          name: "Data Privacy",
          growth: Math.floor(Math.random() * 10) + 20, // 20%-30%
          relevance: "high"
        }
      ],
      competitors: {
        direct: ["Competitor A", "Competitor B", "Competitor C"],
        indirect: ["Alternative Solution X", "Alternative Solution Y"],
        emerging: ["New Entrant 1", "New Entrant 2"]
      }
    };
  }
  
  // 生成项目多维评分
  static async getProjectScores(projectId: string): Promise<ProjectScores> {
    await delay(700);
    
    return {
      teamScore: Math.floor(Math.random() * 20) + 75, // 75-95
      productScore: Math.floor(Math.random() * 25) + 70, // 70-95
      marketScore: Math.floor(Math.random() * 20) + 80, // 80-100
      financialScore: Math.floor(Math.random() * 35) + 60, // 60-95
      tractonScore: Math.floor(Math.random() * 30) + 60, // 60-90
      socialScore: Math.floor(Math.random() * 40) + 50 // 50-90
    };
  }
  
  // 从多个来源综合获取数据
  static async getComprehensiveAnalysis(projectId: string, companyName: string, industry: string): Promise<any> {
    // 并行请求各种数据
    const [echoAlpha, pitchbook, crunchbase, social, market, scores] = await Promise.all([
      this.getEchoAlphaData(projectId),
      this.getPitchbookData(companyName),
      this.getCrunchbaseData(companyName),
      this.getSocialMediaAnalysis(companyName),
      this.getMarketAnalysis(industry),
      this.getProjectScores(projectId)
    ]);
    
    return {
      echoAlpha,
      pitchbook,
      crunchbase,
      social,
      market,
      scores,
      timestamp: new Date().toISOString(),
      summary: {
        score: (scores.teamScore + scores.productScore + scores.marketScore + scores.financialScore + scores.tractonScore + scores.socialScore) / 6,
        strengths: [
          scores.teamScore > 80 ? "Strong founding team" : null,
          scores.productScore > 80 ? "Innovative product" : null,
          scores.marketScore > 80 ? "Attractive market" : null,
          scores.financialScore > 80 ? "Solid financials" : null,
          scores.tractonScore > 80 ? "Good traction" : null,
          scores.socialScore > 80 ? "Positive social presence" : null
        ].filter(Boolean),
        weaknesses: [
          scores.teamScore < 70 ? "Team gaps" : null,
          scores.productScore < 70 ? "Product refinement needed" : null,
          scores.marketScore < 70 ? "Market challenges" : null,
          scores.financialScore < 70 ? "Financial concerns" : null,
          scores.tractonScore < 70 ? "Traction below expectations" : null,
          scores.socialScore < 70 ? "Limited social impact" : null
        ].filter(Boolean)
      }
    };
  }
}

export default ExternalDataService;