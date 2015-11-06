var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var reload      = browserSync.reload;

gulp.task('mincss', function(){
return gulp.src('./css/style.css').pipe(minifyCss()).pipe(gulp.dest('./prod/css'));
});


var paths = {
 html:['index.html'],
 css:['./css/style.css'],
 script:['./js/main.js']
};

gulp.task('html', function(){
 gulp.src(paths.html)
     .pipe(reload({stream:true}));
});

gulp.task('watcher',function(){
 gulp.watch(paths.css, ['mincss']);
 gulp.watch(paths.script, ['scripts']);
 gulp.watch(paths.html, ['html']);
});

gulp.task('browserSync', function() {
 browserSync({
  server: {
   baseDir: "./"
  },
  port: 8080,
  open: true,
  notify: false
 });
});

gulp.task('default', ['watcher', 'browserSync']);
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