'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	del = require('del');


gulp.task('default', ['jade', 'sass', 'js', 'browser-sync', 'watch']);

//remove gitkeep
gulp.task('gitkeep', function() {
	return del([config.dev.gitkeep]);
});
