module.exports = {
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        margin: {
          '3.8em': '3.8em',
          '3.9em': '3.9em',
          '5.5em': '5.5em',
          '4.5em': '4.5em',
          '6.5em': '6.5em',
          '9em': '9em',
          '12em': '12em',
          '10em': '10em'
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
