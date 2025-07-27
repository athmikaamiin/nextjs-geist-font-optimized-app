import React, { useState } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

const UploadReport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const validateFile = (selectedFile: File): boolean => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed. Please select a valid PDF file.');
      return false;
    }
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return false;
    }
    return true;
  };

  const simulateUpload = (selectedFile: File) => {
    setIsUploading(true);
    setProgress(0);
    setUploadComplete(false);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles[0]) {
      const selectedFile = droppedFiles[0];
      if (validateFile(selectedFile)) {
        setError('');
        setFile(selectedFile);
        simulateUpload(selectedFile);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setError('');
      setFile(selectedFile);
      simulateUpload(selectedFile);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setError('');
    setProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
  };

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Upload Your Medical Report</h2>
        <p className="text-gray-600">Upload PDF files to get detailed medication explanations and health insights</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div
          className={`border-2 border-dashed p-12 rounded-lg text-center transition-all duration-200 ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {!file ? (
            <div className="space-y-4">
              <div className="text-6xl text-gray-400">📄</div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag and drop your PDF file here
                </p>
                <p className="text-gray-500 mb-4">or</p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer font-medium">
                    Choose File
                  </span>
                </label>
              </div>
              <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-4xl text-green-500">✓</div>
              <p className="text-lg font-medium text-gray-700">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">Error: {error}</p>
          </div>
        )}

        {isUploading && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Uploading...</p>
              <p className="text-gray-600">{progress}%</p>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {uploadComplete && file && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">✓ Report uploaded successfully!</p>
              <p className="text-green-600 text-sm mt-1">
                Your medical report has been processed and is ready for analysis.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Your report has been analyzed for medication information</li>
                <li>• Visit the Chat section to ask questions about your medications</li>
                <li>• Add family members to track their health information too</li>
              </ul>
            </div>

            <button
              onClick={resetUpload}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Upload Another Report
            </button>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notes:</h3>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• Only PDF files are accepted for security and compatibility</li>
          <li>• Your files are encrypted and stored securely</li>
          <li>• Reports are automatically analyzed for medication information</li>
          <li>• You can upload multiple reports for comprehensive tracking</li>
        </ul>
      </div>
    </section>
  );
};

export default UploadReport;
