const gulp = require('gulp'),
	babel = require('gulp-babel');

// gulp.task('moveHTML', function() {
// 	return gulp.src('src/*.html').pipe(gulp.dest('dist'));
// });

// gulp.task('js', function() {
// 	return gulp.src('src/*.js').pipe(babel()).pipe(gulp.dest('dist'));
// });

// const { series } = require('gulp'),
// 	babel = require('gulp-babel');

function moveHTML() {
	//where the file is
	return (
		gulp
			.src('src/*.html')
			//where I save
			.pipe(gulp.dest('dist'))
	);
}

function js() {
	//where the file is
	return (
		gulp
			.src('src/*.js')
			// compile
			.pipe(babel())
			//where I save
			.pipe(gulp.dest('dist'))
	);
}

// exports.build = series(moveHTML, js);

exports.moveHTML = moveHTML;
exports.js = js;
