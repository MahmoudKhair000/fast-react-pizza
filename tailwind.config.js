/** @type {import('tailwindcss').Config} */
/*eslint-disable*/
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // we can customize the default theme here,
    // for example we can add a new font family
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },

    extend: {
      // we can add custom colors,
      // for example we can add a new color for our pizza
      colors: {
        pizza: '#ffcc00',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
