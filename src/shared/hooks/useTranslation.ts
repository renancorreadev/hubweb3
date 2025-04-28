"use client";

import { useCallback } from 'react';
import { useLanguage } from '@/shared/contexts/LanguageContext';
import { SupportedLanguage, translations } from '@/shared/i18n';

export interface TranslationHookResult {
  /**
   * Traduz uma chave para o idioma atual
   * @param key Chave de tradução
   * @param params Parâmetros para substituição na string traduzida
   * @returns String traduzida
   */
  t: (key: string, params?: Record<string, string | number>) => string;
  
  /**
   * Idioma atual
   */
  language: SupportedLanguage;
  
  /**
   * Função para alterar o idioma
   * @param lang Novo idioma
   */
  changeLanguage: (lang: SupportedLanguage) => void;
  
  /**
   * Função que retorna true se o idioma atual for o especificado
   * @param lang Idioma a verificar
   */
  isCurrentLanguage: (lang: SupportedLanguage) => boolean;
}

/**
 * Hook que fornece funções para tradução e gerenciamento de idiomas
 * @returns Objeto com funções e dados de tradução
 * 
 * @example
 * // Uso básico
 * const { t } = useTranslation();
 * return <h1>{t('page.home.title')}</h1>;
 * 
 * @example
 * // Com parâmetros
 * const { t } = useTranslation();
 * return <p>{t('greeting', { name: 'João' })}</p>; // 'greeting' é 'Olá, {{name}}!'
 * 
 * @example
 * // Mudar idioma
 * const { changeLanguage } = useTranslation();
 * return <button onClick={() => changeLanguage('en')}>English</button>;
 */
export function useTranslation(): TranslationHookResult {
  const { language, setLanguage } = useLanguage();
  

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {

    const translationData = translations[language as keyof typeof translations];
    const translatedText = translationData[key as keyof typeof translationData] as string || key;
    
    if (!params) return translatedText;
    

    return Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => 
        acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)),
      translatedText
    );
  }, [language]);
  
 
  const changeLanguage = useCallback((lang: SupportedLanguage): void => {
    setLanguage(lang);
  }, [setLanguage]);
  

  const isCurrentLanguage = useCallback((lang: SupportedLanguage): boolean => {
    return language === lang;
  }, [language]);
  
  return {
    t,
    language,
    changeLanguage,
    isCurrentLanguage,
  };
} 