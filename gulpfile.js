const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const util = require("gulp-util");
const changed = require("gulp-changed");
const templatePath = './src/public/**/*.pug';
const cssPath = 'src/public/assets/styles/**/*.scss';

gulp.task('html', function(){
  let nSrc=0, nDes=0;
  return gulp.src(templatePath)
      .pipe(pug())
      .pipe(gulp.dest('src/public'))
      .pipe(browserSync.stream())
      .on("data", function() { nDes+=1;})
      .on("finish", function() {
          util.log("Results: src/public/**/*.pug");
          util.log("# src files: ", nSrc);
          util.log("# dest files:", nDes);
      });

});

gulp.task('images', () => {
  let nSrc=0, nDes=0;
  return gulp.src('dist/public/assets/images/**/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/public/assets/images'))
      .on("data", function() { nDes+=1;})
      .on("finish", function() {
          util.log("Results: dist/public/assets/images/**/*");
          util.log("# src files: ", nSrc);
          util.log("# dest files:", nDes);
      })
      .pipe(browserSync.stream());
});


gulp.task('css', function () {
  const postcss    = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  let nSrc=0, nDes=0;

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
      .pipe( gulp.dest('src/public/assets/styles'))
      .pipe(browserSync.stream())
      .on("data", function() { nDes+=1;})
      .on("finish", function() {
          util.log("Results for app/**/*.js");
          util.log("# src files: ", nSrc);
          util.log("# dest files:", nDes);
      }).on('change', browserSync.reload);

});

gulp.task('default', ['html', 'css']);

gulp.task('browser-sync', ()=> {
    browserSync({
        proxy: "localhost:8080",  // local node app address
        port: 6969,  // use *different* port than above
        notify: true
    });
});

gulp.task('watch', ['css', 'html', 'browser-sync'], ()=> {
    gulp.watch(cssPath, ['css']);
    gulp.watch(templatePath, ['html']);
});

