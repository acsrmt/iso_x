var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function() {
    return gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.stream());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'dest'
        }
    });
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/**/*.*', ['fileinclude']);
    browserSync.watch('src/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', function() {
    return gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'));
});

gulp.task('fileinclude', function() {
    gulp.src(['src/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest/'))
        .pipe(browserSync.stream());
});

gulp.task('dev', ['less', 'fileinclude', 'browser-sync']);
