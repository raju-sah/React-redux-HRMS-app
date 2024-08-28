/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        secondary: '#f59e0b',
        danger: '#ef4444',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
