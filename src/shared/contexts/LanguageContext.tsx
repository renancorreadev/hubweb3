'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dicionários de tradução
const translations = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.products': 'Produtos',
    'nav.developers': 'Desenvolvedores',
    'nav.docs': 'Documentação',
    'nav.contact': 'Contato',
    'nav.ecosystem': 'Ecossistema',
    'nav.getting-started': 'Primeiros Passos',
    'nav.overview': 'Visão Geral',
    'nav.tutorials': 'Tutoriais',
    'nav.projects': 'Projetos',
    'nav.partners': 'Parceiros',
    'nav.community': 'Comunidade',
    'nav.desc.getting-started': 'Comece a construir com HubWeb3',
    'nav.desc.sdk': 'Nosso poderoso SDK para desenvolvedores',
    'nav.desc.api': 'Documentação da API REST',
    'nav.desc.overview': 'Aprenda sobre HubWeb3',
    'nav.desc.tutorials': 'Guias passo a passo',
    'nav.desc.faq': 'Perguntas frequentes',
    'nav.desc.projects': 'Construído no HubWeb3',
    'nav.desc.partners': 'Nossos parceiros',
    'nav.desc.community': 'Junte-se à nossa comunidade',
    'button.start': 'Começar',
    'button.seeMore': 'Ver Mais',
    // Adicione mais traduções conforme necessário
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.developers': 'Developers',
    'nav.docs': 'Documentation',
    'nav.contact': 'Contact',
    'nav.ecosystem': 'Ecosystem',
    'nav.getting-started': 'Getting Started',
    'nav.overview': 'Overview',
    'nav.tutorials': 'Tutorials',
    'nav.projects': 'Projects',
    'nav.partners': 'Partners',
    'nav.community': 'Community',
    'nav.desc.getting-started': 'Start building with HubWeb3',
    'nav.desc.sdk': 'Our powerful SDK for developers',
    'nav.desc.api': 'REST API documentation',
    'nav.desc.overview': 'Learn about HubWeb3',
    'nav.desc.tutorials': 'Step-by-step guides',
    'nav.desc.faq': 'Frequently asked questions',
    'nav.desc.projects': 'Built on HubWeb3',
    'nav.desc.partners': 'Our partners',
    'nav.desc.community': 'Join our community',
    'button.start': 'Start Building',
    'button.seeMore': 'See More',
    // Adicione mais traduções conforme necessário
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Verifica o idioma salvo no localStorage ao iniciar
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Função de tradução
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para facilitar o uso do contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 