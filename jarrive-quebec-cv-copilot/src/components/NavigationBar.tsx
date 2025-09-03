import React from 'react';

interface NavigationBarProps {
  language: 'fr' | 'en';
  onLanguageToggle: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ language, onLanguageToggle }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-quebec-blue">
              J'arrive Québec CV Copilot
            </h1>
          </div>

          {/* Right side - Language switcher and auth buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={onLanguageToggle}
              className="text-sm font-medium text-gray-600 hover:text-quebec-blue transition-colors"
            >
              {language === 'fr' ? 'FR | EN' : 'EN | FR'}
            </button>

            {/* Auth Buttons */}
            <button className="text-sm font-medium text-gray-600 hover:text-quebec-blue transition-colors">
              {language === 'fr' ? 'Connexion' : 'Log In'}
            </button>
            <button className="bg-quebec-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-quebec-blue-dark transition-colors">
              {language === 'fr' ? 'S\'inscrire' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
