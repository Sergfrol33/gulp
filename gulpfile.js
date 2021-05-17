const gulp = require('gulp')
const browserSync = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const del = require('del')
const rename = require('gulp-rename')
const cssmin = require('gulp-cssmin')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const uglify = require('gulp-uglify')

gulp.task('html', ()=>{
    browserSync.notify('Compilinig HTML')
    return gulp.src('app/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
})
gulp.task('css', () =>{
    return gulp.src('app/css/*.css')
        .pipe(plumber())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade: true}))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})
gulp.task('js',()=>{
    return gulp.src(['app/js/*.js', 'app/js/**/*.js'])
        .pipe(plumber())
        .pipe(webpackStream(
            module.exports = {
                output:{
                    filename: 'bundle.js'
                },
                module: {
                    rules: [
                        {
                            test: /\.js/,
                            exclude: /(node_modules)/,
                            loader: 'babel-loader',
                            query:{
                                presets: [
                                    ['latest',{modules: false}]
                                ]
                            }
                        }
                    ]
                },
                mode: 'development',
            }
        ), webpack)
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
})
gulp.task('server', () =>{
    browserSync({
        server:{
            baseDir: 'dist'
        },
        notify: true
    })
})
gulp.task('clean', ()=>{
    return del('dist/*')
})

gulp.task('watch', () =>{
    gulp.watch('app/*.pug', gulp.series('html'))
    gulp.watch('app/css/*.css', gulp.series('css'))
    gulp.watch(['app/js/*.js',  'app/js/**/*.js'], gulp.series('js'))
})
gulp.task('create', gulp.series('clean', gulp.parallel('html','css', 'js')))
gulp.task('default', gulp.series('create', gulp.parallel('server', 'watch')))

