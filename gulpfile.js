var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

gulp.task('mincss', function(){
return gulp.src('./css/style.css').pipe(minifyCss()).pipe(gulp.dest('./prod'));
});
gulp.watch('./prod/style.css', function(){
    return console.log('seen');
});

/*

 var gulp = require('gulp');
 var minifyCss = require('gulp-minify-css');
 var coffee = require('gulp-coffee');
 var paths = {
 css:['main.css'],
 script:['script.coffee']
 };

 gulp.task('mincss', function(){
 return gulp.src('main.css')
 .pipe(minifyCss())
 .pipe(gulp.dest('main'));
 });

 gulp.task('scripts', function(){
 return gulp.src(paths.script)
 .pipe(coffee())
 .pipe(gulp.dest('js'));
 });

 gulp.task('watcher',function(){
 gulp.watch(paths.css, ['mincss']);
 gulp.watch(paths.script, ['scripts']);
 });

 gulp.task('default', ['watcher', 'mincss','scripts']);

 */