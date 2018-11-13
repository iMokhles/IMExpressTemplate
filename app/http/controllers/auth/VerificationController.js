var kernel = require('../../kernel');
var config = require("config");

function getVerifyPage(req, res) {
    res.render('auth/verify', {
        title: config.get('APP_NAME'),
        session: req.session
    });
}

function postVerify(req, res) {
// TODO: verify email
}

function postResend(req, res) {
// TODO: send verification email
}

module.exports.getVerifyPage = [kernel.session_middleware, kernel.auth_middleware, getVerifyPage];
module.exports.postVerify = [kernel.throttle_middleware(6, 1), postVerify];
module.exports.postResend = [kernel.throttle_middleware(6, 1), postResend];