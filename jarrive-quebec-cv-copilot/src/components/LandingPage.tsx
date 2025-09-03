import React, { useState, useRef } from 'react';
import { CVParser, CVData } from '../services/CVParser';

interface LandingPageProps {
  language: 'fr' | 'en';
  onFileUpload: (file: File, cvData: CVData) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ language, onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        setAnalysisError(null);
      } else {
        setAnalysisError(language === 'fr' ? 'Format de fichier non supporté. Utilisez PDF ou DOCX.' : 'Unsupported file format. Use PDF or DOCX.');
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        setAnalysisError(null);
      } else {
        setAnalysisError(language === 'fr' ? 'Format de fichier non supporté. Utilisez PDF ou DOCX.' : 'Unsupported file format. Use PDF or DOCX.');
      }
    }
  };

  const handleAnalyzeClick = async () => {
    if (selectedFile) {
      setIsAnalyzing(true);
      setAnalysisError(null);
      
      try {
        const cvData = await CVParser.parseFile(selectedFile);
        onFileUpload(selectedFile, cvData);
      } catch (error) {
        console.error('Analysis error:', error);
        setAnalysisError(
          language === 'fr' 
            ? 'Erreur lors de l\'analyse du CV. Veuillez réessayer avec un autre fichier.'
            : 'Error analyzing CV. Please try with a different file.'
        );
        setIsAnalyzing(false);
      }
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
              {analysisError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    {analysisError}
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
          disabled={!selectedFile || isAnalyzing}
          className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
            selectedFile && !isAnalyzing
              ? 'bg-quebec-blue text-white hover:bg-quebec-blue-dark shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAnalyzing 
            ? (language === 'fr' ? 'Analyse en cours...' : 'Analyzing...')
            : (language === 'fr' ? 'Analyser mon CV' : 'Analyze My CV')
          }
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
