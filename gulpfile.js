'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
    

var config = {
  server: {
    baseDir: "./build"
  },
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

var path = {
  src: {
    html: 'src/*.html',
    js: 'src/js/index.js',
    style: 'src/less/main_style.less',
    img: 'src/img/**/*.*'
  },
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/less/**/*.less',
    img: 'src/img/**/*.*'
  }
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});


gulp.task('js:build', function () {
   gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(rigger())
    .pipe(less())
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'image:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
      gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
      gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
      gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
      gulp.start('image:build');
  });
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('default', [
  'build', 
  'webserver',
  'watch'
]);