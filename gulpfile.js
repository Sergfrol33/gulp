
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
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webpHtml = require('gulp-webp-html')

//пути для source и project версии
const path = {
    build: {
        html: `${PROJECT_FOLDER}/` ,
        css: `${PROJECT_FOLDER}/css/`  ,
        js: `${PROJECT_FOLDER}/js/`,
        img: `${PROJECT_FOLDER}/img/`,
    },
    src: {
        html:[`${SOURCE_FOLDER}/*.html`,`!${SOURCE_FOLDER}/_*.html`],
        css:`${SOURCE_FOLDER}/scss/style.scss`,
        js: `${SOURCE_FOLDER}/js/script.js`,
        img: `${SOURCE_FOLDER}/img/**/*.{png,jpg,svg,gif,ico,webp}`
    },
    watch: {
        html:`${SOURCE_FOLDER}/**/*.html`,
        css:`${SOURCE_FOLDER}/scss/**/*.scss`,
        js: `${SOURCE_FOLDER}/js/**/*.js`,
        img: `${SOURCE_FOLDER}/img/**/*/.{png,jpg,svg,gif,ico,webp}`,
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
        .pipe(webpHtml())
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
const images = () => {
    return src(path.src.img)
        .pipe(
            webp({
                quality:70
            })
        )
        .pipe(src(path.src.img))
        .pipe(dest(path.build.img))
        .pipe(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            interlaced:true,
            optimizationLevel:3
        }))
        .pipe(dest(path.build.img))
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
    watch([path.watch.img],images)
}
const build = series(clean,parallel(images,js,css,html,/*server*/))//build версия проекта
const watchExport = parallel(build,watchFiles,browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watchExport;
exports.default = watchExport;
