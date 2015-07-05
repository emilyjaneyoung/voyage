var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	header = require('gulp-header'),
	sourcemaps = require('gulp-sourcemaps'),

paths = {
	scripts: [
		'src/js/vendor/*.js',
		'src/js/*.js'
	],
	images: [
		'img/*'
	],
	sass: [
		'src/scss/*.scss',
		'src/scss/helpers/*.scss',
		'src/scss/base/*.scss',
		'src/scss/important/*.scss',
		'src/scss/layout/*.scss',
		'src/scss/modules/*.scss',
		'src/scss/state/*.scss',
		'src/scss/*.scss'
	],
},

onError = function (err) {
	console.log(err);
};

// Sass
gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sass.sync({errLogToConsole: true}))
        .pipe(prefix(["last 2 version", "> 1%", "ie 8"], { cascade: true, safe: true, map: true, to: './style.css' }))
        .pipe(minifycss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});

// JavaScript
gulp.task('js', function () {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(plumber({ errorHandler: onError }))
		.pipe(uglify({mangle: true}))
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('js'));
});

// Image Minify
gulp.task('img', function () {
	return gulp.src(paths.images)
		.pipe(imagemin({ progressive: true, }))
		.pipe(gulp.dest('img'))
});

// Watch Files
gulp.task('watch', function () {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.scripts, ['js']);
	gulp.watch(paths.images, ['img']);
});


//gulp.task('doc', function() {
//	gulp.src('src/**/*.css')
//		.pipe(frontNote({
//			out: './doc',
//			template: './my-template',
//			overview: './overview.md',
//			includePath: 'assets/**/*'
//		}));

// Default
gulp.task('default', ['sass', 'js', 'img', 'watch']);
