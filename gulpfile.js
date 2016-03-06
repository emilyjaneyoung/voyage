var gulp = require('gulp'),
    xo = require('gulp-xo'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    header = require('gulp-header'),
    gutil = require('gulp-util'),
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

    theme = require('./theme.json'),
        themeBanner = [
            '/*',
            'Theme Name: <%= theme.name %>',
            'Theme URI: <%= theme.uri %>',
            'Author: <%= theme.author %>',
            'Description: <%= theme.description %>',
            'Version: <%= theme.version %>',
            'License: <%= theme.license %>',
            '*/',
            '',
            '',
        ].join('\n');

// Error handling
onError = function (err) {
    gutil.beep();
    console.log(err);
};

// Sass
gulp.task('sass', function(){
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass.sync({errLogToConsole: true}))
        .pipe(prefix({
            browsers: ['last 4 version', 'ie 8', 'ie 7'],
            cascade: true
        }))
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(header(themeBanner, { theme : theme } ))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
});

// JavaScript
gulp.task('js', function () {
    return gulp.src(paths.scripts)
        .pipe(xo())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(uglify({mangle: true}))
        .pipe(concat('base.min.js'))
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

// Default
gulp.task('default', ['sass', 'js', 'img', 'watch']);

