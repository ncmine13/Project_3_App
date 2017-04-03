var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

gulp.task('react', function(){
return browserify('./client/clientReact/main.js')
        .transform('babelify', {presets: ["react"]})
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./server/public/js/build'))
})

gulp.task('watch', function(){
  gulp.watch(['./client/clientReact/*.js'], ['react'])
})

gulp.task('default', ['react', 'watch'])
