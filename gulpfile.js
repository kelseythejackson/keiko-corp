const { src, dest, series } = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  pug = require('gulp-pug');

sass.compiler = require('node-sass');

function buildHtml() {
  return src('./src/views/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./dist'));
}

function optimizeImg() {
  return src('./src/img/*').pipe(imagemin()).pipe(dest('./dist/img'));
}

function moveFonts() {
  return src('./src/fonts/**').pipe(dest('./dist/fonts'));
}

function buildCss() {
  return src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'));
}

function buildScript() {
  const path = './src/js/';
  return src([
    `${path}jquery.js`,
    `${path}ajaxchimp.js`,
    `${path}owl.carousel.min.js`,
    `${path}wow.js`,
    `${path}parallax.js`,
    `${path}nicescroll.js`,
    `${path}main.js`,
    `${path}scrollto.js`,
  ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(dest('./dist/js'));
}
function defaultTask(cb) {
  cb();
}

exports.default = series(
  buildScript,
  buildCss,
  moveFonts,
  optimizeImg,
  buildHtml
);
