
  let mix = require('laravel-mix');

  mix.browserSync('http://127.0.0.1:8000')
     .disableNotifications()

     // Application
     .js('resources/assets/app/js/app.js', 'public/app/js')
     .sass('resources/assets/app/sass/app.scss', 'public/app/css')

     // Embeddable Widget
     .js('resources/assets/widget/js/app.js', 'public/widget/')
     .sass('resources/assets/widget/sass/app.sass', 'public/widget/');
