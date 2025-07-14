import { Project, FilterGroup, AIInsight } from '../types/types';

// Generate some AI insights for demo purposes
const generateAIInsights = (projectName: string, industry: string): AIInsight[] => {
  return [
    {
      id: 'insight-1',
      category: 'team',
      title: '团队分析',
      content: `这个团队在${industry}领域有很强的背景，特别是技术专业知识。创始人的之前经验增加了成功概率。`,
      confidence: 0.85,
      sources: ['创始人LinkedIn档案', '团队背景分析'],
      timestamp: new Date().toISOString()
    },
    {
      id: 'insight-2',
      category: 'market',
      title: '市场机会',
      content: `${industry}行业预计在未来5年内增长22.5%，这为${projectName}提供了显著扩张机会。目标市场规模约为150亿美元，年增长率16%。`,
      confidence: 0.78,
      sources: ['行业报告', 'EchoAlpha市场分析'],
      timestamp: new Date().toISOString()
    },
    {
      id: 'insight-3',
      category: 'competition',
      title: '竞争定位',
      content: `相对于主要竞争对手，${projectName}在技术差异化和产品创新方面处于有利地位，但在市场份额和品牌认知度方面落后。`,
      confidence: 0.72,
      sources: ['竞争对手分析', '产品对比报告'],
      timestamp: new Date().toISOString()
    },
    {
      id: 'insight-4',
      category: 'financials',
      title: '财务预测',
      content: `基于当前增长轨迹，${projectName}预计在24个月内达到收支平衡。建议优化客户获取成本以提高单位经济效益。`,
      confidence: 0.65,
      sources: ['财务模型', '行业基准'],
      timestamp: new Date().toISOString()
    },
    {
      id: 'insight-5',
      category: 'social',
      title: '社交媒体分析',
      content: `${projectName}在社交媒体上的存在感正在增长，情绪主要是积极的。建议加强LinkedIn上的B2B内容营销以扩大影响力。`,
      confidence: 0.82,
      sources: ['社交媒体数据', '行业影响力分析'],
      timestamp: new Date().toISOString()
    }
  ];
};

