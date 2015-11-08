'use strict';

module.exports = {

	// Paths
	build: {
		root: 'build',
		css: 'build/css',
		js: 'build/js',
		font: 'build/font',
		img: 'build/img'
	},

	dev: {
		server: './',
		font: ['dev/font/**/*', '!dev/font/**/*.{zip, rar}'],
		gitkeep: 'dev/**/.gitkeep',
		html: 'dev/html',
		css: 'dev/css',
		js: {
			src: 'dev/js/main.js',
			dest: 'dev/js/concat'
		},
		jade: 'dev/jade/pages/**/*.jade',
		sass: 'dev/sass/style.scss',

		img: {
			original: 'dev/img/original/*',
			ready: 'dev/img/ready',
			sprite: {
				src: 'dev/img/sprite/*.png',
				imgName: 'sprite.png',
				imgDest: 'dev/img/ready',
				fileName: '_sprite.scss',
				fileDest: 'dev/sass/base'
			},
			base64: {
				srcImg: 'dev/img/base64',
				srcFile: 'dev/sass/base/_base64.scss',
				dest: 'dev/sass/base'
			}
		}
	},

	watch: {
		jade: 'dev/jade/**/*.jade',
		sass: 'dev/sass/**/*.scss',
		js: ["dev/js/**/*.js", "!dev/js/concat/*"]
	}
}
