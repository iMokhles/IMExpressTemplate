var session = require("express-session");
var config = require("config");

const start_session_middleware = session({
    key: 'session_xid',
    secret: config.get("APP_KEY"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7200000 }
});
module.exports = start_session_middleware;
