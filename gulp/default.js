'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	del = require('del');
var postcss = require('gulp-postcss');
var pixrem = require('pixrem');

gulp.task('default', ['jade', 'sass', 'js', 'browser-sync', 'watch']);

//remove gitkeep
gulp.task('gitkeep', function() {
	return del([config.dev.gitkeep]);
});


gulp.task('post', function() {
	var processors = [pixrem];
	return gulp.src('dev/css/style.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest('dev/css/new'));
});

