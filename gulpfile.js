var gulp = require('gulp');
var using = require('gulp-using');
var grep = require('gulp-grep');
var changed = require('gulp-changed');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin'); // TODO 1 : Install with 'npm install gulp-imagemin' and import it
var sass = require('gulp-sass');

var paths = {
  dirs: {
    build: {
      root: 'build',
      css: 'build/css',
      images: 'build/images'
    }
  },
  images: 'images/**/*.{JPG,jpg,png,gif,svg}',
  sass: 'sass/**/*.scss',
};

// TODO 2 : Configure imagemin

/*
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: false
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest(paths.dirs.build.images));
});
*/

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(using({
      prefix: 'After changed:'
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(changed(paths.dirs.build.css))
    .pipe(sourcemaps.write('.', {
      sourceRoot: '/'
    }))
    .pipe(gulp.dest(paths.dirs.build.css));
});

// TODO 3

gulp.task('app', gulp.parallel(/*'images',*/ 'sass')); // TODO 3 : Execute imagemin
gulp.task('all', gulp.parallel('app'));
gulp.task('build', gulp.series('all'));


// Default task
gulp.task('default', gulp.series('build'));
