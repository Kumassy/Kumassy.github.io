var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-ruby-sass');
var plumber     = require('gulp-plumber');
var babel = require('gulp-babel');

var ROOT = './';
var SCSS = {
  src : ROOT + '_scss/**/*.scss',
  dist: ROOT + 'css/'
};

/* 更新を監視するファイル群 */
var reloadWatchPaths = [
  ROOT + '**/*.css',
  ROOT + '**/*.js',
  ROOT + '**/*.html'
];


/* static server */
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: ROOT,
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      },
      directory: false
    },
    open: false,
    notify: false,
    port: 9999  // localhost:8001
  });
});


/* sass */
gulp.task('sass', function () {
  return sass(SCSS.src, {
      style: 'expanded',
      stopOnError: false,
      cacheLocation: './sass-cache'
    })
    .pipe(plumber())
    .pipe(gulp.dest(SCSS.dist));
});

gulp.task('js', function() {
  gulp.src('_js/**/*.js') // 読み込むファイル
    .pipe(babel()) // babelを実行
    .pipe(gulp.dest('js/')); // 出力先
});



/* watch */
/* htmlファイルはhtmlとして正しい形式（タグ）が入っていないと動作しないので注意 */
gulp.task('watch', function() {
  gulp.watch(SCSS.src, ['sass']);
  gulp.watch('_js/**/*.js', ['js']);
  gulp.watch(reloadWatchPaths).on('change', browserSync.reload);
});


// CI -> $ gulp
gulp.task('default', ['server', 'sass', 'js', 'watch']);
