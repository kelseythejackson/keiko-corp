const { src, dest } = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

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
    .pipe(dest('./js'));
}
function defaultTask(cb) {
  cb();
}

exports.default = buildScript;
