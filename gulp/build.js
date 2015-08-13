'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	del = require('del'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	newer = require('gulp-newer'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	uncss = require('gulp-uncss');


//clean build
gulp.task('build:del', function () {
	del(config.build.root);
});

//build
gulp.task('build', function () {
    var assets = useref.assets();

    gulp.src(config.dev.html + '/**/*.html')
        .pipe(assets)
		.pipe(assets.restore())
        .pipe(useref())
		.pipe(newer(config.build.root))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpif('*.css', uncss({
			html: [config.dev.html + '/**/*.html']
		})))
        .pipe(gulpif('*.css', minifyCss()))
		.pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(config.build.root));

	var path = [
		{
			src: config.dev.font,
			dest: config.build.font
		},
		{
			src: config.dev.img.ready,
			dest: config.build.img
		}
	];
	for (var i=0; i < path.length; i++) {
		gulp.src(path[i].src)
			.pipe(newer(path[i].dest))
			.pipe(gulp.dest(path[i].dest));
	}
});

