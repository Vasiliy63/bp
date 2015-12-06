'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace-path'),
	newer = require('gulp-newer'),
	sass = require('gulp-sass'),
	bulkSass = require('gulp-sass-bulk-import'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade'),
	postcss = require('gulp-postcss'),
	webpcss = require("webpcss"),
	lost = require('lost');


//clean build
gulp.task('build:del', function () {
	del(path.build.root);
});

//build
gulp.task('build', function () {

	gulp.src(path.dev.sass)
	.pipe(bulkSass())
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(replace('../img/ready', '../img'))
	.pipe(postcss([ lost, webpcss.default ]))
	.pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: false }))
	.pipe(gulp.dest(path.build.css));

	gulp.src(path.dev.jade)
	.pipe(jade())
	.pipe(replace('../img/ready', 'img'))
	.pipe(replace('../css', 'css'))
	.pipe(replace('../js/concat', 'js'))
	.pipe(replace('../components/modernizr', 'js'))
	.pipe(gulp.dest(path.build.root));

	gulp.src(path.dev.js.dest + '/*.js')
	.pipe(uglify())
	.pipe(gulp.dest(path.build.js));

	gulp.src('dev/components/modernizr/modernizr.js')
	.pipe(gulp.dest(path.build.js));

	var copyPath = [
		{
			src: path.dev.font,
			dest: path.build.font
		},
		{
			src: path.dev.img.ready + '/*',
			dest: path.build.img
		}
	];
	for (var i=0; i < copyPath.length; i++) {
		gulp.src(copyPath[i].src)
			.pipe(newer(copyPath[i].dest))
			.pipe(gulp.dest(copyPath[i].dest));
	}
});
