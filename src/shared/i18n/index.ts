// Importar todos os arquivos de tradução
import { pt } from './locales/pt';
import { en } from './locales/en';

// Tipos para o sistema de internacionalização
export type SupportedLanguage = 'pt' | 'en';

export interface LocaleOption {
  value: SupportedLanguage;
  label: string;
  flag: string;
}

// Objeto que contém todas as traduções
export const translations = {
  pt,
  en,
};

// Lista de idiomas suportados para uso em seletores de idioma
export const localeOptions: LocaleOption[] = [
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];

// Detectar o idioma preferido do navegador
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'pt'; // Valor padrão para SSR
  
  const browserLang = navigator.language.split('-')[0];
  return (browserLang === 'pt' || browserLang === 'en') 
    ? browserLang as SupportedLanguage 
    : 'pt'; // Valor padrão se o idioma não for suportado
};

// Mapeamento de chaves de idioma para idiomas completos (para metadados HTML)
export const languageCodeToHtml: Record<SupportedLanguage, string> = {
  pt: 'pt-BR',
  en: 'en-US',
}; 