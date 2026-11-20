const fs = require('fs');
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

if (mix.inProduction()) {
  mix.version();
}

// The HTML is static, so the cache-busting ids have to be written into it after every build.
mix.then(() => {
  const manifest = JSON.parse(fs.readFileSync('public/mix-manifest.json', 'utf8'));

  for (const file of fs.readdirSync('public').filter(name => name.endsWith('.html'))) {
    let html = fs.readFileSync(`public/${file}`, 'utf8');

    for (const [path, versionedPath] of Object.entries(manifest)) {
      html = html.replaceAll(new RegExp(`${path.replaceAll('.', '\\.')}(\\?id=\\w+)?(?=")`, 'g'), versionedPath);
    }

    fs.writeFileSync(`public/${file}`, html);
  }
});
