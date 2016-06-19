const gulp    = require('gulp');
const watch   = require('gulp-watch');
const less    = require('gulp-less');
const path    = require('path');
const babel   = require('gulp-babel');
const uglify  = require('gulp-uglify');


gulp.task('less', function () {
  return gulp.src('./public/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', () => {
	return gulp.src('./public/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function () {
    gulp.watch(['./public/less/*.less','./public/js/*.js'], ['less','babel']);
});