var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');
var watch = require ('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./prod/js'));
});

gulp.task('csstask', function () {
    var sourcemaps = require('gulp-sourcemaps');
    return gulp.src('./css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(sourcemaps.write('.'))
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./prod/css'));
});
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('css-watch', ['csstask'], browserSync.reload);
gulp.task('serve', ['js', 'csstask'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("css/*.css", ['css-watch']);
});


gulp.task('default', ['serve']);