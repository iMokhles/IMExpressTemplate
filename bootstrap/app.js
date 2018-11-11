var appHttpError = require('../app/exceptions');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');

var appRouters = require('../routes/index');
var kernel = require('../app/http/kernel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  apply limiter to all requests
app.use(kernel.session_middleware);
app.use(kernel.throttle_middleware);

// helmet ( disable response headers example: X-Powered-By )
app.use(helmet());

// cookie parser
app.use(cookieParser());

// support cores ( you know what it mean )
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(appRouters);

// catch 404 and forward to error handler
app.use(appHttpError.createAppError);
// error handler
app.use(appHttpError.errorHandler);

module.exports = app;
