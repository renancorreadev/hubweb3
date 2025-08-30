// Import translations
import { home } from './locales/pages/home';
import { footer } from './locales/components/footer';
import { header } from './locales/components/header';
import { docsTranslations } from './locales/pages/docs';
import { loyahubDocsTranslations } from './locales/components/docs/breadcrumb';
import { rwaDocsTranslations } from './locales/components/docs/breadcrumb';
import { developerTranslations } from './locales/pages/developer';
import { projectsTranslations } from './locales/pages/projects';
import { drexTranslations } from './locales/pages/drex';
import { projectsListTranslations } from './locales/pages/projects/projects-list';
import { contactTranslations } from './locales/pages/contact';
import { blockchainSubs } from './locales/pages/blockchain';
import { technicalExpertise } from './locales/components/technical-expertise';

// Types for the internationalization system
export type SupportedLanguage = 'en' | 'es' | 'pt';

export interface LocaleOption {
  value: SupportedLanguage;
  label: string;
  flag: string;
}

// Type for translation values
export interface TranslationValue {
  en: string | string[];
  pt: string | string[];
}

// Type for translations object
export interface Translations {
  [key: string]: TranslationValue;
}

// Object containing all translations
export const translations: Translations = {
  ...home,
  ...footer,
  ...header,
  ...docsTranslations,
  ...loyahubDocsTranslations,
  ...rwaDocsTranslations,
  ...developerTranslations,
  ...projectsTranslations,
  ...drexTranslations,
  ...projectsListTranslations,
  ...contactTranslations,
  ...blockchainSubs,
  ...technicalExpertise,
};

// List of supported languages for language selectors
export const localeOptions: LocaleOption[] = [
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];

// Detect browser's preferred language
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'pt'; // Default value for SSR

  const browserLang = navigator.language.split('-')[0];
  return (browserLang === 'pt' || browserLang === 'en')
    ? browserLang as SupportedLanguage
    : 'pt'; // Default if language is not supported
};

// Language code to HTML language mapping (for HTML metadata)
export const languageCodeToHtml: Record<SupportedLanguage, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es',
};
