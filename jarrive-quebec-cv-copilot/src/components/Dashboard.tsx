import React, { useState } from 'react';

interface DashboardProps {
  language: 'fr' | 'en';
  uploadedFile: File | null;
}

const Dashboard: React.FC<DashboardProps> = ({ language, uploadedFile }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'insights' | 'enhancer'>('jobs');
  const [selectedCvItem, setSelectedCvItem] = useState<string | null>(null);

  // Mock CV content - in real app this would come from file parsing
  const mockCvContent = language === 'fr' 
    ? `EXPERIENCE PROFESSIONNELLE

• Gestionnaire de projet marketing avec 5 ans d'expérience
• Coordonné des campagnes publicitaires pour augmenter les ventes
• Travaillé avec des équipes internationales

COMPÉTENCES

• Marketing digital et traditionnel
• Gestion de projet
• Analyse de données

ÉDUCATION

• Baccalauréat en Marketing, Université de Montréal`
    : `PROFESSIONAL EXPERIENCE

• Marketing Project Manager with 5 years of experience
• Coordinated advertising campaigns to increase sales
• Worked with international teams

SKILLS

• Digital and traditional marketing
• Project management
• Data analysis

EDUCATION

• Bachelor's degree in Marketing, University of Montreal`;

  const jobRecommendations = [
    {
      title: language === 'fr' ? 'Gestionnaire Marketing' : 'Marketing Manager',
      reason: language === 'fr' 
        ? 'Votre expérience en gestion de projet et coordination de campagnes correspond parfaitement à ce rôle.'
        : 'Your project management experience and campaign coordination perfectly match this role.'
    },
    {
      title: language === 'fr' ? 'Spécialiste Marketing Digital' : 'Digital Marketing Specialist',
      reason: language === 'fr'
        ? 'Vos compétences en marketing digital et analyse de données sont très recherchées.'
        : 'Your digital marketing skills and data analysis are highly sought after.'
    },
    {
      title: language === 'fr' ? 'Coordonnateur Marketing' : 'Marketing Coordinator',
      reason: language === 'fr'
        ? 'Votre expérience en coordination d\'équipes internationales est un atout majeur.'
        : 'Your experience coordinating international teams is a major asset.'
    }
  ];

  const cvInsights = {
    vagueStatement: language === 'fr' 
      ? '"Coordonné des campagnes publicitaires pour augmenter les ventes"'
      : '"Coordinated advertising campaigns to increase sales"',
    suggestion: language === 'fr'
      ? 'Quantifiez votre impact : "Coordonné 15+ campagnes publicitaires, augmentant les ventes de 25% en moyenne et générant 2M$ de revenus supplémentaires"'
      : 'Quantify your impact: "Coordinated 15+ advertising campaigns, increasing sales by 25% on average and generating $2M in additional revenue"'
  };

  const handleCvItemClick = (item: string) => {
    setSelectedCvItem(item);
    setActiveTab('enhancer');
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
          </div>
          <div className="p-6">
            <textarea
              value={mockCvContent}
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
                {jobRecommendations.map((job, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-quebec-blue transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.reason}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {language === 'fr' ? 'Opportunité d\'impact' : 'Opportunity for Impact'}
                </h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-sm text-gray-700 italic">
                    "{cvInsights.vagueStatement}"
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {cvInsights.suggestion}
                </p>
              </div>
            )}

            {activeTab === 'enhancer' && (
              <div className="text-center py-8">
                {selectedCvItem ? (
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
                      <p className="text-sm text-green-800">
                        {language === 'fr' 
                          ? 'Quantifiez cette expérience avec des chiffres concrets et des résultats mesurables.'
                          : 'Quantify this experience with concrete numbers and measurable results.'
                        }
                      </p>
                    </div>
                  </div>
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
