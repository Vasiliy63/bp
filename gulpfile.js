'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	bulkSass = require('gulp-sass-bulk-import'),
	jade = require('gulp-jade'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),
	base64 = require('gulp-base64'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	del = require('del'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber'),
	include = require('gulp-include'),
	uncss = require('gulp-uncss');

// Paths

var build = {
	root: 'build',
	css: 'buld/css',
	js: 'build/js',
	font: 'build/font',
	img: 'build/img'
}

var dev = {
	html: 'dev/html',
	css: 'dev/css',
	js: {
		src: 'dev/js/main.js',
		dest: 'dev/js/jsconcat'
	},
	img: {
		original: 'dev/img/original/*',
		ready: 'dev/img/ready/*',
		sprite: {
			src: 'dev/img/sprite/*.png',
			imgName: 'sprite.png',
			imgDest: 'dev/img/ready',
			fileName: '_--sprite.scss',
			fileDest: 'dev/sass/base'
		},
		base64: {
			srcImg: 'dev/img/base64',
			srcFile: 'dev/sass/base/_base64.scss',
			dest: 'dev/sass/base'
		}
	},
	font: ['dev/font/**/*', '!dev/font/**/*.{zip, rar}'],
	jade: 'dev/jade/pages/**/*.jade',
	sass: 'dev/sass/style.scss',
	server: './dev',
	gitkeep: 'dev/**/.gitkeep'
}

var watch = {
	jade: 'dev/jade/**/*.jade',
	sass: 'dev/sass/**/*.scss',
	js: ["dev/js/**/*.js", "!dev/js/compile"]
}



// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade', 'js'], function() {
    browserSync.init({
        server: dev.server
    });
	//watch
	gulp.watch(watch.sass, ['sass']);
	gulp.watch(watch.jade, ['jade']);
	gulp.watch(watch.js, ['js']);
    //gulp.watch("*.html").on('change', browserSync.reload);
});

//libsass + sourcemap + bulkSass(import) + autoprefixer + browsync + plumber + notify
gulp.task('sass', function () {
	gulp.src(dev.sass)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sourcemaps.init())
		.pipe(bulkSass())
		.pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: false }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dev.css))
		.pipe(browserSync.stream());
});

//jade + plumber + notify
gulp.task('jade', function() {
	gulp.src(dev.jade)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(dev.html))
		.pipe(browserSync.stream());
});

//js include
gulp.task('js', function() {
	gulp.src(dev.js.src)
		.pipe(include())
		.pipe(gulp.dest(dev.js.dest))
		.pipe(browserSync.stream());
});

//sprite + imagemin
//spriteData = 2 streams, img + css
gulp.task('sprite', function () {
	var spriteData = gulp.src(dev.img.sprite.src)
		.pipe(spritesmith({
			imgName: dev.img.sprite.imgName,
			cssName: dev.img.sprite.fileName,
			padding: 0, //px
			algorithm: 'binary-tree' //top-down, left-right
		}));
	var imgStream = spriteData.img
		.pipe(imagemin({
			optimizationLevel: 3, // default val
			progressive: true
		}))
		.pipe(gulp.dest(dev.img.sprite.imgDest));
	var cssStream = spriteData.css
		.pipe(gulp.dest(dev.img.sprite.fileDest));
	//return spriteData.pipe(gulp.dest('dev/img'));
});

//imagemin + newer
gulp.task('img', function() {
	gulp.src(dev.img.original)
		.pipe(newer(dev.img.ready))
		.pipe(imagemin({
			optimizationLevel: 3, // default val
			progressive: true
		}))
		.pipe(gulp.dest(dev.img.ready));
});

//base64
gulp.task('base64', function () {
    return gulp.src(dev.img.base64.srcFile)
        .pipe(base64({
			baseDir: dev.img.base64.srcImg
		}))
        .pipe(gulp.dest(dev.img.base64.dest));
});

//remove gitkeep
gulp.task('gitkeep', function() {
	return del([dev.gitkeep]);
});



//build
gulp.task('b', function () {
    var assets = useref.assets();

    gulp.src(dev.html + '/**/*.html')
        .pipe(assets)
		.pipe(assets.restore())
        .pipe(useref())
		.pipe(newer(build.root))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpif('*.css', uncss({
			html: [dev.html + '/**/*.html']
		})))
        .pipe(gulpif('*.css', minifyCss()))
		.pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(build.root));

	var path = [
		{
			src: dev.font,
			dest: build.font
		},
		{
			src: dev.img.ready,
			dest: build.img
		}
	];
	for (var i=0; i < path.length; i++) {
		gulp.src(path[i].src)
			.pipe(newer(path[i].dest))
			.pipe(gulp.dest(path[i].dest));
	}
});
gulp.task('b:del', function () {
	del(build.root);
});


gulp.task('default', ['serve']); // к serve добавить gitkeep
