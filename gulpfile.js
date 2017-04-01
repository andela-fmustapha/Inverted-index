const gulp = require('gulp');
const browserSync = require('browser-sync').create();
 const browserify = require('gulp-browserify');
 const rename = require('gulp-rename');
 const Server = require('karma').Server;

const reload = browserSync.reload;

gulp.task('watch', () => {
  gulp.watch('src/css/style.css', reload);
  gulp.watch('./gulpfile.js', reload);
  gulp.watch('src/js/*.js', reload);
  gulp.watch('src/index.html', reload);
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    port: 3010,
  });
});

gulp.task('browserify', () => {
  gulp.src('./spec/invertedSpec.js')
  .pipe(browserify())
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('test', (completed) => {
  new Server({
    configFile: `${__dirname}`
  });
});

gulp.task('default', ['watch', 'browser-sync']);
