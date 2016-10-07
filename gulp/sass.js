'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	bulkSass = require('gulp-sass-bulk-import'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss'),
	//webpcss = require("webpcss"),
	lost = require('lost'),
	postcss_pe = require('postcss-pe');

gulp.task('sass', function () {

	gulp.src(path.dev.sass)
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(bulkSass())
	.pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
	.pipe(sourcemaps.write({includeContent: false}))
	.pipe(sourcemaps.init({loadMaps: true}))
	//.pipe(postcss([ lost, webpcss.default, postcss_pe ]))
	.pipe(postcss([ lost, postcss_pe ]))
	.pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: false }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(path.dev.css))
	.pipe(reload({stream: true}));
});
