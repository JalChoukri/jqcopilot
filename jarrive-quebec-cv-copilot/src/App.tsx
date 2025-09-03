import React, { useState } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <NavigationBar 
        language={language} 
        onLanguageToggle={toggleLanguage}
      />
      {currentView === 'landing' ? (
        <LandingPage 
          language={language} 
          onFileUpload={handleFileUpload}
        />
      ) : (
        <Dashboard 
          language={language} 
          uploadedFile={uploadedFile}
        />
      )}
    </div>
  );
}

export default App;
