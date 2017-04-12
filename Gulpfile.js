var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');
var less = require('gulp-less');

gulp.task('react', function(){
return browserify('./client/clientReact/main.js')
        .transform('babelify', {presets: ["react"]})
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./server/public/js/build'))
})

gulp.task('compile-less', function(){
	gulp.src('./server/public/styles/styles.less')
	//pipe(less()) below is less because it's our above variable
	.pipe(less())
	.pipe(gulp.dest('./server/public/styles'))
})

gulp.task('watch', function(){
	//first argument is an array of files to watch
	//second arg is an array of tasks to run (what it's gonna do)
	//* is telling gulp to watch ever file in the folder with an extension of .less
	gulp.watch(['./server/public/styles/*.less'], ['compile-less'])
	gulp.watch(['./client/clientReact/*.js'], ['react'])
})

gulp.task('default', ['react', 'watch', 'compile-less'])
