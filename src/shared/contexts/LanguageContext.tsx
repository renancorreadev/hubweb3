'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, detectBrowserLanguage, translations, languageCodeToHtml } from '@/i18n';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  htmlLang: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('pt');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // First time the page is loaded, check if there is a language saved in the localStorage
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage | null;
    
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // If there is no saved language, detect the browser language
      const browserLanguage = detectBrowserLanguage();
      setLanguageState(browserLanguage);
      localStorage.setItem('language', browserLanguage);
    }
    
    setIsInitialized(true);
  }, []);

  // Effect to update the lang attribute of the HTML when the language changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const htmlElement = document.documentElement;
    htmlElement.lang = languageCodeToHtml[language];
  }, [language, isInitialized]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Simplified translation function
  const t = (key: string): string => {
    const translationObj = translations[language];
    return translationObj[key as keyof typeof translationObj] as string || key;
  };

  const htmlLang = languageCodeToHtml[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, htmlLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to facilitate the use of the context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 