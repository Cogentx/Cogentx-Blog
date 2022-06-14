module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cx-arrow': '#01B400',
        'cx-text-white':'#ffffff',
        'cx-bg-darkest': '#000000',
        'cx-bg-dark': '#111111',
        'cx-brd-dark': '#333333',
        'cx-gray-800': '#888888',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
