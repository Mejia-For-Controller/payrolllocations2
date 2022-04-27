module.exports = {
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        'cucumis': '#1a1a1aee',
        'extracucumis': '#1a1a1a'
      },
        margin: {
          '3.8em': '3.8em',
          '3.5em': '3.5em',
          '3.9em': '3.9em',
          '5.5em': '5.5em',
          '4.5em': '4.5em',
          '6.5em': '6.5em',
          '6em': '6em',
          '8.7em': '8.7em',
          '9em': '9em',
          '12em': '12em',
          '10em': '10em',
          '15em': '15em',
          '14em': '14em',
          '16em': '16em',
          '9.5em': '9.5em'
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
