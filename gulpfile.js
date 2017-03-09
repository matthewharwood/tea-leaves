const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const templatePath = './src/public/**/*.pug';
const cssPath = 'src/public/assets/styles/**/*.scss';

gulp.task('html', function(){
  return gulp.src(templatePath)
      .pipe(pug())
      .pipe(gulp.dest('src/public'))

});

gulp.task('images', () => {
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
  return gulp.src(cssPath)
      .pipe(sass())
      .pipe( sourcemaps.init() )
      .pipe( postcss(processors) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('src/public/assets/styles') )
});

gulp.task('default', ['html', 'css']);

gulp.task('watch', ()=> {
    gulp.watch(cssPath, ['css']);
    gulp.watch(templatePath, ['html']);
});