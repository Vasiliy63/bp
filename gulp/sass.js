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
	plumber = require('gulp-plumber'),
	webpcss = require("gulp-webpcss"),
	postcss = require('gulp-postcss'),
	lost = require('lost');

gulp.task('sass', function () {

	gulp.src(config.dev.sass)
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(bulkSass())
	.pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
	.pipe(sourcemaps.write({includeContent: false}))
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(webpcss())
	.pipe(postcss([ lost ]))
	.pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.dev.css))
	.pipe(reload({stream: true}));
});
