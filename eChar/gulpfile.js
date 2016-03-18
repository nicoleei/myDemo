// 获取 gulp
var gulp = require('gulp')
// 获取 gulp-ruby-sass 模块
var sass = require('gulp-ruby-sass')

var watch = require('gulp-watch');

var concat = require('gulp-concat');

var minifyCss = require('gulp-minify-css');

var jade = require('gulp-jade');

var babel = require('gulp-babel');

gulp.task('babel', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dest/js'))
);

gulp.task('sass', function() {
    return sass('src/sass/*.scss',{
      sourcemap: false,
      trace: false
    }) 
    .pipe(gulp.dest('dest/css'))
});

gulp.task('styles', function() {  
    gulp.src(['dest/css/*.css'])  
        .pipe(concat('dist.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('public/'));  
});

gulp.task('default', function() {
  gulp.watch('src/sass/*.scss', ['sass']);
  // gulp.watch('dest/*.css', ['styles']);
  // gulp.watch('./*.js', ['js']);
  gulp.watch('src/jade/*.jade',['templates']);

  gulp.watch('src/js/*.js', ['babel']);
})




gulp.task('js', function() {
  return gulp.src(['test1.js','test2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('totaljs/'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('src/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('dest/'))
});