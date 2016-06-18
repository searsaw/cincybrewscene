var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./public/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
    gulp.watch(['./public/less/*.less'], ['less']);
});