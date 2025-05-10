import type { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        diatype: ["Diatype", "sans-serif"],
        dsemi: ["DSemi", "sans-serif"],
        monument: ["Monument", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
        abcm: ["ABC Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.1" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25" }], // 14px
        base: ["1rem", { lineHeight: "1.4" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.5" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.5" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "1.3" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "1.2" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "1.2" }], // 36px
        "5xl": ["3rem", { lineHeight: "1.1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
        "9xl": ["8rem", { lineHeight: "1" }], // 128px
      },
      colors: {
        hub: {
          background: {
            DEFAULT: "#000508",
            light: "#ffffff"
          },
          primary: {
            DEFAULT: "#14F195",
            light: "#0EA66B",
            dark: "#14F195"
          },
          secondary: {
            DEFAULT: "#9945FF",
            light: "#7435CC",
            dark: "#9945FF"
          },
          text: {
            primary: {
              light: "#1A1A1A",
              dark: "#FFFFFF"
            },
            secondary: {
              light: "#666666",
              dark: "#A1A1A1"
            }
          },
          border: {
            light: "#E5E5E5",
            dark: "rgba(255, 255, 255, 0.1)"
          },
          hover: {
            light: "#F5F5F5",
            dark: "rgba(255, 255, 255, 0.05)"
          }
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            'ol > li::before': {
              color: 'var(--tw-prose-counters)',
            },
            'ul > li::before': {
              backgroundColor: 'var(--tw-prose-bullets)',
            },
            hr: {
              borderColor: 'var(--tw-prose-hr)',
            },
            blockquote: {
              color: 'var(--tw-prose-quotes)',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
            },
            h1: {
              color: 'var(--tw-prose-headings)',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
            },
            'figure figcaption': {
              color: 'var(--tw-prose-captions)',
            },
            code: {
              color: 'var(--tw-prose-code)',
            },
            'a code': {
              color: 'var(--tw-prose-links)',
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
            },
            thead: {
              color: 'var(--tw-prose-th)',
              borderBottomColor: 'var(--tw-prose-th-borders)',
            },
            'tbody tr': {
              borderBottomColor: 'var(--tw-prose-td-borders)',
            },
          },
        },
      },
      borderRadius: {
        lg: "1rem",
      },
      screens: {
        'xs': '480px',   // small devices
        'sm': '640px',   // mobile landscape
        'md': '768px',   // tablets
        'lg': '1024px',  // laptops
        'xl': '1280px',  // desktops
        '2xl': '1536px', // large screens, 2K
        '3xl': '1920px', // ultra-wide monitors, 4K
        // Max-width breakpoints
        'max-3xl': {'max': '1920px'},
        'max-2xl': {'max': '1536px'},
        'max-xl': {'max': '1280px'},
        'max-lg': {'max': '1024px'},
        'max-md': {'max': '768px'},
        'max-sm': {'max': '640px'},
        'max-xs': {'max': '480px'},
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'rotate-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        'rotate-gradient': 'rotate-gradient 5s ease infinite'
      }
    },
  },
  plugins: [
    animate,
    require('@tailwindcss/typography'),
  ],
};

export default config;