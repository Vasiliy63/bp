'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	del = require('del');

gulp.task('default', ['jade', 'sass', 'js', 'browser-sync', 'watch']);

//remove gitkeep
gulp.task('gitkeep', function() {
	return del([path.dev.gitkeep]);
});
