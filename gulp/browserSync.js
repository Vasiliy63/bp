'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: path.dev.server
		}
	});
});

