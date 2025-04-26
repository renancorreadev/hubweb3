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
        "hub-background": "#000508",
        "hub-primary": "#14F195",
        "hub-secondary": "#9945FF",
      },
      borderRadius: {
        lg: "1rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
