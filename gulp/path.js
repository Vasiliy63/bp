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
		jade: 'dev/block/page/**/*.jade',
		sass: 'dev/sass/style.scss',

		img: {
			original: 'dev/img/original/*',
			ready: 'dev/img/ready',
			sprite: {
				src: 'dev/img/sprite/*.png',
				imgName: 'sprite.png',
				imgDest: 'dev/img/ready',
				fileName: '_sprite.scss',
				fileDest: 'dev/block/#base'
			},
			base64: {
				srcImg: 'dev/img/base64',
				srcFile: 'dev/block/#base/_base64.scss',
				dest: 'dev/block/#base'
			}
		}
	},

	watch: {
		jade: ['dev/block/**/*.jade'],
		sass: ['dev/block/**/*.scss'],
		js: ["dev/js/**/*.js", "dev/block/**/*.js", "!dev/js/concat/*.js"]
	}
}
