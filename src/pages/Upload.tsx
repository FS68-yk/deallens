import React from 'react';
import FileUploader from '../components/Upload/FileUploader';

const Upload: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Add New Documents</h1>
      <FileUploader />
    </div>
  );
};

export default Upload;