module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Spline Sans Mono', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        accent: 'rgba(255, 30, 79)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              'font-family': 'Syne',
            },
            a: {
              'font-family': 'Spline Sans Mono',
            },
            h2: {
              'font-family': 'Spline Sans Mono',
            },
            h3: {
              'font-family': 'Spline Sans Mono',
            },
            h4: {
              'font-family': 'Spline Sans Mono',
            },
            h5: {
              'font-family': 'Spline Sans Mono',
            },
            h6: {
              'font-family': 'Spline Sans Mono',
            },
            p: {
              'font-family': 'Spline Sans Mono',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
