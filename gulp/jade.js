'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber');


gulp.task('jade', function() {
	gulp.src(path.dev.jade)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(path.dev.html))
		.pipe(reload({stream: true}));
});


