module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cx-arrow': '#01B400',
        'cx-white':'#ffffff',
        'cx-darkest': '#000000',
        'cx-dark-1': '#111111',
        'cx-dark-3': '#333333',
        'cx-dark-8': '#888888',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
