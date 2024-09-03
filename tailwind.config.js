/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: '#18191a',
        primary: '#021526',
        secondary: '#f59e0b',
        danger: '#ef4444',
        buttonHover: '#f59e0b'
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
