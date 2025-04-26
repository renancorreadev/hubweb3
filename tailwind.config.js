/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
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
