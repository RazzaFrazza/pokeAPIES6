'use strict'
// Require gulp
const gulp = require('gulp');
// Require gulp-babel
const babel = require('gulp-babel');
// Require gulp-sass
const sass = require('gulp-sass');

// Create a SASS task

gulp.task('_styles', function() {
  return gulp.src('./src/app.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('../dist/'))
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
		.pipe(gulp.dest('../dist/'));
});
// Create a default gulp task, this lets us type gulp into the terminal
// The ['es6'] tells gulp what task or tasks to run right away.
gulp.task('default', ['_es6'], ['_styles'], () => {
	// Tell gulp to watch for file changes on src/app.js
	// run the es6 task when it changes!
	gulp.watch('src/app.js',['_es6'])
  // Tell gulp to watch for file changes on src/app.scss
  // run the scss task when it changes!
  gulp.watch('src/app.scss',['_styles'])
});
