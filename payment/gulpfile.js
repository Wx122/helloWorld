const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const qiniu = require('gulp-qiniu');
// const alioss = require('gulp-alioss');
const runSequence = require('run-sequence');
const webpackConfig = require('./webpack.release.config.js');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'));
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../configs/config.service.json'), 'utf-8'));

const version = packageJson.version;
const contents = { version };

gulp.task('version', (cb) => {
    fs.writeFile('options.json', JSON.stringify(contents), cb);
});

gulp.task('webpack', () => {
    return gulp.src(['public/javascripts/index/*.js',
        'public/styles/*.css'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(`dist/${config.env}/${packageJson.name}/${version}`));
});

gulp.task('qiniu', () => {
    return gulp.src('./dist/**/*')
        .pipe(qiniu({
            accessKey: 'Okc0zxdvkeav73tsE13hrPsHoNCDGBp-ivxxbFgP',
            secretKey: 'kGLCCObkP_TQY8K_wZYGf1wOHIi-FlYCG_jovVIo',
            bucket: 'langbo-node-static',
            private: false
        }, {
            dir: 'dist',
            versioning: false,
            concurrent: 10
        }));
});

// gulp.task('alioss', () => {
//     return gulp.src('./dist/**')
//         .pipe(alioss({
//             accessKeyId: 'LTAI2CkZ08eedczi',
//             secretAccessKey: 'cCuD9iqu9eeY57F7h0ewVUm0CHeH5Z',
//             endpoint: 'lb-node-static.oss-cn-beijing.langlib.com',
//             prefix: 'dist/',
//             bucket: 'lb-node-static',
//         }));
// });

gulp.task('default', (callback) => {
    runSequence('version',
        'webpack',
        ['qiniu'],
        callback);
});
