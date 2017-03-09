const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const  htmlmin = require('gulp-html-minifier');

gulp.task('html', function(){
  return gulp.src('./src/public/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('src/public'))
});

gulp.task('images', function() {
  return gulp.src('dist/public/assets/images/**/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/public/assets/images'));
});


gulp.task('css', function () {
  const postcss    = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  const processors = [
      require('lost'),
      require('rucksack-css'),
      require('csswring'),
      require('autoprefixer')
  ];
  return gulp.src('src/public/assets/styles/*.scss')
      .pipe(sass())
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('src/public/assets/styles'));
});

gulp.task('default', [ 'html', 'css']);
gulp.task('watch', [ 'html', 'css' ]);