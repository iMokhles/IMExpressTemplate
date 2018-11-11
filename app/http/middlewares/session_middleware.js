var session = require("express-session");
var config = require("config");

const session_middleware = session({
    key: 'session_xid',
    secret: config.get("APP_KEY"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});
module.exports = session_middleware;
