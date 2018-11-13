var kernel = require('../../kernel');
var config = require("config");

const redirectTo = '/home';

function getLoginForm(req, res) {
    res.render('auth/login', {
        title: config.get('APP_NAME')
    });
}

function postLoginForm(req, res) {
// TODO: post login
}

function logout(req, res) {
// TODO: logout user
}

module.exports.getLoginForm = [kernel.session_middleware, kernel.guest_middleware, getLoginForm];
module.exports.postLoginForm = postLoginForm;
module.exports.logout = logout;