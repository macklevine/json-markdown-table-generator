'use strict';

var gulp = require('gulp');
var less = require('less');
var fs = require('fs');
var server = require('gulp-develop-server');
var minify = require('gulp-uglify');
var concat = require('gulp-concat');

//set up the watchers only once.
gulp.task('default', ['compile-less', 'build-javascript-dev', 'scoot-templates', 'start-server', 'watch-for-changes']);

gulp.task('compile-less', function(){
	fs.readFile('./client/less/main.less', 'utf-8', function (e, contents){
		less.render(contents, function (e, output){
			fs.writeFile('./client/build/main.css', output.css);
		});
	});
});

var javaScriptSources = [
	'./bower_components/angular/angular.js',
	'./bower_components/jquery/jquery.js',
	'./client/js/**/*.js'
];


gulp.task('build-javascript-dev', function() {
  return gulp.src(javaScriptSources)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./client/build/js'));
});

gulp.task('scoot-templates', function () {
	return gulp.src([
		'./client/html/*.html'
	])
	.pipe(gulp.dest('./client/build/'));
});


gulp.task('start-server', function() {
    server.listen( { path: './server/server.js' } );
});

gulp.task('buildJavaScriptRelease', function () {

});

gulp.task('watch-for-changes', function(){
	gulp.watch(['./client/js/**/*.js'], ['build-javascript-dev']);
	gulp.watch(['./client/html/**/*.html'], ['scoot-templates']);
	gulp.watch(['./server/**/*.js'], ['restart-server']);
	gulp.watch(['./client/less/*'], ['compile-less', 'restart-server']);
});

 
gulp.task('restart-server', server.restart);