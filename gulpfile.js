var cssmin = require('gulp-minify-css');
uglify = require('gulp-uglify');
var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minifyHTML = require('gulp-minify-html');

var src = {
    root: "src/",
    // html 文件
    html: "src/**/*.html",
    //js文件
    js: "src/js/*.js",
    //modules
    modules: "src/modules/**/*",
    //框架
    vendor: "src/vendor/**/*",
    // css
    css: "src/css/**/*",
    // 图片
    assets: "src/assets/**/*"
};

var dist = {
    root: "public/**/*",
    html: "public/",
    js: "public/js",
    css: "public/css",
    modules: "public/modules",
    vendor: "public/vendor",
    assets: "public/assets"
};

var revPath = {
    js: "rev/js",
    css: "rev/css",
    assets:"rev/assets",
    json:"rev/**/*.json"
}

gulp.task("default", function() {
    delFile();
    dealJs();
    dealModuls();
    dealCss();
    dealAssets();
    dealVendor();
    dealHtml();
    // watch();
});

function watch() {
    gulp.watch(src.js, dealJs);
    gulp.watch(src.html, dealHtml);
    gulp.watch(src.css, dealCss);
}

/**
 * 复制modules里的所有文件
 * @return {[type]} [description]
 */
function dealModuls() {
    console.log("复制modules");
    return gulp.src(src.modules)
        .pipe(gulp.dest(dist.modules));
}

/**
 * 清除指定路径下的所有文件
 * @return {[type]}          [description]
 */
function delFile() {
    del.sync(dist.root);
    console.log("路径" + dist.root + "清除完成");
}

/**
 * 处理样式文件
 * @return {[type]}         [description]
 */
function dealCss() {
    console.log("处理css..");
    return gulp.src(src.css)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist.css))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revPath.css));
}

/**
 * 处理js文件
 * @return {[type]}         [description]
 */
function dealJs() {
    console.log("处理js..");
    return gulp.src(src.js)
        // .pipe(rename(function(path) {
        //     // path.dirname += "/ciao";
        //     path.basename += ".min";
        //     path.extname = ".js"
        // }))
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist.js))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revPath.js));
}

function dealHtml() {
    console.log("处理html..");
    return gulp.src([revPath.json, src.html])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(minifyHTML({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(dist.html));
}

/**
 * 拷贝框架
 * @return {[type]} [description]
 */
function dealVendor() {
    console.log("处理vendor..");
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}

/**
 * 拷贝图片等资源
 * @return {[type]} [description]
 */
function dealAssets() {
    console.log("处理assets..");
    return gulp.src(src.assets)
    .pipe(rev())
        .pipe(gulp.dest(dist.assets))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revPath.assets));
}
