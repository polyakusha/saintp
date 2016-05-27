var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    //sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    rigger      = require('gulp-rigger'),
    cssmin      = require('gulp-clean-css'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    jade        = require('gulp-jade'),
    plumber     = require('gulp-plumber'),
    uncss       = require('gulp-uncss');;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html:  'build/',
        js:    'build/js/',
        css:   'build/styles/',
        img:   'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html:  'src/*.jade',
        js: [
            'src/js/*.js'
        ],
        style: [
            //'bower_components/normalize-css/normalize.css',
            'src/style/**/*.scss',
            'src/style/**/*.css'
        ],
        img:   'src/img/*.*'
        //fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html:  'src/**/*.jade',
        js:    'src/js/**/*.js',
        style: 'src/style/**/**/*.*',
        img:   'src/img/**/*.*'
        //fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('html', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber())
        .pipe(jade()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build//И перезагрузим наш сервер для обновлений
});

gulp.task('js', function () {
    //gulp.src(path.src.js) //Найдем наш main файл
    gulp.src([
            './src/js/money.js',
            './src/js/jquery-1.12.0.min.js',
            './src/js/jquery.fullPage.js',
            './src/js/jquery-ui.min.js',
            './src/js/jquery.easings.min.js',
            './src/js/countUp.js',
            './src/js/current.js',
            './src/js/google.js'
        ])
        .pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        .pipe(concat('main.js'))
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(gulp.dest("temp/"))
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('style', function () {
    //gulp.src(path.src.style) //Выберем наш main.scss
    gulp.src([
            './src/css/letsgospb.css',
            './src/css/jquery.fullPage.css',
            './src/css/jquery-ui.min.css',
            './src/css/current.css'
        ])
        .pipe(plumber())
        //.pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(concat("main.css"))
        .pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(uncss({html: './build/index.html'}))
        .pipe(gulp.dest("temp/")) // сохраняем полученный файл в нужной директории
        //.pipe(sass('temp/main.scss'))
        .pipe(cssmin()) //Сожмем
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('image', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)); //И бросим в build
});

gulp.task('build', [
    'html',
    'js',
    'style'
]);

gulp.task('pre-build', [
    'image'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });
});

gulp.task('makeit', ['build', 'pre-build', 'watch']);