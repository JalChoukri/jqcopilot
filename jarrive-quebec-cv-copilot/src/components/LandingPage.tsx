import React, { useState, useRef } from 'react';

interface LandingPageProps {
  language: 'fr' | 'en';
  onFileUpload: (file: File) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ language, onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'fr' 
              ? 'Transformez votre CV pour le marché québécois.'
              : 'Transform Your CV for the Quebec Job Market.'
            }
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            {language === 'fr'
              ? 'Optimisez votre CV avec l\'intelligence artificielle pour maximiser vos chances de succès au Québec.'
              : 'Optimize your CV with artificial intelligence to maximize your success chances in Quebec.'
            }
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 transition-colors cursor-pointer ${
              dragActive 
                ? 'border-quebec-blue bg-quebec-blue bg-opacity-5' 
                : 'border-gray-300 hover:border-quebec-blue'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {language === 'fr' 
                  ? 'Glissez-déposez votre CV ici, ou cliquez pour téléverser.'
                  : 'Drag and drop your CV here, or click to upload.'
                }
              </p>
              <p className="text-sm text-gray-500">
                {language === 'fr' 
                  ? '(Supporte .pdf et .docx)'
                  : '(Supports .pdf and .docx)'
                }
              </p>
              {selectedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    {language === 'fr' 
                      ? `Fichier sélectionné: ${selectedFile.name}`
                      : `File selected: ${selectedFile.name}`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyzeClick}
          disabled={!selectedFile}
          className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
            selectedFile
              ? 'bg-quebec-blue text-white hover:bg-quebec-blue-dark shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {language === 'fr' ? 'Analyser mon CV' : 'Analyze My CV'}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
