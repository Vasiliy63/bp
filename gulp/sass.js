'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	bulkSass = require('gulp-sass-bulk-import'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber');


gulp.task('sass', function () {
	gulp.src(config.dev.sass)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sourcemaps.init())
		.pipe(bulkSass())
		.pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: false }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dev.css))
		.pipe(reload({stream: true}));
});