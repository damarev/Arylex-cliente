var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();
var sass           = require('gulp-sass');
var nunjucks       = require('gulp-nunjucks');
var nunjucksRender = require('gulp-nunjucks-render');
var sourcemaps     = require('gulp-sourcemaps');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});


gulp.task('nunjucks', function() {

  var manageEnvironment = function(environment) {
    environment.addGlobal('globalTitle', 'My global title');
    environment.addFilter('slug', function(str) {
      return str && str.replace(/\s/g, '-', str).toLowerCase();
    });
  }

  return gulp.src('app/pages/**/*.+(html|nunjucks)')
    // Adding data to Nunjucks
    //.pipe(data(function() {
    //  return require('./app/data.json')
    //}))
    .pipe(nunjucksRender({
        path: 'app/templates/',
        manageEnv: manageEnvironment
    }))
    .pipe(gulp.dest('app'))
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app",
        online: false,
        directory: true,
        open: true
    });

    gulp.watch(['app/pages/**/*.+(html|nunjucks)','app/templates/**/*.+(html|nunjucks)'], ['nunjucks']);
    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
