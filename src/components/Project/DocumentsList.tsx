import React from 'react';
import { Document } from '../../types/types';
import { FileText, FileImage, FileSpreadsheet, Presentation as FilePresentation, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '../../context/LanguageContext';

interface DocumentsListProps {
  documents: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  const { t, language } = useLanguage();
  
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <FileText size={20} className="text-error-500" />;
    } else if (type.includes('image')) {
      return <FileImage size={20} className="text-blue-500" />;
    } else if (type.includes('spreadsheet')) {
      return <FileSpreadsheet size={20} className="text-green-600" />;
    } else if (type.includes('presentation')) {
      return <FilePresentation size={20} className="text-orange-500" />;
    } else {
      return <FileText size={20} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-primary-800">{t('project.documents')}</h2>
        <p className="text-gray-500 text-sm mt-1">
          {language === 'zh' ? '与此项目相关的所有文档' : 'All documents associated with this project'}
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p>{t('project.noDocuments')}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('project.document')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('project.dateAdded')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('project.size')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('project.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(doc.uploadDate), language === 'zh' ? 'yyyy年MM月dd日' : 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(doc.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900" title={language === 'zh' ? '查看' : 'View'}>
                        <Eye size={18} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" title={language === 'zh' ? '下载' : 'Download'}>
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentsList;