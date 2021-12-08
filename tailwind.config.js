const colors = require('tailwindcss/colors');

module.exports = {
   darkMode: 'class',
   mode: 'jit',
     listStyleType: false,
    purge: [
      "layouts/**/*.html",
    ],
    theme: {
	  screens: {
	    sm: "540px",
        md: "720px",
        lg:	"960px",
        xl:	"1140px"
	  },
      spacing: {
	    'auto': 'auto',
        'px': '1px',
	    '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '48px',
      },
	  colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        green: colors.green,
        indigo: colors.indigo,
        red: colors.red,
        yellow: colors.amber,
      },
      extend: {
        screens: {
          'print': {'raw': 'print'},
        },
        fontFamily: {
          'special': ['AlverataSb','sans-serif'],
        }
      }
    }
  }
