module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'black-light': '#111',
        primary: '#ca9066',
        'primary-dark': '#8f5831',
        'primary-light': '#ffcda9',
        'primary-loud': '#c25c3d',
        'primary-louder': '#cf380a',
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
