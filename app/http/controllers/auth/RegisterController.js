var kernel = require('../../kernel');
var config = require("config");

const redirectTo = '/home';

function getRegisterForm(req, res) {
    res.render('auth/register', {
        title: config.get('APP_NAME')
    });
}

function postRegisterForm(req, res) {
// TODO: post register to create new user
}

module.exports.getRegisterForm = [kernel.session_middleware, kernel.guest_middleware, getRegisterForm];
module.exports.postRegisterForm = postRegisterForm;