import React, { useState } from 'react';
import { CVData } from '../services/CVParser';
import { AIAnalyzer, JobRecommendation, CVInsight, EnhancementSuggestion } from '../services/AIAnalyzer';

interface DashboardProps {
  language: 'fr' | 'en';
  uploadedFile: File | null;
  cvData: CVData | null;
}

const Dashboard: React.FC<DashboardProps> = ({ language, uploadedFile, cvData }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'insights' | 'enhancer'>('jobs');
  const [selectedCvItem, setSelectedCvItem] = useState<string | null>(null);

  if (!cvData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">
            {language === 'fr' 
              ? 'Aucune donnée CV disponible. Veuillez téléverser un fichier CV.'
              : 'No CV data available. Please upload a CV file.'
            }
          </p>
        </div>
      </div>
    );
  }

  // Generate real AI analysis
  const jobRecommendations = AIAnalyzer.generateJobRecommendations(cvData, language);
  const cvInsights = AIAnalyzer.generateCVInsights(cvData, language);
  const quebecInsights = AIAnalyzer.generateQuebecSpecificInsights(cvData, language);
  const allInsights = [...cvInsights, ...quebecInsights];

  const handleCvItemClick = (item: string) => {
    setSelectedCvItem(item);
    setActiveTab('enhancer');
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getPriorityText = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return language === 'fr' ? 'Élevée' : 'High';
      case 'medium': return language === 'fr' ? 'Moyenne' : 'Medium';
      case 'low': return language === 'fr' ? 'Faible' : 'Low';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - CV Editor */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'fr' ? 'Votre CV' : 'Your CV'}
            </h2>
            {uploadedFile && (
              <p className="text-sm text-gray-500 mt-1">
                {language === 'fr' ? 'Fichier analysé:' : 'Analyzed file:'} {uploadedFile.name}
              </p>
            )}
          </div>
          <div className="p-6">
            <textarea
              value={cvData.text}
              readOnly
              className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-quebec-blue focus:border-transparent"
              onClick={(e) => {
                const target = e.target as HTMLTextAreaElement;
                const selection = target.value.substring(target.selectionStart, target.selectionEnd);
                if (selection.trim()) {
                  handleCvItemClick(selection);
                }
              }}
            />
          </div>
        </div>

        {/* Right Column - AI Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'fr' ? 'Analyses par l\'IA' : 'AI Insights'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'fr' 
                ? `${cvData.skills.length} compétences détectées, ${cvData.experience.length} expériences trouvées`
                : `${cvData.skills.length} skills detected, ${cvData.experience.length} experiences found`
              }
            </p>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobs'
                    ? 'border-quebec-blue text-quebec-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'fr' ? 'Emplois suggérés' : 'Job Recommendations'}
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'insights'
                    ? 'border-quebec-blue text-quebec-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'fr' ? 'Perspectives' : 'CV Insights'}
              </button>
              <button
                onClick={() => setActiveTab('enhancer')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'enhancer'
                    ? 'border-quebec-blue text-quebec-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'fr' ? 'Améliorations' : 'CV Enhancer'}
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                {jobRecommendations.length > 0 ? (
                  jobRecommendations.map((job, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-quebec-blue transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <span className="text-sm bg-quebec-blue text-white px-2 py-1 rounded">
                          {job.matchScore}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{job.reason}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">
                      {language === 'fr' 
                        ? 'Aucune recommandation d\'emploi trouvée. Ajoutez plus de compétences à votre CV.'
                        : 'No job recommendations found. Add more skills to your CV.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-4">
                {allInsights.length > 0 ? (
                  allInsights.map((insight, index) => (
                    <div key={index} className={`p-4 border-l-4 rounded-md ${getPriorityColor(insight.priority)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <span className="text-xs bg-white px-2 py-1 rounded border">
                          {getPriorityText(insight.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>{language === 'fr' ? 'Suggestion:' : 'Suggestion:'}</strong> {insight.suggestion}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">
                      {language === 'fr' 
                        ? 'Votre CV semble bien structuré ! Aucun problème majeur détecté.'
                        : 'Your CV appears well-structured! No major issues detected.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'enhancer' && (
              <div className="text-center py-8">
                {selectedCvItem ? (
                  (() => {
                    const suggestion = AIAnalyzer.generateEnhancementSuggestions(cvData, selectedCvItem, language);
                    return (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
                          {language === 'fr' ? 'Suggestion d\'amélioration' : 'Enhancement Suggestion'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-3">
                            {language === 'fr' ? 'Texte sélectionné:' : 'Selected text:'}
                          </p>
                          <p className="text-sm text-gray-800 italic">"{selectedCvItem}"</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-3">
                            {language === 'fr' ? 'Suggestion de l\'IA:' : 'AI Suggestion:'}
                          </p>
                          <p className="text-sm text-green-800 mb-2">{suggestion.suggestion}</p>
                          <p className="text-xs text-gray-600">
                            <strong>{language === 'fr' ? 'Raison:' : 'Reason:'}</strong> {suggestion.reason}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            <strong>{language === 'fr' ? 'Impact:' : 'Impact:'}</strong> {suggestion.impact}
                          </p>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">
                      {language === 'fr' 
                        ? 'Cliquez sur un point de votre CV à gauche pour recevoir une suggestion de l\'IA ici.'
                        : 'Click on a bullet point in your CV on the left to receive an AI-powered suggestion here.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
