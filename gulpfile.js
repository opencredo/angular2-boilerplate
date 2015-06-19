var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    rename = require('gulp-rename'),
    typesript = require('typescript'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    runSequence = require('run-sequence'),
    Config = require('./gulpfile.config'),

    config = new Config();

gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task('compile-ts', function () {
    var sourceTsFiles = [
            config.allTypeScript,
            config.libraryTypeScriptDefinitions,
            config.appTypeScriptReferences
        ],
        tsResult = gulp.src(sourceTsFiles)
            .pipe(sourcemaps.init())
            .pipe(tsc({
                typescript: typesript,
                module: 'commonjs',
                target: 'ES5',
                emitDecoratorMetadata: true,
                declarationFiles: false,
                noExternalResolve: true
            }));

    tsResult.dts
        .pipe(gulp.dest(config.dest));

    return tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('clean', function (done) {
    del([
        config.dest + '/**'
    ], done);
});

gulp.task('copy-html', function () {
    return gulp.src(config.allHTML)
        .pipe(gulp.dest(config.dest));
});

gulp.task('copy-lib', function () {
   return gulp.src(config.allLib)
       .pipe(gulp.dest(config.dest + config.outputLibDir));
});

gulp.task('styles', function () {
    return gulp.src(config.mainLessFile)
        .pipe(plumber())
        .pipe(less())
        .pipe(rename(config.outputFile + '.css'))
        .pipe(gulp.dest(config.dest + config.outputCSSDir));
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
    gulp.watch([config.allLess], ['styles']);
    gulp.watch([config.allHTML], ['copy-html']);
});

gulp.task('default', function () {
    runSequence(
        'clean',
        'ts-lint',
        'compile-ts',
        ['copy-html', 'copy-lib', 'styles'],
        'watch'
    )
});
