
const PROJECT_FOLDER = 'dist';
const SOURCE_FOLDER = 'src';

//подключение модулей для работы
const {src,dest,series,parallel,watch} = require('gulp'),
    browser = require('browser-sync').create(),
    fileInclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    connect = require('gulp-connect')

//пути для source и project версии
const path = {
    build: {
        html: `${PROJECT_FOLDER}/` ,
        css: `${PROJECT_FOLDER}/css/`  ,
        js: `${PROJECT_FOLDER}/js/`,
    },
    src: {
        html:[`${SOURCE_FOLDER}/*.html`,`!${SOURCE_FOLDER}/_*.html`],
        css:`${SOURCE_FOLDER}/scss/style.scss`,
        js: `${SOURCE_FOLDER}/js/script.js`,
    },
    watch: {
        html:`${SOURCE_FOLDER}/**/*.html`,
        css:`${SOURCE_FOLDER}/scss/**/*.scss`,
        js: `${SOURCE_FOLDER}/js/**/*.js`,
    },
    clean: `./${PROJECT_FOLDER}/`
}

//фунция перезагрузки страницы при изменениях
const browserSync = (params) =>{
    browser.init({
        server:{
            baseDir: './' + PROJECT_FOLDER + '/'
        },
        port:3000,
        notify:false,
    })
}
//сервер для работы с api
 const server = () =>{
    connect.server({
        root: './dist',
        livereload:true,
        middleware: (connect, o) =>{
            return [ (() => {
                console.log(connect,o)
                const url = require('url');
                const proxy = require('http-proxy-middleware');
                return proxy.createProxyMiddleware('/api', {
                    target: `https://kladr-api.ru`,
                    changeOrigin:true,
                    pathRewrite: {
                        '^/api': '/api.php',
                    }
                })

            })()]
        }
    });
}

//настройка html-файлов
const html = () => {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browser.stream())
}
//настройка css-файлов
const css = () => {
    return src(path.src.css)
        .pipe(scss({
            outputStyle:'expanded'
        }))
        .pipe(
            autoprefixer({
                overrideBrowserslist:['last 5 versions'],
                cascade:true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname:".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browser.stream())
}
//настройка js-файлов
const js = () => {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname:".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browser.stream())
}
const clean = () => {
    return del(path.clean)
}
//отслеживание изменений в файлах
const watchFiles = () =>{
    watch([path.watch.html],html)
    watch([path.watch.css],css)
    watch([path.watch.js],js)
}
const build = series(clean,parallel(js,css,html,server))//build версия проекта
const watchExport = parallel(build,watchFiles,/*browserSync*/);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watchExport;
exports.default = watchExport;
