/** @type {import('tailwindcss').Config} */
module.exports = {
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
    require("tailwindcss-animate"),
  ],
};
