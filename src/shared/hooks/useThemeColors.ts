import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';



type ThemeColors = {
  dark: {
    background: string;
    primary: string;
    secondary: string;
    'text.primary': string;
    'text.secondary': string;
    border: string;
    hover: string;
    fontColor: {
      white: string;
      black: string;
      gray: string;
      hubPrimary: string;
    };
    card: {
      background: string;
      text: {
        primary: string;
        secondary: string;
      };
      border: string;
      hover: string;
    };
  };
  light: {
    background: string;
    primary: string;
    secondary: string;
    'text.primary': string;
    'text.secondary': string;
    border: string;
    hover: string;
    fontColor: {
      white: string;
      black: string;
      gray: string;
      hubPrimary: string;
    };
    card: {
      background: string;
      text: {
        primary: string;
        secondary: string;
      };
      border: string;
      hover: string;
    };
  };
};

const themeColors: ThemeColors = {
  dark: {
    background: '#000',
    primary: '#14F195',
    secondary: '#8A46FF',
    'text.primary': '#ffffff',
    'text.secondary': '#A3A3A3',
    border: '#333333',
    hover: '#1A1A1A',
    fontColor: {
      white: '#ffffff',
      black: '#000000',
      gray: '#666666',
      hubPrimary: '#14F195',
    },
    card: {
      background: '#0A0A0A',
      text: {
        primary: '#ffffff',
        secondary: '#A3A3A3'
      },
      border: '#333333',
      hover: '#1A1A1A'
    }
  },
  light: {
    background: '#ffffff',
    primary: '#0EA66B',
    secondary: '#8A46FF',
    'text.primary': '#1A1A1A',
    'text.secondary': '#666666',
    border: '#E5E5E5',
    hover: '#F5F5F5',
    fontColor: {
      white: '#ffffff',
      black: '#000000',
      gray: '#666666',
      hubPrimary: '#14F195',
    },
    card: {
      background: '#ffffff',
      text: {
        primary: '#1A1A1A',
        secondary: '#666666'
      },
      border: '#E5E5E5',
      hover: '#F5F5F5'
    }
  }
};

type ColorPath = 
  | 'background'
  | 'primary'
  | 'secondary'
  | 'text.primary'
  | 'text.secondary'
  | 'border'
  | 'hover'
  | 'card.background'
  | 'card.text.primary'
  | 'card.text.secondary'
  | 'card.border'
  | 'card.hover';

export function useThemeColors() {
  const { theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const getColor = (path: ColorPath) => {
    if (!isMounted) return '';
    
    const colorPath = path.split('.');
    let current: any = themeColors[isDark ? 'dark' : 'light'];
    
    for (const part of colorPath) {
      current = current[part];
      if (current === undefined) {
        console.warn(`Color path "${path}" not found in theme`);
        return '#000000';
      }
    }
    
    return current;
  };

  const getTextColor = (type: 'primary' | 'secondary') => {
    if (!isMounted) return '';
    return getColor(`text.${type}` as ColorPath);
  };

  return {
    isDark,
    isMounted,
    theme: currentTheme,
    colors: themeColors,
    getColor,
    getTextColor,
  };
} 