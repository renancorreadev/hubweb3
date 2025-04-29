import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ColorValue = {
  light: string;
  dark: string;
};

type ThemeColors = {
  background: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;
  text: {
    primary: ColorValue;
    secondary: ColorValue;
  };
  border: ColorValue;
  hover: ColorValue;
};

const themeColors: ThemeColors = {
  background: {
    light: '#ffffff',
    dark: '#000508',
  },
  primary: {
    light: '#0EA66B',
    dark: '#14F195',
  },
  secondary: {
    light: '#7435CC',
    dark: '#9945FF',
  },
  text: {
    primary: {
      light: '#1A1A1A',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#666666',
      dark: '#A1A1A1',
    },
  },
  border: {
    light: '#E5E5E5',
    dark: 'rgba(255, 255, 255, 0.1)',
  },
  hover: {
    light: '#F5F5F5',
    dark: 'rgba(255, 255, 255, 0.05)',
  },
};

type BaseColorPath = keyof Omit<ThemeColors, 'text'>;
type TextColorPath = `text.${keyof ThemeColors['text']}`;
type ColorPath = BaseColorPath | TextColorPath;

export function useThemeColors() {
  const { theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const getColor = (colorPath: ColorPath) => {
    if (!isMounted) return '';
    
    if (colorPath.startsWith('text.')) {
      const textType = colorPath.split('.')[1] as keyof ThemeColors['text'];
      return isDark ? themeColors.text[textType].dark : themeColors.text[textType].light;
    }
    
    const basePath = colorPath as BaseColorPath;
    return isDark ? themeColors[basePath].dark : themeColors[basePath].light;
  };

  const getTextColor = (type: 'primary' | 'secondary') => {
    if (!isMounted) return '';
    return isDark ? themeColors.text[type].dark : themeColors.text[type].light;
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