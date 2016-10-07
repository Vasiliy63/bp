'use strict';

var gulp = require('gulp'),
	path = require('./path'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
    buffer = require('vinyl-buffer'),
	newer = require('gulp-newer'),
	base64 = require('gulp-base64');
	//webp = require('gulp-webp');


//sprite
gulp.task('sprite', function () {
	var spriteData = gulp.src(path.dev.img.sprite.src)
		.pipe(spritesmith({
			imgName: path.dev.img.sprite.imgName,
			cssName: path.dev.img.sprite.fileName,
			padding: 5, //px
			algorithm: 'binary-tree' //top-down, left-right
		}));
	var imgStream = spriteData.img
        .pipe(buffer())
		.pipe(imagemin({
			optimizationLevel: 3, // default val
			progressive: true
		}))
		.pipe(gulp.dest(path.dev.img.sprite.imgDest));
		//.pipe(webp())
		//.pipe(gulp.dest(path.dev.img.sprite.imgDest));
	var cssStream = spriteData.css
		.pipe(gulp.dest(path.dev.img.sprite.fileDest));
	//return spriteData.pipe(gulp.dest('dev/img'));
});


//image min + webp
gulp.task('img', function() {
	gulp.src(path.dev.img.original)
	.pipe(newer(path.dev.img.ready))
	.pipe(imagemin({
		optimizationLevel: 3, // default val
		progressive: true
	}))
	.pipe(gulp.dest(path.dev.img.ready));
	//.pipe(webp())
	//.pipe(gulp.dest(path.dev.img.ready));
});


//base64
gulp.task('base64', function () {
    return gulp.src(path.dev.img.base64.srcFile)
        .pipe(base64({
			baseDir: path.dev.img.base64.srcImg
		}))
        .pipe(gulp.dest(path.dev.img.base64.dest));
});
