import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import UnoCSS from '@unocss/vite';
// import UnocssPlugin from '@unocss/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    UnoCSS({
      theme: {
        breakpoints: {
          xs: '320px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
          xxl: '1920px',
        },
      },
      rules: [
        ['x-a', { 'width': '38%' }],
        ['mh-a', { 'max-height': '68%' }],

        ['x-b', { 'width': '28%' }],
        ['mh-b', { 'max-height': '50%' }],

        // ['x-b', { 'width': '28vw' }],
        // ['mh-b', { 'max-height': '50%' }],

        ['th-p', { 'gap': '10%' }],
        ['bgcw', { 'background-color': '#FFFFFF' }],


        ['t-sm', { 'font-size': '1.125rem' }],
        ['t-md', { 'font-size': '1.962rem' }],
        ['t-lg', { 'font-size': '2.8rem' }],
        ['ls-sm', { 'letter-spacing': '-0.05rem' }],
        ['ls-md', { 'letter-spacing': '-0.0325rem' }],
        ['ls-lg', { 'letter-spacing': '-0.015rem' }],

      ],
      shortcuts: {
        'width-a': 'x-a mh-a p-1 h-auto object-contain',
        'width-b': 'x-b mh-b p-1 h-auto object-contain',
        'text-sm': 't-sm ls-sm',
        'text-md': 't-md ls-md',
        'text-lg': 't-lg ls-lg',
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
