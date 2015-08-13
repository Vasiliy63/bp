'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber');


gulp.task('jade', function() {
	gulp.src(config.dev.jade)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(config.dev.html))
		.pipe(reload({stream: true}));
});


