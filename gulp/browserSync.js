'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: config.dev.server
		}
	});
});

