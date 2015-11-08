'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	include = require('gulp-include');

gulp.task('js', function() {
	gulp.src(path.dev.js.src)
		.pipe(include())
		.pipe(gulp.dest(path.dev.js.dest))
		.pipe(reload({stream: true}));
});
