'use strict'
// Require gulp
const gulp = require('gulp');
// Require gulp-babel
const babel = require('gulp-babel');
// Require gulp-sass
const sass = require('gulp-sass');
// Require gulp-sequence
const sequence = require('gulp-sequence');

// Create a SASS task

gulp.task('_styles', () => {
  return gulp.src('./src/app.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});


// Create an es6 task
gulp.task('_es6', () => {
	// Return gulp.src with the src set to our src folder
	// we return here do that we indicate to gulp that this task is async
	return gulp.src('src/app.js')
		// We pipe the source into babel
		.pipe(babel({
			// We need to tell babel to use the babel-preset-es2015
			presets: ['es2015']
		}))
		// We then pipe that into gulp.dest to set a final destination
		// In this case a build folder
		.pipe(gulp.dest('dist'));
});

//Create a watch task
gulp.task('_watch', () => {
          gulp.watch('./src/app.js', ['_es6']),
          gulp.watch('./src/app.scss', ['_styles'])
});

// Create a default gulp task, this lets us type gulp into the terminal

gulp.task('default', sequence('_styles','_es6','_watch'));
