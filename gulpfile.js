var gulp     = require('gulp');
var sass     = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var gcmq     = require('gulp-group-css-media-queries');
var cssmin   = require('gulp-cssmin');
var uglify   = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var svgmin   = require('gulp-svgmin');
var svgstore = require('gulp-svgstore')
var rigger   = require('gulp-rigger');
var inject   = require('gulp-inject');
var notify   = require('gulp-notify');
var plumber  = require('gulp-plumber');
var path     = require('path');

var errorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('css', function () {
  // Styles
  gulp.src('./src/assets/scss/styles.scss')
      .pipe(plumber(errorHandler))
      .pipe(sass())
      .pipe(prefixer())
      .pipe(gcmq())
      .pipe(cssmin({
        keepSpecialComments: 0
      }))
      .pipe(gulp.dest('./build/assets/css/'));
});

gulp.task('js', function () {
  // Scripts
  gulp.src('./src/assets/js/scripts.js')
      .pipe(plumber(errorHandler))
      .pipe(rigger())
      .pipe(uglify())
      .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('img', function () {
  // Images
  gulp.src('./src/assets/img/**/*.{gif,jpg,png,svg}')
      .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest('./build/assets/img/'));
});

gulp.task('svg', function () {
  // Svg files
  gulp.src('./src/assets/svg/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('./build/assets/svg/'));

  // Sprite
  gulp.src('./src/assets/svg/sprite/*.svg')
      .pipe(svgmin(function (file) {
          var prefix = path.basename(file.relative, path.extname(file.relative));
          return {
              plugins: [{
                  cleanupIDs: {
                      prefix: prefix + '-',
                      minify: false
                  }
              }]
          }
      }))
      .pipe(svgstore())
      .pipe(gulp.dest('./build/assets/svg/'));
});

gulp.task('html', function () {
  var sprite = gulp.src('./build/assets/svg/sprite.svg');

  function fileContents (filePath, file) {
      return file.contents.toString();
  }

  // HTML pages
  gulp.src('./src/*.html')
      .pipe(inject(sprite, { 
        transform: fileContents,
        removeTags: true 
      }))
      .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/assets/scss/**/*.scss', ['css']);
  gulp.watch('./src/assets/js/**/*.js', ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'img', 'svg', 'watch']);
