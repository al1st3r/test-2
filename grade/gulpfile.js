var gulp = require('gulp');

var crashOnError = true;

function catchCompileError(message) {
  return function(error) {
    console.log(message + ' Error:');
    console.log(error);

    if (!crashOnError) {
      this.emit('end');
    }
  }
}

gulp.task('libraries-js', function () {
  return gulp
    .src(
      [
        'node_modules/js-polyfills/polyfill.js',
        'node_modules/object-fit-images/dist/ofi.min.js',
        'node_modules/html5shiv.min.js',
      ],
      { base: 'node_modules' }
    )
    .pipe(gulp.dest('./bundles/assets/libs'));
});

gulp.task('libraries-css', function () {
  return gulp
    .src(
      [
        'node_modules/select2/dist/css/select2.min.css'
      ],
      { base: 'node_modules' }
    )
    .pipe(gulp.dest('./bundles/assets/libs'));
});

gulp.task('libraries-build', ['libraries-js', 'libraries-css']);

gulp.task('pages', function () {
  const twig = require('gulp-twig');

  return gulp.src('./html/pages/*.twig')
    .pipe(twig({ cache: false, extname: '.html' }))
    .on('error', catchCompileError('JS compile error.'))
    .pipe(gulp.dest('./bundles'));
});

gulp.task('css', function () {
  const sass = require('gulp-sass');
  const postcss = require('gulp-postcss');

  return gulp
    .src('./html/style.scss')
    .pipe(sass().on('error', sass.logError))
    .on('error', catchCompileError('SCSS compile error.'))
    .pipe(postcss([
      require('autoprefixer')({ grid: true }),
      require('postcss-object-fit-images')
    ]))
    .pipe(gulp.dest('./bundles/assets'));
});

gulp.task('js', ['libraries-build'], function () {
  const concat = require('gulp-concat');
  const babel = require('gulp-babel');

  return gulp.src([
    './html/components/object-fit-images/object-fit-images.js',
    './html/components/header/header.js',
    './html/components/rel-version/rel-version.js',
    './html/components/rel-info/rel-info.js',
    './html/components/resselers/resselers.js',
    './html/components/hero-block/hero-block.js',
    './html/components/single-industry/single-industry.js',
    './html/components/tutorials/tutorials.js',
    './html/components/downloads/downloads.js',
    './html/components/tutorials/tutorials.js',
    './html/components/industry-demo/industry-demo.js',
    './html/components/news/news-article.js',
    './html/components/сustomers&Industries/сustomers&industries.js',
    './html/components/testimonials/testimonials.js',
    './html/components/counter/counter.js',
    './html/components/progress-bar/progress-bar.js',
    './html/components/hero/hero.js',
    './html/components/start/start.js',

  ])
    .pipe(concat('components.js', { newLine: '\r\n' }))
    .pipe(babel({
      babelrc: false,
      presets: ['es2015', 'stage-2']
    }))
    .pipe(gulp.dest('./bundles/assets'))
});

gulp.task('watch', function () {
  "use strict";

  // Do not stop watch when error.
  crashOnError = false;

  gulp.watch('./html/**/**.js', ['js']);
  gulp.watch('./html/**/**.scss', ['css']);
  gulp.watch('./html/**/**.twig', ['pages']);
});

gulp.task('build', ['libraries-build', 'css', 'js', 'pages']);
gulp.task('start', ['build', 'watch']);
