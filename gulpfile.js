var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

gulp.task('jade', function() {
  return gulp.src('templates/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  return gulp.src('sass/main.sass')
    .pipe(plumber())
    .pipe(sass({ 
      indentedSyntax: true,
      sourceMap: true,
      outputStyle: 'compressed' 
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('compress', function() {
  return gulp.src('javascript/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/javascript'));
});

gulp.task('imagemin', function() {
  return gulp.src('images/**/*.png')
   .pipe(imagemin())
   .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
  gulp.watch('templates/**/*.jade', ['jade']);
  gulp.watch('sass/**/*.sass', ['sass']);
});

gulp.task('connect', function(){
  connect.server({
    root: __dirname + '/dist',
    livereload: true 
  })
});

gulp.task('start', ['sass', 'jade', 'compress', 'imagemin', 'watch', 'connect']);
