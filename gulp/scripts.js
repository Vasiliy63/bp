'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	include = require('gulp-include');

gulp.task('js', function() {
	gulp.src(config.dev.js.src)
		.pipe(include())
		.pipe(gulp.dest(config.dev.js.dest))
		.pipe(reload({stream: true}));
});
