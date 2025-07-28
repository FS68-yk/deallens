// NewsAPI 服务 - 免费新闻数据接口
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

class NewsApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_NEWS_API_KEY || '';
    this.baseUrl = process.env.REACT_APP_NEWS_API_BASE_URL || 'https://newsapi.org/v2';
    
    if (!this.apiKey) {
      console.warn('NewsAPI key not found. Using mock data.');
    }
  }

  // 获取投资相关新闻
  async getInvestmentNews(pageSize: number = 10): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      return this.getMockNews();
    }

    try {
      const query = 'startup OR investment OR funding OR venture capital OR IPO';
      const url = `${this.baseUrl}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`NewsAPI Error: ${response.status} ${response.statusText}`);
      }
      
      const data: NewsResponse = await response.json();
      
      return data.articles.map((article, index) => ({
        ...article,
        id: article.url || `news-${index}`, // 使用URL作为ID，如果没有则生成一个
      }));
      
    } catch (error) {
      console.error('Failed to fetch investment news:', error);
      return this.getMockNews();
    }
  }

  // 获取科技新闻
  async getTechNews(pageSize: number = 10): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      return this.getMockTechNews();
    }

    try {
      const query = 'artificial intelligence OR fintech OR blockchain OR cryptocurrency';
      const url = `${this.baseUrl}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`NewsAPI Error: ${response.status} ${response.statusText}`);
      }
      
      const data: NewsResponse = await response.json();
      
      return data.articles.map((article, index) => ({
        ...article,
        id: article.url || `tech-news-${index}`,
      }));
      
    } catch (error) {
      console.error('Failed to fetch tech news:', error);
      return this.getMockTechNews();
    }
  }

  // 搜索特定主题的新闻
  async searchNews(query: string, pageSize: number = 10): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      return this.getMockSearchResults(query);
    }

    try {
      const url = `${this.baseUrl}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`NewsAPI Error: ${response.status} ${response.statusText}`);
      }
      
      const data: NewsResponse = await response.json();
      
      return data.articles.map((article, index) => ({
        ...article,
        id: article.url || `search-${index}`,
      }));
      
    } catch (error) {
      console.error('Failed to search news:', error);
      return this.getMockSearchResults(query);
    }
  }

  // 格式化时间显示
  formatTimeAgo(publishedAt: string): string {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return '刚刚';
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays}天前`;
      } else {
        return published.toLocaleDateString('zh-CN');
      }
    }
  }

  // 模拟投资新闻数据
  private getMockNews(): NewsArticle[] {
    return [
      {
        id: 'mock-1',
        title: 'AI Startup Secures $50M Series B Funding Round',
        description: 'Leading artificial intelligence company raises significant funding to expand operations and accelerate product development.',
        content: 'A prominent AI startup has successfully closed a $50 million Series B funding round...',
        url: 'https://example.com/ai-startup-funding',
        urlToImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2小时前
        source: {
          id: 'techcrunch',
          name: 'TechCrunch'
        },
        author: 'Sarah Johnson'
      },
      {
        id: 'mock-2',
        title: 'Fintech Giant Acquires Blockchain Startup for $120M',
        description: 'Major financial technology company expands its cryptocurrency capabilities through strategic acquisition.',
        content: 'In a move to strengthen its position in the digital currency space...',
        url: 'https://example.com/fintech-acquisition',
        urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6小时前
        source: {
          id: 'bloomberg',
          name: 'Bloomberg'
        },
        author: 'Michael Chen'
      },
      {
        id: 'mock-3',
        title: 'Climate Tech Investments Reach Record High in Q1 2025',
        description: 'Environmental technology sector sees unprecedented investment activity as sustainability becomes priority.',
        content: 'The first quarter of 2025 has witnessed a remarkable surge in climate technology investments...',
        url: 'https://example.com/climate-tech-investments',
        urlToImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12小时前
        source: {
          id: 'reuters',
          name: 'Reuters'
        },
        author: 'Emma Wilson'
      },
      {
        id: 'mock-4',
        title: 'New Venture Capital Fund Launches with $500M Focus on Healthcare',
        description: 'Prominent investors establish new fund targeting innovative healthcare and biotech startups.',
        content: 'A group of experienced venture capitalists has announced the launch of a new $500 million fund...',
        url: 'https://example.com/healthcare-vc-fund',
        urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1天前
        source: {
          id: 'venturebeat',
          name: 'VentureBeat'
        },
        author: 'David Rodriguez'
      },
      {
        id: 'mock-5',
        title: 'IPO Market Shows Signs of Recovery as Tech Companies Go Public',
        description: 'Several technology companies announce plans for initial public offerings amid improving market conditions.',
        content: 'The IPO market is showing renewed vigor as multiple technology companies prepare to go public...',
        url: 'https://example.com/ipo-market-recovery',
        urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5天前
        source: {
          id: 'wsj',
          name: 'Wall Street Journal'
        },
        author: 'Jennifer Lee'
      }
    ];
  }

  private getMockTechNews(): NewsArticle[] {
    return [
      {
        id: 'tech-mock-1',
        title: 'OpenAI Announces New GPT Model with Enhanced Reasoning Capabilities',
        description: 'Latest artificial intelligence model demonstrates significant improvements in logical reasoning and problem-solving.',
        content: 'OpenAI has unveiled its latest language model featuring enhanced reasoning capabilities...',
        url: 'https://example.com/openai-new-model',
        urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        source: {
          id: 'techcrunch',
          name: 'TechCrunch'
        },
        author: 'Alex Thompson'
      }
    ];
  }

  private getMockSearchResults(query: string): NewsArticle[] {
    return [
      {
        id: 'search-mock-1',
        title: `Search Results for "${query}" - Latest Investment News`,
        description: `Recent developments related to ${query} in the investment and startup ecosystem.`,
        content: `Here are the latest news articles related to your search query: ${query}...`,
        url: 'https://example.com/search-results',
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        source: {
          id: 'search',
          name: 'Search Results'
        },
        author: 'System'
      }
    ];
  }
}

export const newsApiService = new NewsApiService();
