export const theme = {
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
  },
  
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    full: '9999px',
  },

  typography: {
    fontSizes: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      md: '1rem',      // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
    },
    
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },

  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  },

  colors: {
    light: {
      background: '#ffffff',
      primary: '#0EA66B',
      secondary: '#8A46FF',
      'text.primary': '#1A1A1A',
      'text.secondary': '#666666',
      border: '#E5E5E5',
      hover: '#F5F5F5',
      card: {
        background: '#ffffff',
        text: {
          primary: '#1A1A1A',
          secondary: '#666666'
        },
        border: '#E5E5E5',
        hover: '#F5F5F5'
      }
    },
    dark: {
      background: '#0A0A0A',
      primary: '#14F195',
      secondary: '#8A46FF',
      'text.primary': '#ffffff',
      'text.secondary': '#A3A3A3',
      border: '#333333',
      hover: '#1A1A1A',
      card: {
        background: '#0A0A0A',
        text: {
          primary: '#ffffff',
          secondary: '#A3A3A3'
        },
        border: '#333333',
        hover: '#1A1A1A'
      }
    }
  },
} as const;

// Tipos para facilitar o uso com TypeScript
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeBorderRadius = keyof typeof theme.borderRadius;
export type ThemeFontSize = keyof typeof theme.typography.fontSizes;
export type ThemeFontWeight = keyof typeof theme.typography.fontWeights;
export type ThemeBreakpoint = keyof typeof theme.breakpoints;
export type ColorPath = 
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

export type ThemeColors = {
  dark: {
    background: string;
    primary: string;
    secondary: string;
    'text.primary': string;
    'text.secondary': string;
    border: string;
    hover: string;
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