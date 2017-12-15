/**
 * Created by jiangyang on 16/8/25.
 */
var gulp = require("gulp");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
//build
gulp.task("view", function() {
    return gulp.src("src/views/*.html")
        .pipe(gulp.dest("dist/views"))
});
gulp.task("style", function() {
    return gulp.src("src/static/style/*.less")
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['Firefox >= 20', '> 5%', 'last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("dist/static/style"))
});
gulp.task("script", function() {
    return gulp.src("src/static/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/static/js"))
});
gulp.task("vendor", function() {
    return gulp.src("src/static/vendor/*")
        .pipe(gulp.dest("dist/static/vendor"))
});
gulp.task("img", function() {
    return gulp.src("src/static/img/*")
        .pipe(gulp.dest("dist/static/img"))
});
//dev
gulp.task("view: dev", function() {
    return gulp.src("src/views/*.html")
        .pipe(gulp.dest("dist/views"))
});
gulp.task("style: dev", function() {
    return gulp.src("src/static/style/*.less")
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['Firefox >= 20', '> 5%', 'last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("dist/static/style"))
        .pipe(reload({
            stream: true
        }))
});
gulp.task("script: dev", function() {
    return gulp.src("src/static/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/static/js"))
});
gulp.task("img: dev", function() {
    return gulp.src("src/static/img/*")
        .pipe(gulp.dest("dist/static/img"))
});
gulp.task("vendor: dev", function() {
    return gulp.src("src/static/vendor/*")
        .pipe(gulp.dest("dist/static/vendor"))
});

gulp.task('dev', ['view: dev', 'style: dev', 'script: dev', 'vendor: dev', 'img: dev'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false
    });
    gulp.watch('src/static/js/*.js', ['script: dev']);
    gulp.watch('src/static/style/*.less', ['style: dev']);
    gulp.watch('src/views/*.html', ['view: dev']);
    gulp.watch('src/static/img/*', ['img: dev']);
    gulp.watch('src/static/vendor/*', ['vendor: dev'])
});

gulp.task('build', ['view', 'style', 'script', 'vendor', 'img']);