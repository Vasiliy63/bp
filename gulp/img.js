'use strict';

var gulp = require('gulp'),
	config = require('./config'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),
	base64 = require('gulp-base64');


//sprite
gulp.task('sprite', function () {
	var spriteData = gulp.src(config.dev.img.sprite.src)
		.pipe(spritesmith({
			imgName: config.dev.img.sprite.imgName,
			cssName: config.dev.img.sprite.fileName,
			padding: 0, //px
			algorithm: 'binary-tree' //top-down, left-right
		}));
	var imgStream = spriteData.img
		.pipe(imagemin({
			optimizationLevel: 3, // default val
			progressive: true
		}))
		.pipe(gulp.dest(config.dev.img.sprite.imgDest));
	var cssStream = spriteData.css
		.pipe(gulp.dest(config.dev.img.sprite.fileDest));
	//return spriteData.pipe(gulp.dest('dev/img'));
});


//image min
gulp.task('img', function() {
	gulp.src(config.dev.img.original)
		.pipe(newer(config.dev.img.ready))
		.pipe(imagemin({
			optimizationLevel: 3, // default val
			progressive: true
		}))
		.pipe(gulp.dest(config.dev.img.ready));
});


//base64
gulp.task('base64', function () {
    return gulp.src(config.dev.img.base64.srcFile)
        .pipe(base64({
			baseDir: config.dev.img.base64.srcImg
		}))
        .pipe(gulp.dest(config.dev.img.base64.dest));
});
