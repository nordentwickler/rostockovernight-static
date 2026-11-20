const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.setPublicPath('public/');
mix.js('src/scripts/app.js', 'assets/js').vue();
mix.extract(['vue', 'vue-easy-lightbox']);

mix.sass('src/styles/app.scss', 'assets/css/')
  .options({
    processCssUrls: false,
    postCss: [
      tailwindcss,
    ],
    autoprefixer: {
      options: {
        browsers: [
          'last 4 versions',
        ]
      }
    }
  });
