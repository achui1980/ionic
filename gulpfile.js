'use strict';

var appName = 'Ionic';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var express = require('express');
var mainBowerFiles = require('main-bower-files');
var connectLr = require('connect-livereload');
var streamqueue = require('streamqueue');
var runSequence = require('run-sequence');
var server = require('gulp-server-livereload');
var open = require('open');
var targetDir = "www";

var errorHandler = function(error) {
    plugins.util.log(error);
}

/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('e', 'emulate')
    .alias('b', 'build')
    .alias('r', 'run')
    // remove all debug messages (console.logs, alerts etc) from release build
    .alias('release', 'strip-debug')
    .default('build', false)
    .default('port', 9000)
    .default('strip-debug', false)
    .argv;

// clean target dir
gulp.task('clean', function(done) {
    del([targetDir], done);
});

// app releated script
gulp.task('scripts', function() {
    var dest = path.join(targetDir, 'scripts');
    return gulp.src(['templates.js', 'app.js', '**/*.js'], {
            cwd: 'app/scripts'
        })
        .pipe(gulp.dest(dest));
});

// all vender script
gulp.task('vendor', function() {
    var dest = path.join(targetDir, 'bower_components');
    return gulp.src(mainBowerFiles(), {
            base: 'bower_components'
        })
        .pipe(gulp.dest(dest))
});

// copy images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.*')
        .pipe(gulp.dest(path.join(targetDir, 'images')))

    .on('error', errorHandler);
});

//build styles
gulp.task('styles', function() {
    var options = {
        style: 'expanded'
    };

    var sassStream = gulp.src('app/styles/main.scss')
        .pipe(plugins.sass(options))
        .on('error', function(err) {
            console.log('err: ', err);
            beep();
        });

    // build ionic css dynamically to support custom themes
    /*    var ionicStream = gulp.src('app/styles/ionic-styles.scss')
        .pipe(plugins.cached('ionic-styles'))
        .pipe(plugins.sass(options))
        // cache and remember ionic .scss in order to cut down re-compile time
        .pipe(plugins.remember('ionic-styles'))
        .on('error', function(err) {
            console.log('err: ', err);
            beep();
          });*/

    return gulp.src(['app/styles/app.css', 'app/styles/main.scss'])
        .pipe(plugins.sass(options))
        .pipe(plugins.autoprefixer('last 1 Chrome version', 'last 3 iOS versions', 'last 3 Android versions'))
        //.pipe(plugins.order(['app/styles/main.css','app/styles/app.css']).pipe(plugins.print()))
        .pipe(plugins.print())
        //.pipe(plugins.concat('main2.css'))
        //.pipe(plugins.if(build, plugins.stripCssComments()))
        //.pipe(plugins.rev())
        .pipe(gulp.dest(path.join(targetDir, 'styles')))
        .on('error', errorHandler);
});

gulp.task('index', ['scripts'], function() {
    // injects 'src' into index.html at position 'tag'
    var _inject = function(src, tag) {
        return plugins.inject(src, {
            starttag: '<!-- inject:' + tag + ':{{ext}} -->',
            read: false,
            addRootSlash: false
        });
    };
    // get all our javascript sources
    // in development mode, it's better to add each file seperately.
    // it makes debugging easier.
    var _getAllScriptSources = function() {
        var scriptStream = gulp.src(['scripts/app.js', 'scripts/!(vendor)**/*.js'], {
            cwd: targetDir
        });
        return streamqueue({
            objectMode: true
        }, scriptStream);
    };
    return gulp.src('app/index.html')
        //PS. the css order,is the same as gulp.src order
        .pipe(_inject(gulp.src(['styles/main.css', 'styles/app.css'], {
            cwd: targetDir
        }), 'app-styles'))
        .pipe(_inject(_getAllScriptSources(), 'app'))
        .pipe(_inject(gulp.src(mainBowerFiles(),{read:false}), 'bower'))
        //.pipe(angularFilesort())
        .pipe(gulp.dest(targetDir))
        .on('error', errorHandler);
});

gulp.task('templates', function() {
    return gulp.src('app/templates/**/*.html')
        .pipe(gulp.dest(path.join(targetDir, 'templates')));
});

// start watchers
gulp.task('watchers', function() {
    plugins.livereload.listen();
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/fonts/**', ['fonts']);
    gulp.watch('app/icons/**', ['iconfont']);
    gulp.watch('app/images/**', ['images']);
    gulp.watch('app/scripts/**/*.js', ['index']);
    gulp.watch('./vendor.json', ['vendor']);
    gulp.watch('app/templates/**/*.html', ['templates']);
    gulp.watch('app/index.html', ['index']);
    gulp.watch(targetDir + '/**')
        .on('change', plugins.livereload.changed)
        .on('error', errorHandler);
});

// start local express server
gulp.task('serve', function() {
    express()
        .use(connectLr())
        .use(express.static(targetDir))
        .listen(9000);
    open('http://localhost:9000/');
});

// copy fonts
gulp.task('fonts', function() {
  return gulp
    .src(['app/fonts/*.*', 'bower_components/ionic/release/fonts/*.*'])

    .pipe(gulp.dest(path.join(targetDir, 'fonts')))

    .on('error', errorHandler);
});

// no-op = empty function
gulp.task('noop', function() {});

// our main sequence, with some conditional jobs depending on params
gulp.task('default', function(done) {
    runSequence(
        'clean',
        //'iconfont',
        [
            'fonts',
            'templates',
            'styles',
            'images',
            'vendor',
            //'scripts'
        ],
        'index',
        'watchers',
        //'serve',
        done);
});

// our main sequence, with some conditional jobs depending on params
gulp.task('build', function(done) {
    runSequence(
        'clean',
        //'iconfont',
        [
            'fonts',
            'templates',
            'styles',
            'images',
            'vendor',
            //'scripts'
        ],
        'index',
        'watchers',
        //'serve',
        done);
});

