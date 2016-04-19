var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');

var path = {
        src : 'css/site.scss',
        dist: 'dist',
        temp: 'temp',
        tempMinify: 'temp/*.css'
    };
    
var myScripts = 'js/*.js'; 

gulp.task('cleanTemp', function(){ 
    del([path.temp]);
});
  
gulp.task('sass', function(){ 
    gulp
        .src([path.src])
        .pipe(gulpSass())
        .pipe(gulp.dest(path.temp))
});

gulp.task('minifyCss', function(){ 
    gulp
        .src([path.tempMinify])
        .pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist))
});

gulp.task('minifyHtml', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.dist))
});

gulp.task('minifyScripts', function(){ 
    return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('cleanDist', function(){ 
    del([path.dist]);
});


gulp.task('default', ['cleanDist','sass','minifyCss','minifyHtml','minifyScripts','cleanTemp']);