export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: number;
  url: string;
}

export interface Founder {
  name: string;
  role: string;
  background: string;
  linkedIn?: string;
}

export interface PreviousRound {
  date: string | null;
  amount: number;
  valuation: number;
  investors: string[];
}

export interface Financials {
  revenueGrowth: number;
  burn: number;
  runway: number;
  previousRound: PreviousRound;
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  stage: string;
  valuation: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  founders: Founder[];
  documents: Document[];
  tags: string[];
  financials: Financials;
  logo?: string;
  website?: string;
  location?: string;
  competitors?: string[];
  isNew?: boolean; // Add flag to indicate if project is new
  externalData?: any; // External data from APIs, social media, etc.
}

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface FilterGroup {
  title: string;
  type: 'industry' | 'stage' | 'valuation';
  options: FilterOption[];
}

// 社交媒体提及类型
export interface SocialMention {
  platform: string;
  author: string;
  content: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  reach: number;
  engagement: number;
  url: string;
}

// KOL (关键意见领袖) 类型
export interface KOL {
  name: string;
  platform: string;
  followers: number;
  influence: number; // 0-100
  engagementRate: number; // percentage
  recentMentions: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

// 项目多维评分
export interface ProjectScore {
  teamScore: number; // 0-100
  productScore: number; // 0-100
  marketScore: number; // 0-100
  financialScore: number; // 0-100
  tractionScore: number; // 0-100
  socialScore: number; // 0-100
  overallScore: number; // 0-100
}

// AI 生成的洞察
export interface AIInsight {
  id: string;
  category: string;
  title: string;
  content: string;
  confidence: number; // 0-1
  sources: string[];
  timestamp: string;
}