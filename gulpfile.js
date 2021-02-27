const { src, dest, series } = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  critical = require('critical'),
  nano = require('gulp-cssnano'),
  del = require('del'),
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
    .pipe(nano())
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

function optimize(cb) {
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index-critical.html',
    css: ['css/main.css'],
    target: 'index.html',
    minify: true,
    width: 1440,
    height: 900,
  });
  cb();
}
const deleteAsset = (file) => {
  del([file]);
  return;
};
function deleteFromBuild(cb) {
  deleteAsset('./dist/index-critical.html');
  cb();
}
function defaultTask(cb) {
  cb();
}

exports.optimize = optimize;
exports.default = series(
  buildScript,
  buildCss,
  moveFonts,
  optimizeImg,
  buildHtml,
  optimize,
  deleteFromBuild
);
