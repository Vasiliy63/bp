'use strict';

var gulp = require('gulp'),
	config = require('./config');

gulp.task('watch', function() {
	gulp.watch(config.watch.jade, ['jade']);
	gulp.watch(config.watch.sass, ['sass']);
	gulp.watch(config.watch.js, ['js']);
});
