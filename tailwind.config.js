const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: '#004966',
      secondary: '#A26769',
      'primary-text': colors.gray['900'],
      title: '#004966',
      subtitle: colors.gray['600'],
      header: '#092434',
      base: '#CAE5F6'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

// palette url https://coolors.co/f7f9f9-d9e8e8-78d5d7-004966-2285bf-a26769
