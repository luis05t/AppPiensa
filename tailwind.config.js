/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-500": "#3B82F6",
        "gray-900": "#0F172A",
        "gray-500": "#64748B",
        "gray-400": "#94A3B8",
        "gray-200": "#E2E8F0",
      },
    },
  },
  plugins: [],
};
