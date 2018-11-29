
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const glob = require('glob');
const app = express();
const fs = require('fs');
const moment = require('moment');

const {
    InsideUserPurview
    } = require('../../lbConf/sharedApp/global/systemProductDefine');
const TestTypeDefine = require('../../lbConf/sharedApp/global/testTypeDefine');
const ProductDefine = require('../../lbConf/sharedApp/global/productDefine');

const config = require('./app/config');

// view engine setup
app.locals.ENV = config.env || 'localhost';

let watch = false;

if (app.locals.ENV === 'localhost') {
    app.locals.res_source_host = `http://${config.res_source.host}:${config.res_source.port}/dist`;
    watch = true;
} else {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'));
    app.locals.res_source_host = `https://${config.res_source.host}:443/dist/${config.env}/${packageJson.name}/${packageJson.version}`;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
const nunjucksEnv = nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch
});

nunjucksEnv.addGlobal('InsideUserPurview', InsideUserPurview);
nunjucksEnv.addGlobal('TestTypeDefine', TestTypeDefine);
nunjucksEnv.addGlobal('ProductDefine', ProductDefine);

nunjucksEnv.addFilter('htmlDecode', (str) => {
    return str.replace(/\[br\]/g, '<br>');
});

nunjucksEnv.addFilter('dateFormat', (date, format) => {
    return moment(date).format(format);
});

// session设置
app.use(session({
    secret: 'langlib',
    name: 'langlib',
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    rolling: true,
    saveUninitialized: true
}));


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'images', 'layout', 'icon_v2.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const controllers = glob.sync(`${__dirname}/routes/**/*.js`);
controllers.forEach((controller) => {
    /* eslint-disable */
    require(controller)(app);
    /* eslint-disable */
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    let message = err.message;

    if (err.response && err.response.parseError && err.response.parseError.name === 'YAMLException') {
        console.error(err.response.url);
        console.error(err.response.data.replace(/,"originalResponse.*/, '}'));
    }
    if (err.response && err.response.body) {
        message = err.response.body.Message || err.response.body.message;
    }
    res.render('error', {
        message,
        error: err,
    });
});


module.exports = app;
