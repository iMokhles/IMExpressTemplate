var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
const rateLimit = require("express-rate-limit");
var session = require("express-session");
var config = require("config");

var appRouters = require('../routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Limit Rates
// app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
//  apply limiter to all requests
app.use(limiter);

// express-session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    key: 'session_xid',
    secret: config.get("APP_KEY"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
