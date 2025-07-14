import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, CheckCircle, Loader2, AlertCircle, ArrowRight, FileText, Info } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface AIProcessingPanelProps {
  files: File[];
  isProcessing: boolean;
  processingComplete: boolean;
  onStartProcessing: () => void;
  onExtractComplete?: (data: any) => void;
}

interface ExtractedData {
  projectName: string;
  industry: string;
  stage: string;
  valuation: string;
  founders: { name: string; role: string; background?: string; linkedIn?: string }[];
  keypoints: string[];
  description?: string;
  competitors?: string[];
  financials?: {
    revenueGrowth?: number;
    burn?: number;
    runway?: number;
    previousRound?: {
      date?: string;
      amount?: number;
      valuation?: number;
      investors?: string[];
    };
  };
  location?: string;
  website?: string;
  tags?: string[];
}

const AIProcessingPanel: React.FC<AIProcessingPanelProps> = ({ 
  files, 
  isProcessing, 
  processingComplete,
  onStartProcessing,
  onExtractComplete
}) => {
  const { createProjectFromExtractedData } = useAppContext();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 4;
  const processingTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Function to "intelligently" extract data from files
  const extractDataFromFiles = (files: File[]): Promise<ExtractedData> => {
    return new Promise((resolve, reject) => {
      try {
        // Get file name data
        const fileName = files[0]?.name || 'New Project';
        const fileBaseName = fileName.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
        
        // Get file type for more intelligent extraction
        const fileType = files[0]?.type || '';
        
        // Check file extensions for additional context
        const isPdf = fileType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf');
        const isPresentation = fileType.includes('presentation') || 
                              fileName.toLowerCase().endsWith('.ppt') || 
                              fileName.toLowerCase().endsWith('.pptx');
        const isSpreadsheet = fileType.includes('spreadsheet') || 
                             fileName.toLowerCase().endsWith('.xls') || 
                             fileName.toLowerCase().endsWith('.xlsx');
        const isDocument = fileType.includes('document') || 
                          fileName.toLowerCase().endsWith('.doc') || 
                          fileName.toLowerCase().endsWith('.docx');
        
        // Based on file name, try to guess the industry
        let industry = 'Technology'; // Default
        if (fileBaseName.toLowerCase().includes('health') || fileBaseName.toLowerCase().includes('med')) {
          industry = 'HealthTech';
        } else if (fileBaseName.toLowerCase().includes('fin')) {
          industry = 'Fintech';
        } else if (fileBaseName.toLowerCase().includes('ai') || fileBaseName.toLowerCase().includes('ml')) {
          industry = 'Artificial Intelligence';
        } else if (fileBaseName.toLowerCase().includes('green') || fileBaseName.toLowerCase().includes('climate')) {
          industry = 'CleanTech';
        } else if (fileBaseName.toLowerCase().includes('secure') || fileBaseName.toLowerCase().includes('cyber')) {
          industry = 'Cybersecurity';
        }
        
        // Create more "intelligent" random data based on the industry
        let founders: ExtractedData['founders'] = [];
        let keypoints: string[] = [];
        let competitors: string[] = [];
        let tags: string[] = [];
        let stage = 'Seed';
        let description = '';
        
        // Industry-specific data generation
        if (industry === 'Fintech') {
          founders = [
            { name: 'Alex Chen', role: 'CEO', background: 'Ex-Goldman Sachs, 10+ years in finance', linkedIn: 'linkedin.com/in/alexchen' },
            { name: 'Sarah Williams', role: 'CTO', background: 'Previously at PayPal, Stanford CS' }
          ];
          keypoints = [
            'AI-powered fraud detection',
            'Banking-as-a-service platform',
            '87% YoY transaction growth',
            'Expansion to European markets'
          ];
          competitors = ['Stripe', 'Plaid', 'Square'];
          tags = ['Payment Processing', 'Banking', 'Financial Services', 'API'];
          description = `${fileBaseName} is revolutionizing financial services with a comprehensive banking-as-a-service platform. Our AI-powered solutions offer fraud detection, seamless payment processing, and advanced analytics for businesses of all sizes.`;
        } else if (industry === 'HealthTech') {
          founders = [
            { name: 'Dr. Emily Johnson', role: 'CEO', background: 'Former Chief of Surgery at Mayo Clinic' },
            { name: 'Michael Lee', role: 'CTO', background: 'MIT Biomedical Engineering PhD' }
          ];
          keypoints = [
            'Remote patient monitoring platform',
            'FDA clearance obtained',
            'Reduces hospital readmissions by 32%',
            'Integration with major EMR systems'
          ];
          competitors = ['Teladoc', 'Amwell', 'Ro Health'];
          tags = ['Telehealth', 'Patient Monitoring', 'Healthcare', 'FDA Approved'];
          description = `${fileBaseName} is transforming healthcare delivery with our innovative remote patient monitoring platform. Our FDA-cleared solution seamlessly integrates with existing hospital systems to reduce readmissions and improve patient outcomes.`;
        } else if (industry === 'CleanTech') {
          founders = [
            { name: 'Daniel Park', role: 'CEO', background: 'Previously at Tesla Energy' },
            { name: 'Maria Rodriguez', role: 'COO', background: 'Former sustainability director at Google' }
          ];
          keypoints = [
            'Carbon capture technology',
            'Reduces emissions by 45%',
            'Pilot projects with 3 Fortune 500 companies',
            'Patent-pending process'
          ];
          competitors = ['Carbon Engineering', 'Climeworks', 'Global Thermostat'];
          tags = ['Carbon Capture', 'Sustainability', 'Clean Energy', 'Climate Tech'];
          description = `${fileBaseName} is addressing climate change with our breakthrough carbon capture technology. Our innovative approach reduces industrial emissions by up to 45% while being significantly more cost-effective than existing solutions.`;
        } else if (industry === 'Cybersecurity') {
          founders = [
            { name: 'Dr. Alexander Wright', role: 'CEO', background: 'Former NSA cryptographer, PhD in Quantum Computing' },
            { name: 'Lisa Chen', role: 'COO', background: 'Previously at Palo Alto Networks, MBA from Wharton' }
          ];
          keypoints = [
            'Post-quantum cryptography solution',
            'Protects against future quantum threats',
            'Seamless integration with existing systems',
            'Zero-day vulnerability detection'
          ];
          competitors = ['PQShield', 'ISARA', 'Crypto4A'];
          tags = ['Cybersecurity', 'Quantum', 'Enterprise', 'Zero Trust'];
          description = `${fileBaseName} provides cutting-edge quantum-resistant encryption solutions to protect enterprise data against both current and future threats. Our technology safeguards critical infrastructure from the coming quantum computing revolution.`;
        } else {
          // Default technology industry
          founders = [
            { name: 'James Wilson', role: 'CEO', background: 'Serial entrepreneur, ex-Google' },
            { name: 'Sophia Chen', role: 'CTO', background: 'Previously at AWS, Machine Learning specialist' }
          ];
          keypoints = [
            'AI-powered analytics platform',
            'Recurring revenue model',
            '120% YoY growth',
            'Enterprise customer base'
          ];
          competitors = ['Microsoft', 'Salesforce', 'Oracle'];
          tags = ['SaaS', 'Enterprise', 'Analytics', 'Machine Learning'];
          description = `${fileBaseName} provides enterprise-grade analytics powered by advanced machine learning. Our platform helps businesses extract actionable insights from their data, resulting in improved decision-making and operational efficiency.`;
        }
        
        // Determine stage and valuation based on file size 
        // (this is just for simulation - in reality, AI would extract this from content)
        const fileSize = files[0]?.size || 0;
        if (fileSize > 5000000) {
          stage = 'Series B';
        } else if (fileSize > 2000000) {
          stage = 'Series A';
        } else {
          stage = 'Seed';
        }
        
        // Determine valuation based on stage
        let valuation = '$1-5M';
        if (stage === 'Series B') {
          valuation = '$50-100M';
        } else if (stage === 'Series A') {
          valuation = '$15-30M';
        }
        
        // Create financials based on stage
        const financials = {
          revenueGrowth: stage === 'Seed' ? 0 : (stage === 'Series A' ? 120 : 80),
          burn: stage === 'Seed' ? 50000 : (stage === 'Series A' ? 200000 : 500000),
          runway: stage === 'Seed' ? 12 : (stage === 'Series A' ? 18 : 24),
          previousRound: {
            date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: stage === 'Seed' ? 1000000 : (stage === 'Series A' ? 8000000 : 25000000),
            valuation: stage === 'Seed' ? 5000000 : (stage === 'Series A' ? 30000000 : 80000000),
            investors: stage === 'Seed' ? 
              ['Angel Ventures', 'First Round Capital'] : 
              ['Accel Partners', 'Sequoia Capital', 'Y Combinator']
          }
        };

        // Extract website
        const website = `https://www.${fileBaseName.toLowerCase().replace(/\s+/g, '')}.com`;
        
        // Create the final extracted data object
        const finalData: ExtractedData = {
          projectName: fileBaseName,
          industry,
          stage,
          valuation,
          founders,
          keypoints,
          description,
          competitors,
          financials,
          location: 'San Francisco, CA',
          website,
          tags
        };
        
        resolve(finalData);
      } catch (err) {
        reject(new Error('Failed to extract data from files'));
      }
    });
  };

  // Process files when isProcessing changes to true
  useEffect(() => {
    if (isProcessing && files.length > 0) {
      // Clear any existing timers
      processingTimersRef.current.forEach(timer => clearTimeout(timer));
      processingTimersRef.current = [];
      
      setCurrentStep(1);
      
      // Simulate processing steps with timers
      const timer1 = setTimeout(() => setCurrentStep(2), 2000);
      const timer2 = setTimeout(() => setCurrentStep(3), 4000);
      const timer3 = setTimeout(() => setCurrentStep(4), 6000);
      
      processingTimersRef.current.push(timer1, timer2, timer3);
      
      // Extract data from files
      const timer4 = setTimeout(() => {
        extractDataFromFiles(files)
          .then(data => {
            setExtractedData(data);
            if (onExtractComplete) {
              onExtractComplete(data);
            }
          })
          .catch(err => {
            setError(err.message);
          });
      }, 6500);
      
      processingTimersRef.current.push(timer4);
      
      return () => {
        processingTimersRef.current.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isProcessing, files, onExtractComplete]);

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      processingTimersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Use extracted data to create a project
  const handleCreateProject = () => {
    if (extractedData) {
      createProjectFromExtractedData(extractedData, files);
      navigate('/');
    }
  };

  const renderProcessingStep = (step: number, title: string, description: string) => {
    const isActive = currentStep >= step && isProcessing;
    const isComplete = processingComplete || (isProcessing && currentStep > step);

    return (
      <div className="flex items-start mb-4">
        <div className={`rounded-full flex-shrink-0 p-1.5 ${
          isComplete ? 'bg-success-100 text-success-600' : 
          isActive ? 'bg-primary-100 text-primary-600 animate-pulse' : 
          'bg-gray-100 text-gray-400'
        }`}>
          {isComplete ? (
            <CheckCircle size={18} />
          ) : isActive ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <div className="w-[18px] h-[18px] rounded-full bg-gray-200" />
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${
            isComplete ? 'text-success-600' : 
            isActive ? 'text-primary-700' : 
            'text-gray-500'
          }`}>
            {title}
          </p>
          <p className="text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>
    );
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-5">
      <div className="flex items-center mb-4">
        <BrainCircuit size={20} className="text-primary-600 mr-2" />
        <h3 className="text-lg font-medium text-primary-800">{t('upload.aiDocumentAnalysis')}</h3>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-error-50 rounded-lg border border-error-200">
          <div className="flex items-start">
            <AlertCircle size={18} className="text-error-500 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error-800">Processing Error</p>
              <p className="text-xs text-error-600">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {!isProcessing && !processingComplete && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-4">
            {language === 'zh' ? 
              '我们的 AI 将分析上传的文档，自动提取关键信息:' : 
              'Our AI will analyze the uploaded documents and automatically extract key information:'}
          </p>
          <ul className="text-sm text-gray-600 pl-5 mb-4 list-disc space-y-1">
            <li>{language === 'zh' ? '项目基本信息（名称、行业、阶段）' : 'Basic project information (name, industry, stage)'}</li>
            <li>{language === 'zh' ? '创始人与团队信息' : 'Founder and team information'}</li>
            <li>{language === 'zh' ? '财务详情与指标' : 'Financial details and metrics'}</li>
            <li>{language === 'zh' ? '核心卖点与风险' : 'Key selling points and risks'}</li>
          </ul>
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-4 flex items-start">
            <Info size={16} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary-700">
              {language === 'zh' 
                ? 'AI处理会自动识别、分类并存储您上传的所有文档内容，使其可轻松搜索和引用。同时将提取关键实体和指标，并与市场数据进行比较。' 
                : 'AI processing will automatically recognize, categorize, and store all content from your uploaded documents, making it easy to search and reference. Key entities and metrics will be extracted and compared to market data.'}
            </p>
          </div>
          <button
            onClick={onStartProcessing}
            className="w-full mt-2 bg-primary-600 text-white rounded-md py-2.5 flex items-center justify-center hover:bg-primary-700 transition-colors"
          >
            <BrainCircuit size={16} className="mr-2" />
            {t('upload.startAIAnalysis')}
          </button>
        </div>
      )}

      {(isProcessing || processingComplete) && (
        <div>
          <div className="mb-6">
            {renderProcessingStep(1, t('upload.analyzingDocuments'), t('upload.extractingText'))}
            {renderProcessingStep(2, t('upload.identifyingKey'), t('upload.identifyingKey'))}
            {renderProcessingStep(3, t('upload.crossReferencing'), t('upload.crossReferencing'))}
            {renderProcessingStep(4, t('upload.generatingStructured'), t('upload.generatingStructured'))}
          </div>

          {processingComplete && extractedData && (
            <div className="animate-fade-in">
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <h4 className="text-primary-700 font-medium mb-3">{t('upload.extractedInfo')}</h4>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">{t('upload.projectName')}</p>
                    <p className="text-sm font-medium">{extractedData.projectName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('upload.industry')}</p>
                    <p className="text-sm font-medium">{extractedData.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('project.stage')}</p>
                    <p className="text-sm font-medium">{extractedData.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('project.valuation')}</p>
                    <p className="text-sm font-medium">{extractedData.valuation}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">{t('upload.founders')}</p>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.founders.map((founder, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-md px-2 py-1 text-xs">
                        <span className="font-medium">{founder.name}</span>
                        <span className="text-gray-500 ml-1">({founder.role})</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">{t('upload.keypoints')}</p>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.keypoints.map((point, index) => (
                      <div key={index} className="bg-primary-50 text-primary-700 rounded-full px-2 py-0.5 text-xs">
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
                
                {extractedData.description && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">{t('upload.projectDescription')}</p>
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
                      {extractedData.description}
                    </p>
                  </div>
                )}
                
                {extractedData.competitors && extractedData.competitors.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">{t('upload.competitors')}</p>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.competitors.map((competitor, index) => (
                        <div key={index} className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                          {competitor}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {extractedData.financials?.revenueGrowth !== undefined && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t('upload.financialData')}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white border border-gray-200 rounded p-2">
                        <p className="text-xs text-gray-500">{t('upload.revenueGrowth')}</p>
                        <p className="text-sm font-medium">{extractedData.financials.revenueGrowth}%</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded p-2">
                        <p className="text-xs text-gray-500">{t('upload.burnRate')}</p>
                        <p className="text-sm font-medium">${(extractedData.financials.burn || 0) / 1000}k</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded p-2">
                        <p className="text-xs text-gray-500">{t('upload.runwayMonths')}</p>
                        <p className="text-sm font-medium">{extractedData.financials.runway} {language === 'zh' ? '个月' : 'months'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleCreateProject}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  {t('upload.createProject')}
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIProcessingPanel;