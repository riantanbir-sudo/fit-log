/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f1115",
        surface: "#15171d",
        surface2: "#1b1f28",
        line: "#222630",
        accent: "#ccff00",
        muted: "#9ca3af",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
