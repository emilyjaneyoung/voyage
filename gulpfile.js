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
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    sassLint = require('gulp-sass-lint'),
    svg2png    = require('gulp-svg2png'),
    svgSymbols = require('gulp-svg-symbols'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,

    paths = {
        scripts: [
            'src/js/vendor/*.js',
            'src/js/*.js'
        ],
        images: [
            'img/*'
        ],
        icons: [
            'img/icons/**/*.svg'
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

/**
 * Error handling
 */
onError = function (err) {
    gutil.beep();
    console.log(err);
};

/**
 * Sass
 */
gulp.task('sass', function(){
    return gulp.src(paths.sass)
        //.pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass.sync({errLogToConsole: true}))
        .pipe(sassLint({
            'config': '.sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(prefix({
            browsers: ['last 4 version', 'ie 8', 'ie 7'],
            cascade: true
        }))
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(header(themeBanner, { theme : theme } ))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
});

/*
Sourcemaps Issues
https://github.com/floridoo/gulp-sourcemaps/issues/192
*/

/**
 * JavaScript
 */
gulp.task('js', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(uglify({mangle: true}))
        .pipe(concat('base.min.js'))
        .pipe(gulp.dest('js'));
});

/**
 * Image Minify
 */
gulp.task('img', function () {
    return gulp.src(paths.images)
        .pipe(imagemin({ progressive: true, }))
        .pipe(gulp.dest('img'))
});

/**
 * SVG PNG fallback task
 */
gulp.task('svg2png', function () {
    return gulp.src(paths.icons)
    .pipe(plumber({ errorHandler: onError }))
        .pipe(svg2png())
        .pipe(gulp.dest('img/icons/'))
});

/**
 * Sprites task
 */
gulp.task('sprites', ['svg2png'], function () {
    return gulp.src(paths.icons)
    .pipe(plumber({ errorHandler: onError }))
        .pipe(
            svgSymbols({
                title: false,
                templates: ['default-svg']
            })
        )
        .pipe( gulp.dest( 'img/icons/' ) )
});

/**
 * Browser Sync
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

/**
 * Watch Files
 */
gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']).on("change", reload);
    gulp.watch(paths.scripts, ['js']).on("change", reload);
    gulp.watch(paths.images, ['img']).on("change", reload);
    gulp.watch("*.html").on("change", reload);
});

/**
 * Default
 */
gulp.task('default', ['sass', 'js', 'img', 'watch', 'browser-sync']);
