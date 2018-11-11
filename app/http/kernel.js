var throttle_middleware = require('./middlewares/throttle_middleware');
var auth_middleware = require('./middlewares/auth_middleware');
var session_middleware = require('./middlewares/session_middleware');


module.exports = {
    session_middleware,
    auth_middleware,
    throttle_middleware
};