// Generate external data for a project
const generateExternalData = (project: Project) => {
  return {
    socialMentions: {
      total: 187,
      sentiment: {
        positive: 78,
        neutral: 92,
        negative: 17
      },
      sources: {
        twitter: 68,
        linkedin: 52,
        reddit: 45,
        other: 22
      },
      keyInfluencers: [
        { name: 'Tech Insider', platform: 'Twitter', sentiment: 'positive', followers: '243K' },
        { name: 'Venture Weekly', platform: 'LinkedIn', sentiment: 'neutral', followers: '126K' },
        { name: 'r/startups', platform: 'Reddit', sentiment: 'positive', followers: '980K' }
      ],
      recentMentions: [
        { content: `${project.name}的技术令人印象深刻，可能彻底改变${project.industry}领域`, platform: 'Twitter', date: '2天前', sentiment: 'positive' },
        { content: `刚听说${project.name}在寻求新一轮融资，有人了解更多信息吗？`, platform: 'Reddit', date: '4天前', sentiment: 'neutral' }
      ]
    },
    marketTrends: {
      industryGrowth: `${(Math.random() * 15 + 8).toFixed(1)}%`,
      keyTrends: [
        { trend: '增强隐私的AI', relevance: 'high' },
        { trend: '实时分析', relevance: 'high' },
        { trend: '云原生架构', relevance: 'medium' }
      ],
      risks: [
        { risk: '法规变化', impact: 'medium' },
        { risk: '大型科技公司进入市场', impact: 'high' }
      ]
    },
    projectScores: {
      teamScore: 85,
      productScore: 78,
      marketScore: 92,
      financialScore: 70,
      tractonScore: 65,
      socialScore: 60
    },
    aiInsights: generateAIInsights(project.name, project.industry)
  };
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'NeuralFinance',
    industry: 'Fintech',
    stage: 'Series A',
    valuation: '$25-50M',
    description: 'AI-powered financial analytics platform for institutional investors. Uses NLP to extract insights from financial documents and market data.',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2024-04-10T15:45:00Z',
    founders: [
      {
        name: 'Sarah Chen',
        role: 'CEO',
        background: 'Ex-Goldman Sachs, PhD in Computer Science from Stanford',
        linkedIn: 'linkedin.com/in/sarahchen'
      },
      {
        name: 'Michael Rodriguez',
        role: 'CTO',
        background: 'Previously at Citadel, MS in AI from MIT',
        linkedIn: 'linkedin.com/in/michaelrodriguez'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'NeuralFinance_Pitch_Deck.pdf',
        type: 'application/pdf',
        uploadDate: '2023-10-15T10:30:00Z',
        size: 4500000,
        url: '#'
      },
      {
        id: 'doc-2',
        name: 'Financial_Projections.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadDate: '2023-10-16T14:20:00Z',
        size: 2300000,
        url: '#'
      }
    ],
    tags: ['AI', 'Finance', 'B2B', 'SaaS'],
    financials: {
      revenueGrowth: 150,
      burn: 180000,
      runway: 18,
      previousRound: {
        date: '2023-05-10T00:00:00Z',
        amount: 5000000,
        valuation: 25000000,
        investors: ['Alpha Ventures', 'Fintech Fund', 'Silicon Partners']
      }
    },
    logo: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://neuralfinance.ai',
    location: 'San Francisco, CA',
    competitors: ['Bloomberg Terminal', 'FactSet', 'Refinitiv'],
    externalData: generateExternalData({
      id: 'proj-1',
      name: 'NeuralFinance',
      industry: 'Fintech',
      stage: 'Series A',
      valuation: '$25-50M',
      description: 'AI-powered financial analytics platform for institutional investors.',
      createdAt: '2023-10-15T10:30:00Z',
      updatedAt: '2024-04-10T15:45:00Z',
      founders: [
        {
          name: 'Sarah Chen',
          role: 'CEO',
          background: 'Ex-Goldman Sachs, PhD in Computer Science from Stanford',
          linkedIn: 'linkedin.com/in/sarahchen'
        }
      ],
      documents: [],
      tags: ['AI', 'Finance', 'B2B', 'SaaS'],
      financials: {
        revenueGrowth: 150,
        burn: 180000,
        runway: 18,
        previousRound: {
          date: '2023-05-10T00:00:00Z',
          amount: 5000000,
          valuation: 25000000,
          investors: ['Alpha Ventures', 'Fintech Fund', 'Silicon Partners']
        }
      },
      logo: '',
      website: 'https://neuralfinance.ai',
      location: 'San Francisco, CA',
      competitors: ['Bloomberg Terminal', 'FactSet', 'Refinitiv']
    })
  },
  {
    id: 'proj-2',
    name: 'GreenChain',
    industry: 'CleanTech',
    stage: 'Seed',
    valuation: '$5-10M',
    description: 'Blockchain-based platform for tracking and trading carbon credits. Enables companies to verify and offset their carbon footprint with transparency.',
    createdAt: '2024-02-22T09:15:00Z',
    updatedAt: '2024-04-05T11:30:00Z',
    founders: [
      {
        name: 'Daniel Park',
        role: 'CEO',
        background: 'Former sustainability consultant, MBA from INSEAD',
        linkedIn: 'linkedin.com/in/danielpark'
      }
    ],
    documents: [
      {
        id: 'doc-3',
        name: 'GreenChain_Executive_Summary.pdf',
        type: 'application/pdf',
        uploadDate: '2024-02-22T09:15:00Z',
        size: 2100000,
        url: '#'
      }
    ],
    tags: ['CleanTech', 'Blockchain', 'Sustainability', 'Carbon Credits'],
    financials: {
      revenueGrowth: 0,
      burn: 80000,
      runway: 12,
      previousRound: {
        date: '2023-11-15T00:00:00Z',
        amount: 800000,
        valuation: 5000000,
        investors: ['Green Impact Fund', 'Climate Ventures']
      }
    },
    logo: 'https://images.pexels.com/photos/7414240/pexels-photo-7414240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://greenchain.io',
    location: 'Berlin, Germany',
    competitors: ['Carbonplace', 'Climate Impact X', 'Carbon Trade Exchange'],
    isNew: true, // Mark as a new project
    externalData: generateExternalData({
      id: 'proj-2',
      name: 'GreenChain',
      industry: 'CleanTech',
      stage: 'Seed',
      valuation: '$5-10M',
      description: 'Blockchain-based platform for tracking and trading carbon credits.',
      createdAt: '2024-02-22T09:15:00Z',
      updatedAt: '2024-04-05T11:30:00Z',
      founders: [
        {
          name: 'Daniel Park',
          role: 'CEO',
          background: 'Former sustainability consultant, MBA from INSEAD',
          linkedIn: 'linkedin.com/in/danielpark'
        }
      ],
      documents: [],
      tags: ['CleanTech', 'Blockchain', 'Sustainability', 'Carbon Credits'],
      financials: {
        revenueGrowth: 0,
        burn: 80000,
        runway: 12,
        previousRound: {
          date: '2023-11-15T00:00:00Z',
          amount: 800000,
          valuation: 5000000,
          investors: ['Green Impact Fund', 'Climate Ventures']
        }
      },
      logo: '',
      website: 'https://greenchain.io',
      location: 'Berlin, Germany',
      competitors: ['Carbonplace', 'Climate Impact X', 'Carbon Trade Exchange']
    })
  },
  {
    id: 'proj-3',
    name: 'MedVR',
    industry: 'HealthTech',
    stage: 'Series B',
    valuation: '$100-250M',
    description: 'Virtual reality platform for medical training and education. Provides realistic simulations for surgeons and medical students.',
    createdAt: '2023-08-05T16:45:00Z',
    updatedAt: '2024-03-25T13:10:00Z',
    founders: [
      {
        name: 'Dr. Emily Johnson',
        role: 'CEO',
        background: 'Neurosurgeon, MD from Johns Hopkins',
        linkedIn: 'linkedin.com/in/emilyjohnsonmd'
      },
      {
        name: 'Robert Kim',
        role: 'CTO',
        background: 'Previously led VR at Oculus, MS in Computer Graphics',
        linkedIn: 'linkedin.com/in/robertkim'
      }
    ],
    documents: [
      {
        id: 'doc-4',
        name: 'MedVR_Investment_Memo.pdf',
        type: 'application/pdf',
        uploadDate: '2023-08-05T16:45:00Z',
        size: 5600000,
        url: '#'
      },
      {
        id: 'doc-5',
        name: 'Clinical_Validation_Results.pdf',
        type: 'application/pdf',
        uploadDate: '2023-09-18T11:20:00Z',
        size: 3800000,
        url: '#'
      },
      {
        id: 'doc-6',
        name: 'Market_Analysis.pptx',
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        uploadDate: '2023-10-03T14:50:00Z',
        size: 4200000,
        url: '#'
      }
    ],
    tags: ['VR', 'Healthcare', 'EdTech', 'SaaS', 'B2B'],
    financials: {
      revenueGrowth: 210,
      burn: 600000,
      runway: 20,
      previousRound: {
        date: '2022-11-20T00:00:00Z',
        amount: 15000000,
        valuation: 75000000,
        investors: ['Healthcare Ventures', 'Digital Health Fund', 'Med Innovation Partners', 'Tech Growth Capital']
      }
    },
    logo: 'https://images.pexels.com/photos/249348/pexels-photo-249348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://medvr.health',
    location: 'Boston, MA',
    competitors: ['Osso VR', 'FundamentalVR', 'Medical Realities'],
    externalData: generateExternalData({
      id: 'proj-3',
      name: 'MedVR',
      industry: 'HealthTech',
      stage: 'Series B',
      valuation: '$100-250M',
      description: 'Virtual reality platform for medical training and education.',
      createdAt: '2023-08-05T16:45:00Z',
      updatedAt: '2024-03-25T13:10:00Z',
      founders: [
        {
          name: 'Dr. Emily Johnson',
          role: 'CEO',
          background: 'Neurosurgeon, MD from Johns Hopkins',
          linkedIn: 'linkedin.com/in/emilyjohnsonmd'
        }
      ],
      documents: [],
      tags: ['VR', 'Healthcare', 'EdTech', 'SaaS', 'B2B'],
      financials: {
        revenueGrowth: 210,
        burn: 600000,
        runway: 20,
        previousRound: {
          date: '2022-11-20T00:00:00Z',
          amount: 15000000,
          valuation: 75000000,
          investors: ['Healthcare Ventures', 'Digital Health Fund', 'Med Innovation Partners', 'Tech Growth Capital']
        }
      },
      logo: '',
      website: 'https://medvr.health',
      location: 'Boston, MA',
      competitors: ['Osso VR', 'FundamentalVR', 'Medical Realities']
    })
  },
  {
    id: 'proj-4',
    name: 'QuantumSecure',
    industry: 'Cybersecurity',
    stage: 'Series A',
    valuation: '$50-100M',
    description: 'Post-quantum cryptography solutions for enterprises. Develops quantum-resistant encryption algorithms to protect against future threats.',
    createdAt: '2023-11-10T13:25:00Z',
    updatedAt: '2024-04-01T16:40:00Z',
    founders: [
      {
        name: 'Dr. Alexander Wright',
        role: 'CEO',
        background: 'Former NSA cryptographer, PhD in Quantum Computing from Caltech',
        linkedIn: 'linkedin.com/in/alexanderwright'
      },
      {
        name: 'Lisa Chen',
        role: 'COO',
        background: 'Previously at Palo Alto Networks, MBA from Wharton',
        linkedIn: 'linkedin.com/in/lisachen'
      }
    ],
    documents: [
      {
        id: 'doc-7',
        name: 'QuantumSecure_Deck.pdf',
        type: 'application/pdf',
        uploadDate: '2023-11-10T13:25:00Z',
        size: 4800000,
        url: '#'
      },
      {
        id: 'doc-8',
        name: 'Technical_Whitepaper.pdf',
        type: 'application/pdf',
        uploadDate: '2023-12-05T10:15:00Z',
        size: 3100000,
        url: '#'
      }
    ],
    tags: ['Cybersecurity', 'Quantum', 'Enterprise', 'B2B'],
    financials: {
      revenueGrowth: 85,
      burn: 450000,
      runway: 16,
      previousRound: {
        date: '2023-01-15T00:00:00Z',
        amount: 8000000,
        valuation: 40000000,
        investors: ['Cyber Ventures', 'Quantum Capital', 'Defense Tech Fund']
      }
    },
    logo: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://quantumsecure.io',
    location: 'Washington D.C.',
    competitors: ['PQShield', 'ISARA', 'Crypto4A'],
    isNew: true, // Mark as a new project
    externalData: generateExternalData({
      id: 'proj-4',
      name: 'QuantumSecure',
      industry: 'Cybersecurity',
      stage: 'Series A',
      valuation: '$50-100M',
      description: 'Post-quantum cryptography solutions for enterprises.',
      createdAt: '2023-11-10T13:25:00Z',
      updatedAt: '2024-04-01T16:40:00Z',
      founders: [
        {
          name: 'Dr. Alexander Wright',
          role: 'CEO',
          background: 'Former NSA cryptographer, PhD in Quantum Computing from Caltech',
          linkedIn: 'linkedin.com/in/alexanderwright'
        }
      ],
      documents: [],
      tags: ['Cybersecurity', 'Quantum', 'Enterprise', 'B2B'],
      financials: {
        revenueGrowth: 85,
        burn: 450000,
        runway: 16,
        previousRound: {
          date: '2023-01-15T00:00:00Z',
          amount: 8000000,
          valuation: 40000000,
          investors: ['Cyber Ventures', 'Quantum Capital', 'Defense Tech Fund']
        }
      },
      logo: '',
      website: 'https://quantumsecure.io',
      location: 'Washington D.C.',
      competitors: ['PQShield', 'ISARA', 'Crypto4A']
    })
  },
  {
    id: 'proj-5',
    name: 'AgriSense',
    industry: 'AgTech',
    stage: 'Seed',
    valuation: '$1-5M',
    description: 'IoT sensors and AI analytics for precision agriculture. Helps farmers optimize irrigation, fertilization, and crop management.',
    createdAt: '2024-01-20T08:10:00Z',
    updatedAt: '2024-03-15T09:30:00Z',
    founders: [
      {
        name: 'James Wilson',
        role: 'CEO',
        background: 'Agricultural engineer, previously at John Deere',
        linkedIn: 'linkedin.com/in/jameswilson'
      },
      {
        name: 'Maria González',
        role: 'CTO',
        background: 'IoT specialist, MS in Electrical Engineering',
        linkedIn: 'linkedin.com/in/mariagonzalez'
      }
    ],
    documents: [
      {
        id: 'doc-9',
        name: 'AgriSense_Pitch.pdf',
        type: 'application/pdf',
        uploadDate: '2024-01-20T08:10:00Z',
        size: 3400000,
        url: '#'
      }
    ],
    tags: ['AgTech', 'IoT', 'AI', 'Sustainability'],
    financials: {
      revenueGrowth: 0,
      burn: 60000,
      runway: 8,
      previousRound: {
        date: '2023-08-10T00:00:00Z',
        amount: 500000,
        valuation: 3000000,
        investors: ['AgTech Fund', 'Seed Accelerator']
      }
    },
    logo: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://agrisense.farm',
    location: 'Des Moines, IA',
    competitors: ['CropX', 'Arable', 'Semios'],
    externalData: generateExternalData({
      id: 'proj-5',
      name: 'AgriSense',
      industry: 'AgTech',
      stage: 'Seed',
      valuation: '$1-5M',
      description: 'IoT sensors and AI analytics for precision agriculture.',
      createdAt: '2024-01-20T08:10:00Z',
      updatedAt: '2024-03-15T09:30:00Z',
      founders: [
        {
          name: 'James Wilson',
          role: 'CEO',
          background: 'Agricultural engineer, previously at John Deere',
          linkedIn: 'linkedin.com/in/jameswilson'
        }
      ],
      documents: [],
      tags: ['AgTech', 'IoT', 'AI', 'Sustainability'],
      financials: {
        revenueGrowth: 0,
        burn: 60000,
        runway: 8,
        previousRound: {
          date: '2023-08-10T00:00:00Z',
          amount: 500000,
          valuation: 3000000,
          investors: ['AgTech Fund', 'Seed Accelerator']
        }
      },
      logo: '',
      website: 'https://agrisense.farm',
      location: 'Des Moines, IA',
      competitors: ['CropX', 'Arable', 'Semios']
    })
  }
];

export const filterGroups: FilterGroup[] = [
  {
    title: 'Industry',
    type: 'industry',
    options: [
      { label: 'Fintech', value: 'Fintech', count: 1 },
      { label: 'CleanTech', value: 'CleanTech', count: 1 },
      { label: 'HealthTech', value: 'HealthTech', count: 1 },
      { label: 'Cybersecurity', value: 'Cybersecurity', count: 1 },
      { label: 'AgTech', value: 'AgTech', count: 1 }
    ]
  },
  {
    title: 'Stage',
    type: 'stage',
    options: [
      { label: 'Seed', value: 'Seed', count: 2 },
      { label: 'Series A', value: 'Series A', count: 2 },
      { label: 'Series B', value: 'Series B', count: 1 }
    ]
  },
  {
    title: 'Valuation',
    type: 'valuation',
    options: [
      { label: '$1-5M', value: '$1-5M', count: 1 },
      { label: '$5-10M', value: '$5-10M', count: 1 },
      { label: '$25-50M', value: '$25-50M', count: 1 },
      { label: '$50-100M', value: '$50-100M', count: 1 },
      { label: '$100-250M', value: '$100-250M', count: 1 }
    ]
  }
];