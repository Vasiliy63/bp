'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace-path'),
	newer = require('gulp-newer'),
	sass = require('gulp-sass'),
	bulkSass = require('gulp-sass-bulk-import'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade');


//clean build
gulp.task('build:del', function () {
	del(config.build.root);
});

//build
gulp.task('build', function () {

	gulp.src(config.dev.sass)
	.pipe(bulkSass())
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: false }))
	.pipe(replace('../img/ready', '../img'))
	.pipe(gulp.dest(config.build.css))

	gulp.src(config.dev.jade)
	.pipe(jade())
	.pipe(replace('../img/ready', 'img'))
	.pipe(replace('../css', 'css'))
	.pipe(replace('../js/jsconcat', 'js'))
	.pipe(replace('../components/modernizr', 'js'))
	.pipe(gulp.dest(config.build.root))

	gulp.src(config.dev.js.dest + '/*')
	.pipe(uglify())
	.pipe(gulp.dest(config.build.js))

	gulp.src('dev/components/modernizr/modernizr.js')
	.pipe(gulp.dest(config.build.js));

	var path = [
		{
			src: config.dev.font,
			dest: config.build.font
		},
		{
			src: config.dev.img.ready + '/*',
			dest: config.build.img
		}
	];
	for (var i=0; i < path.length; i++) {
		gulp.src(path[i].src)
			.pipe(newer(path[i].dest))
			.pipe(gulp.dest(path[i].dest));
	}
});
