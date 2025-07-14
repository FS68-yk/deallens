import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppContext } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, X, Check, ArrowRight, Mail, MessageSquare, Info, Loader2 } from 'lucide-react';
import AIProcessingPanel from './AIProcessingPanel';

const FileUploader: React.FC = () => {
  const { uploadDocument } = useAppContext();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'upload' | 'email' | 'chat'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10485760, // 10MB
    noClick: false,
    noKeyboard: false,
  });

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    // Reset processing states when files change
    setIsProcessing(false);
    setProcessingComplete(false);
    setExtractedData(null);
  };

  // Clean up progress timer when component unmounts
  useEffect(() => {
    return () => {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
    };
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) {
      setError(t('upload.pleaseAddAtLeastOne'));
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Start progress simulation
      progressTimer.current = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            if (progressTimer.current) clearInterval(progressTimer.current);
            return 95;
          }
          return prev + Math.random() * 5;
        });
      }, 200);

      // Processing each file one by one
      for (const file of files) {
        await uploadDocument(file);
      }
      
      // Complete the progress
      setUploadProgress(100);
      if (progressTimer.current) clearInterval(progressTimer.current);
      
      setUploadComplete(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setFiles([]);
        setUploadComplete(false);
        setUploadProgress(0);
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(t('upload.uploadingError'));
      console.error(err);
      if (progressTimer.current) clearInterval(progressTimer.current);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartProcessing = () => {
    setIsProcessing(true);
    
    // Simulate completion after 7 seconds
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingComplete(true);
    }, 7000);
  };

  const handleExtractComplete = (data: any) => {
    setExtractedData(data);
  };

  const generateEmailAddress = () => {
    const uniqueId = Math.random().toString(36).substring(2, 10);
    setEmailAddress(`project-${uniqueId}@deallens.ai`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-primary-800 mb-6">{t('upload.addInvestmentMaterials')}</h2>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            selectedTab === 'upload' 
              ? 'border-primary-600 text-primary-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setSelectedTab('upload')}
        >
          <div className="flex items-center">
            <UploadCloud size={16} className="mr-1.5" />
            {t('upload.manualUpload')}
          </div>
        </button>
        <button 
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            selectedTab === 'email' 
              ? 'border-primary-600 text-primary-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setSelectedTab('email')}
        >
          <div className="flex items-center">
            <Mail size={16} className="mr-1.5" />
            {t('upload.emailCollection')}
          </div>
        </button>
        <button 
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            selectedTab === 'chat' 
              ? 'border-primary-600 text-primary-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setSelectedTab('chat')}
        >
          <div className="flex items-center">
            <MessageSquare size={16} className="mr-1.5" />
            {t('upload.chatImport')}
          </div>
        </button>
      </div>
      
      {/* Upload tab */}
      {selectedTab === 'upload' && (
        <>
          {!uploadComplete && (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
              }`}
              tabIndex={0}
            >
              <input {...getInputProps()} />
              <UploadCloud 
                size={48} 
                className={`mx-auto mb-4 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} 
              />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {isDragActive ? t('upload.dragAndDrop') : t('upload.dragAndDrop')}
              </p>
              <p className="text-gray-500 mb-4">
                {t('upload.or')} <button className="text-primary-600 font-medium hover:underline focus:outline-none" onClick={open}>{t('upload.browse')}</button> {t('upload.toSelectFiles')}
              </p>
              <p className="text-sm text-gray-400">
                {t('upload.supportedFormats')}
              </p>
            </div>
          )}

          {files.length > 0 && !uploadComplete && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-primary-800">{t('upload.filesToUpload')}</h3>
                <span className="text-sm text-gray-500">{files.length} {t('upload.files')}</span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin pr-2">
                {files.map((file, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center">
                      <File size={20} className="text-primary-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-error-500 transition-colors p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <AIProcessingPanel 
                files={files}
                isProcessing={isProcessing}
                processingComplete={processingComplete}
                onStartProcessing={handleStartProcessing}
                onExtractComplete={handleExtractComplete}
              />
            </div>
          )}
        </>
      )}
      
      {/* Email Collection tab */}
      {selectedTab === 'email' && (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            {t('upload.collectByEmail')}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('upload.yourCollectionEmail')}</h3>
            
            {!emailAddress ? (
              <button 
                onClick={generateEmailAddress}
                className="w-full bg-primary-600 text-white rounded-md py-2.5 flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                {t('upload.generateEmailAddress')}
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-white border border-gray-200 rounded-md px-4 py-2 text-primary-800 font-medium w-full text-center mb-3 select-all">
                  {emailAddress}
                </div>
                <p className="text-xs text-gray-500 mb-3 text-center">
                  {t('upload.anyDocumentsSent')}
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(emailAddress);
                      alert('Email copied to clipboard');
                    }}
                    className="text-primary-600 text-sm hover:text-primary-800"
                  >
                    {t('upload.copyToClipboard')}
                  </button>
                  <button className="text-primary-600 text-sm hover:text-primary-800" onClick={generateEmailAddress}>
                    {t('upload.generateNewAddress')}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('upload.emailSettings')}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  id="autoProcess" 
                  type="checkbox" 
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="autoProcess" className="ml-2 block text-sm text-gray-700">
                  {t('upload.autoProcessAttachments')}
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  id="extractText" 
                  type="checkbox" 
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="extractText" className="ml-2 block text-sm text-gray-700">
                  {t('upload.extractAndAnalyze')}
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  id="notifyNew" 
                  type="checkbox" 
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="notifyNew" className="ml-2 block text-sm text-gray-700">
                  {t('upload.notifyWhenNew')}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Import tab */}
      {selectedTab === 'chat' && (
        <div>
          <p className="text-gray-600 mb-4">
            {t('upload.importFromChat')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">{t('upload.whatsapp')}</h3>
                <span className="bg-warning-100 text-warning-800 text-xs px-2 py-0.5 rounded-full">{t('upload.inTesting')}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {t('upload.connectWhatsApp')}
              </p>
              <button className="w-full bg-gray-100 text-gray-700 rounded-md py-2 text-sm hover:bg-gray-200 transition-colors">
                {t('upload.connectWhatsApp')}
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">{t('upload.wechat')}</h3>
                <span className="bg-warning-100 text-warning-800 text-xs px-2 py-0.5 rounded-full">{t('upload.comingSoon')}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {t('upload.connectWeChat')}
              </p>
              <button className="w-full bg-gray-100 text-gray-400 rounded-md py-2 text-sm cursor-not-allowed">
                {t('upload.connectWeChat')}
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('upload.manualChatExport')}</h3>
            <p className="text-xs text-gray-500 mb-4">
              {t('upload.exportChatHistory')}
            </p>
            
            <div 
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary-400 transition-colors"
            >
              <UploadCloud size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {t('upload.uploadChatExport')}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm flex items-start">
          <Info size={16} className="mr-2 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Progress bar (when uploading) */}
      {isUploading && uploadProgress > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-gray-600">{t('upload.uploading')}</span>
            <span className="text-sm font-medium">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
              style={{width: `${uploadProgress}%`}}
            ></div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors mr-4"
        >
          {t('upload.cancel')}
        </button>
        
        {uploadComplete ? (
          <div className="bg-success-500 text-white px-6 py-2 rounded-lg font-medium flex items-center">
            <Check size={18} className="mr-2" />
            {t('upload.uploadComplete')}
          </div>
        ) : (
          <button
            onClick={handleUpload}
            disabled={isUploading || files.length === 0 || selectedTab !== 'upload'}
            className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
              isUploading || files.length === 0 || selectedTab !== 'upload'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                {t('upload.uploading')}
              </>
            ) : (
              <>
                {t('common.upload')}
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;