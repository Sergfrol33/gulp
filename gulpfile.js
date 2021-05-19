
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
    webpHtml = require('gulp-webp-html'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    argv = require('yargs').argv,
    pug = require('gulp-pug')


//пути для source и project версии
const path = {
    build: {
        html: `${PROJECT_FOLDER}/` ,
        css: `${PROJECT_FOLDER}/css/`  ,
        js: `${PROJECT_FOLDER}/js/`,
        img: `${PROJECT_FOLDER}/img/`,
        fonts: `${PROJECT_FOLDER}/fonts/`,
    },
    src: {
        html:[`${SOURCE_FOLDER}/*.pug`,`!${SOURCE_FOLDER}/_*.pug`],
        css:`${SOURCE_FOLDER}/scss/style.scss`,
        js: `${SOURCE_FOLDER}/js/script.js`,
        img: `${SOURCE_FOLDER}/img/*`,
        fonts: `${SOURCE_FOLDER}/fonts/*.{ttf,woff,woff2}`,
    },
    watch: {
        html:`${SOURCE_FOLDER}/**/*.pug`,
        css:`${SOURCE_FOLDER}/scss/**/*.scss`,
        js: `${SOURCE_FOLDER}/js/**/*.js`,
        img: `${SOURCE_FOLDER}/img/*`,
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

//настройка html-файлов
const html = () => {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(pug())
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
        .pipe(cleanCss())
        .pipe(rename({
            extname:".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browser.stream())
}

const fonts = () =>{
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

//настройка js-файлов
const js = () => {
    return src([path.src.js, `${SOURCE_FOLDER}/js/**/*.js`])
        .pipe(fileInclude())
        .pipe(webpackStream({
            output: {
                filename:'script.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            mode: argv.production ? 'production' : 'development',
            devtool: 'none'
        }))
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
    watch([path.src.js, `${SOURCE_FOLDER}/js/**/*.js`],js)
    watch([path.watch.img],images)
}
const build = series(clean,parallel(images,js,css,html,fonts))//build версия проекта
const watchExport = parallel(build,watchFiles,browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watchExport;
exports.default = watchExport;
