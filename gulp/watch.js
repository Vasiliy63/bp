'use strict';

var gulp = require('gulp'),
	path = require('./path');

gulp.task('watch', function() {
	gulp.watch(path.watch.jade, ['jade']);
	gulp.watch(path.watch.sass, ['sass']);
	gulp.watch(path.watch.js, ['js']);
});
